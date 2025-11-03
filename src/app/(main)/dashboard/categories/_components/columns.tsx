"use client";

import * as React from "react";

import { ColumnDef } from "@tanstack/react-table";
import * as Icons from "lucide-react";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Category } from "@/types/category";

interface ColumnsProps {
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export const createColumns = ({ onEdit, onDelete }: ColumnsProps): ColumnDef<Category>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "icon",
    header: "Icon",
    cell: ({ row }) => {
      const iconName = row.original.icon;
      if (!iconName) return <span className="text-muted-foreground text-sm">—</span>;

      const IconComponent = (Icons as unknown as Record<string, React.ComponentType<any>>)[iconName];
      return IconComponent ? (
        <IconComponent className="size-5" />
      ) : (
        <span className="text-muted-foreground text-sm">—</span>
      );
    },
    enableSorting: false,
  },
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="font-medium">{row.original.name}</div>,
  },
  {
    accessorKey: "slug",
    header: "Slug",
    cell: ({ row }) => <span className="text-muted-foreground font-mono text-sm">{row.original.slug}</span>,
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const imageUrl = row.original.image;
      if (!imageUrl) return <span className="text-muted-foreground text-sm">No image</span>;

      return (
        <div className="relative size-12 overflow-hidden rounded-md border">
          <img src={imageUrl} alt={row.original.name} className="size-full object-cover" />
        </div>
      );
    },
    enableSorting: false,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const category = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="size-8 p-0">
              <MoreHorizontal className="size-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onEdit(category)}>
              <Pencil className="mr-2 size-4" />
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => onDelete(category)} className="text-destructive focus:text-destructive">
              <Trash2 className="mr-2 size-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
