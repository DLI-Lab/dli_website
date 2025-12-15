import {defineField, defineType} from 'sanity'

export const newsType = defineType({
  name: 'news',
  title: 'News',
  type: 'document',
  fields: [
    defineField({
      name: 'date',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      type: 'string',
      options: {
        list: [
          {title: 'Academic', value: 'academic'},
          {title: 'News', value: 'news'},
          {title: 'Award', value: 'award'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'link',
      type: 'url',
    }),
    defineField({
      name: 'paperTitle',
      type: 'string',
    }),
    defineField({
      name: 'authors',
      type: 'string',
    }),
    defineField({
      name: 'venue',
      type: 'string',
    }),
    defineField({
      name: 'note',
      type: 'string',
    }),
    defineField({
      name: 'paperUrl',
      type: 'url',
    }),
    defineField({
      name: 'codeUrl',
      type: 'url',
    }),
    defineField({
      name: 'datasetUrl',
      type: 'url',
    }),
    defineField({
      name: 'papers',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'title',
              type: 'string',
            }),
            defineField({
              name: 'authors',
              type: 'string',
            }),
            defineField({
              name: 'venue',
              type: 'string',
            }),
            defineField({
              name: 'note',
              type: 'string',
            }),
            defineField({
              name: 'paperUrl',
              type: 'url',
            }),
            defineField({
              name: 'codeUrl',
              type: 'url',
            }),
            defineField({
              name: 'datasetUrl',
              type: 'url',
            }),
          ],
        },
      ],
    }),
  ],
})
