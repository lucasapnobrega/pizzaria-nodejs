"use server"

import { LoginSchemaType, SignUpSchemaType } from "@/schemas/auth-schema";
import { cookies } from "next/headers";

export async function signUp(data: SignUpSchemaType) {
  const response = await fetch("http://localhost:3333/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || "Erro ao cadastrar usuário")
  }

  return result
}

export async function login(data: LoginSchemaType) {
  const response = await fetch("http://localhost:3333/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result.message || "Erro ao fazer login")
  }

  const cookieStore = await cookies()

  cookieStore.set("session-token", result.token, {
    maxAge: 60 * 60 * 24,
    path: "/",
    httpOnly: false,
    secure: process.env.NODE_ENV === "production"
  })

  return result
}