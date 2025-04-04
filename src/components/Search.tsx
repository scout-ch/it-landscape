import React, { useState } from "react";

import { beautifyString } from "../utils";
import type { CollectionEntry } from "astro:content";

type Service = CollectionEntry<"service">;
type Props = {
  searchList: Service[];
};

function filterServices(searchList: Service[], search: string) {
  return searchList.filter(
    (item) =>
      item.data.name?.toLowerCase().includes(search) ||
      item.data.lifecycle?.[0]?.state.includes(search.replace(" ", "_")) ||
      item.data.product_owner?.id.includes(search) ||
      item.data.criticality?.includes(search),
  );
}

const statusColors: Record<NonNullable<Service["data"]["lifecycle"]>[number]["state"], string> = {
  in_production: "bg-green-200",
  in_progress: "bg-orange-200",
  idea: "bg-yellow-200",
  planned: "bg-yellow-200",
  on_hold: "bg-red-200",
  eol: "bg-yellow-200",
  decommissioned: "bg-gray-200",
};

export default function Search(props: Props) {
  if (!props.searchList) {
    return <div>No data available</div>;
  }

  const { searchList } = props;
  const [search, setSearch] = useState("");
  const [filteredList, setFilteredList] = useState(searchList);

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        className="border border-black-300 rounded p-2 w-full"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setFilteredList(filterServices(searchList, e.target.value?.toLocaleLowerCase()));
        }}
        onFocus={(e) => {
          e.target.style.borderColor = "#0070f3";
        }}
      />

      <div className="mt-4">
        <table cellPadding="7" className="w-full table-auto">
          <thead
            style={{
              fontWeight: "bolder",
              borderBottom: "2px solid",
            }}
          >
            <tr>
              <td>Name</td>
              <td>Status</td>
              <td>Cirticality</td>
              <td>Product Owner</td>
              <td>last updated</td>
            </tr>
          </thead>
          <tbody>
            {filteredList?.map((service) => (
              <tr key={service.id} className="even:bg-gray-100">
                <td>
                  <a className="text-brombeer hover:underscore" href={`/it-landscape/services/${service.data.name}`}>
                    {service.data.name}
                  </a>
                </td>
                <td>
                  <span className={statusColors[service.data.lifecycle?.[0]?.state ?? "in_production"] || ""}>
                    {beautifyString(service.data.lifecycle?.[0]?.state || "")}
                  </span>
                </td>
                <td>
                  <span
                    className={`${service.data.criticality === "low"
                      ? "bg-green-200"
                      : service.data.criticality === "medium"
                        ? "bg-orange-200"
                        : service.data.criticality === "high"
                          ? "bg-yellow-200"
                          : service.data.criticality === "critical"
                            ? "bg-red-200"
                            : ""
                      }`}
                  >
                    {service.data.criticality}
                  </span>
                </td>
                <td>{service.data.product_owner?.id || ""}</td>
                <td className="p-3">
                  {service.data.last_updated ? new Date(service.data.last_updated).toLocaleDateString("de") : "unknown"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
