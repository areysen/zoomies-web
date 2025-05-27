// studio/deskStructure.ts
import { StructureBuilder } from 'sanity/desk'

export default (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.documentTypeListItem('product').title('Products'),
      S.listItem()
        .title('Theme Settings')
        .child(
          S.editor()
            .schemaType('theme')
            .documentId('theme')
        ),
      S.listItem()
        .title('Pages')
        .schemaType('page')
        .child(S.documentTypeList('page')
          .title('Pages')),
    ])