// studio/schemas/theme.ts
export default {
  name: 'theme',
  type: 'document',
  title: 'Theme Settings',
  fields: [
    {
      name: 'logo',
      type: 'image',
      title: 'Logo',
      options: { hotspot: true }
    },
    {
      name: 'primaryColor',
      type: 'color',
      title: 'Primary Color',
      options: { disableAlpha: true }
    },
    {
      name: 'secondaryColor',
      type: 'color',
      title: 'Secondary Color',
      options: { disableAlpha: true }
    },
    {
      name: 'backgroundColor',
      type: 'object',
      title: 'Body Background Color',
      fields: [
        {
          name: 'mode',
          type: 'string',
          title: 'Color Mode',
          options: {
            list: [
              { title: 'Use Primary', value: 'primary' },
              { title: 'Use Secondary', value: 'secondary' },
              { title: 'Custom', value: 'custom' }
            ],
            layout: 'radio'
          }
        },
        {
          name: 'customColor',
          type: 'color',
          title: 'Custom Color',
          hidden: ({ parent }) => parent?.mode !== 'custom'
        }
      ]
    },
    {
      name: 'headerColor',
      type: 'object',
      title: 'Header Background Color',
      fields: [
        {
          name: 'mode',
          type: 'string',
          title: 'Color Mode',
          options: {
            list: [
              { title: 'Use Primary', value: 'primary' },
              { title: 'Use Secondary', value: 'secondary' },
              { title: 'Custom', value: 'custom' }
            ],
            layout: 'radio'
          }
        },
        {
          name: 'customColor',
          type: 'color',
          title: 'Custom Color',
          hidden: ({ parent }) => parent?.mode !== 'custom'
        }
      ]
    },
    {
      name: 'footerColor',
      type: 'object',
      title: 'Footer Background Color',
      fields: [
        {
          name: 'mode',
          type: 'string',
          title: 'Color Mode',
          options: {
            list: [
              { title: 'Use Primary', value: 'primary' },
              { title: 'Use Secondary', value: 'secondary' },
              { title: 'Custom', value: 'custom' }
            ],
            layout: 'radio'
          }
        },
        {
          name: 'customColor',
          type: 'color',
          title: 'Custom Color',
          hidden: ({ parent }) => parent?.mode !== 'custom'
        }
      ]
    },
    {
      name: 'footerText',
      type: 'array',
      title: 'Footer Text',
      description: 'You can use [year] to automatically insert the current year.',
      of: [{ type: 'block' }]
    },
    {
      name: 'heroImage',
      type: 'image',
      title: 'Homepage Hero Image',
      options: { hotspot: true }
    },
    {
      name: 'footerLinks',
      type: 'array',
      title: 'Footer Links',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Link Label' },
            {
              name: 'linkType',
              type: 'string',
              title: 'Link Type',
              options: {
                list: [
                  { title: 'Internal Page', value: 'internal' },
                  { title: 'External URL', value: 'external' }
                ],
                layout: 'radio'
              }
            },
            {
              name: 'internalPage',
              type: 'reference',
              title: 'Internal Page',
              to: [{ type: 'page' }],
              hidden: ({ parent }) => parent?.linkType !== 'internal'
            },
            {
              name: 'externalUrl',
              type: 'url',
              title: 'External URL',
              hidden: ({ parent }) => parent?.linkType !== 'external'
            }
          ],
          preview: {
            select: {
              title: 'label',
              type: 'linkType',
              url: 'externalUrl',
              page: 'internalPage.slug.current'
            },
            prepare({ title, type, url, page }) {
              const target = type === 'external' ? url : `/${page || ''}`
              return {
                title,
                subtitle: target
              }
            }
          }
        }
      ]
    },
    {
      name: 'socialLinks',
      type: 'array',
      title: 'Social Media Links',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'platform',
              type: 'string',
              title: 'Platform',
              options: {
                list: [
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'TikTok', value: 'tiktok' },
                  { title: 'Facebook', value: 'facebook' }
                ],
                layout: 'dropdown'
              }
            },
            { name: 'url', type: 'url', title: 'URL' }
          ]
        }
      ]
    }
  ]
}