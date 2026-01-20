# 🚀 دليل نشر المشروع (Deployment Guide)

## 📋 نظرة عامة

المشروع يتكون من جزئين:

- **Frontend**: React + Vite
- **Backend**: Node.js + Express + MongoDB Atlas

---

## 🎯 الجزء الأول: نشر Backend على Render

### 1️⃣ إنشاء حساب على Render

1. اذهب إلى [render.com](https://render.com)
2. سجل الدخول باستخدام GitHub

### 2️⃣ رفع الكود على GitHub

إذا لم ترفع الكود بعد:

```bash
# في مجلد d:\rk
git init
git add .
git commit -m "Initial commit"
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

### 3️⃣ إنشاء Web Service على Render

1. اضغط على **"New +"** → **"Web Service"**
2. اربط حساب GitHub
3. اختر المشروع (repository)
4. املأ البيانات:
   - **Name**: `rk-real-estate-api`
   - **Region**: اختر أقرب منطقة
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.js`
   - **Plan**: اختر **Free**

### 4️⃣ إضافة Environment Variables

في Render، اذهب إلى **Environment** وأضف:

```
MONGODB_URI=mongodb+srv://admin:admin123@cluster0.vzqhrzz.mongodb.net/realestate
PORT=3000
NODE_ENV=production
```

### 5️⃣ Deploy

اضغط على **"Create Web Service"** وانتظر حتى ينتهي الـ deployment.

سيعطيك URL مثل: `https://rk-real-estate-api.onrender.com`

---

## 🌐 الجزء الثاني: نشر Frontend على Vercel

### 1️⃣ إنشاء حساب على Vercel

1. اذهب إلى [vercel.com](https://vercel.com)
2. سجل الدخول باستخدام GitHub

### 2️⃣ إنشاء مشروع جديد

1. اضغط على **"Add New..."** → **"Project"**
2. اختر repository من GitHub
3. **Root Directory**: اضغط **Edit** واختر `frontend`
4. **Framework Preset**: سيكتشف Vite تلقائياً

### 3️⃣ إضافة Environment Variables

في Vercel، أضف:

```
VITE_API_URL=https://rk-real-estate-api.onrender.com/api
```

(استبدل الـ URL بالـ URL الذي حصلت عليه من Render)

### 4️⃣ Deploy

اضغط على **"Deploy"** وانتظر حتى ينتهي.

سيعطيك URL مثل: `https://rk-real-estate.vercel.app`

---

## ✅ تحديث Backend ليقبل Frontend Domain

ارجع لـ Render وحدّث Environment Variables:

```
FRONTEND_URL=https://rk-real-estate.vercel.app
```

ثم اعمل **Manual Deploy** للـ Backend.

---

## 🔄 Auto Deployment

الآن، كل ما تعمل `git push`:

- ✅ Frontend ينشر تلقائياً على Vercel
- ✅ Backend ينشر تلقائياً على Render

---

## 📝 ملاحظات مهمة

### ⚠️ Render Free Plan

- ينام بعد 15 دقيقة من عدم الاستخدام
- أول request بعد النوم يأخذ 30-60 ثانية
- لو عايز يفضل شغال 24/7، استخدم **Paid Plan** ($7/شهر)

### 💡 بدائل مجانية للـ Backend

- **Railway** (أسرع من Render)
- **Fly.io**
- **Cyclic**

### 🔐 الأمان

- لا تحفظ passwords في الكود
- استخدم environment variables دائماً
- غير password MongoDB في production

---

## 🎉 اختبار الموقع

بعد الـ deployment:

1. افتح الـ Frontend URL
2. جرّب البحث والفلترة
3. افتح unit details وتأكد من الصور والخريطة

---

## 🛠️ إعدادات إضافية (اختيارية)

### Domain خاص

- Vercel: Settings → Domains → Add Domain
- Render: Settings → Custom Domain

### تحسين الأداء

- تفعيل Caching
- Compression (Gzip)
- CDN (Cloudflare)

---

## 📞 دعم

إذا واجهت أي مشاكل:

- Render Logs: Dashboard → Logs
- Vercel Logs: Dashboard → Deployments → View Details
- MongoDB Atlas: Metrics → View Performance

---

**تم! 🎊** موقعك الآن على الإنترنت ومتاح للجميع! 🌍
