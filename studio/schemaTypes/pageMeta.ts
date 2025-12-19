import {defineType, defineField} from 'sanity'

export const pageMeta = defineType({
  name: 'pageMeta',
  title: 'Page SEO',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Page Name',
      type: 'string',
      description: 'Friendly name for this page configuration (e.g. Home, Team, Research).',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'path',
      title: 'Page Path or URL',
      type: 'string',
      description: 'The URL path (e.g. /team) or full URL. Used to match the page.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'path',
    },
  },
})
