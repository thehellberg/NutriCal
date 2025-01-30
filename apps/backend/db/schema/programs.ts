import { relations } from 'drizzle-orm'
import {
  integer,
  numeric,
  pgEnum,
  pgTableCreator,
  serial,
  text,
  timestamp,
  UpdateDeleteAction,
  varchar,
  boolean
} from 'drizzle-orm/pg-core'

import { users } from './user'

import type { InferSelectModel } from 'drizzle-orm'
/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = pgTableCreator((name) => `nutrical_${name}`)

export function enumToPgEnum<T extends Record<string, string | number>>(
  myEnum: T
): [T[keyof T], ...T[keyof T][]] {
  return Object.values(myEnum).map((value: string | number) => `${value}`) as [
    T[keyof T],
    ...T[keyof T][]
  ]
}

export enum Meal {
  BREAKFAST = 'breakfast',
  LUNCH = 'lunch',
  DINNER = 'dinner',
  SNACK = 'snack',
  FUNCTIONAL_FOOD = 'functional_food'
}

export const mealEnum = pgEnum('meal', enumToPgEnum(Meal))

const defaultForiegnKeyAction: {
  onUpdate: UpdateDeleteAction
  onDelete: UpdateDeleteAction
} = {
  onUpdate: 'set null',
  onDelete: 'set null'
}
export const programTemplates = createTable('program_template', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  featuredImageUrl: varchar('featured_image_url', { length: 255 }),
  cardImageUrl: varchar('card_image_url', { length: 255 }),
  detailImageUrl: varchar('detail_image_url', { length: 255 }),
  shortDescription: varchar('short_description', { length: 255 }),
  startColor: varchar('start_color', { length: 7 }),
  endColor: varchar('end_color', { length: 7 }),
  contentColor: varchar('content_color', { length: 7 }),
  accentColor: varchar('accent_color', { length: 7 }),
  isFeatured: boolean('is_featured').default(false),
  warningText: text('warning_text'),
  description: text('description'),
  durationInDays: integer('duration_in_days').notNull(),
  instructions: text('instructions'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull()
})
export type ProgramTemplate = InferSelectModel<typeof programTemplates>
export const programTemplateRelations = relations(
  programTemplates,
  ({ many }) => ({
    programTemplateRecipes: many(programTemplateRecipes),
    programs: many(programs),
    programTemplateTags: many(programTemplateTags)
  })
)

// Pivot table for many-to-many (program template <-> recipe)
export const programTemplateRecipes = createTable('program_template_recipe', {
  id: serial('id').primaryKey(),
  programTemplateId: integer('program_template_id').references(
    () => programTemplates.id,
    defaultForiegnKeyAction
  ),
  dayIndex: integer('day_index').notNull(),
  mealName: mealEnum(),
  recipeId: integer('recipe_id').references(
    () => recipes.id,
    defaultForiegnKeyAction
  ),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull()
})
export const programTemplateRecipesRelations = relations(
  programTemplateRecipes,
  ({ one }) => ({
    programTemplate: one(programTemplates, {
      fields: [programTemplateRecipes.programTemplateId],
      references: [programTemplates.id]
    }),
    recipe: one(recipes, {
      fields: [programTemplateRecipes.recipeId],
      references: [recipes.id]
    })
  })
)

export const programs = createTable('program', {
  id: serial('id').primaryKey(),
  programTemplateId: integer('program_template_id').references(
    () => programTemplates.id,
    defaultForiegnKeyAction
  ),
  userId: varchar('user_id', { length: 255 }).references(
    () => users.id,
    defaultForiegnKeyAction
  ),
  name: varchar('name', { length: 255 }).notNull(),
  instructions: text('instructions'),
  isSelected: boolean('is_selected').default(true),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  startDate: timestamp('start_date', {
    mode: 'date',
    withTimezone: true
  }).notNull(),
  endDate: timestamp('end_date', { mode: 'date', withTimezone: true })
})
export type Program = InferSelectModel<typeof programs>
export const programsRelations = relations(programs, ({ one, many }) => ({
  programTemplate: one(programTemplates, {
    fields: [programs.programTemplateId],
    references: [programTemplates.id]
  }),
  user: one(users, { fields: [programs.userId], references: [users.id] }),
  programTags: many(programTags),
  programRecipes: many(programRecipes)
}))

