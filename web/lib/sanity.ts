// web/lib/sanity.ts
import { createClient } from '@sanity/client'

export const sanity = createClient({
  projectId: '09a82cp6',
  dataset: 'production',
  apiVersion: '2023-01-01',
  useCdn: true,
})