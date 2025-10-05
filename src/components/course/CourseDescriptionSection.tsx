import type { Course } from "@/types/course";

interface CourseDescriptionSectionProps {
  course: Course;
}

export default function CourseDescriptionSection({ course }: CourseDescriptionSectionProps) {
  return (
    <section>
      <h2>Description</h2>
      <p>{course.description}</p>
      <h3>Location</h3>
      <p>{course.address}</p>
      <h3>Contact</h3>
      <p>{course.email}</p>
    </section>
  );
}


