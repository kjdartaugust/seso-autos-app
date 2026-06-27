import Link from "next/link";
import Icon from "@/components/Icon";

export default function NotFound() {
  return (
    <div className="grid min-h-[70vh] place-items-center px-5 text-center">
      <div>
        <p className="text-7xl font-extrabold text-navy">404</p>
        <h1 className="mt-3 text-2xl font-bold text-navy">Page not found</h1>
        <p className="mt-2 text-navy/60">The page you&apos;re looking for has driven off.</p>
        <Link href="/" className="btn-primary mt-6">
          <Icon name="arrow" className="rotate-180" width={18} height={18} /> Back home
        </Link>
      </div>
    </div>
  );
}
