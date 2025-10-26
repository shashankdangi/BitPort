"use client";
import {
  AlertTriangle,
  BadgeCheck,
  Home,
  Link as LinkIcon,
} from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { signOut } from "@/lib/actions/auth-actions";
import { useState } from "react";
import { toast } from "sonner";
import { Alert, AlertIcon, AlertTitle } from "./ui/alert";
import { Spinner } from "./ui/spinner";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "@/lib/auth";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@radix-ui/react-dropdown-menu";

type Session = typeof auth.$Infer.Session;
interface NavbarProps {
  session: Session | null;
}
export default function Navbar({ session }: NavbarProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const path = usePathname();
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
    } catch (error: any) {
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
    <div className=" md:mx-auto md:max-w-4xl md:min-w-3xl  backdrop-blur-3xl p-3 border-b-2 flex items-center justify-between  rounded-full md:gap-25 md:sticky z-20 md:top-5 w-full relative   gap-20 px-8">
      <Link className="flex items-center gap-2 text-2xl " href={"/"}>
        <LinkIcon size={20} />
        <span className="font-bold">BitPort</span>
      </Link>

      {session && (
        <div className="hidden md:block">
          <Breadcrumb className="">
            <BreadcrumbList className="text-lg">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={"/"}>
                    <Home size={20} />
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>{" "}
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href={"/links"}>All Links</Link>
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
          <div className="hidden md:block">
            <span className="inline-flex w-[35] bg-accent/20 aspect-square items-center justify-center rounded-full outline-2">
              {session.user.name.charAt(0)}
            </span>
          </div>

          <div className="md:hidden block">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant={"secondary"} className="rounded-full">
                  {session.user.name.charAt(0)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="mt-2 bg-transparent backdrop-blur-3xl">
                <DropdownMenuGroup className="text-center p-1 gap-5 flex flex-col">
                  <DropdownMenuItem asChild>
                    <Link href={"/profile"}>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={"/links"}>All Links</Link>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <Button
            className="cursor-pointer rounded-2xl"
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

      {!session && path !== "/auth" && (
        <nav className="flex items-center gap-2">
          <div>
            <Button variant={"outline"} className="rounded-full" asChild>
              <Link href={"/auth"}>Login</Link>
            </Button>
          </div>
        </nav>
      )}
    </div>
  );
}
