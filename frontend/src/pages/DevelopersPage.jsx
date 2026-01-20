import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Users, Building2 } from "lucide-react";
import { developersAPI } from "../services/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Pagination } from "../components/ui/Pagination";
import { Button } from "../components/ui/Button";

export function DevelopersPage() {
  const [page, setPage] = useState(1);
  const limit = 12;

  const { data, isLoading, error } = useQuery({
    queryKey: ["developers", page],
    queryFn: () => developersAPI.getAll({ page, limit }),
  });

  const developers = data?.data?.data || [];
  const pagination = data?.data?.pagination || {};

  const handlePageChange = (newPage) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">حدث خطأ في تحميل البيانات</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-primary">
          شركات التطوير العقاري
        </h1>
        <p className="text-muted-foreground">
          {pagination.total ? `${pagination.total} شركة` : "جاري التحميل..."}
        </p>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      )}

      {/* Developers Grid */}
      {!isLoading && developers.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {developers.map((developer) => (
              <Card
                key={developer.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <CardTitle className="flex items-start gap-2">
                    <Users className="h-5 w-5 text-primary mt-1" />
                    <span className="text-lg">{developer.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Projects Count */}
                  {developer.projects_count && (
                    <div className="flex items-center gap-2 text-sm">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {developer.projects_count} مشروع
                      </span>
                    </div>
                  )}

                  {/* Units Count */}
                  {developer.units_count && (
                    <div className="pt-2 border-t">
                      <span className="text-sm font-semibold text-primary">
                        {developer.units_count} وحدة متاحة
                      </span>
                    </div>
                  )}

                  <Button className="w-full mt-4">عرض المشاريع</Button>
                </CardContent>
              </Card>
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
      {!isLoading && developers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">لا توجد شركات متاحة</p>
        </div>
      )}
    </div>
  );
}
