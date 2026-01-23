import {defineType, defineField} from 'sanity'
import {DocumentIcon} from '@sanity/icons'

export const record = defineType({
  name: 'record',
  title: 'Record',
  type: 'document',
  icon: DocumentIcon,
  fields: [
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      description: 'Album cover image',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'discImage',
      title: 'Disc Image',
      type: 'image',
      description: 'Disc photo used in animations',
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ogImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Open Graph image for social media sharing (recommended size: 1200x630)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Name of the album/song',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Unique link to the page',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'priceCHF',
      title: 'Price CHF',
      type: 'number',
      description: 'Price in Swiss Francs',
      validation: (rule) => rule.required().min(0),
    }),
    defineField({
      name: 'releaseDate',
      title: 'Release Date',
      type: 'date',
      description: 'Release date of the record',
      options: {
        dateFormat: 'DD.MM.YYYY',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{type: 'block'}],
      description: 'Rich text description with formatting support (bold, lists, links)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Used for sorting and display order',
      validation: (rule) => rule.required().integer().min(0),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'coverImage',
      order: 'order',
    },
    prepare({title, media, order}) {
      return {
        title: title || 'Untitled Record',
        subtitle: `Order: ${order ?? 'Not set'}`,
        media,
      }
    },
  },
  orderings: [
    {
      title: 'Order (Ascending)',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
    {
      title: 'Order (Descending)',
      name: 'orderDesc',
      by: [{field: 'order', direction: 'desc'}],
    },
    {
      title: 'Release Date (Newest)',
      name: 'releaseDateDesc',
      by: [{field: 'releaseDate', direction: 'desc'}],
    },
    {
      title: 'Release Date (Oldest)',
      name: 'releaseDateAsc',
      by: [{field: 'releaseDate', direction: 'asc'}],
    },
  ],
})
