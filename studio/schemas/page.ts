// studio/schemas/page.ts
export default {
  name: 'page',
  type: 'document',
  title: 'Pages',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Page Title',
    },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {
        source: 'title',
        slugify: input => {
          if (input?.toLowerCase() === 'home') return ''
          return input.toLowerCase().replace(/\s+/g, '-')
        },
        maxLength: 96,
      },
      validation: Rule =>
        Rule.custom((slug, context) => {
          const title = context.parent?.title
          const isHome = title?.toLowerCase() === 'home'
          const slugValue = slug?.current

          if (isHome && (!slugValue || slugValue === '')) return true
          if (!slugValue || typeof slugValue !== 'string' || slugValue.trim() === '') {
            return 'Slug is required'
          }
          return true
        }),
    },
    {
      name: 'sections',
      type: 'array',
      title: 'Page Content',
      of: [
        { type: 'heroSection' },
        { type: 'textSection' },
        { type: 'imageSection' },
        { type: 'formSection' },
        { type: 'richText' },
        { type: 'infoGroup' },
      ],
    }
  ]
}