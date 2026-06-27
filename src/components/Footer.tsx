"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { services, CONTACT } from "@/lib/content";
import Icon from "./Icon";

export default function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  return (
    <footer className="bg-navy-900 text-white/80">
      <div className="container-x grid gap-10 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-lime font-extrabold text-navy">
              S
            </span>
            <span className="text-lg font-extrabold text-white">SESO Autos</span>
          </div>
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            Your complete automotive partner in Ghana — driving more than cars,
            driving trust, value and peace of mind.
          </p>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-lime">
            Services
          </h4>
          <ul className="space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.slug}>
                <Link href={s.href} className="hover:text-white">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-lime">
            Company
          </h4>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/#about" className="hover:text-white">About Us</Link></li>
            <li><Link href="/sales" className="hover:text-white">Buy a Car</Link></li>
            <li><Link href="/rentals" className="hover:text-white">Rent a Car</Link></li>
            <li><Link href="/#contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/admin/login" className="hover:text-white">Admin</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-sm font-bold uppercase tracking-wider text-lime">
            Get in Touch
          </h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <Icon name="phone" width={18} height={18} className="text-lime" />
              <a href={`tel:${CONTACT.phone}`} className="hover:text-white">
                {CONTACT.phoneDisplay}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Icon name="mail" width={18} height={18} className="text-lime" />
              <a href={`mailto:${CONTACT.email}`} className="hover:text-white">
                {CONTACT.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Icon name="pin" width={18} height={18} className="text-lime" />
              {CONTACT.address}
            </li>
            <li className="flex items-center gap-3">
              <Icon name="clock" width={18} height={18} className="text-lime" />
              {CONTACT.hours}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-6 text-xs text-white/60 sm:flex-row">
          <p>© {new Date().getFullYear()} SESO Autos. All rights reserved.</p>
          <p>Driving More Than Cars.</p>
        </div>
      </div>
    </footer>
  );
}
