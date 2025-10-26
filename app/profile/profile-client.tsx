"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { auth } from "@/lib/auth";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { deleteUser } from "@/lib/actions/auth-updates";
import { toast } from "sonner";
import { Alert, AlertIcon, AlertTitle } from "@/components/ui/alert";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";
type Session = typeof auth.$Infer.Session;

interface Props {
  session: Session | null;
}

export default function ProfileClient({ session }: Props) {
  const [deleteCheck, setDeleteCheck] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setLoading(true);
      await deleteUser();
      toast.custom(
        (t) => (
          <Alert
            variant={"info"}
            appearance={"outline"}
            onClose={() => toast.dismiss(t)}
          >
            <AlertTitle>Hope to See You Again</AlertTitle>
          </Alert>
        ),
        {
          duration: 3000,
        }
      );
      router.push("/auth");
      router.refresh();
    } catch (error: any) {
      setError(error?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="w-fit mx-auto  h-auto p-10 border-2 rounded-xl mt-7  bg-card/20 backdrop-blur-2xl   flex flex-col gap-7">
        <div>
          <h1 className="text-4xl font-bold">Profile Page</h1>
        </div>
        <div className="grid md:grid-cols-2 gap-5 my-5">
          <div className="flex gap-2">
            <Label className="text-lg text-foreground/70">Name</Label>
            <Input disabled value={session?.user.name} className="capitalize" />
          </div>
          <div className="flex gap-2">
            <Label className="text-lg text-foreground/70" htmlFor="email">
              Email
            </Label>
            <Input
              name="email"
              disabled
              value={session?.user.email}
              className="lowercase italic"
            />
          </div>
        </div>
        <div>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"destructive"} className="cursor-pointer">
                Delete Account
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="backdrop-blur-3xl bg-transparent -mt-30">
              <AlertDialogTitle>
                Are you sure to Delete Account ?
              </AlertDialogTitle>

              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete your
                account and remove your data from our servers.
              </AlertDialogDescription>
              <div className="grid gap-2 ">
                <span className="text-red-500 text-md ml-1">
                  {session?.user.email}
                </span>
                <Input
                  placeholder="Enter your email"
                  className="text-sm"
                  onChange={(e) => setDeleteCheck(e.target.value)}
                />
              </div>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button
                  variant={"destructive"}
                  className="cursor-pointer"
                  disabled={deleteCheck !== session?.user.email || loading}
                  onClick={handleDelete}
                >
                  {loading ? (
                    <>
                      Deleting <Spinner className="ml-2" />
                    </>
                  ) : (
                    "Delete"
                  )}
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        <div>
          <span className="italic text-sm text-foreground/50">
            Account Created on{" "}
            <span className="text-foreground font-bold">
              {session?.user.createdAt.toDateString()}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