// Pivot table for many-to-many (program <-> recipe)
export const programRecipes = createTable('program_recipe', {
  id: serial('id').primaryKey(),
  programId: integer('program_id').references(
    () => programs.id,
    defaultForiegnKeyAction
  ),
  dayIndex: integer('day_index').notNull(),
  mealName: mealEnum(),
  recipeId: integer('recipe_id').references(
    () => recipes.id,
    defaultForiegnKeyAction
  ),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull()
})
export const programRecipesRelations = relations(programRecipes, ({ one }) => ({
  program: one(programs, {
    fields: [programRecipes.programId],
    references: [programs.id]
  }),
  recipe: one(recipes, {
    fields: [programRecipes.recipeId],
    references: [recipes.id]
  })
}))

export const recipes = createTable('recipe', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  notes: text('notes'),
  backgroundImageUrl: varchar('background_image_url', { length: 255 }),
  photoUrl: varchar('photo_url', { length: 255 }),
  cookingTime: integer('cooking_time'),
  servings: integer('servings'),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull()
})
export type Recipes = InferSelectModel<typeof recipes>
export const recipesRelations = relations(recipes, ({ many }) => ({
  programTemplateRecipes: many(programTemplateRecipes),
  programRecipes: many(programRecipes),
  recipeTags: many(recipeTags),
  recipeComponentRecipes: many(recipeComponentRecipes),
  recipeSteps: many(recipeSteps),
  recipeIngredients: many(recipeIngredients)
}))

// For recipe tags & program tags
export const tags = createTable('tag', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull()
})
export const tagsRelations = relations(tags, ({ many }) => ({
  programTags: many(programTags),
  programTemplateTags: many(programTemplateTags),
  recipeTags: many(recipeTags)
}))

export const programTemplateTags = createTable('program_template_tag', {
  programTemplateId: integer('program_template_id')
    .references(() => programTemplates.id, defaultForiegnKeyAction)
    .notNull(),
  tagId: integer('tag_id')
    .references(() => tags.id, defaultForiegnKeyAction)
    .notNull()
})
export const programTemplateTagsRelations = relations(
  programTemplateTags,
  ({ one }) => ({
    programTemplate: one(programTemplates, {
      fields: [programTemplateTags.programTemplateId],
      references: [programTemplates.id]
    }),
    tag: one(tags, {
      fields: [programTemplateTags.tagId],
      references: [tags.id]
    })
  })
)

export const programTags = createTable('program_tag', {
  programId: integer('program_id')
    .references(() => programs.id, defaultForiegnKeyAction)
    .notNull(),
  tagId: integer('tag_id')
    .references(() => tags.id, defaultForiegnKeyAction)
    .notNull()
})
export const programTagsRelations = relations(programTags, ({ one }) => ({
  program: one(programs, {
    fields: [programTags.programId],
    references: [programs.id]
  }),
  tag: one(tags, {
    fields: [programTags.tagId],
    references: [tags.id]
  })
}))

export const recipeTags = createTable('recipe_tag', {
  recipeId: integer('recipe_id')
    .references(() => recipes.id, defaultForiegnKeyAction)
    .notNull(),
  tagId: integer('tag_id')
    .references(() => tags.id, defaultForiegnKeyAction)
    .notNull()
})
export const recipeTagsRelations = relations(recipeTags, ({ one }) => ({
  recipe: one(recipes, {
    fields: [recipeTags.recipeId],
    references: [recipes.id]
  }),
  tag: one(tags, {
    fields: [recipeTags.tagId],
    references: [tags.id]
  })
}))

