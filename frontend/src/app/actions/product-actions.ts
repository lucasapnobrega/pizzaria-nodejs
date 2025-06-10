"use server"

import { getCookieServer } from "@/lib/cookieServer"

export async function registerProduct(formData: FormData) {
  const token = await getCookieServer()

  const response = await fetch("http://localhost:3333/product", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}` 
    },
    body: formData
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || result.error || "Erro ao cadastrar produto")
  }

  return result
}