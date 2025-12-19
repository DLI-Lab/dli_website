import {defineType, defineField} from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO Settings',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Title used for search engines and browser tabs. (Recommended: under 60 characters)',
      validation: (Rule) => Rule.max(60).warning('Longer titles may be truncated by search engines'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Description for search engines. (Recommended: under 160 characters)',
      validation: (Rule) => Rule.max(160).warning('Longer descriptions may be truncated by search engines'),
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'text',
      rows: 3,
      description: 'Separate keywords with commas (e.g. AI, LLM, Data Science).',
    }),
    defineField({
      name: 'openGraphImage',
      title: 'Open Graph Image',
      type: 'image',
      description: 'Image for social media sharing (Facebook, Twitter, etc.). Recommended size: 1200x630.',
      options: {
        hotspot: true,
      },
    }),
  ],
})
