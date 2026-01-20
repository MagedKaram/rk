# REDWW API - Test Collection

## 🧪 اختبر الـ Endpoints

### 1. Health Check

```bash
curl http://localhost:3000/api/health
```

### 2. الحصول على جميع الوحدات

```bash
curl http://localhost:3000/api/units?page=1&limit=5
```

### 3. البحث عن وحدة محددة

```bash
curl http://localhost:3000/api/units/92731
```

### 4. التصفية حسب السعر

```bash
curl "http://localhost:3000/api/units?minPrice=10000000&maxPrice=50000000&limit=5"
```

### 5. التصفية حسب عدد الغرف

```bash
curl "http://localhost:3000/api/units?bedrooms=3&limit=5"
```

### 6. البحث المتقدم

```bash
curl "http://localhost:3000/api/search?q=villa&page=1&limit=5"
```

### 7. البحث عن 'sodic'

```bash
curl "http://localhost:3000/api/search?q=sodic&limit=5"
```

### 8. جميع المشاريع

```bash
curl http://localhost:3000/api/projects
```

### 9. مشروع محدد مع وحداته

```bash
curl http://localhost:3000/api/projects/19203
```

### 10. جميع الشركات

```bash
curl http://localhost:3000/api/developers
```

### 11. شركة محددة

```bash
curl http://localhost:3000/api/developers/16
```

### 12. جميع المناطق

```bash
curl http://localhost:3000/api/areas
```

### 13. منطقة محددة

```bash
curl http://localhost:3000/api/areas/1
```

### 14. جميع الأنواع

```bash
curl http://localhost:3000/api/types
```

### 15. وحدات من نوع محدد

```bash
curl http://localhost:3000/api/types/9/units
```

---

## 📊 أمثلة التصفية المركبة

### فلل في الساحل الشمالي ب 3 غرف

```bash
curl "http://localhost:3000/api/units?area_id=1&bedrooms=3&type_id=9"
```

### شقق فاخرة بسعر أقل من 20 مليون

```bash
curl "http://localhost:3000/api/units?maxPrice=20000000&bedrooms=2"
```

### وحدات في مشروع محدد

```bash
curl http://localhost:3000/api/units/project/19203
```

### مشاريع شركة Sodic

```bash
curl http://localhost:3000/api/projects/developer/16
```

---

## 🔗 استخدام مع JavaScript/Fetch

```javascript
// البحث عن الوحدات
fetch("http://localhost:3000/api/units?page=1&limit=10")
  .then((res) => res.json())
  .then((data) => console.log(data));

// البحث المتقدم
const query = "villa";
fetch(`http://localhost:3000/api/search?q=${query}`)
  .then((res) => res.json())
  .then((data) => console.log(data));

// مع معاملات
const filters = new URLSearchParams({
  minPrice: 5000000,
  maxPrice: 50000000,
  bedrooms: 4,
  page: 1,
  limit: 20,
});
fetch(`http://localhost:3000/api/units?${filters}`)
  .then((res) => res.json())
  .then((data) => console.log(data));
```

---

## 🧑‍💻 استخدام مع Python

```python
import requests

# البحث عن الوحدات
response = requests.get('http://localhost:3000/api/units',
  params={'page': 1, 'limit': 10})
data = response.json()
print(data)

# البحث المتقدم
response = requests.get('http://localhost:3000/api/search',
  params={'q': 'villa'})
data = response.json()
print(f"وجدنا {data['pagination']['total']} نتيجة")

# التصفية
response = requests.get('http://localhost:3000/api/units',
  params={
    'minPrice': 5000000,
    'maxPrice': 50000000,
    'bedrooms': 3
  })
data = response.json()
for unit in data['data']:
  print(f"{unit['name']} - {unit['price']} EGP")
```

---

## 📈 Performance Tips

✅ استخدم `limit` مناسب (20-50)
✅ استخدم `page` للـ Pagination
✅ صفي البيانات قبل الطلب بدل تحميل الكل
✅ استخدم البحث بدل التصفية المعقدة
✅ cache النتائج على العميل

---

## ⚡ Expected Response Times

- البحث البسيط: < 50ms
- التصفية: < 100ms
- البحث المتقدم: < 150ms
