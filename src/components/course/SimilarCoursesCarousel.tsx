"use client";

import Link from "next/link";
import Image from "next/image";
import type { Course } from "@/types/course";

interface SimilarCoursesCarouselProps {
  courses: Course[];
}

export default function SimilarCoursesCarousel({
  courses,
}: SimilarCoursesCarouselProps) {
  if (!courses?.length) return null;

  return (
    <section className="bg-[var(--color-gray-20)] py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-10 text-2xl font-bold text-gray-800">
          Similar Events
        </h2>

        <div className="flex flex-wrap justify-center gap-8">
          {courses.map((c) => (
            <Link
              key={c.id}
              href={`/landing/courses/${c.id}`}
              className="group w-[260px] transform transition hover:-translate-y-2 sm:w-[280px] md:w-[300px]"
            >
              <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-md transition hover:shadow-2xl">
                {/* Bild */}
                <div className="relative h-40 w-full overflow-hidden">
                  {c.image_url ? (
                    <Image
                      src={c.image_url}
                      alt={c.title}
                      fill
                      sizes="100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-200" />
                  )}
                </div>

                {/* Textinhalt */}
                <div className="p-4 text-left">
                  <h3 className="line-clamp-1 text-base font-bold text-gray-900">
                    {c.title}
                  </h3>
                  {c.subtitle && (
                    <p className="mb-1 line-clamp-1 text-sm text-gray-600">
                      {c.subtitle}
                    </p>
                  )}
                  <p className="line-clamp-2 text-sm text-gray-700">
                    {c.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
