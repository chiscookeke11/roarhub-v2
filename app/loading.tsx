import Spinner from "@/components/ui/Spinner";

export default function Loading() {
  return (
    <div className="bg-[#1f3556] h-screen w-full flex items-center justify-center " role="status" aria-live="polite">


      <Spinner />

    </div>
  );
}
