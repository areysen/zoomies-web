const richText = {
  name: 'richText',
  title: 'Rich Text',
  type: 'object',
  fields: [
    {
      name: 'content',
      title: 'Content',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
  preview: {
    select: {
      title: 'content',
    },
    prepare(selection: any) {
      const block = (selection.title || []).find((blk: any) => blk._type === 'block');
      return {
        title: block
          ? block.children?.map((child: any) => child.text).join('')?.slice(0, 50)
          : 'Rich Text',
      };
    },
  },
};

export default richText;