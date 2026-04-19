import { fireOpenClawWebhook } from '@/lib/webhook'

// Mock Supabase so logWebhook doesn't need a real DB connection
jest.mock('@/lib/supabase', () => ({
  createServerSupabaseClient: () => ({
    from: () => ({
      insert: jest.fn().mockResolvedValue({ error: null }),
    }),
  }),
}))

const mockFetch = jest.fn()
global.fetch = mockFetch

const BASE_PAYLOAD = {
  type: 'estimate' as const,
  name: 'John Smith',
  email: 'john@example.com',
  phone: '555-123-4567',
  city: 'Montclair',
  timestamp: '2026-01-01T00:00:00.000Z',
}

beforeEach(() => {
  jest.clearAllMocks()
  process.env.OPENCLAW_WEBHOOK_URL = 'https://hooks.openclaw.io/test'
  process.env.OPENCLAW_API_KEY = 'test-api-key'
})

describe('fireOpenClawWebhook', () => {
  describe('when OPENCLAW_WEBHOOK_URL is not set', () => {
    it('returns early without calling fetch', async () => {
      delete process.env.OPENCLAW_WEBHOOK_URL
      await fireOpenClawWebhook(BASE_PAYLOAD)
      expect(mockFetch).not.toHaveBeenCalled()
    })
  })

  describe('on successful webhook delivery', () => {
    it('calls fetch with correct URL and method', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true })
      await fireOpenClawWebhook(BASE_PAYLOAD)

      expect(mockFetch).toHaveBeenCalledTimes(1)
      expect(mockFetch).toHaveBeenCalledWith(
        'https://hooks.openclaw.io/test',
        expect.objectContaining({ method: 'POST' })
      )
    })

    it('sends Authorization header with Bearer token', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true })
      await fireOpenClawWebhook(BASE_PAYLOAD)

      const [, options] = mockFetch.mock.calls[0]
      expect(options.headers['Authorization']).toBe('Bearer test-api-key')
    })

    it('sends Content-Type application/json', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true })
      await fireOpenClawWebhook(BASE_PAYLOAD)

      const [, options] = mockFetch.mock.calls[0]
      expect(options.headers['Content-Type']).toBe('application/json')
    })

    it('includes all payload fields in the request body', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true })
      await fireOpenClawWebhook(BASE_PAYLOAD)

      const [, options] = mockFetch.mock.calls[0]
      const body = JSON.parse(options.body)
      expect(body.name).toBe('John Smith')
      expect(body.email).toBe('john@example.com')
      expect(body.city).toBe('Montclair')
    })

    it('does not retry on success', async () => {
      mockFetch.mockResolvedValueOnce({ ok: true })
      await fireOpenClawWebhook(BASE_PAYLOAD)
      expect(mockFetch).toHaveBeenCalledTimes(1)
    })
  })

  describe('retry behavior on failure', () => {
    it('retries up to 3 times on non-ok HTTP responses', async () => {
      mockFetch.mockResolvedValue({ ok: false, status: 500, text: async () => 'Server Error' })
      await fireOpenClawWebhook(BASE_PAYLOAD)
      expect(mockFetch).toHaveBeenCalledTimes(3)
    }, 15000)

    it('retries up to 3 times on network errors', async () => {
      mockFetch.mockRejectedValue(new Error('Network failure'))
      await fireOpenClawWebhook(BASE_PAYLOAD)
      expect(mockFetch).toHaveBeenCalledTimes(3)
    }, 15000)

    it('succeeds on the second attempt if first fails', async () => {
      mockFetch
        .mockResolvedValueOnce({ ok: false, status: 503, text: async () => 'Unavailable' })
        .mockResolvedValueOnce({ ok: true })

      await fireOpenClawWebhook(BASE_PAYLOAD)
      expect(mockFetch).toHaveBeenCalledTimes(2)
    }, 10000)
  })

  describe('when API key is not set', () => {
    it('sends an empty Bearer token rather than crashing', async () => {
      delete process.env.OPENCLAW_API_KEY
      mockFetch.mockResolvedValueOnce({ ok: true })

      await fireOpenClawWebhook(BASE_PAYLOAD)

      const [, options] = mockFetch.mock.calls[0]
      expect(options.headers['Authorization']).toBe('Bearer ')
    })
  })
})
