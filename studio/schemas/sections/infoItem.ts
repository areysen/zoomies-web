// schemas/sections/infoItem.ts
export default {
  name: 'infoItem',
  type: 'object',
  title: 'Info Item',
  fields: [
    { name: 'number', type: 'string', title: 'Number (e.g. 1)' },
    { name: 'title', type: 'string', title: 'Title' },
    { name: 'body', type: 'array', title: 'Text', of: [{ type: 'block' }] },
  ],
}