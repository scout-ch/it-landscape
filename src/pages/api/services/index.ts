import { client } from "../../../../.tina/__generated__/client.js";
import { Service, ServiceConnectionEdges } from "../../../../.tina/__generated__/types.js";

const serviceResponse = await client.queries.serviceConnection();
// @ts-ignore
const serviceEdges: ServiceConnectionEdges[] = serviceResponse.data.serviceConnection.edges || [];

const services = serviceEdges.map((service: ServiceConnectionEdges) => {
  const lifecycle = service.node?.lifecycle || [];
  const length: number = lifecycle?.length || 0;
  const productOwner = service.node?.product_owner?.name;
  const dateString: string = service.node?.last_updated ? new Date(service.node?.last_updated).toLocaleDateString("de") : "unknown";

  return {
    id: service.node?.id,
    name: service.node?.name,
    status: lifecycle[length - 1]?.state,
    product_owner: productOwner,
    criticality: service.node?.criticality,
    lastUpdated: dateString
  };
});

export async function GET({ params, request }) {
  return new Response(
    JSON.stringify(services),
  );
}
