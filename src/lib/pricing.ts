import type { EstimateResult } from '@/types'

// Base price ranges by service type [min, max]
const BASE_PRICES: Record<string, [number, number]> = {
  'ac-repair': [150, 600],
  'ac-installation': [3500, 8000],
  'heating-repair': [200, 800],
  'furnace-installation': [4000, 9000],
  'tune-up': [89, 149],
  ductwork: [800, 3000],
  emergency: [300, 1200],
  'not-sure': [150, 600],
  // Also accept display labels
  'AC Repair': [150, 600],
  'AC Installation': [3500, 8000],
  'Heating Repair': [200, 800],
  'Furnace Installation': [4000, 9000],
  'Tune-Up': [89, 149],
  Ductwork: [800, 3000],
  Emergency: [300, 1200],
  'Not Sure': [150, 600],
}

// Size tier multipliers (index = tier: 0=under1000, 1=1000-2000, 2=2000-3500, 3=3500+)
const SIZE_ADJUSTMENTS_MIN = [0, 100, 200, 350]
const SIZE_ADJUSTMENTS_MAX = [0, 300, 700, 1500]

// For large installs, size adjustment is bigger
const INSTALL_SIZE_ADJUSTMENTS_MIN = [0, 300, 700, 1200]
const INSTALL_SIZE_ADJUSTMENTS_MAX = [0, 700, 1500, 2500]

const SIZE_TIERS: Record<string, number> = {
  'Under 1,000 sqft': 0,
  '1,000–2,000 sqft': 1,
  '2,000–3,500 sqft': 2,
  '3,500+ sqft': 3,
}

// Age adjustments
const AGE_ADJUSTMENTS: Record<string, [number, number]> = {
  'Less than 5 years': [0, 0],
  '5–10 years': [0, 0],
  '10–15 years': [100, 100],
  '15+ years': [200, 200],
}

// Emergency urgency surcharge
const EMERGENCY_SURCHARGE = 150

const INSTALL_SERVICES = ['ac-installation', 'furnace-installation', 'AC Installation', 'Furnace Installation']

export function calculateEstimate(
  serviceType: string,
  homeSize: string,
  systemAge: string,
  urgency: string
): EstimateResult {
  const base = BASE_PRICES[serviceType] ?? BASE_PRICES['not-sure']
  let [min, max] = base

  // Size adjustment
  const sizeTier = SIZE_TIERS[homeSize] ?? 0
  const isInstall = INSTALL_SERVICES.includes(serviceType)

  if (sizeTier > 0) {
    const sizeMin = isInstall ? INSTALL_SIZE_ADJUSTMENTS_MIN[sizeTier] : SIZE_ADJUSTMENTS_MIN[sizeTier]
    const sizeMax = isInstall ? INSTALL_SIZE_ADJUSTMENTS_MAX[sizeTier] : SIZE_ADJUSTMENTS_MAX[sizeTier]
    min += sizeMin
    max += sizeMax
  }

  // Age adjustment
  const ageAdj = AGE_ADJUSTMENTS[systemAge] ?? [0, 0]
  min += ageAdj[0]
  max += ageAdj[1]

  // Emergency surcharge
  if (urgency === 'Emergency (today)') {
    min += EMERGENCY_SURCHARGE
    max += EMERGENCY_SURCHARGE
  }

  return { estimatedMin: min, estimatedMax: max }
}
