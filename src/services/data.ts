
	interface CustomDataFile {
		default: Record<string, any>;
	}

const prefix = "../../backend/"

export async function getServices() {
  const yamlServices = await import.meta.glob("../../backend/content/service/*.yaml");
	const services = new Map<string, any>()

  await Promise.all(Object.entries(yamlServices).map(async ([path, yamlService]) => {
		const serviceData = await yamlService()
		const id = path.match(/\.\.\/\.\.\/backend\/content\/service\/(.+)\.yaml/)?.[1].toLowerCase()
		services.set(path.replace(prefix, ""), { id, ...serviceData.default });
  }))

	return services;
}

export async function getParties() {
  const yamlParties = await import.meta.glob("../../backend/content/party/*.yaml");
	const parties = new Map<string, any>()

  await Promise.all(Object.entries(yamlParties).map(async ([path, yamlParty]) => {
		const partyData = await yamlParty()
		const id = path.match(/\.\.\/\.\.\/backend\/content\/party\/(.+)\.yaml/)?.[1].toLowerCase()
		parties.set(path.replace(prefix, ""), { id, ...partyData.default });
  }))

	return parties;
}
