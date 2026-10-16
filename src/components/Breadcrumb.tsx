"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { breadcrumbs, BreadcrumbItem } from "@/constants/breadcrumbs";

function findPath(
  items: BreadcrumbItem[],
  path: string
): BreadcrumbItem[] | null {
  for (const item of items) {
    if (item.href === path) return [item];
    if (item.children) {
      const childPath = findPath(item.children, path);
      if (childPath) return [item, ...childPath];
    }
  }
  return null;
}

export default function Breadcrumb() {
  const pathname = usePathname(); // current URL
  const pathItems = findPath(breadcrumbs, pathname);

  if (!pathItems) return null;

  return (
    <div className="text-sm text-gray-600 my-4 flex items-center gap-1">
      {pathItems.map((item, index) => (
        <span key={item.href} className="flex items-center gap-1">
          {index !== 0 && <span>→</span>}
          {index !== pathItems.length - 1 ? (
            <Link href={item.href} className="hover:underline">
              {item.name}
            </Link>
          ) : (
            <span className="font-semibold">{item.name}</span>
          )}
        </span>
      ))}
    </div>
  );
}
