import { auth } from "@/lib/auth";
import AuthClient from "./AuthClient";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

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
