import {
  Building2,
  Users,
  MapPin,
  Home as HomeIcon,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/Card";
import { Button } from "../components/ui/Button";

export function Home() {
  const stats = [
    {
      label: "إجمالي الوحدات",
      value: "39,366",
      icon: HomeIcon,
      color: "text-blue-600",
    },
    {
      label: "المشاريع",
      value: "298",
      icon: Building2,
      color: "text-green-600",
    },
    { label: "الشركات", value: "112", icon: Users, color: "text-purple-600" },
    { label: "المناطق", value: "23", icon: MapPin, color: "text-orange-600" },
  ];

  const features = [
    {
      title: "تصفح الوحدات",
      description: "اكتشف آلاف الوحدات العقارية المتاحة",
      link: "/units",
      icon: HomeIcon,
    },
    {
      title: "المشاريع",
      description: "تصفح أحدث المشاريع العقارية",
      link: "/projects",
      icon: Building2,
    },
    {
      title: "المطورين",
      description: "تعرف على أفضل شركات التطوير العقاري",
      link: "/developers",
      icon: Users,
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="text-center space-y-6 py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 -z-10" />
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold">
            <span className="bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
              RK Real Estate
            </span>
          </h1>
          <p className="text-2xl md:text-3xl font-semibold text-primary/70">
            منصتك الأولى للعقارات
          </p>
        </div>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          اكتشف آلاف الوحدات العقارية في أرقى المشاريع والمناطق في مصر
        </p>
        <div className="flex gap-4 justify-center pt-6">
          <Link to="/units">
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg hover:shadow-xl transition-all text-lg px-8 py-6"
            >
              ابدأ البحث الآن
            </Button>
          </Link>
          <Link to="/search">
            <Button
              size="lg"
              variant="outline"
              className="border-2 text-lg px-8 py-6 hover:bg-primary/10"
            >
              بحث متقدم
            </Button>
          </Link>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card
              key={stat.label}
              className="hover:shadow-xl transition-all hover:scale-105"
            >
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {stat.label}
                    </p>
                    <p className="text-3xl font-bold mt-2">{stat.value}</p>
                  </div>
                  <Icon className={`h-8 w-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </section>

      {/* Features Section */}
      <section className="space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold text-center">
          استكشف خدماتنا
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card
                key={feature.title}
                className="hover:shadow-xl transition-all hover:scale-105"
              >
                <CardHeader>
                  <Icon className="h-12 w-12 text-primary mb-4" />
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{feature.description}</p>
                  <Link to={feature.link}>
                    <Button className="w-full">استكشف الآن</Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary/5 rounded-2xl p-12 text-center space-y-6">
        <h2 className="text-3xl md:text-4xl font-bold">هل أنت مطور عقاري؟</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          انضم إلى منصتنا واعرض مشاريعك لآلاف المستخدمين
        </p>
        <Button size="lg" variant="outline">
          تواصل معنا
        </Button>
      </section>
    </div>
  );
}
