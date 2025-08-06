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
import { useMemo, useState } from "react";
import Checkbox from "../../components/atoms/Checkbox/Checkbox";
import { Button } from "../../components/atoms/Button/Button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/atoms/Dialog/Dialog";
import { Input } from "../../components/atoms/Input/Input";
import { Label } from "../../components/atoms/Label/Label";
import { useGetJobsByUserId } from "../../api/job";

type Job = {
  id: number;
  position: string;
  company: string;
  status: string;
  applicationDate: string;
  interviewDate: string;
  country: string;
  expectation: string;
  description: string;
};

const sortStatusFn: SortingFn<Job> = (rowA, rowB) => {
  const statusA = rowA.original.status;
  const statusB = rowB.original.status;
  const statusOrder = ["single", "complicated", "relationship"];
  return statusOrder.indexOf(statusA) - statusOrder.indexOf(statusB);
};

export default function JobTrackerPage() {
  const navigate = useNavigate();
  const { data: jobs } = useGetJobsByUserId(10101);

  const [sorting, setSorting] = useState<SortingState>([]);

  const columns = useMemo<ColumnDef<Job>[]>(
    () => [
      {
        accessorKey: "position",
        cell: (info) => info.getValue(),
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
        cell: (info) =>
          new Date(info.getValue() as string).toLocaleDateString(),
      },
      {
        accessorKey: "interviewDate",
        cell: (info) =>
          info.getValue()
            ? new Date(info.getValue() as string).toLocaleDateString()
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

  const convertedJobs: Job[] = useMemo(() => {
    return (jobs ?? []).map((job) => {
      const data = job.data as Job; // Type assertion
      return {
        id: job.id,
        position: data.position,
        company: data.company,
        status: data.status,
        applicationDate: data.applicationDate,
        interviewDate: data.interviewDate,
        country: data.country,
        expectation: data.expectation,
        description: data.description,
      };
    });
  }, [jobs]);

  const table = useReactTable({
    columns,
    data: convertedJobs,
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
      <div className="flex items-center px-4 border-b border-[BBBBBB] h-[48px] justify-between">
        <div>All Jobs</div>
        <Dialog>
          <form>
            <DialogTrigger asChild>
              <Button variant="default">
                <Plus /> New Job
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[680px]">
              <DialogHeader>
                <DialogTitle>Add Job Application</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4">
                <div className="grid gap-3">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    name="position"
                    defaultValue="Software Engineer"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="company">Company</Label>
                  <Input id="company" name="company" defaultValue="@peduarte" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="status">Status</Label>
                  <Input id="status" name="status" defaultValue="Applied" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="applicationDate">Application Date</Label>
                  <Input
                    id="applicationDate"
                    name="applicationDate"
                    defaultValue="2023-01-01"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="interviewDate">Interview Date</Label>
                  <Input
                    id="interviewDate"
                    name="interviewDate"
                    defaultValue="2023-01-01"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="country">Country</Label>
                  <Input id="country" name="country" defaultValue="USA" />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="expectation">Expectation</Label>
                  <Input
                    id="expectation"
                    name="expectation"
                    defaultValue="$100,000 - $120,000"
                  />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="description">Description</Label>
                  <Input id="description" name="description" />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </DialogContent>
          </form>
        </Dialog>
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
