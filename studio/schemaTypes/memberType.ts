import {defineField, defineType} from 'sanity'

export const memberType = defineType({
  name: 'member',
  title: 'Member',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'role',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      type: 'string',
      options: {
        list: [
          {title: 'Professor', value: 'professor'},
          {title: 'PhD', value: 'phd'},
          {title: 'MS/PhD', value: 'msPhd'},
          {title: 'Master', value: 'master'},
          {title: 'Undergrad', value: 'undergrad'},
          {title: 'Industry Researchers', value: 'industryResearchers'},
          {title: 'Collaborators', value: 'collaborators'},
          {title: 'Alumni', value: 'alumni'},
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'email',
      type: 'string',
    }),
    defineField({
      name: 'image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      type: 'text',
    }),
    defineField({
      name: 'github',
      type: 'string',
      title: 'GitHub',
    }),
    defineField({
      name: 'personalPage',
      type: 'string',
      title: 'Personal Page',
    }),
    defineField({
      name: 'linkedin',
      type: 'string',
      title: 'LinkedIn',
    }),
    defineField({
      name: 'weebly',
      type: 'string',
      title: 'Weebly',
    }),
    defineField({
      name: 'googleScholar',
      type: 'string',
      title: 'Google Scholar',
    }),
    defineField({
      name: 'order',
      type: 'number',
    }),
  ],
})

