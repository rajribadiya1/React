// src/crud.js
import { ref, set, get, update, remove } from "firebase/database";
import { database } from "./firebase";

// Create or Update
export const createOrUpdate = (path, data) => {
  return set(ref(database, path), data);
};

// Read
export const readData = async (path) => {
  const snapshot = await get(ref(database, path));
  return snapshot.exists() ? snapshot.val() : null;
};

// Update specific fields
export const updateData = (path, updates) => {
  return update(ref(database, path), updates);
};

// Delete
export const deleteData = (path) => {
  return remove(ref(database, path));
};