import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import {
  createVenueType,
  deleteVenueType,
  getVenueTypes,
  updateVenueType,
  type VenueTypeCreateInput,
  type VenueTypeUpdateInput,
} from "@/services/venue-type.service";

const VENUE_TYPES_QUERY_KEY = ["venue-types"];

// Hook to fetch all venue types
export const useVenueTypes = () => {
  return useQuery({
    queryKey: VENUE_TYPES_QUERY_KEY,
    queryFn: getVenueTypes,
    refetchOnWindowFocus: false,
    staleTime: 0, // Always consider data stale for immediate refetch
  });
};

// Hook to create a new venue type
export const useCreateVenueType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: VenueTypeCreateInput) => createVenueType(data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: VENUE_TYPES_QUERY_KEY });
      toast.success("Venue type created successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Failed to create venue type");
    },
  });
};

// Hook to update a venue type
export const useUpdateVenueType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: VenueTypeUpdateInput }) => updateVenueType(id, data),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: VENUE_TYPES_QUERY_KEY });
      toast.success("Venue type updated successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Failed to update venue type");
    },
  });
};

// Hook to delete a venue type
export const useDeleteVenueType = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => deleteVenueType(id),
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: VENUE_TYPES_QUERY_KEY });
      toast.success("Venue type deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message ?? "Failed to delete venue type");
    },
  });
};
