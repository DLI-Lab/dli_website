import {defineField, defineType} from 'sanity'

export const publicationType = defineType({
  name: 'publication',
  title: 'Publication',
  type: 'document',
  fields: [
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: '같은 연도 내 정렬 순서 (낮을수록 먼저 표시)',
    }),
    defineField({
      name: 'year',
      type: 'number',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'venue',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'authors',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tags',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'image',
      type: 'image',
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
      name: 'highlight',
      type: 'string',
    }),
    defineField({
      name: 'presentationType',
      type: 'string',
    }),
  ],
})

