import { supabaseServer } from "@/lib/server";
import { NextResponse } from "next/server";

export const revalidate = 300;

export async function GET(
  _req: Request,
  ctx: { params: Promise<{ id: string }> }, // <- params is a Promise,
) {
  const { id } = await ctx.params; // <- await it

  const sb = supabaseServer();
  const { data, error } = await sb
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
    .eq("id", id)
    .maybeSingle();

  if (error)
    return NextResponse.json({ error: error.message }, { status: 500 });
  if (!data) return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(data); // snake_case out
}
