import { useNavigate } from "react-router-dom";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type SortingFn,
  type SortingState,
} from "@tanstack/react-table";
import { useMemo, useReducer, useState } from "react";
import Checkbox from "../../components/atoms/Checkbox/Checkbox";

type Job = {
  id: number;
  position: string;
  company: string;
  status: string;
  applicationDate: string;
  interviewDate?: string;
  country: string;
  expectation: string;
  description: string;
};

const jobs: Job[] = [
  {
    id: 1,
    position: "Software Engineer",
    company: "Tech Corp",
    status: "Applied",
    applicationDate: "2023-01-15",
    interviewDate: "2023-02-01",
    country: "USA",
    expectation: "Remote",
    description: "Develop and maintain web applications.",
  },
  {
    id: 2,
    position: "Data Scientist",
    company: "Data Solutions",
    status: "Interviewed",
    applicationDate: "2023-01-20",
    interviewDate: "2023-02-05",
    country: "Canada",
    expectation: "On-site",
    description: "Analyze data and build predictive models.",
  },
  {
    id: 3,
    position: "Product Manager",
    company: "Innovate Inc.",
    status: "Offered",
    applicationDate: "2023-01-25",
    interviewDate: "2023-02-10",
    country: "UK",
    expectation: "Hybrid",
    description: "Lead product development and strategy.",
  },
  {
    id: 4,
    position: "UX Designer",
    company: "Design Studio",
    status: "Rejected",
    applicationDate: "2023-01-30",
    interviewDate: "2023-02-15",
    country: "Australia",
    expectation: "Remote",
    description: "Create user-friendly designs and interfaces.",
  },
];

const sortStatusFn: SortingFn<Job> = (rowA, rowB, _columnId) => {
  const statusA = rowA.original.status;
  const statusB = rowB.original.status;
  const statusOrder = ["single", "complicated", "relationship"];
  return statusOrder.indexOf(statusA) - statusOrder.indexOf(statusB);
};

export default function JobTrackerPage() {
  const navigate = useNavigate();

  const rerender = useReducer(() => ({}), {})[1];

  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<Job>[]>(
    () => [
      {
        accessorKey: "position",
        cell: (info) => info.getValue(),
        //this column will sort in ascending order by default since it is a string column
      },
      {
        accessorKey: "company",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "status",
        cell: (info) => info.getValue(),
        sortingFn: sortStatusFn, // Custom sorting function
      },
      {
        accessorKey: "applicationDate",
        cell: (info) => new Date(info.getValue()).toLocaleDateString(),
      },
      {
        accessorKey: "interviewDate",
        cell: (info) =>
          info.getValue()
            ? new Date(info.getValue()).toLocaleDateString()
            : "N/A",
      },
      {
        accessorKey: "country",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "expectation",
        cell: (info) => info.getValue(),
      },
      {
        accessorKey: "description",
        cell: (info) => info.getValue(),
      },
    ],
    []
  );

  const [data, setData] = useState(jobs);

  const table = useReactTable({
    columns,
    data,
    debugTable: true,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <div>
      <div className="flex items-center px-4 border-b border-[BBBBBB] h-[48px]">
        All Jobs
      </div>
      <div className="flex items-center px-4 border-b border-[BBBBBB] h-[48px]">
        Sort
      </div>
      <table className="w-full caption-bottom text-sm -outline-offset-2 data-[focus-visible]:outline-ring">
        <thead className="[&_tr]:border-b">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              <th>
                <Checkbox />
              </th>
              {headerGroup.headers.map((header) => {
                return (
                  <th
                    key={header.id}
                    colSpan={header.colSpan}
                    className="px-4 h-12 text-left align-middle font-semibold text-muted-foreground -outline-offset-2 data-[focus-visible]:outline-ring"
                  >
                    <div className="flex gap-1.5 items-center">
                      {/* {header.index === 0 ? <Checkbox /> : null} */}
                      {header.isPlaceholder ? null : (
                        <div
                          className={
                            header.column.getCanSort()
                              ? "cursor-pointer select-none capitalize"
                              : ""
                          }
                          onClick={header.column.getToggleSortingHandler()}
                          title={
                            header.column.getCanSort()
                              ? header.column.getNextSortingOrder() === "asc"
                                ? "Sort ascending"
                                : header.column.getNextSortingOrder() === "desc"
                                ? "Sort descending"
                                : "Clear sort"
                              : undefined
                          }
                        >
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                          {{
                            asc: " 🔼",
                            desc: " 🔽",
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>
        <tbody>
          {table
            .getRowModel()
            .rows.slice(0, 10)
            .map((row) => {
              return (
                <tr
                  key={row.id}
                  className="border-b -outline-offset-2 transition-colors data-[hovered]:bg-muted/50 data-[selected]:bg-muted data-[focus-visible]:outline-ring"
                  onClick={() =>
                    navigate(`/job-description/${row.original.id}`)
                  }
                >
                  <td className="text-center">
                    <Checkbox />
                  </td>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        className="p-4 align-middle -outline-offset-2 data-[focus-visible]:outline-ring [&:has([role=checkbox])]:pr-0"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
