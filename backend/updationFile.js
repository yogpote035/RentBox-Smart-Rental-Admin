const { MongoClient } = require("mongodb");
const mongoose = require("mongoose");
const ReviewModel = require("./model/reviewModel"); // Make sure this path is correct

const uri =
  "diabase link";

async function run() {
  // Step 1: Connect with Mongoose to check missing createdAt
  await mongoose.connect(uri, { dbName: "test" });

  const docsWithoutCreatedAt = await ReviewModel.find({ createdAt: { $exists: false } });
  console.log("Review documents without createdAt:", docsWithoutCreatedAt.length);

  const collectionName = ReviewModel.collection.name;
  console.log("Mongoose collection name:", collectionName);

  await mongoose.disconnect();

  // Step 2: Connect with MongoClient to perform update
  const client = new MongoClient(uri);
  try {
    await client.connect();
    const db = client.db("test");

    const collection = db.collection(collectionName);

    const result = await collection.updateMany(
      { createdAt: { $exists: false } },
      { $set: { createdAt: new Date() } }
    );

    console.log("Matched:", result.matchedCount);
    console.log("Modified:", result.modifiedCount);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

run();
