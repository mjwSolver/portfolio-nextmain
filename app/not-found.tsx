import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="container-page grid min-h-dvh place-items-center py-24 text-center">
      <div>
        <h1 className="text-4xl font-medium tracking-[-0.03em] sm:text-5xl">Page not found</h1>
        <p className="mt-4 text-lg text-muted">Check the address, or go to the home page.</p>
        <Link
          href="/"
          className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-primary-dark"
        >
          <ArrowLeft size={16} /> Go to the home page
        </Link>
      </div>
    </main>
  );
}
