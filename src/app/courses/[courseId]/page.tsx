import fs from "node:fs";
import path from "node:path";
import type { Course } from "@/types/course";
import CourseDetailPage from "@/components/course/CourseDetailPage";
import { PageProps } from "../../../../.next/types/app/layout";

interface CoursePageProps extends PageProps {
  params: Promise<{ courseId: string }>; // ✅ works in all cases
}

function readCourses(): Course[] {
  const filePath = path.join(process.cwd(), "src", "mock", "courses.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Course[];
}

export default async function Page({ params }: CoursePageProps) {
  const { courseId } = await params; // ✅ handles Promise or plain object
  const courses = readCourses();
  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return <div>Course not found.</div>;
  }

  const similarCourses = courses.filter(
    (c) => c.id !== course.id && c.category === course.category,
  );

  return <CourseDetailPage course={course} similarCourses={similarCourses} />;
}
