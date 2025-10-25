"use client";
import {
  AlertTriangle,
  BadgeCheck,
  Home,
  Link as LinkIcon,
} from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { signOut } from "@/lib/actions/auth-actions";
import { useState } from "react";
import { toast } from "sonner";
import { Alert, AlertIcon, AlertTitle } from "./ui/alert";
import { Spinner } from "./ui/spinner";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/auth";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Avatar, AvatarFallback } from "./ui/avatar";

type Session = typeof auth.$Infer.Session;
interface NavbarProps {
  session: Session | null;
}
export default function Navbar({ session }: NavbarProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleSubmit = async () => {
    try {
      setLoading(true);
      await signOut();
      toast.custom(
        (t) => (
          <Alert
            variant={"destructive"}
            appearance={"light"}
            onClose={() => toast.dismiss(t)}
          >
            <AlertIcon>
              <BadgeCheck />
            </AlertIcon>
            <AlertTitle>See You Soon ! 👋</AlertTitle>
          </Alert>
        ),
        {
          duration: 1000,
        }
      );
      router.refresh();
      router.push("/auth");
    } catch (error) {
      toast.custom(
        (t) => (
          <Alert
            variant={"destructive"}
            appearance={"light"}
            onClose={() => toast.dismiss(t)}
          >
            <AlertIcon>
              <AlertTriangle />
            </AlertIcon>
            <AlertTitle>
              {error?.message || "Failed to Log you out!"}
            </AlertTitle>
          </Alert>
        ),
        {
          duration: 3000,
        }
      );
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="w-full p-3 border-b-2 flex items-center justify-between">
      <Link className="flex items-center gap-2" href={"/"}>
        <LinkIcon size={18} />
        <span className="font-bold">BitPort</span>
      </Link>

      {session && (
        <div>
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={"/"}>
                    <Home size={15} />
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={"/profile"}>Profile</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      )}

      {session && (
        <nav className="flex items-center gap-5">
          <span className="inline-flex w-[35] bg-accent aspect-square items-center justify-center rounded-full outline-1">
            {session.user.name.charAt(0)}
          </span>
          {/* <Avatar>
            <AvatarFallback className="uppercase">
              {session.user.name.slice(0, 2)}
            </AvatarFallback>
          </Avatar> */}
          <Button
            className="cursor-pointer"
            variant={"default"}
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <>
                Logging Out <Spinner className="ml-2" />
              </>
            ) : (
              "Log Out"
            )}
          </Button>
        </nav>
      )}
    </div>
  );
}
