import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";

const linkSchema = z.object({ url: z.string(), label: z.string() })

const party = defineCollection({
  loader: glob({ pattern: "*.md", base: "./content/party/" }),
  schema: z.object({
    key: z.string(),
    name: z.string(),
    pbsNumber: z.number().optional(),
    type: z.enum(["person", "organization"]),
    links: z.array(linkSchema).optional(),
  }),
});

const service = defineCollection({
  loader: glob({ pattern: "*.yaml", base: "./content/service/" }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    criticality: z.enum(["high", "medium", "low"]).optional(),
    strategy_reference: z.string(),
    product_owner: reference("party").optional(), 
    development: z.enum(["external", "internal"]).optional(),
    operations: z.enum(["external", "betriebsplattform"]).optional(),
    links: z.array(linkSchema).optional(),
    involved_parties: z.array(z.object({ party: z.string(), description: z.string() })).optional(),
    has_sla: z.boolean(),
    relations: z
      .array(
        z.object({
          service: z.string(),
          description: z.string(),
          relation_criticality: z.string(),
        }),
      )
      .optional(),
    last_updated: z.coerce.date(),
    lifecycle: z
      .array(
        z.object({
          state: z.enum(["idea", "planned", "in_progress", "in_production", "on_hold", "eol", "decommissioned"]),
          date: z.coerce.string(),
        }),
      )
      .optional(),
    tech_stack: z
      .array(
        z.object({
          stack_component: z.string(), // reference to "tech_stack"
        }),
      )
      .optional(),
    additional_information: z.string().optional(),
  }),
});

export const collections = { service,party };
