const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");
const Lead = require("./models/Lead");
const User = require("./models/User");
const bcrypt = require("bcrypt");
require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;

async function seed() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB Atlas");

  // demo user
  const existing = await User.findOne({ username: "demo" });
  if (!existing) {
    const hashed = await bcrypt.hash("demo123", 10);
    await new User({ username: "demo", password: hashed }).save();
    console.log("👤 Created demo user: demo / demo123");
  }

  // clear old leads
  await Lead.deleteMany({});
  console.log("🗑 Cleared old leads");

  // generate 100 leads
  const leads = [];
  for (let i = 0; i < 100; i++) {
    leads.push({
      first_name: faker.person.firstName(), 
      last_name: faker.person.lastName(),
      email: faker.internet.email().toLowerCase() + "." + i,
      city: faker.location.city(),
      state: faker.location.state(),
      company: faker.company.name(),
      source: faker.helpers.arrayElement(["website","facebook_ads","google_ads","referral","events","other"]),
      status: faker.helpers.arrayElement(["new","contacted","qualified","lost","won"]),
      score: faker.number.int({ min: 0, max: 100 }),
      lead_value: faker.number.int({ min: 100, max: 10000 }),
      last_activity_at: faker.date.recent({ days: 90 }),
      is_qualified: faker.datatype.boolean()
    });
  }

  await Lead.insertMany(leads, { ordered: false });
  console.log("Inserted 100 demo leads");

  process.exit(0);
}

seed().catch(err => {
  console.error(err);
  process.exit(1);
});
