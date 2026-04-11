import { localBusinessSchema } from '@/lib/schema'

export default function LocalBusinessSchema() {
  const schema = localBusinessSchema()
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
