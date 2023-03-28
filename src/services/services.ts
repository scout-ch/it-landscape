
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
