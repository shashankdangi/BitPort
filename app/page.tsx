import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import HomePage from "./_components/HomePage";

export default async function page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  return (
    <div>
      <HomePage session={session} />
    </div>
  );
}
