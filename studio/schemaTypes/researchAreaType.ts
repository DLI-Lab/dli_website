import {defineField, defineType} from 'sanity'

export const researchAreaType = defineType({
  name: 'researchArea',
  title: 'Research Area',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'tasks',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'order',
      type: 'number',
    }),
  ],
})

