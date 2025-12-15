import {defineField, defineType} from 'sanity'
import {GalleryImagesArrayInput, GalleryVideosArrayInput} from '../components/GalleryArrayInput'

export const galleryType = defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'date',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tag',
      type: 'string',
    }),
    defineField({
      name: 'info',
      type: 'text',
    }),
    defineField({
      name: 'location',
      type: 'string',
    }),
    defineField({
      name: 'images',
      type: 'array',
      of: [{type: 'image', options: {hotspot: true}}],
      options: {
        layout: 'grid',
        sortable: true,
      },
      components: {
        input: GalleryImagesArrayInput,
      },
    }),
    defineField({
      name: 'videos',
      type: 'array',
      of: [
        {
          type: 'file',
          options: {
            accept: 'video/*',
          },
        },
      ],
      options: {
        sortable: false,
      },
      components: {
        input: GalleryVideosArrayInput,
      },
    }),
  ],
})
