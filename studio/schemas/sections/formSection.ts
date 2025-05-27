const formSection = {
  name: 'formSection',
  title: 'Form Section',
  type: 'object',
  fields: [
    {
      name: 'heading',
      title: 'Heading',
      type: 'string',
    },
    {
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
    },
    {
      name: 'formEmbed',
      title: 'Form Embed',
      type: 'string',
      description: 'Enter the embed code or identifier for the form.',
    },
    {
      name: 'alignment',
      title: 'Text Alignment',
      type: 'string',
      options: {
        list: ['left', 'center', 'right'],
        layout: 'radio',
      },
      initialValue: 'center',
    },
    {
      name: 'fields',
      title: 'Form Fields',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', type: 'string', title: 'Label' },
            { name: 'name', type: 'string', title: 'Field Name' },
            {
              name: 'type',
              type: 'string',
              title: 'Field Type',
              options: { list: ['text', 'email', 'textarea'] }
            },
            { name: 'required', type: 'boolean', title: 'Required' },
          ],
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'heading',
      subtitle: 'subheading',
    },
    prepare({ title, subtitle }) {
      return {
        title: title || 'Form Section',
        subtitle,
      }
    },
  },
}

export default formSection