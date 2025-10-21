import { supabaseServer } from "@/lib/server";
import { NextResponse } from "next/server";

export const revalidate = 300;

type Filter = { op: string; value: string };

/*export async function GET(req: Request) {
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
}*/
function parseFilterValue(raw: string): Filter {
  const m = raw.match(/^([a-zA-Z_]+)\((.*)\)$/);
  if (!m) return { op: "eq", value: raw };
  const [, op, inner] = m;
  return { op: op.toLowerCase(), value: inner };
}
export async function GET(req: Request) {
  const url = new URL(req.url);
  const q = url.searchParams;

  // 1) read params
  const limit = Math.min(parseInt(q.get("limit") || "20", 10), 200);
  console.log("limit: ", limit);
  const cursor = q.get("cursor"); // base64 of { startDate, id }

  // 2) base query
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
    )
    .order("start_date", { ascending: true })
    .order("id", { ascending: true }) // tie-breaker
    .limit(limit);

  // Filters

  for (const [key, raw] of q.entries()) {
    const filter = parseFilterValue(raw);
    if (key === "limit") continue;
    switch (filter.op) {
      case "eq":
        query = query.eq(key, filter.value);
        break;
      case "not":
        query = query.neq(key, filter.value);
        break;
      case "gt":
        query = query.gt(key, filter.value);
        break;
      case "gte":
        query = query.gte(key, filter.value);
        break;
      case "lt":
        query = query.lt(key, filter.value);
        break;
      case "lte":
        query = query.lte(key, filter.value);
        break;
      case "like":
        // if you pass raw wildcards, e.g., like(%foo%), keep value as-is
        query = query.like(key, filter.value);
        break;
      case "contains":
        query = query.ilike(key, `%${filter.value}%`);
        break;
      default:
        // ignore unknown ops silently (or return 400 if you prefer)
        break;
    }
  }
  // 3) filters

  //if (title) query = query.ilike("title", `%${title}%`);
  //if (category) query = query.ilike("category", `%${category}%`);
  //if (address) query = query.ilike("address", `%${address}%`);
  //if (startFrom) query = query.gte("start_date", startFrom);
  //if (startTo) query = query.lte("start_date", startTo);

  // 4) apply cursor (Dynamo-style "start after")
  if (cursor) {
    try {
      const decoded = JSON.parse(
        Buffer.from(cursor, "base64").toString("utf8"),
      ) as {
        startDate: string;
        id: string;
      };
      // (start_date > cDate) OR (start_date = cDate AND id > cId)
      query = query.or(
        `start_date.gt.${decoded.startDate},and(start_date.eq.${decoded.startDate},id.gt.${decoded.id})`,
      );
    } catch {
      return NextResponse.json({ error: "Invalid cursor" }, { status: 400 });
    }
  }

  // 5) run
  const { data, error } = await query;
  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });

  // 6) build nextCursor like Dynamo's LastEvaluatedKey
  const rows = data ?? [];
  const last = rows[rows.length - 1];
  const nextCursor =
    rows.length === limit && last
      ? Buffer.from(
          JSON.stringify({ startDate: last.start_date, id: last.id }),
        ).toString("base64")
      : null;

  return NextResponse.json({ data: rows, nextCursor });
}
