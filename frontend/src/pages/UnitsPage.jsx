import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { unitsAPI, areasAPI, typesAPI } from "../services/api";
import { UnitCard } from "../components/units/UnitCard";
import { UnitFilters } from "../components/units/UnitFilters";
import { Pagination } from "../components/ui/Pagination";

export function UnitsPage() {
  const [page, setPage] = useState(1);
  const [filters, setFilters] = useState({});
  const limit = 12;

  // Fetch units
  const {
    data: unitsData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["units", page, filters],
    queryFn: () => unitsAPI.getAll({ page, limit, ...filters }),
  });

  // Fetch areas for filter
  const { data: areasData } = useQuery({
    queryKey: ["areas"],
    queryFn: () => areasAPI.getAll({ limit: 100 }),
  });

  // Fetch types for filter
  const { data: typesData } = useQuery({
    queryKey: ["types"],
    queryFn: () => typesAPI.getAll({ limit: 100 }),
  });

  const units = unitsData?.data?.data || [];
  const pagination = unitsData?.data?.pagination || {};
  const areas = areasData?.data?.data || [];
  const types = typesData?.data?.data || [];

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setPage(1); // Reset to first page when filters change
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">حدث خطأ في تحميل البيانات</p>
        <p className="text-sm text-muted-foreground mt-2">{error.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-primary">
          جميع الوحدات العقارية
        </h1>
        <p className="text-muted-foreground">
          {pagination.total
            ? `${pagination.total.toLocaleString("ar-EG")} وحدة متاحة`
            : "جاري التحميل..."}
        </p>
      </div>

      {/* Filters */}
      <UnitFilters
        onFilterChange={handleFilterChange}
        areas={areas}
        types={types}
      />

      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      )}

      {/* Units Grid */}
      {!isLoading && units.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {units.map((unit) => (
              <UnitCard key={unit.id} unit={unit} />
            ))}
          </div>

          {/* Pagination */}
          {pagination.pages > 1 && (
            <Pagination
              currentPage={pagination.page}
              totalPages={pagination.pages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}

      {/* Empty State */}
      {!isLoading && units.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            لا توجد وحدات متاحة بهذه المواصفات
          </p>
        </div>
      )}
    </div>
  );
}
