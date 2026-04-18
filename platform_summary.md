# Go Pro Heating & Cooling — Platform Summary

> **Business:** Go Pro Heating & Cooling | Clifton, NJ | License #19HC00212300 | 973-938-2217

---

## Table of Contents

1. [Platform Overview](#1-platform-overview)
2. [How It Works](#2-how-it-works)
3. [Key Features](#3-key-features)
4. [Business Benefits](#4-business-benefits)
5. [SEO Strategy](#5-seo-strategy)
6. [GEO / Local SEO](#6-geo--local-seo)
7. [Maintenance Guide](#7-maintenance-guide)
8. [OpenClaw CRM — Lead Prompts & Automation](#8-openclaw-crm--lead-prompts--automation)

---

## 1. Platform Overview

The Go Pro Heating & Cooling website is a **full-stack lead generation and service booking platform** built for a licensed Northern New Jersey HVAC contractor. Its core mission is to convert local homeowners and businesses searching for HVAC services into booked appointments and phone calls.

### Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 + Radix UI |
| Database | Supabase (PostgreSQL) |
| Email | Resend API |
| CRM | OpenClaw (webhook integration) |
| Analytics | Google Analytics 4 |
| Hosting | Vercel (auto-deploy on push) |
| SEO | next-sitemap + JSON-LD schema |

### Service Territory

**Primary market:** Clifton, NJ 07013  
**Full coverage:** 39+ cities across Passaic, Bergen, Essex, Hudson, and Morris counties

---

## 2. How It Works

### Architecture

```
Visitor
  │
  ▼
Next.js App (Vercel Edge)
  ├── Static/SSG pages → Services, Locations, Blog, FAQ, About
  ├── Dynamic pages   → Estimate Wizard, Contact Form, Checklist
  └── API Routes
        ├── /api/estimate  ──► Supabase (estimates table)
        │                  ──► Resend (confirmation email to customer + internal alert)
        │                  ──► OpenClaw webhook (CRM lead)
        ├── /api/lead      ──► Supabase (leads table)
        │                  ──► OpenClaw webhook (CRM lead)
        └── /api/openclaw-webhook  ◄── Receives inbound events from OpenClaw
```

### Lead Capture Flows

#### Flow 1 — Free Estimate Wizard (`/estimate`)
1. Visitor completes 4-step wizard: service type → home size → system age → contact info
2. Platform instantly calculates an estimated price range (`src/lib/pricing.ts`)
3. `POST /api/estimate` fires simultaneously:
   - Saves record to Supabase `estimates` table
   - Sends branded confirmation email to customer via Resend
   - Sends internal alert email to the Go Pro team
   - Fires OpenClaw webhook with full lead payload (retries up to 3× on failure)
4. Customer sees their estimate on-screen and in their inbox

#### Flow 2 — Contact Form (`/contact`)
1. Visitor submits name, phone, email, message
2. `POST /api/lead` saves to Supabase `leads` table and fires OpenClaw webhook

#### Flow 3 — HVAC Checklist Download (`/free-checklist`)
1. Visitor enters email in exchange for a free HVAC Maintenance Checklist PDF
2. `POST /api/lead` captures the email, sends the checklist PDF via Resend, fires OpenClaw webhook
3. Visitor enters the CRM as a warm lead for future follow-up

### Dynamic Pricing Logic

Pricing is calculated in `src/lib/pricing.ts` using these factors:

| Factor | Effect |
|---|---|
| Service type | Sets base price range |
| Home size | Multiplier (small → large) |
| System age | Older = higher repair/replacement likelihood |
| Emergency flag | +$150 same-day surcharge |

Price ranges are shown as low/high estimates — never a firm quote — encouraging a follow-up call.

### OpenClaw Webhook Payload

Every lead (estimate or contact) fires a webhook to `OPENCLAW_WEBHOOK_URL` with:

```json
{
  "type": "estimate",
  "name": "Jane Smith",
  "email": "jane@example.com",
  "phone": "555-123-4567",
  "service": "AC Repair",
  "city": "Montclair",
  "home_size": "1500-2500 sqft",
  "system_age": "6-10 years",
  "estimate_low": 200,
  "estimate_high": 500,
  "emergency": false,
  "timestamp": "2026-04-18T14:00:00Z"
}
```

Webhook delivery includes 3-attempt retry logic with exponential backoff. All attempts are logged to the Supabase `webhook_logs` table.

---

## 3. Key Features

### Service Pages (11 services)
Dynamic routes at `/services/[slug]`:
- AC Repair, AC Installation
- Heating Repair, Furnace Installation
- Heat Pump Services, Ductless Mini-Split Installation
- Duct Cleaning, HVAC Tune-Up
- 24/7 Emergency HVAC, Commercial HVAC

Each page has unique title tags, meta descriptions, H1s, and LocalBusiness schema.

### Location Pages (39+ cities)
Dynamic routes at `/locations/[city]` covering all of Northern NJ:
- City-specific headlines and body copy
- Breadcrumb schema on every page
- Targeting long-tail queries like "AC repair in Montclair NJ"

### Free Estimate Wizard
- 4-step interactive form with progress bar
- Instant on-screen price range before asking for contact info
- Highest-converting page on the site

### Blog (6 articles)
Pre-written SEO articles in `src/lib/blog-data.ts`:
- "How to Prepare Your HVAC for Winter"
- "5 Signs Your AC Needs Repair"
- "Heat Pump vs Furnace: Which is Right for You?"
- "10 Ways to Save on Your Energy Bill"
- "When Should You Replace Your HVAC System?"
- "Benefits of Ductless Mini-Split Systems"

### Lead Magnet
Free HVAC Maintenance Checklist (`/public/hvac-maintenance-checklist.pdf`) gated behind an email capture form at `/free-checklist`.

### Trust & Conversion Elements
- TrustBadges component (license number, years in business, 24/7 availability)
- ReviewCarousel component (customer testimonials)
- "Northern NJ's #1 Rated HVAC Company" positioning
- Same-day and emergency service CTAs throughout

---

## 4. Business Benefits

### Multiple Conversion Paths
Every page type has a call-to-action tailored to visitor intent:
- High-intent (ready to buy) → Estimate wizard or phone call
- Mid-intent (researching) → Blog content → estimate CTA
- Low-intent (just browsing) → Checklist download → nurture sequence

### Instant Pricing Builds Trust
Showing a price range before asking for contact info removes friction and signals transparency. Leads who see a price and still submit are highly qualified.

### CRM Automation Saves Time
Every form submission automatically enters the CRM. No manual data entry. The team can focus on calling leads rather than managing spreadsheets.

### 39 City Pages = 39 Traffic Channels
Each location page independently ranks in Google for city-specific HVAC searches — multiplying organic traffic without multiplying ad spend.

### Content Marketing Flywheel
Blog articles attract long-tail informational searches. Visitors read, build trust, then convert via embedded CTAs.

### 24/7 Digital Sales Rep
The estimate wizard captures leads at 2am when no one is in the office. Customers get an instant confirmation email; the team follows up the next morning with a warm lead already in the CRM.

---

## 5. SEO Strategy

### Sitemap & Crawlability
`next-sitemap` auto-generates `/sitemap.xml` on every build with priority weighting:

| Page Type | Priority | Change Frequency |
|---|---|---|
| Homepage | 1.0 | daily |
| Service pages | 0.8 | weekly |
| Location pages | 0.8 | weekly |
| Blog posts | 0.7 | monthly |
| Standard pages | 0.6 | monthly |

`/robots.txt` blocks crawlers from all `/api/` routes.

### Structured Data (JSON-LD)
Implemented in `src/lib/schema.ts`:

- **LocalBusinessSchema** — business name, address, phone, license, geo coordinates, service area, open hours
- **BreadcrumbSchema** — on all service and location pages
- **FAQSchema** — on the FAQ page (eligible for Google rich results)

### On-Page SEO
Every page has:
- Unique `<title>` and `<meta name="description">`
- Open Graph tags (`og:title`, `og:description`, `og:image`)
- Twitter Card tags
- Canonical URL (`<link rel="canonical">`)
- Optimized H1 aligned with the page's target keyword

### Core Keyword Targets

| Page Type | Example Target Keyword |
|---|---|
| Homepage | "HVAC company Northern NJ" |
| AC Repair | "AC repair Clifton NJ" |
| Furnace Install | "furnace installation NJ" |
| Location: Montclair | "HVAC repair Montclair NJ" |
| Blog | "when to replace HVAC system" |

### Technical SEO
- Next.js `<Image>` component auto-converts images to WebP/AVIF
- Security headers (CSP, HSTS, X-Frame-Options) signal a trustworthy site to Google
- Mobile-first responsive design
- Core Web Vitals optimized via Next.js server-side rendering and static generation

---

## 6. GEO / Local SEO

### Geo-Targeting Meta Tags
Every page includes geographic metadata:

```html
<meta name="geo.region" content="US-NJ" />
<meta name="geo.placename" content="Clifton, New Jersey" />
<meta name="geo.position" content="40.8584;-74.1196" />
<meta name="ICBM" content="40.8584, -74.1196" />
```

### LocalBusiness Schema
Full structured data injected on every page:

```json
{
  "@type": "HVACBusiness",
  "name": "Go Pro Heating & Cooling",
  "address": {
    "streetAddress": "23 Major Street",
    "addressLocality": "Clifton",
    "addressRegion": "NJ",
    "postalCode": "07013"
  },
  "telephone": "+19739382217",
  "license": "19HC00212300",
  "areaServed": ["Clifton", "Passaic", "Montclair", "...39+ cities"]
}
```

### City Landing Pages
Each of the 39+ `/locations/[city]` pages:
- Has a city-specific `<title>` (e.g., "HVAC Repair in Montclair, NJ — Go Pro Heating & Cooling")
- Contains unique body copy mentioning the city multiple times
- Links back to the homepage and relevant service pages (internal linking)
- Targets queries like "[service] [city] NJ"

### County Coverage

| County | Example Cities |
|---|---|
| Passaic | Clifton, Passaic, Wayne, Paterson |
| Bergen | Hackensack, Paramus, Teaneck |
| Essex | Montclair, Newark, Bloomfield |
| Hudson | Jersey City, Hoboken, Bayonne |
| Morris | Morristown, Parsippany, Denville |

### Google Business Profile (Recommended)
Keep the GBP listing in sync with the website NAP (Name, Address, Phone):
- **Name:** Go Pro Heating & Cooling
- **Address:** 23 Major Street, Clifton, NJ 07013
- **Phone:** 973-938-2217
- **Category:** HVAC Contractor
- Post weekly GBP updates and respond to all reviews to boost local pack rankings.

### NAP Consistency Checklist
The following must match exactly across the website, GBP, Yelp, Angi, and HomeAdvisor:
- Business name: **Go Pro Heating & Cooling**
- Address: **23 Major Street, Clifton, NJ 07013**
- Phone: **973-938-2217**
- License: **#19HC00212300**

---

## 7. Maintenance Guide

### Content Updates

| Task | File to Edit |
|---|---|
| Add or edit blog post | `src/lib/blog-data.ts` |
| Update service descriptions | `src/lib/constants.ts` |
| Add a new city page | Append to city array in `src/lib/constants.ts` |
| Update pricing ranges | `src/lib/pricing.ts` |
| Edit FAQ answers | `src/lib/constants.ts` (faq array) |
| Change email templates | `src/lib/resend.ts` |
| Update company info / schema | `src/lib/constants.ts` + `src/lib/schema.ts` |

### Database (Supabase)

- **View leads:** Supabase dashboard → `leads` table
- **View estimates:** Supabase dashboard → `estimates` table
- **Check webhook failures:** Supabase dashboard → `webhook_logs` table (filter `status = 'failed'`)
- **Run a migration:** `supabase db push` from the project root (migrations live in `supabase/`)

### Deployments

Pushing to the `main` branch on GitHub automatically triggers a Vercel production deploy. No manual steps needed.

To preview a change before going live:
1. Create a feature branch
2. Push the branch — Vercel creates a preview URL automatically
3. Test the preview URL, then merge to `main`

### Environment Variables

These must be set in Vercel's project settings (and locally in `.env.local`):

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 measurement ID |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_ANON_KEY` | Supabase public anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase admin key (server-side only) |
| `RESEND_API_KEY` | Resend email API key |
| `OPENCLAW_WEBHOOK_URL` | OpenClaw CRM webhook endpoint |
| `INTERNAL_EMAIL` | Team email for lead alert notifications |

### Regular Maintenance Schedule

| Frequency | Task |
|---|---|
| Weekly | Check `webhook_logs` for failed deliveries; retry or investigate |
| Monthly | Review Google Analytics for top-performing pages and drop-off points |
| Quarterly | Publish 1-2 new blog posts; review FAQ for new common questions |
| Seasonally | Update pricing in `pricing.ts` to reflect current market rates |
| Annually | Audit all 39 city pages for accuracy; add new cities if territory expands |
| As needed | Rotate API keys (Resend, Supabase) if any key is exposed |

---

## 8. OpenClaw CRM — Lead Prompts & Automation

### Webhook Integration

Every form submission fires a webhook to OpenClaw with a structured JSON payload (see Section 2). OpenClaw receives the lead and can trigger automation sequences immediately.

**Key webhook fields for personalization:**
- `{{name}}` — customer first name
- `{{service}}` — requested service (e.g., "AC Repair")
- `{{city}}` — customer's city
- `{{estimate_low}}` / `{{estimate_high}}` — price range from wizard
- `{{type}}` — `estimate`, `contact`, or `checklist`

---

### Automation Sequence: Estimate Lead

Use the following prompts in an OpenClaw sequence triggered by `type = estimate`.

**Step 1 — Immediate SMS (0–5 minutes)**
```
Hi {{name}}, thanks for requesting a free estimate from Go Pro Heating & Cooling!
We received your request for {{service}} in {{city}}.
Our team will call you within 1 hour.
Need help right now? Call 973-938-2217.
```

**Step 2 — Follow-Up SMS (4 hours later)**
```
Hi {{name}} — just following up! We'd love to help with your {{service}} in {{city}}.
Tap here to schedule your free on-site estimate: [estimate link]
Or call us anytime: 973-938-2217.
```

**Step 3 — Email: Day 2**

*Subject:* Your HVAC estimate for {{city}} — next steps

```
Hi {{name}},

We noticed you requested an estimate for {{service}} — we're ready to help!

Your estimated range: ${{estimate_low}}–${{estimate_high}}
That's a starting point. A quick on-site visit (always free) locks in the exact number.

Go Pro Heating & Cooling serves {{city}} with same-day appointments.
Call 973-938-2217 or reply to this email to get on our schedule.

— The Go Pro Team
23 Major Street, Clifton, NJ | License #19HC00212300
```

**Step 4 — SMS: Day 5 (Social Proof)**
```
Hey {{name}}, still thinking it over? Totally understand.
Here's what a {{city}} neighbor said about us:
"Showed up same day, fixed our AC in 2 hours. Highly recommend!" — Mike R.
Ready when you are: 973-938-2217
```

**Step 5 — Email: Day 10 (Re-Engagement + Financing)**

*Subject:* Did you know we offer 0% financing?

```
Hi {{name}},

Just wanted to make sure you saw this — Go Pro Heating & Cooling offers
0% financing options on HVAC installations and replacements.

Your {{service}} in {{city}} might be more affordable than you think.

Call 973-938-2217 today for a free on-site consultation.
No pressure, no obligation.

— The Go Pro Team
```

**Step 6 — Final SMS: Day 14 (Soft Close)**
```
Hi {{name}}, last check-in from Go Pro Heating & Cooling.
If you're still in need of {{service}} in {{city}}, we're here.
Call 973-938-2217 — we'll get you taken care of fast.
```

---

### Automation Sequence: Contact Form Lead

Use the following prompts in a sequence triggered by `type = contact`.

**Step 1 — Immediate SMS**
```
Hi {{name}}, we got your message at Go Pro Heating & Cooling.
Someone from our team will call you within 1 business hour.
Can't wait? Call us directly: 973-938-2217.
```

**Step 2 — Email: Same Day**

*Subject:* We received your HVAC inquiry — here's what's next

```
Hi {{name}},

Thanks for reaching out to Go Pro Heating & Cooling!

We serve {{city}} and all of Northern NJ. A team member will be in touch shortly.

In the meantime, you can get an instant price estimate at:
[estimate link]

Or call us anytime: 973-938-2217.

— The Go Pro Team
```

---

### Automation Sequence: Checklist Download Lead

Use the following prompts triggered by `type = checklist`.

**Step 1 — Immediate Email**

*Subject:* Your Free HVAC Maintenance Checklist

```
Hi {{name}},

Your free HVAC Maintenance Checklist is attached!

Use it to stay ahead of breakdowns and keep your system running efficiently
all year round.

As a thank-you, we're offering {{city}} homeowners $20 off their next tune-up.
Just mention this email when you call: 973-938-2217.

Stay comfortable,
The Go Pro Heating & Cooling Team
```

**Step 2 — SMS: Day 3**
```
Hi {{name}}, hoping the HVAC checklist was helpful!
When you're ready for a professional tune-up in {{city}}, we've got you.
$20 off for checklist subscribers: 973-938-2217.
```

**Step 3 — Email: Day 7 (Education → CTA)**

*Subject:* The #1 mistake NJ homeowners make with their HVAC

```
Hi {{name}},

The #1 mistake? Skipping the annual tune-up.

A $99 tune-up from Go Pro can prevent a $2,000+ emergency repair.
We serve {{city}} with same-day scheduling.

Book your tune-up: 973-938-2217
Or get a free estimate online: [estimate link]

— The Go Pro Team
```

---

### Emergency Service Prompt (Any Lead Type)

Add a conditional step in any sequence when `emergency = true`:

**Immediate SMS**
```
⚠️ HVAC Emergency in {{city}}?
Go Pro Heating & Cooling has 24/7 emergency HVAC service.
Call NOW: 973-938-2217
We're in Northern NJ and can dispatch fast.
```

---

### OpenClaw Tagging Recommendations

Apply these tags automatically based on webhook data to segment leads:

| Tag | Condition |
|---|---|
| `estimate-lead` | `type = estimate` |
| `contact-lead` | `type = contact` |
| `checklist-lead` | `type = checklist` |
| `emergency` | `emergency = true` |
| `high-value` | `service` contains "Installation" or "Commercial" |
| `tune-up` | `service` contains "Tune-Up" |
| `county-passaic` | `city` in Passaic County list |
| `county-bergen` | `city` in Bergen County list |

Tags allow county-specific follow-up, priority routing for high-value jobs, and separate nurture tracks for emergency vs. routine leads.

---

*Last updated: April 2026 | Go Pro Heating & Cooling | Clifton, NJ | 973-938-2217*
