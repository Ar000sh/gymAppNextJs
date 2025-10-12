import Table from "@/components/table/table";
import { columns } from "@/components/course/table/columns";
import { Course } from "@/types/course";
import path from "path";
import fs from "node:fs";

function readCourses(): Course[] {
  const filePath = path.join(process.cwd(), "src", "mock", "courses.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as Course[];
}
export default function PaymentsPage() {
  const allowedFilters = ["title", "address", "category"];
  const courses = readCourses();
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
