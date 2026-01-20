import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import {
  Building2,
  MapPin,
  Ruler,
  DollarSign,
  Home,
  Calendar,
  Users,
  Bath,
  ArrowLeft,
  ExternalLink,
  CreditCard,
  Clock,
} from "lucide-react";
import { unitsAPI } from "../services/api";
import { formatPrice, formatArea } from "../lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";
import { UnitMap } from "../components/units/UnitMap";

export function UnitDetailsPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const { data, isLoading, error } = useQuery({
    queryKey: ["unit", id],
    queryFn: () => unitsAPI.getById(id),
  });

  const unit = data?.data?.data;
  const images = unit?.images || [];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !unit) {
    return (
      <div className="text-center py-12">
        <p className="text-destructive">حدث خطأ في تحميل البيانات</p>
        <Button onClick={() => navigate("/units")} className="mt-4">
          العودة للوحدات
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate(-1)}
          className="hover:bg-primary/10"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            {unit.name || unit.type_name}
          </h1>
          <p className="text-muted-foreground mt-1">
            {unit.project_name} - {unit.area_name}
          </p>
        </div>
        {unit.url && (
          <Button
            variant="outline"
            className="bg-gradient-to-r from-primary/5 to-primary/10 hover:from-primary/10 hover:to-primary/20"
            asChild
          >
            <a href={unit.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4 ml-2" />
              الموقع الأصلي
            </a>
          </Button>
        )}
      </div>

      {/* Images Slider */}
      {images.length > 0 && (
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="relative aspect-video bg-gradient-to-br from-primary/10 to-primary/5">
              <img
                src={images[currentImageIndex]}
                alt={`${unit.name} - ${currentImageIndex + 1}`}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all hover:scale-110 shadow-lg"
                  >
                    <svg
                      className="h-6 w-6"
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
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/60 hover:bg-black/80 text-white p-3 rounded-full transition-all hover:scale-110 shadow-lg"
                  >
                    <svg
                      className="h-6 w-6"
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
                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/40 px-4 py-2 rounded-full backdrop-blur-sm">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`h-2 rounded-full transition-all ${
                          idx === currentImageIndex
                            ? "w-8 bg-white"
                            : "w-2 bg-white/50 hover:bg-white/70"
                        }`}
                      />
                    ))}
                  </div>
                  <div className="absolute top-4 right-4 bg-black/60 text-white px-3 py-1.5 rounded-full text-sm font-semibold backdrop-blur-sm">
                    {currentImageIndex + 1} / {images.length}
                  </div>
                </>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Price & Basic Info */}
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-primary/10">
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                تفاصيل السعر والمساحة
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <DollarSign className="h-5 w-5" />
                    <span className="text-sm font-medium">السعر</span>
                  </div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                    {formatPrice(unit.price)}
                  </p>
                  {unit.currency && (
                    <p className="text-sm text-muted-foreground">
                      {unit.currency}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Ruler className="h-5 w-5" />
                    <span className="text-sm font-medium">المساحة</span>
                  </div>
                  <p className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    {formatArea(unit.area_sq_m)}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                {unit.bedrooms && (
                  <div className="flex items-center gap-2">
                    <Home className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">غرف النوم</p>
                      <p className="font-semibold">{unit.bedrooms}</p>
                    </div>
                  </div>
                )}

                {unit.baths && (
                  <div className="flex items-center gap-2">
                    <Bath className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">الحمامات</p>
                      <p className="font-semibold">{unit.baths}</p>
                    </div>
                  </div>
                )}

                {unit.delivery_year && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">التسليم</p>
                      <p className="font-semibold">{unit.delivery_year}</p>
                    </div>
                  </div>
                )}

                {unit.type_name && (
                  <div className="flex items-center gap-2">
                    <Building2 className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">النوع</p>
                      <p className="font-semibold">{unit.type_name}</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Payment Plans */}
          {unit.payment_down_prices && unit.payment_down_prices.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  خطط الدفع المتاحة
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {unit.payment_down_prices.map((downPayment, index) => (
                    <div
                      key={index}
                      className="p-4 border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            المقدم
                          </p>
                          <p className="font-semibold">{downPayment}</p>
                          {unit.payment_down_percent &&
                            unit.payment_down_percent[index] && (
                              <p className="text-xs text-primary">
                                {unit.payment_down_percent[index]}
                              </p>
                            )}
                        </div>
                        {unit.payment_installment_years &&
                          unit.payment_installment_years[index] && (
                            <div>
                              <p className="text-sm text-muted-foreground">
                                مدة التقسيط
                              </p>
                              <p className="font-semibold">
                                {unit.payment_installment_years[index]} سنوات
                              </p>
                            </div>
                          )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Map */}
          {unit.lat && unit.lng && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  الموقع على الخريطة
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <UnitMap
                  lat={parseFloat(unit.lat)}
                  lng={parseFloat(unit.lng)}
                  name={unit.name}
                />
              </CardContent>
            </Card>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Project Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                المشروع
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-muted-foreground">اسم المشروع</p>
                <p className="font-semibold text-lg">{unit.project_name}</p>
              </div>
              {unit.developer_name && (
                <div>
                  <p className="text-sm text-muted-foreground">المطور</p>
                  <p className="font-semibold">{unit.developer_name}</p>
                </div>
              )}
              {unit.area_name && (
                <div>
                  <p className="text-sm text-muted-foreground">المنطقة</p>
                  <p className="font-semibold">{unit.area_name}</p>
                </div>
              )}
              {unit.nature_name && (
                <div>
                  <p className="text-sm text-muted-foreground">طبيعة العقار</p>
                  <p className="font-semibold">{unit.nature_name}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Additional Info */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                معلومات إضافية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              {unit.created && (
                <div>
                  <p className="text-muted-foreground">تاريخ الإضافة</p>
                  <p className="font-medium">
                    {new Date(unit.created).toLocaleDateString("ar-EG")}
                  </p>
                </div>
              )}
              {unit.modified && (
                <div>
                  <p className="text-muted-foreground">آخر تحديث</p>
                  <p className="font-medium">
                    {new Date(unit.modified).toLocaleDateString("ar-EG")}
                  </p>
                </div>
              )}
              {unit.id && (
                <div>
                  <p className="text-muted-foreground">رقم الوحدة</p>
                  <p className="font-medium">#{unit.id}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* CTA */}
          <Card className="overflow-hidden bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20 shadow-lg">
            <CardContent className="pt-6 space-y-4">
              <p className="text-center font-bold text-lg">مهتم بهذه الوحدة؟</p>
              {unit.url && (
                <Button
                  className="w-full bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all"
                  asChild
                >
                  <a href={unit.url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 ml-2" />
                    عرض التفاصيل الكاملة
                  </a>
                </Button>
              )}
              <Button
                variant="outline"
                className="w-full border-2 border-primary/30 hover:bg-primary/10"
              >
                تواصل مع المطور
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
