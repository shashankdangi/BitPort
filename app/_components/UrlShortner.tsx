"use client";
import axios from "axios";
import UrlShortForm from "./UrlShortForm";
import { useState } from "react";
import { Alert, AlertIcon, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function UrlShortner() {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [shortLink, setShortLink] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return;
    try {
      setLoading(true);
      setError("");
      const res = await axios.post("/api/short", { url });
      setShortLink(`${window.location.href}${res.data.data.shortId}`);
    } catch (error: any) {
      setError(error?.message);
    } finally {
      setLoading(false);
    }
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
          <AlertTitle className="text-foreground/80">{error}</AlertTitle>
        </Alert>
      )}
      <UrlShortForm
        url={setUrl}
        handleSubmit={handleSubmit}
        loading={loading}
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
