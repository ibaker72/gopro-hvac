import { localBusinessSchema, organizationSchema } from '@/lib/schema'

export default function LocalBusinessSchema() {
  const business = localBusinessSchema()
  const org = organizationSchema()
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(org) }}
      />
    </>
  )
}
