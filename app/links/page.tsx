import { auth } from "@/lib/auth";
import Links from "./links-client";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
export default async function page() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    redirect("/");
  }
  return (
    <div>
      <Links />
    </div>
  );
}
