// studio/schemas/sections/imageSection.ts
export default {
  name: 'imageSection',
  type: 'object',
  title: 'Image Section',
  fields: [
    {
      name: 'image',
      type: 'image',
      title: 'Image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'altText',
      type: 'string',
      title: 'Alternative Text',
      description: 'Important for SEO and accessibility',
    },
    {
      name: 'caption',
      type: 'string',
      title: 'Caption',
    },
    {
      name: 'fullWidth',
      type: 'boolean',
      title: 'Full Width Image',
      initialValue: false,
    }
  ]
}