// Components for each recipe (w/ ratings for macro/micro/fiber/cholesterol)
export const recipeComponents = createTable('recipe_component', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  calories: numeric('calories', { precision: 6, scale: 2 }),
  carbohydrates: numeric('carbohydrates', { precision: 6, scale: 2 }),
  simpleSugars: numeric('simple_sugars', { precision: 6, scale: 2 }),
  fiber: numeric('fiber', { precision: 6, scale: 2 }),
  fats: numeric('fats', { precision: 6, scale: 2 }),
  proteins: numeric('proteins', { precision: 6, scale: 2 }),
  potassium: numeric('potassium', { precision: 6, scale: 2 }),
  sodium: numeric('sodium', { precision: 6, scale: 2 }),
  saturatedFats: numeric('saturated_fats', { precision: 6, scale: 2 }),
  unsaturatedFats: numeric('unsaturated_fats', { precision: 6, scale: 2 }),
  cholesterol: numeric('cholesterol', { precision: 6, scale: 2 }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull()
})
export const recipeComponentsRelations = relations(
  recipeComponents,
  ({ many }) => ({
    recipeComponentSources: many(recipeComponentSources),
    recipeComponentRecipes: many(recipeComponentRecipes)
  })
)

// Pivot table for many-to-many (recipe components <-> recipe)
export const recipeComponentRecipes = createTable('recipe_component_recipe', {
  id: serial('id').primaryKey(),
  recipeComponentId: integer('recipe_component_id')
    .references(() => recipeComponents.id, defaultForiegnKeyAction)
    .notNull(),
  recipeId: integer('recipe_id').references(
    () => recipes.id,
    defaultForiegnKeyAction
  ),
  weightInGrams: numeric('weight_in_grams', { precision: 6, scale: 1 }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull()
})
export const recipeComponentRecipesRelations = relations(
  recipeComponentRecipes,
  ({ one }) => ({
    recipeComponent: one(recipeComponents, {
      fields: [recipeComponentRecipes.recipeComponentId],
      references: [recipeComponents.id]
    }),
    recipe: one(recipes, {
      fields: [recipeComponentRecipes.recipeId],
      references: [recipes.id]
    })
  })
)

export const recipeSteps = createTable('recipe_step', {
  id: serial('id').primaryKey(),
  recipeId: integer('recipe_id')
    .references(() => recipes.id, defaultForiegnKeyAction)
    .notNull(),
  stepText: text('step_text').notNull(),
  stepOrder: integer('step_order').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull()
})
export const recipeStepsRelations = relations(recipeSteps, ({ one }) => ({
  recipe: one(recipes, {
    fields: [recipeSteps.recipeId],
    references: [recipes.id]
  })
}))

export const recipeIngredients = createTable('recipe_ingredient', {
  id: serial('id').primaryKey(),
  recipeId: integer('recipe_id')
    .references(() => recipes.id, defaultForiegnKeyAction)
    .notNull(),
  ingredientText: text('ingredient_text').notNull(),
  ingredientOrder: integer('ingredient_order').notNull(),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull()
})
export const recipeIngredientsRelations = relations(
  recipeIngredients,
  ({ one }) => ({
    recipe: one(recipes, {
      fields: [recipeIngredients.recipeId],
      references: [recipes.id]
    })
  })
)

export const sources = createTable('source', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  logoImageUrl: varchar('logo_image_url', { length: 255 }),
  websiteUrl: varchar('website_url', { length: 255 }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull()
})
export const sourcesRelations = relations(sources, ({ many }) => ({
  recipeComponentSources: many(recipeComponentSources)
}))

// Pivot table for many-to-many (recipe components <-> sources)
export const recipeComponentSources = createTable('recipe_component_source', {
  id: serial('id').primaryKey(),
  recipeComponentId: integer('recipe_component_id')
    .references(() => recipeComponents.id, defaultForiegnKeyAction)
    .notNull(),
  sourceId: integer('source_id').references(
    () => sources.id,
    defaultForiegnKeyAction
  ),
  sourceReferenceNumber: varchar('source_reference_number', {
    length: 50
  }),
  createdAt: timestamp('created_at', { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updated_at', { withTimezone: true })
    .defaultNow()
    .notNull()
})
export const recipeComponentSourcesRelations = relations(
  recipeComponentSources,
  ({ one }) => ({
    recipeComponent: one(recipeComponents, {
      fields: [recipeComponentSources.recipeComponentId],
      references: [recipeComponents.id]
    }),
    source: one(sources, {
      fields: [recipeComponentSources.sourceId],
      references: [sources.id]
    })
  })
)
