import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './schemas'
import { colorInput } from '@sanity/color-input'
import deskStructure from './deskStructure'

export default defineConfig({
  name: 'default',
  title: 'Zoomies Studio',
  projectId: '09a82cp6',
  dataset: 'production',
  plugins: [deskTool({ structure: deskStructure }), colorInput()],
  schema: {
    types: schemaTypes,
  },
})