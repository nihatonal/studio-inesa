import {PinFilledIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export const recommendedType = defineType({
  name: 'recommended',
  title: 'Popular Package',
  type: 'document',
  icon: PinFilledIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
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
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Main location of the trek',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'recommendedLocations',
      title: 'Recommended Locations',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      description: 'Other recommended locations to visit nearby',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price per person (numeric value, e.g., 600.00)',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'days',
      title: 'Duration (days)',
      type: 'number',
      description: 'Number of days for the trek',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'img',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'published',
      title: 'Published',
      type: 'boolean',
      initialValue: false, // varsayılan olarak kapalı olsun
      description: 'Bu içeriğin yayında olup olmadığını kontrol eder.',
    }),
    // defineField({
    //   name: 'difficulty',
    //   title: 'Difficulty',
    //   type: 'string',
    //   options: {
    //     list: [
    //       {title: 'Easy', value: 'easy'},
    //       {title: 'Moderate', value: 'moderate'},
    //       {title: 'Hard', value: 'hard'},
    //     ],
    //   },
    //   description: 'Difficulty level of the trek',
    // }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'img',
      location: 'location',
      price: 'price',
      days: 'days',
    },
    prepare({title, media, location, price, days}) {
      return {
        title,
        media,
        subtitle: `${location} | ${days} days | $${price.toFixed(2)}`,
      }
    },
  },
})
