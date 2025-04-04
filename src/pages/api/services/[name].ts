import type { APIRoute } from "astro";
import { client } from "../../../../.tina/__generated__/client.js"
import { TinaMarkdown } from 'tinacms/dist/rich-text'
import { ServiceRelations, ServiceLinks, ServiceInvolved_Parties, Service, ServiceConnectionEdges, ServiceConnection, Maybe, ServiceLifecycle } from "../../../../.tina/__generated__/types.js";

export async function getStaticPaths() {
  const serviceResponse = await client.queries.serviceConnection()
  // @ts-ignore
  const serviceEdges: ServiceConnectionEdges[] = serviceResponse.data.serviceConnection.edges || []

  return serviceEdges.map((service: ServiceConnectionEdges) => ({
    params: {
      name: service.node?.name
    },
    props: { service: service.node },
  }))
}


export async function GET({ params, request }) {
  const { name } = params
  const serviceResponse = await client.queries.serviceConnection()
  // @ts-ignore
  const serviceEdges: ServiceConnectionEdges[] = serviceResponse.data.serviceConnection.edges.filter((service: ServiceConnectionEdges) => {
    return service.node?.name === name
  }) || []
  const service: Service | undefined = serviceEdges[0]?.node || undefined

  if (!service) {
    return new Response("Service not found", { status: 404 })
  }

  const serviceRelations: Maybe<ServiceRelations>[] = service?.relations || []
  const relations = serviceRelations.filter(function (relation: Maybe<ServiceRelations>) {
    return relation != null
  }).map((relation: Maybe<ServiceRelations>) => {
    if (relation) {
      return {
        description: relation.description,
        name: relation.service.name,
        relation_criticality: relation.relation_criticality
      }
    }
  })

  const serviceLinks: Maybe<ServiceLinks>[] = service?.links || []
  const links = serviceLinks.filter(function (link: Maybe<ServiceLinks>) {
    return link != null
  }).map((link: Maybe<ServiceLinks>) => {
    if (link) {
      return {
        url: link.url,
        label: link.label,
      }
    }
  })

  const serviceInvolvedParties: Maybe<ServiceInvolved_Parties>[] = service?.involved_parties || []
  const involvedParties = serviceInvolvedParties.filter(function (party: Maybe<ServiceInvolved_Parties>) {
    return party != null
  }).map((party: Maybe<ServiceInvolved_Parties>) => {
    if (party) {
      return {
        key: party.party.key,
        name: party.party.name,
        description: party.description,
      }
    }
  })

  const serviceLifecycle: Maybe<ServiceLifecycle>[] = service?.lifecycle || []
  const lifecycles = serviceLifecycle.filter(function (life: Maybe<ServiceLifecycle>) {
    return life != null
  }).map((life: Maybe<ServiceLifecycle>) => {
    if (life) {
      return {
        state: life.state,
        date: new Date(life.date).toLocaleDateString("de-CH"),
      }
    }
  })

  const lastUpdatedValue: string = service?.last_updated ? new Date(service.last_updated).toLocaleDateString('de') : 'unknown'

  return new Response(
    JSON.stringify({
      name: service?.name,
      description: service?.description,
      relations: relations,
      links: links,
      involved_parties: involvedParties,
      lifecycle: lifecycles,
      last_updated: lastUpdatedValue,
    }),
    {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=3600",
      },
      status: 200,
    }
  );
}
