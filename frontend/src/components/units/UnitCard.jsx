import React from "react";
import {
  Building2,
  MapPin,
  Ruler,
  DollarSign,
  Home,
  Calendar,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/Card";
import { Button } from "../ui/Button";
import { formatPrice, formatArea } from "../../lib/utils";

export function UnitCard({ unit }) {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const images = unit.images && unit.images.length > 0 ? unit.images : [];

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Card className="h-full hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Image Slider */}
      <div className="relative w-full h-48 overflow-hidden bg-gradient-to-br from-primary/10 to-primary/5 flex items-center justify-center">
        {images.length > 0 ? (
          <>
            <img
              src={images[currentImageIndex]}
              alt={`${unit.name || unit.type_name || "Unit"} - ${currentImageIndex + 1}`}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                  {images.slice(0, 5).map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-1.5 rounded-full transition-all ${
                        idx === currentImageIndex
                          ? "w-6 bg-white"
                          : "w-1.5 bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <Building2 className="h-16 w-16 mb-2" />
            <span className="text-sm">{unit.type_name || "عقار"}</span>
          </div>
        )}
      </div>

      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent line-clamp-2">
            {unit.name || unit.type_name || "وحدة عقارية"}
          </CardTitle>
          <span className="text-xs px-2.5 py-1 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 text-primary font-bold whitespace-nowrap shadow-sm">
            {unit.nature_name || "سكني"}
          </span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Project Name */}
        <div className="flex items-center gap-2 text-sm">
          <Building2 className="h-4 w-4 text-primary flex-shrink-0" />
          <span className="font-semibold line-clamp-1">
            {unit.project_name || "غير محدد"}
          </span>
        </div>

        {/* Area */}
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <span className="line-clamp-1">{unit.area_name || "غير محدد"}</span>
        </div>

        {/* Space */}
        <div className="flex items-center gap-2 text-sm">
          <Ruler className="h-4 w-4 text-muted-foreground flex-shrink-0" />
          <span>{formatArea(unit.area_sq_m)}</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 px-3 py-2 rounded-lg -mx-1">
          <DollarSign className="h-5 w-5 text-green-600 flex-shrink-0" />
          <span className="text-xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            {formatPrice(unit.price)}
          </span>
        </div>

        {/* Additional Info */}
        <div className="grid grid-cols-2 gap-2 pt-2 border-t">
          {unit.bedrooms && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Home className="h-3 w-3 flex-shrink-0" />
              <span>{unit.bedrooms} غرف</span>
            </div>
          )}
          {unit.baths && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Home className="h-3 w-3 flex-shrink-0" />
              <span>{unit.baths} حمام</span>
            </div>
          )}
          {unit.delivery_year && (
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-3 w-3 flex-shrink-0" />
              <span>{unit.delivery_year}</span>
            </div>
          )}
        </div>

        {/* Developer */}
        {unit.developer_name && (
          <div className="text-xs text-muted-foreground pt-2 line-clamp-1">
            المطور: <span className="font-semibold">{unit.developer_name}</span>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button
          className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all"
          onClick={() => navigate(`/units/${unit.id}`)}
        >
          عرض التفاصيل
        </Button>
      </CardFooter>
    </Card>
  );
}
