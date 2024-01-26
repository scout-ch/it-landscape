import { createClient } from "tinacms/dist/client";
import { queries } from "./types";
export const client = createClient({ url: 'http://localhost:4001/graphql', token: '524c9323c760147cbd9b3b7be2bff0c88ee26ac7', queries,  });
export default client;
  