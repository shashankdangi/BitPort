"use client";

import { Alert, AlertIcon, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { signIn, signUp } from "@/lib/actions/auth-actions";
import { BadgeCheck, TriangleAlert } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export default function AuthClient() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSignIn) {
      try {
        setLoading(true);
        const result = await signIn(email, password);
        if (!result.user) {
          setError("failed to load");
        } else {
          setError("");
        }
        toast.custom(
          (t) => (
            <Alert
              variant={"success"}
              appearance={"light"}
              onClose={() => toast.dismiss(t)}
            >
              <AlertIcon>
                <BadgeCheck />
              </AlertIcon>
              <AlertTitle>Welcome Back !!</AlertTitle>
            </Alert>
          ),
          {
            duration: 1000,
          }
        );
        router.refresh();
      } catch (error: any) {
        setError(error?.message || "Failed to SignIn");
      } finally {
        setLoading(false);
      }
    } else {
      if (password !== confirmPassword) {
        setError("Password does not  Match");
        return;
      } else {
        setError("");
      }
      try {
        setLoading(true);
        const result = await signUp(email, password, name);
        if (!result.user) {
          console.error("Failed to Sign Up");
        }
        toast.custom(
          (t) => (
            <Alert
              variant={"success"}
              appearance={"light"}
              onClose={() => toast.dismiss(t)}
            >
              <AlertIcon>
                <BadgeCheck />
              </AlertIcon>
              <AlertTitle>Registered Successfully !! 🎉</AlertTitle>
            </Alert>
          ),
          {
            duration: 1000,
          }
        );
        router.refresh();
      } catch (error: any) {
        setError(error?.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center  w-full  mt-10">
      <div className="md:w-[300px] w-full py-10  h-auto border-2   p-5 bg-card/10 backdrop-blur-3xl  flex flex-col gap-3 rounded-xl mx-auto">
        {/* Sign In Form */}
        {isSignIn && (
          <div className="flex flex-col gap-3 text-2xl">
            <h1 className="font-bold text-3xl text-center p-2 mb-2">
              Welcome Back !
            </h1>
            {error && (
              <Alert variant="destructive" appearance="light">
                <AlertIcon>
                  <TriangleAlert />
                </AlertIcon>
                <AlertTitle>{error}</AlertTitle>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-foreground/70">
                  Email
                </Label>
                <Input
                  placeholder="enter your email"
                  name="email"
                  className="text-sm font-light"
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password" className="text-foreground/70">
                  Password
                </Label>
                <Input
                  name="password"
                  placeholder="***********"
                  className="text-sm font-light"
                  type="password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Button className="font-bold cursor-pointer" disabled={loading}>
                  {loading ? (
                    <>
                      Signin you In <Spinner className="ml-2" />
                    </>
                  ) : (
                    "Sign In"
                  )}
                </Button>
              </div>
            </form>
            <div>
              <p className="text-sm italic text-foreground/80">
                New user ?
                <Button
                  variant={"link"}
                  className="cursor-pointer"
                  onClick={() => {
                    setIsSignIn(false);
                    setError("");
                  }}
                >
                  Register
                </Button>
              </p>
            </div>
          </div>
        )}
        {!isSignIn && (
          <div>
            <h1 className="text-center text-3xl font-bold mb-3">Register</h1>
            {error && (
              <Alert
                variant="destructive"
                appearance="light"
                className="backdrop-blur-3xl my-2 text-sm flex items-center"
              >
                <AlertIcon>
                  <TriangleAlert />
                </AlertIcon>
                <AlertTitle>{error}</AlertTitle>
              </Alert>
            )}
            <form action="#" onSubmit={handleSubmit} className="grid gap-2">
              <div className="grid gap-1">
                <Label className="text-sm text-foreground/70" htmlFor="name">
                  Name
                </Label>
                <Input
                  name="name"
                  placeholder="Tom Hanks"
                  className="text-sm"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="grid gap-1">
                <Label className="text-sm text-foreground/70" htmlFor="email">
                  Email
                </Label>
                <Input
                  name="email"
                  placeholder="abc@gmail.com"
                  className="text-sm"
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-1">
                <Label
                  className="text-sm text-foreground/70"
                  htmlFor="password"
                >
                  Password
                </Label>
                <Input
                  type="password"
                  name="password"
                  placeholder="**************"
                  className="text-sm"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-1">
                <Label className="text-sm text-foreground/70" htmlFor="confirm">
                  Confirm Password
                </Label>
                <Input
                  name="confirm"
                  type="password"
                  placeholder="**********"
                  className="text-sm"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="grid gap-1 mt-2">
                <Button className="font-bold cursor-pointer" disabled={loading}>
                  {loading ? (
                    <>
                      Registering.. <Spinner className="ml-2" />
                    </>
                  ) : (
                    "Register"
                  )}
                </Button>
              </div>
            </form>
            <p className="text-sm mt-3 italic text-center">
              Already a User ?{" "}
              <Button
                className="cursor-pointer"
                variant={"link"}
                onClick={() => {
                  setIsSignIn(true);
                  setError("");
                }}
              >
                Sign In{" "}
              </Button>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
