"use client";

import { useListStore } from "@/store/useListStore";
import { DB_NAME } from "@/utils/constants";
import { useEffect, useState } from "react";

const BOARD_LIST_STORE = "board-lists";
const BOARD_TITLE_STORE = "board-meta";
const BOARD_TITLE_KEY = "board-title";
const DB_VERSION = 3;

export const useBoardStorage = () => {
  const { setLists, lists } = useListStore();
  const [db, setDb] = useState<IDBDatabase | null>(null);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const database = (event.target as IDBOpenDBRequest).result;

      // Lists Store
      if (!database.objectStoreNames.contains(BOARD_LIST_STORE)) {
        database.createObjectStore(BOARD_LIST_STORE, {
          keyPath: "id",
          autoIncrement: true,
        });
      }

      // Board Meta Store (for title and future settings)
      if (!database.objectStoreNames.contains(BOARD_TITLE_STORE)) {
        database.createObjectStore(BOARD_TITLE_STORE);
      }
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

  useEffect(() => {
    if (db) getBoardTitle();
  }, [db]);

  /* ---------------- LOAD LISTS ---------------- */

  const loadLists = (database: IDBDatabase) => {
    const transaction = database.transaction(BOARD_LIST_STORE, "readonly");
    const store = transaction.objectStore(BOARD_LIST_STORE);
    const request = store.getAll();

    request.onsuccess = () => {
      setLists(request.result as ILists);
    };

    request.onerror = () => {
      console.error("Failed to load lists");
    };
  };

  /* ---------------- LIST METHODS ---------------- */

  const addList = (title: string) => {
    if (!db || !title.trim()) return;

    const transaction = db.transaction(BOARD_LIST_STORE, "readwrite");
    const store = transaction.objectStore(BOARD_LIST_STORE);

    store.add({
      title,
      cards: [],
      level: lists.length + 1,
    });

    transaction.oncomplete = () => loadLists(db);
    transaction.onerror = () =>
      console.error("Add list failed:", transaction.error);
  };

  const removeList = (id: number) => {
    if (!db) return;

    const transaction = db.transaction(BOARD_LIST_STORE, "readwrite");
    const store = transaction.objectStore(BOARD_LIST_STORE);

    store.delete(id);

    transaction.oncomplete = () => {
      const updated = lists.filter((list) => list.id !== id);
      setLists(updated);
    };

    transaction.onerror = () =>
      console.error("Delete failed:", transaction.error);
  };

  const setAllLists = (newLists: ILists) => {
    if (!db) return;

    const transaction = db.transaction(BOARD_LIST_STORE, "readwrite");
    const store = transaction.objectStore(BOARD_LIST_STORE);

    store.clear().onsuccess = () => {
      newLists.forEach((list) => store.add(list));
    };
  };

  /* ---------------- BOARD TITLE METHODS ---------------- */

  const setBoardTitle = (title: string) => {
    if (!db || !title.trim()) return;

    const transaction = db.transaction(BOARD_TITLE_STORE, "readwrite");
    const store = transaction.objectStore(BOARD_TITLE_STORE);

    // use put to overwrite safely
    store.put(title, BOARD_TITLE_KEY);

    transaction.onerror = () =>
      console.error("Save title failed:", transaction.error);
  };

  const getBoardTitle = (): Promise<string | null> => {
    return new Promise((resolve) => {
      if (!db) return resolve(null);

      const transaction = db.transaction(BOARD_TITLE_STORE, "readonly");
      const store = transaction.objectStore(BOARD_TITLE_STORE);
      const request = store.get(BOARD_TITLE_KEY);

      request.onsuccess = () => {
        setTitle(request.result || "Demo Board");
        resolve(request.result || null);
      };

      request.onerror = () => resolve(null);
    });
  };

  return {
    addList,
    removeList,
    setAllLists,
    setBoardTitle,
    getBoardTitle,
    title,
    setTitle,
  };
};
