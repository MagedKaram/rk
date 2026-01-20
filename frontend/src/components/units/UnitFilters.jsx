import { useState } from "react";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "../ui/Input";
import { Button } from "../ui/Button";

export function UnitFilters({ onFilterChange, areas = [], types = [] }) {
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: "",
    maxPrice: "",
    minSpace: "",
    maxSpace: "",
    area_id: "",
    type_id: "",
    nature_id: "",
    developer_id: "",
  });

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleClearFilters = () => {
    const clearedFilters = {
      minPrice: "",
      maxPrice: "",
      minSpace: "",
      maxSpace: "",
      area_id: "",
      type_id: "",
      nature_id: "",
      developer_id: "",
    };
    setFilters(clearedFilters);
    onFilterChange(clearedFilters);
  };

  return (
    <div className="space-y-4">
      {/* Filter Toggle Button */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2"
        >
          <SlidersHorizontal className="h-4 w-4" />
          {showFilters ? "إخفاء الفلاتر" : "عرض الفلاتر"}
        </Button>
        {Object.values(filters).some((v) => v) && (
          <Button
            variant="ghost"
            onClick={handleClearFilters}
            className="flex items-center gap-2"
          >
            <X className="h-4 w-4" />
            مسح الفلاتر
          </Button>
        )}
      </div>

      {/* Filters Panel */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 bg-card rounded-lg border">
          {/* Price Range */}
          <div className="space-y-2">
            <label className="text-sm font-medium">السعر من</label>
            <Input
              type="number"
              placeholder="الحد الأدنى"
              value={filters.minPrice}
              onChange={(e) => handleFilterChange("minPrice", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">السعر إلى</label>
            <Input
              type="number"
              placeholder="الحد الأقصى"
              value={filters.maxPrice}
              onChange={(e) => handleFilterChange("maxPrice", e.target.value)}
            />
          </div>

          {/* Space Range */}
          <div className="space-y-2">
            <label className="text-sm font-medium">المساحة من (م²)</label>
            <Input
              type="number"
              placeholder="الحد الأدنى"
              value={filters.minSpace}
              onChange={(e) => handleFilterChange("minSpace", e.target.value)}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">المساحة إلى (م²)</label>
            <Input
              type="number"
              placeholder="الحد الأقصى"
              value={filters.maxSpace}
              onChange={(e) => handleFilterChange("maxSpace", e.target.value)}
            />
          </div>

          {/* Area Selection */}
          {areas.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">المنطقة</label>
              <select
                className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                value={filters.area_id}
                onChange={(e) => handleFilterChange("area_id", e.target.value)}
              >
                <option value="">جميع المناطق</option>
                {areas.map((area) => (
                  <option key={area.id} value={area.id}>
                    {area.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Type Selection */}
          {types.length > 0 && (
            <div className="space-y-2">
              <label className="text-sm font-medium">النوع</label>
              <select
                className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                value={filters.type_id}
                onChange={(e) => handleFilterChange("type_id", e.target.value)}
              >
                <option value="">جميع الأنواع</option>
                {types.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Nature Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium">الطبيعة</label>
            <select
              className="flex h-10 w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
              value={filters.nature_id}
              onChange={(e) => handleFilterChange("nature_id", e.target.value)}
            >
              <option value="">الكل</option>
              <option value="Residential">سكني</option>
              <option value="Vacation">مصيفي</option>
            </select>
          </div>
        </div>
      )}
    </div>
  );
}
