"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "../payments/data-table";
import { Payment } from "../payments/columns";
//import { columns, type Payment } from "./columns";
//import { DataTable } from "./data-table";

//"pending" | "processing" | "success" | "failed"

function getData(): Payment[] {
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "a@exampssle.com",
    },
    {
      id: "728ed53f",
      amount: 200,
      status: "processing",
      email: "b@gmail.com",
    },
    {
      id: "728ed54f",
      amount: 90,
      status: "pending",
      email: "c@yahoo.com",
    },
    {
      id: "728ed55f",
      amount: 100,
      status: "success",
      email: "d@example.com",
    },
    {
      id: "728ed56f",
      amount: 0,
      status: "pending",
      email: "e@example.com",
    },
    {
      id: "728ed57f",
      amount: 100,
      status: "processing",
      email: "f@exampssle.com",
    },
    {
      id: "728ed58f",
      amount: 99,
      status: "failed",
      email: "g@gmail.com",
    },
    {
      id: "728ed59f",
      amount: 100,
      status: "success",
      email: "h@test.com",
    },
    {
      id: "728ed510f",
      amount: 100,
      status: "pending",
      email: "i@example.com",
    },
    {
      id: "728ed511f",
      amount: 398,
      status: "pending",
      email: "j@example.com",
    },
    {
      id: "728ed511g",
      amount: 100,
      status: "processing",
      email: "k@example.com",
    },
    {
      id: "728ed511h",
      amount: 100,
      status: "failed",
      email: "l@gmail.com",
    },
    {
      id: "728ed511i",
      amount: 78,
      status: "pending",
      email: "n@example.com",
    },
    {
      id: "728ed511j",
      amount: 20,
      status: "success",
      email: "m@example.com",
    },
    {
      id: "728ed511k",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
  ];
}

interface TableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  allowedFilters: string[];
  withOutHeader?: boolean;
  withOutBorder?: boolean;
  withOutRowDividers?: boolean;
}
export default function Table<TData, TValue>({
  columns,
  data,
  allowedFilters,
  withOutHeader,
  withOutBorder,
  withOutRowDividers,
}: TableProps<TData, TValue>) {
  //const data = getData();

  console.log("data length: ", data.length);
  return (
    <div className="h-full w-full bg-white">
      <div className="container mx-auto py-10">
        <DataTable
          columns={columns}
          data={data as TData[]}
          allowedFilters={allowedFilters}
          withOutHeader={withOutHeader}
          withOutBorder={withOutBorder}
          withOutRowDividers={withOutRowDividers}
        />
      </div>
    </div>
  );
}
