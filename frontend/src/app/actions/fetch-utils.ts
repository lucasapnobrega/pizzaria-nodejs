"use server"

import { getCookieServer } from "@/lib/cookieServer";
import { revalidateTag } from "next/cache";

type FetchOptions = {
  method?: "GET" | "POST" | "PUT" |"PATCH" |"DELETE";
  url: string;
  body?: any;
  revalidate?: string;
  revalidateTagNext?: string;
}

export async function apiFetch({ method = "GET", url, body, revalidate, revalidateTagNext }: FetchOptions) {
  const token = await getCookieServer()

  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
    next: revalidateTagNext ? { tags: [revalidateTagNext] } : undefined
  })

  const result = await response.json()

  if (revalidate) {
    revalidateTag(revalidate)
  }

  if (!response.ok) {
    throw new Error(result.message || `Erro - ${method} - ${url}`)
  }

  return result
}