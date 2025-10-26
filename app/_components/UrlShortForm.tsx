import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

interface Props {
  url: (s: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

export default function UrlShortForm({ url, handleSubmit, loading }: Props) {
  return (
    <div className="w-full md:max-w-2xl px-4  mx-auto flex flex-col  md:flex-row gap-5 items-center">
      <Input
        onChange={(e) => url(e.target.value)}
        className=" placeholder:text-foreground/30 w-full  "
        placeholder="https://example.com/"
      />
      <Button
        variant={"default"}
        className="cursor-pointer"
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? (
          <>
            Generating <Spinner className="ml-2" />
          </>
        ) : (
          "Generate Link"
        )}
      </Button>
    </div>
  );
}
