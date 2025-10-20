import { supabaseServer } from "@/lib/server";
import { NextResponse } from "next/server";

export const revalidate = 300;

export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams;

  const limit = Math.min(parseInt(q.get("limit") || "100", 10), 500);
  const page = Math.max(parseInt(q.get("page") || "1", 10), 1);
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const title = q.get("title") || "";
  const category = q.get("category") || "";
  const address = q.get("address") || "";
  const startFrom = q.get("startFrom") || "";
  const startTo = q.get("startTo") || "";

  const sb = supabaseServer();
  let query = sb
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
      { count: "exact" },
    )
    .order("start_date", { ascending: true }) // use real column name
    .range(from, to);

  if (title) query = query.ilike("title", `%${title}%`);
  if (category) query = query.ilike("category", `%${category}%`);
  if (address) query = query.ilike("address", `%${address}%`);
  if (startFrom) query = query.gte("start_date", startFrom);
  if (startTo) query = query.lte("start_date", startTo);

  const { data, error, count } = await query;
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({
    data: data ?? [], // snake_case rows
    page,
    limit,
    total: count ?? 0,
    hasMore: from + (data?.length ?? 0) < (count ?? 0),
  });
}
