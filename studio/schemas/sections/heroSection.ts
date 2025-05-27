import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'heroSection',
  title: 'Hero Section',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'ctaText',
      title: 'Call to Action Text',
      type: 'string',
    }),
    defineField({
      name: 'ctaLink',
      title: 'Call to Action Link',
      type: 'url',
    }),
    defineField({
      name: 'textPosition',
      title: 'Text Position',
      type: 'string',
      options: {
        list: [
          { title: 'Top Left', value: 'top-left' },
          { title: 'Center', value: 'center' },
          { title: 'Bottom Right', value: 'bottom-right' }
        ],
        layout: 'radio'
      },
      initialValue: 'center'
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'backgroundImage',
    },
  },
})