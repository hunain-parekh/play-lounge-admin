"use client";

import * as React from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Category } from "@/types/category";

import { IconPicker } from "./icon-picker";
import { categoryFormSchema, type CategoryFormValues } from "./schema";

interface CategoryDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category?: Category | null;
  onSubmit: (data: Category) => void;
}

export function CategoryDialog({ open, onOpenChange, category, onSubmit }: CategoryDialogProps) {
  const [imagePreview, setImagePreview] = React.useState<string>("");

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categoryFormSchema),
    defaultValues: {
      name: "",
      icon: undefined,
      image: undefined,
    },
  });

  const watchedName = form.watch("name");

  React.useEffect(() => {
    if (category) {
      form.reset({
        name: category.name,
        icon: category.icon,
        image: category.image,
      });
      setImagePreview(category.image ?? "");
    } else {
      form.reset({
        name: "",
        icon: undefined,
        image: undefined,
      });
      setImagePreview("");
    }
  }, [category, form, open]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onFormSubmit = (data: CategoryFormValues) => {
    // Generate slug from name
    const slug = data.name.toLowerCase().replace(/\s+/g, "-");

    // Generate unique ID for new categories
    const id = category?.id ?? `cat-${Date.now()}`;

    // Prepare image (use preview if new file, otherwise existing)
    const imageUrl = imagePreview || (category?.image ?? "");

    const categoryData: Category = {
      id,
      name: data.name,
      slug,
      image: imageUrl,
      icon: data.icon,
      createdAt: category?.createdAt ?? new Date().toISOString(),
    };

    onSubmit(categoryData);
    toast.success(category ? "Category updated successfully" : "Category created successfully");
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{category ? "Edit Category" : "Create Category"}</DialogTitle>
          <DialogDescription>
            {category ? "Update category details below." : "Add a new category to your system."}
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onFormSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="icon"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Icon</FormLabel>
                  <FormControl>
                    <IconPicker value={field.value} onChange={(value) => field.onChange(value)} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="image"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Image</FormLabel>
                  <FormControl>
                    <div className="space-y-2">
                      <Input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          handleImageChange(e);
                          field.onChange(e.target.files?.[0] ?? undefined);
                        }}
                        className="cursor-pointer"
                      />
                      {imagePreview && (
                        <div className="relative size-32 overflow-hidden rounded-md border">
                          <img src={imagePreview} alt="Preview" className="size-full object-cover" />
                        </div>
                      )}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormItem>
              <FormLabel>Slug (Auto-generated)</FormLabel>
              <Input
                value={watchedName ? watchedName.toLowerCase().replace(/\s+/g, "-") : ""}
                disabled
                className="bg-muted"
              />
            </FormItem>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit">{category ? "Update Category" : "Create Category"}</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
