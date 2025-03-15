import createClient from "openapi-fetch";
import type { paths } from "../types/ragposiumSchema";

export const ragposiumClient = createClient<paths>({ baseUrl: process.env.RAGPOSIUM_URL })