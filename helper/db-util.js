import { MongoClient } from "mongodb";
export async function connectDatabase() {
  const mongodb = process.env.MONGODB_URI;
  const client = await MongoClient.connect(mongodb);

  return client;
}

export async function getAllDocuments(client, collection, sort) {
  const db = client.db();

  const documents = await db.collection(collection).find().sort(sort).toArray();

  return documents;
}

export async function getDocumentById(client, collection, slug) {
  const db = client.db();
  const document = await db.collection(collection).findOne({ slug: slug });
  return document;
}
export async function getDocumentByCreater(
  client,
  collection,
  createrId,
  sort
) {
  const db = client.db();
  const document = await db
    .collection(collection)
    .find({ createrId: createrId })
    .sort(sort)
    .toArray();
  return document;
}
export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}
export async function deleteItemById(client, collection, title) {
  const db = client.db();
  const result = await db.collection(collection).deleteOne({ title: title });
  console.log(result);
}
