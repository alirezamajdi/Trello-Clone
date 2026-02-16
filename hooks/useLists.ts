"use client";
import { useListStore } from "@/store/useListStore";
import { DB_NAME } from "@/utils/constants";
import { useEffect, useState } from "react";

export interface IList {
  id: number;
  title: string;
}

const STORE_NAME = "lists";
const DB_VERSION = 2; // IMPORTANT: increase version

export const useLists = () => {
  const { setLists, lists } = useListStore();
  const [db, setDb] = useState<IDBDatabase | null>(null);

  useEffect(() => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const database = (event.target as IDBOpenDBRequest).result;

      // Delete old store if exists (prevents schema mismatch)
      if (database.objectStoreNames.contains(STORE_NAME)) {
        database.deleteObjectStore(STORE_NAME);
      }

      // Create fresh store
      database.createObjectStore(STORE_NAME, {
        keyPath: "id",
        autoIncrement: true,
      });
    };

    request.onsuccess = (event: Event) => {
      const database = (event.target as IDBOpenDBRequest).result;
      setDb(database);
      loadLists(database);
    };

    request.onerror = () => {
      console.error("IndexedDB error:", request.error);
    };
  }, []);

  const loadLists = (database: IDBDatabase) => {
    const transaction = database.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.getAll();

    request.onsuccess = () => {
      setLists(request.result as IList[]);
    };

    request.onerror = () => {
      console.error("Failed to load lists");
    };
  };

  const addList = (title: string) => {
    if (!db || !title.trim()) return;

    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    const request = store.add({ title, cards: [] });

    request.onerror = () => {
      console.error("Add failed:", request.error);
    };

    transaction.oncomplete = () => {
      loadLists(db);
    };
  };

  const removeList = (id: number) => {
    if (!db) return;

    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    const request = store.delete(id);

    request.onsuccess = () => {
      // Update Zustand immediately (no reload needed)
      const updatedList = lists.filter((list) => list.id !== id);
      setLists(updatedList);
    };

    request.onerror = () => {
      console.error("Delete failed:", request.error);
    };
  };

  return {
    addList,
    removeList,
  };
};
