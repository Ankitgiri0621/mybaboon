import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import Wood from "./models/Wood.js";

dotenv.config();

const seedData = [
  {
    category: "Cabin",
    title: "Pinecrest Cabin",
    description:
      "A timber-framed cabin tucked beneath the pines, with a wood-burning stove and a private deck for morning coffee.",
    price: "₹4,200",
    unit: "per night",
    image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800",
  },
  {
    category: "Treehouse",
    title: "Canopy Treehouse",
    description:
      "Raised eight feet into the oak canopy, with a rope bridge entrance and skylight views of the stars.",
    price: "₹5,800",
    unit: "per night",
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
  },
  {
    category: "Cottage",
    title: "Riverside Cottage",
    description:
      "A stone cottage on the water's edge, with a fireplace, kayak dock, and the sound of the river all night.",
    price: "₹4,900",
    unit: "per night",
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800",
  },
  {
    category: "Cabin",
    title: "Hollow Ridge Cabin",
    description:
      "Perched on a quiet ridge with a wraparound porch, built for long evenings and longer sunsets.",
    price: "₹3,900",
    unit: "per night",
    image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?w=800",
  },
  {
    category: "Lodge",
    title: "Cedar Hollow Lodge",
    description:
      "A larger lodge for groups, with a communal hearth, log dining table, and trailhead access out back.",
    price: "₹7,500",
    unit: "per night",
    image: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=800",
  },
  {
    category: "Treehouse",
    title: "Fernbrook Treehouse",
    description:
      "A one-room hideaway among the ferns, minimal and quiet, with a claw-foot tub looking out to the trees.",
    price: "₹6,200",
    unit: "per night",
    image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800",
  },
];

const seed = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Wood.deleteMany({});
    console.log("🗑️  Cleared existing woods data");

    // Insert seed data
    const inserted = await Wood.insertMany(seedData);
    console.log(`🌲 Seeded ${inserted.length} stays into MongoDB`);

    await mongoose.connection.close();
    console.log("✅ Seed complete, connection closed");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed failed:", error.message);
    process.exit(1);
  }
};

seed();
