"use client";
import type { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

import { Course } from "@/types/course";
import CourseRow from "../CourseRow";
import Link from "next/link";

export const columns: ColumnDef<Course>[] = [
  {
    id: "title",
    accessorKey: "title",
    header: () => null,
    cell: () => null,
    enableHiding: true,
    meta: { filterVariant: "text" },
    size: 0,
    minSize: 0,
    maxSize: 0,
  },
  {
    id: "category",
    accessorKey: "category",
    header: () => null,
    cell: () => null,
    enableHiding: true,
    meta: { filterVariant: "text" },
    size: 0,
    minSize: 0,
    maxSize: 0,
  },
  {
    id: "address",
    accessorKey: "address",
    header: () => null,
    cell: () => null,
    enableHiding: true,
    meta: { filterVariant: "text" },
    size: 0,
    minSize: 0,
    maxSize: 0,
  },
  {
    accessorKey: "email",
    //minSize: 220,
    //size: 50,
    header: () => null,
    cell: () => null,
    enableHiding: true,
    meta: { filterVariant: "text" },
    size: 0,
    minSize: 0,
    maxSize: 0,
  },
  {
    id: "row",
    header: () => null,
    accessorFn: (row) => row,
    cell: ({ row }) => {
      const course: Course = row.original;

      console.log("course.id: ", course.id);
      return (
        <Link key={course.id} href={`/landing/courses/${course.id}`}>
          <CourseRow course={course} />
        </Link>
      );
    },
    enableResizing: false,
    //size: Number.MAX_SAFE_INTEGER,
  },
];
