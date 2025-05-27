export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    { name: 'title', type: 'string', title: 'Title' },
    {
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: { source: 'title', maxLength: 96 }
    },
    { name: 'sku', type: 'string', title: 'Base SKU' },
    { name: 'price', type: 'number', title: 'Base Price' },
    { name: 'inventory', type: 'number', title: 'Total Inventory' },
    { name: 'onSale', type: 'boolean', title: 'On Sale' },
    { name: 'salePrice', type: 'number', title: 'Sale Price' },
    {
      name: 'images',
      type: 'array',
      title: 'Images',
      of: [{ type: 'image' }]
    },
    {
      name: 'description',
      type: 'text',
      title: 'Description'
    },
    {
      name: 'preorderEnabled',
      type: 'boolean',
      title: 'Enable Pre-order'
    },
    {
      name: 'preorderMessage',
      type: 'string',
      title: 'Pre-order Message'
    },
    {
      name: 'productInfoSections',
      title: 'Additional Info Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Section Title' },
            { name: 'content', type: 'text', title: 'Content' }
          ]
        }
      ]
    },
    {
      name: 'brand',
      type: 'string',
      title: 'Brand'
    },
    {
      name: 'categories',
      type: 'array',
      title: 'Categories',
      of: [{ type: 'string' }]
    },
    {
      name: 'productOptions',
      title: 'Product Options',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', type: 'string', title: 'Option Name (e.g. Size, Color)' },
            {
              name: 'displayAs',
              type: 'string',
              title: 'Display As',
              initialValue: 'list',
              validation: Rule => Rule.required(),
              options: {
                list: [
                  { title: 'List', value: 'list' },
                  { title: 'Color', value: 'color' }
                ],
                layout: 'radio'
              }
            },
            {
              name: 'values',
              title: 'Choices',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'label', type: 'string', title: 'Label' },
                    // @ts-ignore: displayAs is runtime-resolved
                    {
                      name: 'color',
                      type: 'color',
                      title: 'Swatch Color',
                      hidden: ({ parent, document }) => {
                        const option = document?.productOptions?.find(opt => opt.values?.some(v => v._key === parent._key))
                        return option?.displayAs !== 'color'
                      }
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    },
    {
      name: 'manageVariants',
      title: 'Manage Variants by Option Combinations',
      type: 'boolean'
    },
    {
      name: 'variants',
      title: 'Variants',
      type: 'array',
      hidden: ({ parent }) => !parent?.manageVariants,
      of: [
        {
          type: 'object',
          fields: [
            { name: 'option', type: 'string', title: 'Option (e.g., Small / Mist Blue)' },
            { name: 'sku', type: 'string', title: 'Variant SKU' },
            { name: 'price', type: 'number', title: 'Variant Price' },
            { name: 'inventory', type: 'number', title: 'Variant Inventory' },
            { name: 'weight', type: 'number', title: 'Shipping Weight (lb)' }
          ]
        }
      ]
    }
  ]
}