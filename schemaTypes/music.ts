import {defineType, defineField} from 'sanity'
import {PlayIcon} from '@sanity/icons'

export const music = defineType({
  name: 'music',
  title: 'Music Releases',
  type: 'document',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Release Cover',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'streamingLinks',
      title: 'Streaming Services',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'streamingService',
          fields: [
            defineField({
              name: 'service',
              title: 'Service Name',
              type: 'string',
              description: 'Example: Spotify, Apple Music, YouTube Music',
              options: {
                list: [
                  {title: 'Spotify', value: 'spotify'},
                  {title: 'Apple Music', value: 'apple-music'},
                  {title: 'YouTube Music', value: 'youtube-music'},
                  {title: 'SoundCloud', value: 'soundcloud'},
                  {title: 'Other', value: 'other'},
                ],
              },
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'service',
              subtitle: 'url',
            },
          },
        },
      ],
    }),
  ],
})
