import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'
import {AuthorReferenceInput} from '../components/AuthorReferenceInput'
import {BodyInput} from '../components/BodyInput'
import {PortableTextImagePreview} from '../components/PortableTextImagePreview'

export const blogType = defineType({
  name: 'blog',
  title: 'Blog',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: '제목은 영어로 작성해주세요.',
      validation: (rule) => rule.required().min(5),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      description:
        'URL 경로에 사용되는 고유 ID입니다. "Generate" 버튼을 눌러 제목을 기반으로 자동 생성할 수 있습니다.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: '카드/목록에 노출되는 짧은 요약 (최대 320자)',
      rows: 3,
      validation: (rule) => rule.max(320),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'hidden',
      title: 'Hide from website',
      type: 'boolean',
      description: '체크하면 웹사이트에서 이 글이 보이지 않습니다 (아카이브용)',
      initialValue: false,
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading time (e.g. "5 min read")',
      type: 'string',
    }),
    defineField({
      name: 'authorRef',
      title: 'Author (Team member)',
      type: 'reference',
      to: [{type: 'member'}],
      description: '팀 멤버를 선택하면 이름/사진을 자동으로 사용합니다.',
      components: {
        input: AuthorReferenceInput,
      },
    }),
    defineField({
      name: 'hideAuthorProfileImage',
      title: 'Hide Author Profile Image',
      type: 'boolean',
      description: '체크하면 글 상세/목록에서 저자의 프로필 사진을 표시하지 않습니다.',
      initialValue: false,
    }),
    defineField({
      name: 'authorAvatarOverride',
      title: 'Author Avatar (Override)',
      type: 'image',
      description: '팀 멤버 사진 대신 다른 이미지를 사용하고 싶을 때 업로드하세요.',
      options: {hotspot: true},
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero image',
      description: '상단 배너/대표 큰 이미지 (모달 및 상세 상단에 사용)',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'caption',
          title: 'Caption',
          type: 'string',
          description: '이미지 아래에 표시되는 짧은 설명/캡션',
          validation: (rule) => rule.max(120),
        }),
      ],
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      description: '카드/리스트에서 사용하는 작은 미리보기 이미지 (없으면 Hero 사용)',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'body',
      title: 'Body',
      description: '리치 텍스트(Portable Text)로 작성하세요. 이미지/코드/링크 지원.',
      type: 'array',
      components: {
        input: BodyInput,
      },
      of: [
        defineArrayMember({
          type: 'block',
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
              {title: 'Code', value: 'code'},
              {title: 'Underline', value: 'underline'},
              {title: 'Strike', value: 'strike-through'},
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'Heading 1', value: 'h1'},
            {title: 'Heading 2', value: 'h2'},
            {title: 'Heading 3', value: 'h3'},
            {title: 'Heading 4', value: 'h4'},
            {title: 'Quote', value: 'blockquote'},
          ],
        }),
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          components: {
            preview: PortableTextImagePreview,
          },
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
              description: '이미지 설명 (접근성용)',
              validation: (rule) => rule.max(120),
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
        }),
        defineArrayMember({
          type: 'code',
          options: {withFilename: true},
        }),
      ],
      validation: (rule) => rule.min(1).required(),
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'text',
      rows: 2,
      description: '콤마로 구분된 태그 목록을 입력하세요 (예: LLM, RAG, Agent).',
    }),
    defineField({
      name: 'seo',
      title: 'SEO Settings',
      type: 'seo',
      description:
        '검색/공유용 메타 정보를 수동으로 덮어쓰고 싶을 때만 사용하세요. 비워두면 제목/요약/태그로 자동 생성됩니다.',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'thumbnail',
      hidden: 'hidden',
    },
    prepare({title, subtitle, media, hidden}) {
      return {
        title: hidden ? `🔒 ${title}` : title,
        subtitle: hidden ? `[숨김] ${subtitle || ''}` : subtitle,
        media,
      }
    },
  },
})
