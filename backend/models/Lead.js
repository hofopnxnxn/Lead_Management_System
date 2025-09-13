const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
  {
    first_name: String,
    last_name: String,
    email: { type: String, unique: true },
    phone: String,
    company: String,
    city: String,
    state: String,
    source: {
      type: String,
      enum: [
        "website",
        "facebook_ads",
        "google_ads",
        "referral",
        "events",
        "other",
      ],
    },
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "lost", "won"],
      default: "new",
    },
    score: { type: Number, min: 0, max: 100 },
    lead_value: Number,
    last_activity_at: Date,
    is_qualified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Lead", leadSchema);
