import Table from "@/components/table/table";
import { columns } from "@/components/course/table/columns";
import { Course } from "@/types/course";
import path from "path";
import fs from "node:fs";
import { supabaseServer } from "@/lib/server";

function readCourses(): Course[] {
  const filePath = path.join(process.cwd(), "src", "mock", "courses.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Course[];
}
// Re-generate at most every 5 minutes
export const revalidate = 300;

const INITIAL_LIMIT = 100;

async function getCourses(limit = INITIAL_LIMIT): Promise<Course[]> {
  const supabase = supabaseServer();

  const { data, error } = await supabase
    .from("classes")
    .select(
      `
      id,
      category,
      title,
      subtitle,
      description,
      image_url,
      start_date,
      start_time,
      end_date,
      end_time,
      age_restriction,
      address,
      email,
      sessions
    `,
    )
    .order("start_date", { ascending: true })
    .limit(limit);

  if (error) {
    console.error("Supabase(classes) error:", error);
    return [];
  }
  return (data ?? []) as Course[];
}
export default async function PaymentsPage() {
  const allowedFilters = ["title", "address", "category"];
  //const courses = readCourses();
  const courses = await getCourses();
  console.log("data: ", courses);
  return (
    <main className="h-full pt-24">
      <Table
        columns={columns}
        data={courses}
        allowedFilters={allowedFilters}
        withOutHeader={true}
        withOutRowDividers={true}
      />
    </main>
  );
}
