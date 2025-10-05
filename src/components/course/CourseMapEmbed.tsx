"use client";
import { useEffect, useState } from "react";

interface CourseMapEmbedProps {
  address: string;
}

export default function CourseMapEmbed({ address }: CourseMapEmbedProps) {
  const [isClient, setIsClient] = useState(false);
  const q = encodeURIComponent(address);
  const src = `https://www.google.com/maps?q=${q}&output=embed`;

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null; // oder Skeleton Loader

  return (
    <section className="mt-6">
      <h2 className="mb-3 text-xl font-semibold">Location</h2>
      <div className="overflow-hidden rounded-xl border border-gray-200 shadow-sm">
        <iframe
          title={`Map of ${address}`}
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-[360px] w-full"
        />
      </div>
    </section>
  );
}
