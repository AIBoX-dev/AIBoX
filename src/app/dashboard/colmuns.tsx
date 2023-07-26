"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"

import { Column, ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, MoreHorizontal, Pencil, Trash2 } from 'lucide-react'
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

export type article = {
  title: string,
  wordCount: number,
  status: string,
  lastUpdated: string
}

const TableHeader = ({column, title}: {
  column: Column<article, unknown>,
  title: string
}) => {
  return (
    <Button
      variant="ghost"
      size="sm"
      className="-ml-3"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    >
      {title}
      <ArrowUpDown className="ml-2 h-4 w-4" />
    </Button>
  )
}

export const columns: ColumnDef<article>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value: any) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="すべて選択"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value: any) => row.toggleSelected(!!value)}
        aria-label="行を選択"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "title",
    header: "タイトル",
  },
  {
    accessorKey: "wordCount",
    header: ({ column }) => {
      return <TableHeader column={column} title="文字数" />
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return <TableHeader column={column} title="状態" />
    },
    cell: ({ row }) => {
      return (
        <Badge variant="outline" className={
          row.getValue("status") == "全体公開" ? "" : row.getValue("status") == "下書き" ? "border-blue-300 dark:border-blue-900" : "border-orange-300 dark:border-orange-900"}>{row.getValue("status")}</Badge>
      )
    }
  },
  {
    accessorKey: "lastUpdated",
    header: ({ column }) => {
      return <TableHeader column={column} title="最終更新" />
    }
  },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className="text-right">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem className="gap-x-2">
                <Pencil className="w-4 h-4" />
                編集する
              </DropdownMenuItem>
              <DropdownMenuItem className="gap-x-2">
                <Trash2 className="w-4 h-4" />
                削除する
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )
    },
  }
]