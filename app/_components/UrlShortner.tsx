"use client";
import axios from "axios";
import UrlShortForm from "./UrlShortForm";
import { useState } from "react";
import { Alert, AlertIcon, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";

//@ axios function to POST
async function createShortUrl(url: string) {
  const res = await axios.post("/api/short", { url });
  return res.data.data.shortId as string;
}

export default function UrlShortner() {
  const [url, setUrl] = useState("");
  const [shortLink, setShortLink] = useState<string | null>(null);

  //@ React Query Mutation
  const { mutate, isPending, error } = useMutation({
    mutationFn: createShortUrl,
    onSuccess: (shortId) => {
      setShortLink(`${window.location.origin}/${shortId}`);
    },
  });

  //# Handle Submit Function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    mutate(url);
  };

  return (
    <div className="">
      {error && (
        <Alert
          className="w-fit mx-auto mb-4"
          variant={"destructive"}
          appearance={"light"}
        >
          <AlertIcon>
            <AlertTriangle />
          </AlertIcon>
          <AlertTitle className="text-foreground/80">
            {error.message}
          </AlertTitle>
        </Alert>
      )}
      <UrlShortForm
        url={setUrl}
        handleSubmit={handleSubmit}
        loading={isPending}
      />
      {shortLink && (
        <div>
          <div className="w-full max-w-lg mx-auto  backdrop-blur-sm  mt-10 border-2 rounded-md">
            <Link
              target="_blank"
              href={shortLink || "#"}
              className={buttonVariants({ variant: "link" })}
            >
              {shortLink}
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
