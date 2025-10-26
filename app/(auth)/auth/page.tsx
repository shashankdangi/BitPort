import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import AuthClient from "./AuthClient";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session) {
    redirect("/");
  }

  return (
    <div>
      <AuthClient />
    </div>
  );
}
