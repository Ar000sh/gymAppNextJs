import type { Course } from "@/types/course";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import CourseMapEmbed from "@/components/course/CourseMapEmbed";
import SimilarCoursesCarousel from "@/components/course/SimilarCoursesCarousel";
import { CourseCard } from ".";
import Link from "next/link";

interface CourseDetailPageProps {
  course: Course;
  similarCourses?: Course[];
}

export default function CourseDetailPage({ course, similarCourses = [] }: CourseDetailPageProps) {
  return (
    <main className="pt-24">
      <Navbar />

      {/* Hero background */}
      <div className="relative">
        <div className="relative h-[420px] md:h-[560px] w-full overflow-hidden">
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
        <div className="container mx-auto px-4 -mt-28 md:-mt-40 relative z-10">
          <div className="max-w-6xl mx-auto">
            <CourseCard course={course} />
          </div>
        </div>
      </div>

      {/* Description & Map */}
      <div className="container mx-auto px-4 pb-16">
        <div className="max-w-6xl mx-auto mt-8 md:mt-12 grid grid-cols-1 gap-8">
          <section>
            <h2 className="mb-3 text-2xl font-bold">Description</h2>
            <p className="text-gray-700 leading-relaxed">{course.description}</p>
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
