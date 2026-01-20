import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Loader2, Building2, MapPin, Users } from "lucide-react";
import { projectsAPI } from "../services/api";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Pagination } from "../components/ui/Pagination";
import { Button } from "../components/ui/Button";

export function ProjectsPage() {
  const [page, setPage] = useState(1);
  const limit = 12;

  const { data, isLoading, error } = useQuery({
    queryKey: ["projects", page],
    queryFn: () => projectsAPI.getAll({ page, limit }),
  });

  const projects = data?.data?.data || [];
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
        <h1 className="text-4xl font-bold text-primary">المشاريع العقارية</h1>
        <p className="text-muted-foreground">
          {pagination.total ? `${pagination.total} مشروع` : "جاري التحميل..."}
        </p>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
        </div>
      )}

      {/* Projects Grid */}
      {!isLoading && projects.length > 0 && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <Card
                key={project.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <CardTitle className="flex items-start gap-2">
                    <Building2 className="h-5 w-5 text-primary mt-1" />
                    <span className="text-lg">{project.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Area */}
                  {project.area_name && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>{project.area_name}</span>
                    </div>
                  )}

                  {/* Developer */}
                  {project.developer_name && (
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>{project.developer_name}</span>
                    </div>
                  )}

                  {/* Units Count */}
                  {project.units_count && (
                    <div className="pt-2 border-t">
                      <span className="text-sm font-semibold text-primary">
                        {project.units_count} وحدة متاحة
                      </span>
                    </div>
                  )}

                  <Button className="w-full mt-4">عرض الوحدات</Button>
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
      {!isLoading && projects.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">لا توجد مشاريع متاحة</p>
        </div>
      )}
    </div>
  );
}
