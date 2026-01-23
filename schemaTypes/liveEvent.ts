import {defineType, defineField} from 'sanity'
import {CalendarIcon} from '@sanity/icons'

export const liveEvent = defineType({
  name: 'liveEvent',
  title: 'Live Event',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'Event name, shown first in admin list',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'date',
      description: 'Event date',
      options: {
        dateFormat: 'DD.MM.YYYY',
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Free input for city + country (e.g., Zurich, Switzerland)',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ticketLink',
      title: 'Ticket Link',
      type: 'url',
      description: 'Custom link for ticket purchase button',
      validation: (rule) =>
        rule
          .required()
          .uri({
            scheme: ['http', 'https'],
          }),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      location: 'location',
    },
    prepare({title, date, location}) {
      const dateStr = date ? new Date(date).toLocaleDateString() : 'No date'
      return {
        title: title || 'Untitled Event',
        subtitle: `${dateStr} • ${location || 'No location'}`,
      }
    },
  },
  orderings: [
    {
      title: 'Date (Upcoming)',
      name: 'dateAsc',
      by: [{field: 'date', direction: 'asc'}],
    },
    {
      title: 'Date (Recent)',
      name: 'dateDesc',
      by: [{field: 'date', direction: 'desc'}],
    },
    {
      title: 'Title (A-Z)',
      name: 'titleAsc',
      by: [{field: 'title', direction: 'asc'}],
    },
  ],
})
