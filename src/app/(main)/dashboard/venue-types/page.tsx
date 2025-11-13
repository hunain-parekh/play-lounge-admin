import { VenueTypeTable } from "./_components/venue-type-table";

export default function Page() {
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      <VenueTypeTable />
    </div>
  );
}
