import Table from "@/components/table/table";
import { columns } from "@/components/course/table/columns";
import { Course } from "@/types/course";

// Re-generate at most every 5 minutes
const INITIAL_LIMIT = 100;
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!; // from .env

async function getCourses(limit = INITIAL_LIMIT) {
  const params = new URLSearchParams({
    limit: `${limit}`,
  });
  const res = await fetch(`${BASE_URL}/api/courses?${params.toString()}`, {
    next: { revalidate: 300, tags: ["courses"] },
  });

  if (!res.ok) return [];
  const json = await res.json();
  console.log("res: ", json);
  return (json.data as Course[]) ?? []; // snake_case rows
}

export default async function PaymentsPage() {
  const allowedFilters = ["title", "address", "category"];
  const courses = await getCourses();
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
