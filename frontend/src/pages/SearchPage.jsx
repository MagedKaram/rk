import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Search as SearchIcon, Loader2 } from "lucide-react";
import { searchAPI } from "../services/api";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { UnitCard } from "../components/units/UnitCard";

export function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");

  const { data, isLoading, error } = useQuery({
    queryKey: ["search", submittedQuery],
    queryFn: () => searchAPI.search(submittedQuery, { limit: 20 }),
    enabled: !!submittedQuery,
  });

  const results = data?.data?.data || [];

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSubmittedQuery(searchQuery.trim());
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-primary">البحث المتقدم</h1>
        <p className="text-muted-foreground">
          ابحث عن الوحدة، المشروع، أو المطور
        </p>
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex gap-4">
        <Input
          type="text"
          placeholder="ابحث هنا... (مثال: فيلا، القاهرة الجديدة، ...)"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" size="lg" disabled={isLoading}>
          {isLoading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <SearchIcon className="h-4 w-4 ml-2" />
              بحث
            </>
          )}
        </Button>
      </form>

      {/* Results */}
      {submittedQuery && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold">
              نتائج البحث عن "{submittedQuery}"
            </h2>
            {results.length > 0 && (
              <span className="text-muted-foreground">
                {results.length} نتيجة
              </span>
            )}
          </div>

          {/* Loading */}
          {isLoading && (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          )}

          {/* Results Grid */}
          {!isLoading && results.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((unit) => (
                <UnitCard key={unit.id} unit={unit} />
              ))}
            </div>
          )}

          {/* No Results */}
          {!isLoading && results.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                لم يتم العثور على نتائج لـ "{submittedQuery}"
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                جرب كلمات بحث أخرى
              </p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="text-center py-12">
              <p className="text-destructive">حدث خطأ في البحث</p>
            </div>
          )}
        </div>
      )}

      {/* Initial State */}
      {!submittedQuery && (
        <div className="text-center py-12 space-y-4">
          <SearchIcon className="h-16 w-16 text-muted-foreground mx-auto" />
          <p className="text-muted-foreground">
            ابدأ البحث للعثور على الوحدة المثالية
          </p>
        </div>
      )}
    </div>
  );
}
