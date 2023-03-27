import { defineConfig, defineSchema } from "tinacms";

const schema = defineSchema({
  collections: [
    {
      label: "Page Content",
      name: "page",
      path: "content/page",
      format: "mdx",
      fields: [
        {
          name: "body",
          label: "Main Content",
          type: "rich-text",
          isBody: true,
        },
      ],
      ui: {
        router: ({ document }) => {
          if (document._sys.filename === "home") {
            return `/`;
          }
          return undefined;
        },
      },
    },
    {
      label: "Service",
      name: "service",
      path: "content/service",
      format: "yaml",
      fields: [
        {
          name: "name",
          label: "Name",
          type: "string",
          isTitle: true,
          required: true,
        },
        {
          name: "description",
          label: "Description",
          type: "rich-text",
          required: true,
        },
        {
          name: "strategy_reference",
          label: "Strategy reference",
          type: "rich-text",
          required: true,
        },
        {
          name: "product_owner",
          label: "Product owner",
          type: "reference",
          collections: ["party"],
        },
        {
          name: "links",
          label: "Links",
          type: "object",
          list: true,
          fields: [
            {
              name: "url",
              label: "URL",
              type: "string",
              required: true,
            },
            {
              name: "label",
              label: "Display label",
              type: "string",
              required: true,
            }
          ],
          ui: {
            // This allows the customization of the list item UI
            // Data can be accessed by item?.<Name of field>
            itemProps: (item) => {
              return { label: `${item?.label}  ( ${item?.url} )` };
            },
          },
        },
        {
          name: "involved_parties",
          label: "Involved parties",
          type: "object",
          list: true,
          fields: [
            {
              label: "Party",
              name: "party",
              type: "reference",
              collections: ["party"],
              required: true,
              isTitle: true,
            },
            {
              name: "description",
              label: "Description",
              type: "string",
              required: true,
            }
          ],
          ui: {
            // This allows the customization of the list item UI
            // Data can be accessed by item?.<Name of field>
            itemProps: (item) => {
              return { label: `${item?.party}  ( ${item?.description} )` };
            },
          },
        },
        {
          name: "has_sla",
          label: "SLA exists",
          type: "boolean",
          required: true,
        },
        {
          name: "relations",
          label: "Relations",
          type: "object",
          list: true,
          fields: [
            {
              label: "Service",
              name: "service",
              type: "reference",
              collections: ["service"],
              required: true,
            },
            {
              name: "description",
              label: "Description",
              type: "string",
              required: true,
            },
            {
              type: "string",
              label: "Criticality",
              name: "relation_criticality",
              options: ["critically_depends_on", "depends_on", "related_data"],
            },
          ],
          ui: {
            // This allows the customization of the list item UI
            // Data can be accessed by item?.<Name of field>
            itemProps: (item) => {
              return { label: `${item?.service}  ( ${item?.description} )` };
            },
          },
        },
        {
          type: "datetime",
          name: "last_updated",
          label: "Last updated",
          ui: {
            timeFormat: "DD.MM.YYYY"
          },
          required: true,
        },
        {
          name: "tech_stack",
          label: "Tech stack",
          type: "object",
          list: true,
          fields: [
            {
              label: "Component",
              name: "stack_component",
              type: "reference",
              collections: ["tech_stack"],
              required: true,
              isTitle: true,
            },
          ],
          ui: {
            // This allows the customization of the list item UI
            // Data can be accessed by item?.<Name of field>
            itemProps: (item) => {
              return { label: `${item?.stack_component}` }
            },
          },
        },
      ],
    },
    {
      label: "Tech stack",
      name: "tech_stack",
      path: "content/tech_stack",
      format: "yaml",
      fields: [
        {
          type: "string",
          label: "Name",
          name: "name",
          required: true,
          isTitle: true,
        },
      ],
    },
    {
      label: "Party",
      name: "party",
      path: "content/party",
      format: "yaml",
      fields: [
        {
          type: "string",
          label: "Name",
          name: "name",
          isTitle: true,
          required: true,
        },
        {
          type: "number",
          label: "PBS Number",
          name: "pbsNumber",
        },
        {
          type: "string",
          label: "Type",
          name: "type",
          options: ["person", "organization"],
        },
        {
          name: "links",
          label: "Links",
          type: "object",
          list: true,
          fields: [
            {
              name: "url",
              label: "URL",
              type: "string",
              required: true,
            },
            {
              name: "label",
              label: "Display label",
              type: "string",
              required: true,
            }
          ],
          ui: {
            // This allows the customization of the list item UI
            // Data can be accessed by item?.<Name of field>
            itemProps: (item) => {
              return { label: `${item?.label}  ( ${item?.url} ) `}
            },
          },
        },
      ],
    },
  ],
});

export const config = defineConfig({
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID,
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH || // custom branch env override
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF || // Vercel branch env
    process.env.HEAD, // Netlify branch env
  token: process.env.TINA_TOKEN,
  media: {
    // If you wanted cloudinary do this
    // loadCustomStore: async () => {
    //   const pack = await import("next-tinacms-cloudinary");
    //   return pack.TinaCloudCloudinaryMediaStore;
    // },
    // this is the config for the tina cloud media store
    tina: {
      publicFolder: "public",
      mediaRoot: "uploads",
    },
  },
  build: {
    publicFolder: "public", // The public asset folder for your framework
    outputFolder: "admin", // within the public folder
  },
  schema,
});

export default config;
