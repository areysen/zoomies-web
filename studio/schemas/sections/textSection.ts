

export default {
  name: 'textSection',
  type: 'object',
  title: 'Text Section',
  fields: [
    {
      name: 'heading',
      type: 'string',
      title: 'Heading',
    },
    {
      name: 'subheading',
      type: 'string',
      title: 'Subheading',
    },
    {
      name: 'text',
      type: 'text',
      title: 'Text Content',
    },
    {
      name: 'alignment',
      type: 'string',
      title: 'Text Alignment',
      options: {
        list: [
          { title: 'Left', value: 'left' },
          { title: 'Center', value: 'center' },
          { title: 'Right', value: 'right' },
        ],
        layout: 'radio'
      }
    }
  ]
}