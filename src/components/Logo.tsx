import { Sparkles } from "lucide-react";

export default function Logo() {
  return (
    <div className="flex items-center gap-2.5">
      <div className="flex size-8 items-center justify-center rounded-xl bg-[#6253d9] text-white shadow-sm">
        <Sparkles className="size-4" />
      </div>
      <span className="font-semibold tracking-tight text-foreground">Luma</span>
    </div>
  );
}
