"use client";

import * as React from "react";

import { Plus } from "lucide-react";

import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableViewOptions } from "@/components/data-table/data-table-view-options";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction } from "@/components/ui/card";
import { useDataTableInstance } from "@/hooks/use-data-table-instance";
import { Category } from "@/types/category";

import { CategoryDialog } from "./category-dialog";
import { createColumns } from "./columns";
import { DeleteAlert } from "./delete-alert";

interface CategoryTableProps {
  initialData: Category[];
}

export function CategoryTable({ initialData }: CategoryTableProps) {
  const [data, setData] = React.useState(initialData);
  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = React.useState(false);
  const [selectedCategory, setSelectedCategory] = React.useState<Category | null>(null);

  const columns = React.useMemo(
    () =>
      createColumns({
        onEdit: (category) => {
          setSelectedCategory(category);
          setIsDialogOpen(true);
        },
        onDelete: (category) => {
          setSelectedCategory(category);
          setIsDeleteOpen(true);
        },
      }),
    [],
  );

  const table = useDataTableInstance({
    data,
    columns,
    getRowId: (row) => row.id,
  });

  const handleCreate = () => {
    setSelectedCategory(null);
    setIsDialogOpen(true);
  };

  const handleDelete = () => {
    if (selectedCategory) {
      setData((prev) => prev.filter((cat) => cat.id !== selectedCategory.id));
      setIsDeleteOpen(false);
      setSelectedCategory(null);
    }
  };

  const handleSubmit = (categoryData: Category) => {
    if (selectedCategory) {
      // Update existing category
      setData((prev) => prev.map((cat) => (cat.id === categoryData.id ? categoryData : cat)));
    } else {
      // Create new category
      setData((prev) => [...prev, categoryData]);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
        <CardDescription>Manage your product categories and their details.</CardDescription>
        <CardAction>
          <div className="flex items-center gap-2">
            <DataTableViewOptions table={table} />
            <Button variant="outline" size="sm" onClick={handleCreate}>
              <Plus />
              <span className="hidden lg:inline">Add Category</span>
            </Button>
          </div>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="overflow-hidden rounded-md border">
            <DataTable table={table} columns={columns} />
          </div>
          <DataTablePagination table={table} />
        </div>
      </CardContent>

      <CategoryDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        category={selectedCategory}
        onSubmit={handleSubmit}
      />

      <DeleteAlert
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        category={selectedCategory}
        onConfirm={handleDelete}
      />
    </Card>
  );
}
