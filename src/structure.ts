import type {StructureResolver} from 'sanity/structure'

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Settings')
        .child(S.document().schemaType('settings').documentId('settings').title('Global Settings')),

      S.divider(),
      S.listItem()
        .title('Records')
        .child(
          S.documentTypeList('record')
            .title('Records')
            .defaultOrdering([{field: 'order', direction: 'asc'}]),
        ),
      S.listItem()
        .title('Live Events')
        .child(
          S.documentTypeList('liveEvent')
            .title('Live Events')
            .defaultOrdering([{field: 'date', direction: 'asc'}]),
        ),
      S.listItem()
        .title('Orders')
        .schemaType('order')
        .child(
          S.documentTypeList('order')
            .title('All orders')
            .defaultOrdering([{field: 'createdAt', direction: 'desc'}]),
        ),
      S.listItem()
        .title('Music')
        .schemaType('music')
        .child(
          S.documentTypeList('music')
            .title('All music')
            .defaultOrdering([{field: 'title', direction: 'asc'}]),
        ),
    ])
