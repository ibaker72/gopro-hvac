import { calculateEstimate } from '@/lib/pricing'

describe('calculateEstimate', () => {
  describe('base prices by service type', () => {
    it('returns correct base range for ac-repair with smallest home and newest system', () => {
      const result = calculateEstimate('ac-repair', 'Under 1,000 sqft', 'Less than 5 years', 'This week')
      expect(result).toEqual({ estimatedMin: 150, estimatedMax: 600 })
    })

    it('returns correct base range for ac-installation', () => {
      const result = calculateEstimate('ac-installation', 'Under 1,000 sqft', 'Less than 5 years', 'This week')
      expect(result).toEqual({ estimatedMin: 3500, estimatedMax: 8000 })
    })

    it('returns correct base range for heating-repair', () => {
      const result = calculateEstimate('heating-repair', 'Under 1,000 sqft', 'Less than 5 years', 'This week')
      expect(result).toEqual({ estimatedMin: 200, estimatedMax: 800 })
    })

    it('returns correct base range for furnace-installation', () => {
      const result = calculateEstimate('furnace-installation', 'Under 1,000 sqft', 'Less than 5 years', 'This week')
      expect(result).toEqual({ estimatedMin: 4000, estimatedMax: 9000 })
    })

    it('returns correct base range for tune-up', () => {
      const result = calculateEstimate('tune-up', 'Under 1,000 sqft', 'Less than 5 years', 'This week')
      expect(result).toEqual({ estimatedMin: 89, estimatedMax: 149 })
    })

    it('returns correct base range for ductwork', () => {
      const result = calculateEstimate('ductwork', 'Under 1,000 sqft', 'Less than 5 years', 'This week')
      expect(result).toEqual({ estimatedMin: 800, estimatedMax: 3000 })
    })

    it('returns correct base range for emergency', () => {
      const result = calculateEstimate('emergency', 'Under 1,000 sqft', 'Less than 5 years', 'This week')
      expect(result).toEqual({ estimatedMin: 300, estimatedMax: 1200 })
    })

    it('falls back to not-sure range for unknown service type', () => {
      const result = calculateEstimate('unknown-service', 'Under 1,000 sqft', 'Less than 5 years', 'This week')
      expect(result).toEqual({ estimatedMin: 150, estimatedMax: 600 })
    })

    it('accepts display label format (AC Repair)', () => {
      const result = calculateEstimate('AC Repair', 'Under 1,000 sqft', 'Less than 5 years', 'This week')
      expect(result).toEqual({ estimatedMin: 150, estimatedMax: 600 })
    })

    it('accepts display label format (Furnace Installation)', () => {
      const result = calculateEstimate('Furnace Installation', 'Under 1,000 sqft', 'Less than 5 years', 'This week')
      expect(result).toEqual({ estimatedMin: 4000, estimatedMax: 9000 })
    })
  })

  describe('size adjustments for repair/service jobs', () => {
    it('adds no adjustment for Under 1,000 sqft', () => {
      const result = calculateEstimate('ac-repair', 'Under 1,000 sqft', 'Less than 5 years', 'This week')
      expect(result).toEqual({ estimatedMin: 150, estimatedMax: 600 })
    })

    it('adds tier-1 adjustment for 1,000–2,000 sqft', () => {
      const result = calculateEstimate('ac-repair', '1,000–2,000 sqft', 'Less than 5 years', 'This week')
      expect(result).toEqual({ estimatedMin: 150 + 100, estimatedMax: 600 + 300 })
    })

    it('adds tier-2 adjustment for 2,000–3,500 sqft', () => {
      const result = calculateEstimate('ac-repair', '2,000–3,500 sqft', 'Less than 5 years', 'This week')
      expect(result).toEqual({ estimatedMin: 150 + 200, estimatedMax: 600 + 700 })
    })

    it('adds tier-3 adjustment for 3,500+ sqft', () => {
      const result = calculateEstimate('ac-repair', '3,500+ sqft', 'Less than 5 years', 'This week')
      expect(result).toEqual({ estimatedMin: 150 + 350, estimatedMax: 600 + 1500 })
    })

    it('uses larger install size adjustments for ac-installation', () => {
      const result = calculateEstimate('ac-installation', '1,000–2,000 sqft', 'Less than 5 years', 'This week')
      expect(result).toEqual({ estimatedMin: 3500 + 300, estimatedMax: 8000 + 700 })
    })

    it('uses larger install size adjustments for furnace-installation at largest tier', () => {
      const result = calculateEstimate('furnace-installation', '3,500+ sqft', 'Less than 5 years', 'This week')
      expect(result).toEqual({ estimatedMin: 4000 + 1200, estimatedMax: 9000 + 2500 })
    })

    it('falls back to tier 0 for unknown home size', () => {
      const result = calculateEstimate('ac-repair', 'Unknown size', 'Less than 5 years', 'This week')
      expect(result).toEqual({ estimatedMin: 150, estimatedMax: 600 })
    })
  })

  describe('age adjustments', () => {
    it('adds no adjustment for Less than 5 years', () => {
      const result = calculateEstimate('ac-repair', 'Under 1,000 sqft', 'Less than 5 years', 'This week')
      expect(result).toEqual({ estimatedMin: 150, estimatedMax: 600 })
    })

    it('adds no adjustment for 5–10 years', () => {
      const result = calculateEstimate('ac-repair', 'Under 1,000 sqft', '5–10 years', 'This week')
      expect(result).toEqual({ estimatedMin: 150, estimatedMax: 600 })
    })

    it('adds $100 to min and max for 10–15 years', () => {
      const result = calculateEstimate('ac-repair', 'Under 1,000 sqft', '10–15 years', 'This week')
      expect(result).toEqual({ estimatedMin: 250, estimatedMax: 700 })
    })

    it('adds $200 to min and max for 15+ years', () => {
      const result = calculateEstimate('ac-repair', 'Under 1,000 sqft', '15+ years', 'This week')
      expect(result).toEqual({ estimatedMin: 350, estimatedMax: 800 })
    })

    it('adds no adjustment for unknown system age', () => {
      const result = calculateEstimate('ac-repair', 'Under 1,000 sqft', 'Unknown age', 'This week')
      expect(result).toEqual({ estimatedMin: 150, estimatedMax: 600 })
    })
  })

  describe('emergency surcharge', () => {
    it('adds $150 surcharge for Emergency (today) urgency', () => {
      const result = calculateEstimate('ac-repair', 'Under 1,000 sqft', 'Less than 5 years', 'Emergency (today)')
      expect(result).toEqual({ estimatedMin: 300, estimatedMax: 750 })
    })

    it('does not add surcharge for This week urgency', () => {
      const result = calculateEstimate('ac-repair', 'Under 1,000 sqft', 'Less than 5 years', 'This week')
      expect(result).toEqual({ estimatedMin: 150, estimatedMax: 600 })
    })

    it('does not add surcharge for Flexible urgency', () => {
      const result = calculateEstimate('ac-repair', 'Under 1,000 sqft', 'Less than 5 years', 'Flexible')
      expect(result).toEqual({ estimatedMin: 150, estimatedMax: 600 })
    })
  })

  describe('combined adjustments', () => {
    it('correctly stacks size + age + emergency adjustments', () => {
      // ac-repair base: 150/600
      // + tier-2 size: +200/+700
      // + 15+ years age: +200/+200
      // + emergency: +150/+150
      const result = calculateEstimate('ac-repair', '2,000–3,500 sqft', '15+ years', 'Emergency (today)')
      expect(result).toEqual({ estimatedMin: 700, estimatedMax: 1650 })
    })

    it('correctly stacks install size + age for large furnace install', () => {
      // furnace-installation base: 4000/9000
      // + tier-3 install size: +1200/+2500
      // + 10–15 years age: +100/+100
      const result = calculateEstimate('furnace-installation', '3,500+ sqft', '10–15 years', 'This week')
      expect(result).toEqual({ estimatedMin: 5300, estimatedMax: 11600 })
    })
  })

  describe('return type', () => {
    it('always returns an object with estimatedMin and estimatedMax', () => {
      const result = calculateEstimate('ac-repair', 'Under 1,000 sqft', 'Less than 5 years', 'Flexible')
      expect(result).toHaveProperty('estimatedMin')
      expect(result).toHaveProperty('estimatedMax')
      expect(typeof result.estimatedMin).toBe('number')
      expect(typeof result.estimatedMax).toBe('number')
    })

    it('estimatedMax is always >= estimatedMin', () => {
      const cases = [
        ['ac-repair', 'Under 1,000 sqft', 'Less than 5 years', 'Flexible'],
        ['ac-installation', '3,500+ sqft', '15+ years', 'Emergency (today)'],
        ['tune-up', '2,000–3,500 sqft', '10–15 years', 'This week'],
      ] as const

      for (const [service, size, age, urgency] of cases) {
        const result = calculateEstimate(service, size, age, urgency)
        expect(result.estimatedMax).toBeGreaterThanOrEqual(result.estimatedMin)
      }
    })
  })
})
