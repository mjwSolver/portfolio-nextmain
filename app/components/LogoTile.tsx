import Image from "next/image";
import { asset } from "@/lib/ui";
import { cn } from "@/lib/utils";

export type Logo = {
  file: string;
  width: number;
  height: number;
  /** White artwork that needs inverting on a light tile. */
  invert?: boolean;
  /** Wide logo that already contains the organisation's name. */
  wordmark?: boolean;
};

const SIZES = {
  sm: { mark: "h-6 w-6 rounded-full p-1", word: "h-6 rounded-full px-1.5 py-0.5", px: 24 },
  md: { mark: "h-8 w-8 rounded-xl p-1.5", word: "h-8 rounded-xl px-2 py-1", px: 32 },
  lg: { mark: "h-11 w-11 rounded-2xl p-2", word: "h-11 rounded-2xl px-2.5 py-1.5", px: 44 },
} as const;

/** An organisation's logo on a small white tile, readable on any background. */
export default function LogoTile({ logo, size = "md", className }: { logo: Logo; size?: keyof typeof SIZES; className?: string }) {
  const s = SIZES[size];
  return (
    <span
      className={cn(
        "relative grid shrink-0 place-items-center bg-white shadow-[0_1px_3px_rgba(15,42,68,0.12)]",
        logo.wordmark ? s.word : s.mark,
        className,
      )}
    >
      <Image
        src={asset(logo.file)}
        alt=""
        width={logo.width}
        height={logo.height}
        sizes={logo.wordmark ? `${Math.round((s.px * logo.width) / logo.height)}px` : `${s.px}px`}
        className={cn(logo.wordmark ? "h-full w-auto" : "h-full w-full object-contain", logo.invert && "invert")}
      />
    </span>
  );
}
