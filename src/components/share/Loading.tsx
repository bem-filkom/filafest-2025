import { Spinner } from "@/components/ui/spinner";
export default function Loading() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="flex items-center gap-2">
        <Spinner /> Loading...
      </div>
    </div>
  );
}
