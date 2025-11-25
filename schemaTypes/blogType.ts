import {DocumentTextIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const blogType = defineType({
  name: 'blog',
  title: 'Blog',
  type: 'document',
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      options: {source: 'title'},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lang',
      title: 'Language',
      type: 'string',
      options: {
        list: [
          {title: 'English', value: 'en'},
          {title: 'Russian', value: 'ru'},
          {title: 'Turkish', value: 'tr'},
        ],
        layout: 'radio', // istersen "dropdown" da olur
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt (SEO)',
      type: 'text',
      description: 'Short SEO description for article. Max 170 chars.',
      validation: (Rule: any) => Rule.max(170).warning('Excerpt should be under 170 characters'),
    }),
    defineField({
      name: 'image',
      type: 'image',
      title: 'Main Image',
      options: {hotspot: true},
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text (SEO)',
          validation: (Rule: any) => Rule.required(),
        },
      ],
      validation: (Rule: any) => Rule.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Blog Categories',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'blogcategory'}],
        }),
      ],
      validation: (Rule) =>
        Rule.required().min(1).max(2).error('You can select between 1 and 2 categories.'),
    }),
    // DESTINATION → Tek seçim (SEO için en iyisi)
    defineField({
      name: 'destination',
      title: 'Destination',
      type: 'reference',
      to: [{type: 'blogdestination'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      type: 'object',
      fields: [
        {
          name: 'name',
          type: 'string',
          validation: (Rule: any) => Rule.required(),
        },
      ],
    }),
    defineField({
      name: 'isLatest',
      title: 'Latest Blog',
      type: 'boolean',
      description: 'Toggle to Latest on or off',
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'readingTime',
      title: 'Reading Time (minutes)',
      type: 'number',
      description: 'Estimated reading time in minutes',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'views',
      title: 'View Count',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
      description: 'If disabled, this blog post will not appear on the website.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      category0: 'categories.0.title',
      category1: 'categories.1.title',
      destination: 'destination.title',
      readingTime: 'readingTime',
      views: 'views',
    },
    prepare(selection) {
      const {title, media, category0, category1, destination, views} = selection

      const categoryList = [category0, category1].filter(Boolean).join(', ') || 'No category'

      return {
        title,
        media,
        subtitle: `${destination} • ${categoryList} • ${views ?? 0} views`,
      }
    },
  },
})
