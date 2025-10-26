"use client";
import axios from "axios";
import { useEffect, useState } from "react";
import Linklabel from "../_components/Linklabel";

interface Links {
  id: string;
  shortId: string;
  original: string;
  count: number;
}

export default function Links() {
  const [links, setLinks] = useState<Links[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getLinks = async () => {
      try {
        setLoading(true);
        setError("");
        const links = await axios.get("/api/userlinks");
        setLinks(links.data.data);
      } catch (error: any) {
        setError(error?.message);
      } finally {
        setLoading(false);
      }
    };

    getLinks();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      setError("");
      await axios.delete("/api/short", {
        data: { id },
      });
      setLinks((p) => p.filter((link) => link.id !== id));
    } catch (error: any) {
      setError(error?.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mx-auto w-full mt-6 max-w-2xl p-5 border-b-2  rounded-xl backdrop-blur-3xl flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground/90 text-center mt-5 ">
          All Your Links in One Place
        </h1>
      </div>
      <div>
        {links.map((link) => (
          <Linklabel
            key={link.id}
            short={link.shortId}
            original={link.original}
            onDelete={() => handleDelete(link.id)}
          />
        ))}
      </div>
    </div>
  );
}
