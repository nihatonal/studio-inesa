import { DocumentTextIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const blogType = defineType({
  name: "blog",
  title: "Blog",
  type: "document",
  icon: DocumentTextIcon,
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "description",
      title: "Short Description",
      type: "text",
      description: "Meta description for SEO, max 170 characters",
      validation: (Rule) =>
        Rule.max(170).warning("Description should be under 170 characters"),
    }),
    defineField({
      name: "mainImage",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "blogcategories",
      type: "array",
      of: [
        defineArrayMember({ type: "reference", to: { type: "blogcategory" } }),
      ],
      validation: (Rule) =>
        Rule.required().min(1).error("At least one category is required"),
    }),
    defineField({
      name: "publishedAt",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isLatest",
      title: "Latest Blog",
      type: "boolean",
      description: "Toggle to Latest on or off",
      initialValue: true,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "readingTime",
      title: "Reading Time (minutes)",
      type: "number",
      description: "Estimated reading time in minutes",
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: "viewCount",
      title: "Görüntülenme Sayısı",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "body",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "mainImage",
      isLatest: "isLatest",
      category0: "blogcategories.0.title",
      category1: "blogcategories.1.title",
      readingTime: "readingTime",
      viewCount: "viewCount",
      body: "body",
    },
    prepare({ title, media, category0, category1, readingTime, viewCount }) {
      const categoryNames =
        [category0, category1].filter(Boolean).join(", ") || "No category";

      return {
        title,
        media,
        subtitle: `${categoryNames} | ${readingTime} dk | ${viewCount} okundu`,
      };
    },
  },
});
