"use client";

import Link from "next/link";
import Image from "next/image";
import type { Course } from "@/types/course";

interface SimilarCoursesCarouselProps {
  courses: Course[];
}

export default function SimilarCoursesCarousel({ courses }: SimilarCoursesCarouselProps) {
  if (!courses?.length) return null;

  return (
    <section className="bg-[var(--color-gray-20)] py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-10 text-gray-800">
          Similar Events
        </h2>

        <div className="flex flex-wrap justify-center gap-8">
          {courses.map((c) => (
            <Link
              key={c.id}
              href={`/courses/${c.id}`}
              className="group w-[260px] sm:w-[280px] md:w-[300px] transform transition hover:-translate-y-2"
            >
              <div className="bg-white rounded-xl shadow-md hover:shadow-2xl transition overflow-hidden border border-gray-100">
                {/* Bild */}
                <div className="relative h-40 w-full overflow-hidden">
                  {c.imageUrl ? (
                    <Image
                      src={c.imageUrl}
                      alt={c.title}
                      fill
                      sizes="100vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="h-full w-full bg-gray-200" />
                  )}
                </div>

                {/* Textinhalt */}
                <div className="p-4 text-left">
                  <h3 className="font-bold text-base text-gray-900 line-clamp-1">
                    {c.title}
                  </h3>
                  {c.subtitle && (
                    <p className="text-sm text-gray-600 mb-1 line-clamp-1">
                      {c.subtitle}
                    </p>
                  )}
                  <p className="text-gray-700 text-sm line-clamp-2">
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
