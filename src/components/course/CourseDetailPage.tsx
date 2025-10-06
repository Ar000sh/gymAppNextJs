import type { Course } from "@/types/course";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CourseMapEmbed from "@/components/course/CourseMapEmbed";
import SimilarCoursesCarousel from "@/components/course/SimilarCoursesCarousel";
import { CourseCard } from ".";

interface CourseDetailPageProps {
  course: Course;
  similarCourses?: Course[];
}

export default function CourseDetailPage({
  course,
  similarCourses = [],
}: CourseDetailPageProps) {
  return (
    <main className="pt-24">
      <Navbar />

      {/* Hero background */}
      <div className="relative">
        <div className="relative h-[420px] w-full overflow-hidden md:h-[560px]">
          {course.imageUrl ? (
            <Image
              src={course.imageUrl}
              alt={course.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          ) : null}
        </div>

        {/* Centered card overlapping hero */}
        <div className="relative z-10 container mx-auto -mt-28 px-4 md:-mt-40">
          <div className="mx-auto max-w-6xl">
            <CourseCard course={course} />
          </div>
        </div>
      </div>

      {/* Description & Map */}
      <div className="container mx-auto px-4 pb-16">
        <div className="mx-auto mt-8 grid max-w-6xl grid-cols-1 gap-8 md:mt-12">
          <section>
            <h2 className="mb-3 text-2xl font-bold">Description</h2>
            <p className="leading-relaxed text-gray-700">
              {course.description}
            </p>
          </section>

          <CourseMapEmbed address={course.address} />
        </div>
      </div>

      {/* Similar Courses */}
      {similarCourses.length > 0 && (
        <SimilarCoursesCarousel courses={similarCourses} />
      )}

      <Footer />
    </main>
  );
}
