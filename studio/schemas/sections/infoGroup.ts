import infoItem from './infoItem'

export default {
  name: 'infoGroup',
  type: 'object',
  title: 'Info Group',
  fields: [
    {
      name: 'items',
      type: 'array',
      title: 'Items',
      of: [{ type: 'infoItem' }],
    },
  ],
}