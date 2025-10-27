"use client";
import axios from "axios";
import Linklabel from "../_components/Linklabel";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

interface Links {
  id: string;
  shortId: string;
  original: string;
  count: number;
}
//@ Get All Links
async function getAllUserLinks(): Promise<Links[]> {
  const links = await axios.get("/api/userlinks");
  return links.data.data;
}

//@ Delete A Link

async function deleteUserLink(id: string) {
  await axios.delete("/api/short", { data: { id } });
  return id;
}

export default function Links() {
  const queryClient = useQueryClient();

  //! Fetching data using react query
  const {
    data: links,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryFn: getAllUserLinks,
    queryKey: ["userLinks"],
  });

  //! Delete Data using react query
  const { mutate: deleteLink, isPending: isDeleting } = useMutation({
    mutationFn: deleteUserLink,
    onSuccess: (deleteId) => {
      queryClient.setQueryData<Links[]>(["userLinks"], (old) =>
        old ? old.filter((link) => link.id !== deleteId) : []
      );
    },
  });

  return (
    <div className="mx-auto w-full mt-6 max-w-2xl p-5 border-b-2  rounded-xl backdrop-blur-3xl flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground/90 text-center mt-5 ">
          All Your Links in One Place
        </h1>
      </div>
      <div>
        {links && links.length > 0 ? (
          links.map((link) => (
            <Linklabel
              key={link.id}
              short={link.shortId}
              original={link.original}
              onDelete={() => deleteLink(link.id)}
            />
          ))
        ) : (
          <p className="text-center text-muted-foreground">No links found.</p>
        )}
      </div>
    </div>
  );
}
