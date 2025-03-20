import createClient from "openapi-fetch";
import type { paths } from "../types/ragposiumSchema";

export const baseUrl = import.meta.env.VITE_RAGPOSIUM_URL;
export const ragposiumClient = createClient<paths>({ baseUrl: baseUrl });
