import { auth } from "@/lib/auth";

type Session = typeof auth.$Infer.Session;

interface Props {
  session: Session | null;
}

export default function HomePage({ session }: Props) {
  return (
    <div className="text-center mt-4 text-3xl font-light">
      <h1>
        Welcome Back ! <span className="font-bold">{session?.user.name}</span>
      </h1>
    </div>
  );
}
