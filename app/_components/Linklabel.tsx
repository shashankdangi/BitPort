import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import Link from "next/link";

interface Props {
  short: string;
  original: string;
  onDelete: () => void;
}

export default function Linklabel({ short, original, onDelete }: Props) {
  const shortId = `${window.location.origin}/${short}`;
  return (
    <div className="flex flex-col gap-5 m-5">
      <div className="grid grid-cols-[30%_60%_10%]">
        <Link
          href={shortId || "#"}
          target="_blank"
          className="border-r-2 flex items-center justify-center text-sm truncate p-1 ml-0"
        >
          {short}
        </Link>
        <Link
          href={original || "#"}
          className="border-r-2 flex items-center justify-center truncate"
          target="_blank"
        >
          {original.slice(0, 20)}
        </Link>
        <Button
          variant={"ghost"}
          className="flex items-center justify-center ml-1 cursor-pointer"
          onClick={onDelete}
        >
          <Trash size={16} color="red" />
        </Button>
      </div>
      {/* <div className="w-lg  mx-auto">
        <Separator />
      </div> */}
    </div>
  );
}
