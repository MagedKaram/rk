const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const Unit = require("./models/Unit");
const Project = require("./models/Project");
const Developer = require("./models/Developer");
const Area = require("./models/Area");
const Type = require("./models/Type");

async function seedDatabase() {
  try {
    console.log("🔗 Connecting to MongoDB...");
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ Connected to MongoDB successfully!");

    // ⚠️ مسح البيانات القديمة الأول كما طلب المستخدم
    console.log("\n🗑️  Clearing existing data...");
    await Unit.deleteMany({});
    await Project.deleteMany({});
    await Developer.deleteMany({});
    await Area.deleteMany({});
    await Type.deleteMany({});
    console.log("✅ All existing data cleared!");

    // قراءة ملف JSON
    console.log("\n📖 Reading JSON file...");
    const jsonPath = path.join(__dirname, "..", "api_data_ready.json");
    const rawData = fs.readFileSync(jsonPath, "utf-8");
    const data = JSON.parse(rawData);
    console.log(`✅ Loaded ${data.units.length} units from JSON file`);

    // إدخال الوحدات
    console.log("\n⬆️  Seeding units...");
    const BATCH_SIZE = 1000;
    let insertedCount = 0;

    for (let i = 0; i < data.units.length; i += BATCH_SIZE) {
      const batch = data.units.slice(i, i + BATCH_SIZE);
      try {
        await Unit.insertMany(batch, { ordered: false });
        insertedCount += batch.length;
      } catch (err) {
        // تجاهل أخطاء التكرار واستمر
        if (err.code === 11000) {
          insertedCount += batch.length;
        }
      }
      console.log(`   Inserted ${insertedCount}/${data.units.length} units`);
    }
    console.log(`✅ Successfully inserted all ${insertedCount} units!`);

    // استخراج وإدخال المشاريع
    console.log("\n⬆️  Extracting and seeding projects...");
    const projectsMap = new Map();
    data.units.forEach((unit) => {
      if (unit.project_id && !projectsMap.has(unit.project_id)) {
        projectsMap.set(unit.project_id, {
          id: unit.project_id,
          name: unit.project_name,
          developer_id: unit.developer_id,
          developer_name: unit.developer_name,
          area_id: unit.area_id,
          area_name: unit.area_name,
          units_count: 0,
        });
      }
      if (unit.project_id) {
        projectsMap.get(unit.project_id).units_count++;
      }
    });
    const projects = Array.from(projectsMap.values());
    try {
      await Project.insertMany(projects, { ordered: false });
    } catch (err) {
      if (err.code !== 11000) throw err;
    }
    console.log(`✅ Inserted ${projects.length} projects`);

    // استخراج وإدخال المطورين
    console.log("\n⬆️  Extracting and seeding developers...");
    const developersMap = new Map();
    data.units.forEach((unit) => {
      if (unit.developer_id && !developersMap.has(unit.developer_id)) {
        developersMap.set(unit.developer_id, {
          id: unit.developer_id,
          name: unit.developer_name,
          projects_count: 0,
          units_count: 0,
        });
      }
      if (unit.developer_id) {
        developersMap.get(unit.developer_id).units_count++;
      }
    });
    projects.forEach((project) => {
      if (project.developer_id && developersMap.has(project.developer_id)) {
        developersMap.get(project.developer_id).projects_count++;
      }
    });
    const developers = Array.from(developersMap.values());
    try {
      await Developer.insertMany(developers, { ordered: false });
    } catch (err) {
      if (err.code !== 11000) throw err;
    }
    console.log(`✅ Inserted ${developers.length} developers`);

    // استخراج وإدخال المناطق
    console.log("\n⬆️  Extracting and seeding areas...");
    const areasMap = new Map();
    data.units.forEach((unit) => {
      if (unit.area_id && !areasMap.has(unit.area_id)) {
        areasMap.set(unit.area_id, {
          id: unit.area_id,
          name: unit.area_name,
          units_count: 0,
        });
      }
      if (unit.area_id) {
        areasMap.get(unit.area_id).units_count++;
      }
    });
    const areas = Array.from(areasMap.values());
    try {
      await Area.insertMany(areas, { ordered: false });
    } catch (err) {
      if (err.code !== 11000) throw err;
    }
    console.log(`✅ Inserted ${areas.length} areas`);

    // استخراج وإدخال الأنواع
    console.log("\n⬆️  Extracting and seeding types...");
    const typesMap = new Map();
    data.units.forEach((unit) => {
      if (unit.type_id && !typesMap.has(unit.type_id)) {
        typesMap.set(unit.type_id, {
          id: unit.type_id,
          name: unit.type_name,
          units_count: 0,
        });
      }
      if (unit.type_id) {
        typesMap.get(unit.type_id).units_count++;
      }
    });
    const types = Array.from(typesMap.values());
    try {
      await Type.insertMany(types, { ordered: false });
    } catch (err) {
      if (err.code !== 11000) throw err;
    }
    console.log(`✅ Inserted ${types.length} types`);

    console.log("\n🎉 Database seeding completed successfully!");
    console.log("\n📊 Summary:");
    console.log(`   - Units: ${insertedCount}`);
    console.log(`   - Projects: ${projects.length}`);
    console.log(`   - Developers: ${developers.length}`);
    console.log(`   - Areas: ${areas.length}`);
    console.log(`   - Types: ${types.length}`);
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    process.exit(1);
  } finally {
    await mongoose.connection.close();
    console.log("\n👋 Database connection closed");
    process.exit(0);
  }
}

seedDatabase();
