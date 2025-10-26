import { auth } from "@/lib/auth";
import UrlShortner from "./UrlShortner";

type Session = typeof auth.$Infer.Session;

interface Props {
  session: Session | null;
}

export default function HomePage({ session }: Props) {
  return (
    <div className="text-center mt-20 text-3xl font-light mx-auto flex flex-col gap-10 ">
      {session && (
        <h1 className="text-4xl">
          Welcome Back ! <span className="font-bold">{session?.user.name}</span>
        </h1>
      )}
      {!session && (
        <h1 className="text-4xl font-bold">Create Short Urls Fast</h1>
      )}
      <UrlShortner />
    </div>
  );
}
