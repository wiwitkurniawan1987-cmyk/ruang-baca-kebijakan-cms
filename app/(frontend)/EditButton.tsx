"use client";

import { useEffect, useState } from "react";

export function EditButton({ href, label }: { href: string; label: string }) {
  const [canEdit, setCanEdit] = useState(false);

  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/users/me", {
      credentials: "include",
      cache: "no-store",
      signal: controller.signal,
    })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => setCanEdit(Boolean(data?.user)))
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  if (!canEdit) return null;
  return <a className="cms-edit-button" href={href}>{label}</a>;
}
