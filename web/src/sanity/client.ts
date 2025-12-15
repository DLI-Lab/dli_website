import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "l016ip9y",
  dataset: "production",
  apiVersion: "2024-01-01",
  useCdn: false,
});