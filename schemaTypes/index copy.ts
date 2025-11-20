import { type SchemaTypeDefinition } from "sanity";
import { blockContentType } from "./blockContentType";
import { blogCategoryType } from "./blogCategoryType";
import { blogType } from "./blogType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blogCategoryType, blogType, blockContentType],
};
