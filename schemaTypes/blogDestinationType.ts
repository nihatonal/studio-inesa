import { EarthGlobeIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const blogDestinationType = defineType({
  name: "blogdestination",
  title: "Blog Destination",
  type: "document",
  icon: EarthGlobeIcon,
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
  ],
});
