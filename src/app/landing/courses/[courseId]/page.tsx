import fs from "node:fs";
import path from "node:path";
import type { Course } from "@/types/course";
import CourseDetailPage from "@/components/course/CourseDetailPage";
import { PageProps } from "../../../../../.next/types/app/layout";
import { notFound } from "next/navigation";

interface CoursePageProps extends PageProps {
  params: Promise<{ courseId: string }>; // ✅ works in all cases
}

function readCourses(): Course[] {
  const filePath = path.join(process.cwd(), "src", "mock", "courses.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Course[];
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!; // from .env

async function getCourse(id: string) {
  const res = await fetch(`${BASE_URL}/api/courses/${id}`, {
    next: { revalidate: 300, tags: ["courses", `course:${id}`] },
  });
  if (res.status === 404) return null;
  if (!res.ok) return null;
  return await res.json(); // snake_case object
}

async function getSimilar(category?: string, excludeId?: string) {
  if (!category) return [];
  const params = new URLSearchParams({ category, limit: "8", page: "1" });
  const res = await fetch(`${BASE_URL}/api/courses?${params.toString()}`, {
    next: { revalidate: 300, tags: ["courses"] },
  });
  if (!res.ok) return [];
  const json = await res.json();
  return (json.data ?? []).filter((c: any) => c.id !== excludeId); // snake_case rows
}
// modify to read the actuall course and then use it instead of this behavair
export default async function Page({ params }: CoursePageProps) {
  const { courseId } = await params; // ✅ handles Promise or plain object

  /*const courses = readCourses();
  const course = courses.find((c) => c.id === courseId);

  if (!course) {
    return <div>Course not found.</div>;
  }

  const similarCourses = courses.filter(
    (c) => c.id !== course.id && c.category === course.category,
  );*/
  const course = await getCourse(courseId);
  if (!course) return notFound();

  const similarCourses = await getSimilar(course.category, course.id);

  return <CourseDetailPage course={course} similarCourses={similarCourses} />;
}
