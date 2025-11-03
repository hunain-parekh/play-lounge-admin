import { mockCategories } from "@/data/categories";

import { CategoryTable } from "./_components/category-table";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <CategoryTable initialData={mockCategories} />
    </div>
  );
}
