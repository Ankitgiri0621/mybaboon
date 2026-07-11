import mongoose from "mongoose";
import dns from "dns";

dns.setDefaultResultOrder("ipv4first");

const connectDB = async () => {
  let uri = process.env.MONGO_URI;

  if (!uri) {
    console.warn("⚠️ MONGO_URI is not set in environment variables. Starting in-memory MongoDB...");
    try {
      const { MongoMemoryServer } = await import("mongodb-memory-server");
      const mongoServer = await MongoMemoryServer.create();
      uri = mongoServer.getUri();
      console.log(`ℹ️ In-memory MongoDB server started at: ${uri}`);
      
      // Store the server instance on connection to keep it alive
      mongoose.mongoServer = mongoServer;
    } catch (error) {
      console.error("❌ Failed to start mongodb-memory-server:", error.message);
      process.exit(1);
    }
  }

  try {
    const conn = await mongoose.connect(uri);
    console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    
    // Auto-seed the database if it is empty and we are using the in-memory server
    if (mongoose.mongoServer) {
      const collections = await mongoose.connection.db.listCollections().toArray();
      const woodExists = collections.some(col => col.name === "woods");
      let count = 0;
      if (woodExists) {
        count = await mongoose.connection.db.collection("woods").countDocuments();
      }
      
      if (count === 0) {
        console.log("🌲 In-memory database is empty. Auto-seeding listings...");
        // Dynamically import seed data/model to prevent circular dependency
        const Wood = (await import("../models/Wood.js")).default;
        
        const seedData = [
          {
            category: "Cabin",
            title: "Pinecrest Cabin",
            description: "A timber-framed cabin tucked beneath the pines, with a wood-burning stove and a private deck for morning coffee.",
            price: "₹4,200",
            unit: "per night",
            image: "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800",
          },
          {
            category: "Treehouse",
            title: "Canopy Treehouse",
            description: "Raised eight feet into the oak canopy, with a rope bridge entrance and skylight views of the stars.",
            price: "₹5,800",
            unit: "per night",
            image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800",
          },
          {
            category: "Cottage",
            title: "Riverside Cottage",
            description: "A stone cottage on the water's edge, with a fireplace, kayak dock, and the sound of the river all night.",
            price: "₹4,900",
            unit: "per night",
            image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800",
          },
          {
            category: "Cabin",
            title: "Hollow Ridge Cabin",
            description: "Perched on a quiet ridge with a wraparound porch, built for long evenings and longer sunsets.",
            price: "₹3,900",
            unit: "per night",
            image: "https://images.unsplash.com/photo-1517824806704-9040b037703b?w=800",
          },
          {
            category: "Lodge",
            title: "Cedar Hollow Lodge",
            description: "A larger lodge for groups, with a communal hearth, log dining table, and trailhead access out back.",
            price: "₹7,500",
            unit: "per night",
            image: "https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?w=800",
          },
          {
            category: "Treehouse",
            title: "Fernbrook Treehouse",
            description: "A one-room hideaway among the ferns, minimal and quiet, with a claw-foot tub looking out to the trees.",
            price: "₹6,200",
            unit: "per night",
            image: "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800",
          },
        ];
        
        await Wood.insertMany(seedData);
        console.log("🌲 In-memory database auto-seeded successfully with 6 listings.");
      }
    }
  } catch (error) {
    console.error(`❌ MongoDB connection error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
