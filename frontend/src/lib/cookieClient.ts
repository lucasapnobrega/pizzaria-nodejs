import { getCookie } from "cookies-next";

export async function getCookieClient() {
  const token = getCookie("session-token")

  return token
}