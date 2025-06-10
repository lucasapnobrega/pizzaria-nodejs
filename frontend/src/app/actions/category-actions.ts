"use server"

import { CategorySchemaType } from "@/components/CategoryForm"
import { apiFetch } from "./fetch-utils"
import { Category } from "@/types"

export async function getAllCategories(): Promise<Category[]> {
  return await apiFetch({
    url: "http://localhost:3333/category",
  })
}

export async function registerCategory(data: CategorySchemaType) {
  return await apiFetch({
    method: "POST",
    url: "http://localhost:3333/category",
    body: data
  })
}