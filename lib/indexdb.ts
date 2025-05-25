import { IDBPDatabase, openDB } from "idb";

const DB_NAME = "buzzdrop-ai";

async function getOrCreateDB(store: string): Promise<IDBPDatabase> {
  store = store.replace(" ", "");
  let db: IDBPDatabase;
  try {
    db = await openDB(DB_NAME);
    if (!db.objectStoreNames.contains(store)) {
      db.close();
      const newVersion = db.version + 1;
      db = await openDB(DB_NAME, newVersion, {
        upgrade(upgradeDB) {
          if (!upgradeDB.objectStoreNames.contains(store)) {
            upgradeDB.createObjectStore(store);
          }
        },
      });
    }
    return db;
  } catch (error) {
    throw error;
  }
}

interface saveToIndexedDBProps {
  key: string;
  content: unknown;
  expirationTime?: number;
  store: string;
}

interface IndexedDBData {
  key: string;
  content: unknown;
  expirationTimeValue?: number;
}

async function saveToIndexedDB({
  key,
  content,
  expirationTime,
  store,
}: saveToIndexedDBProps) {
  store = store.replace(" ", "");
  try {
    const db = await getOrCreateDB(store);
    // If expirationTime is provided, set it to 30 minutes from now
    const expirationTimeValue = expirationTime
      ? Date.now() + expirationTime * 60 * 1000
      : undefined;
    await db.put(store, { content, expirationTimeValue }, key);
  } catch (error) {
    console.error("Error saving to IndexedDB:", error);
    throw error;
  }
}

async function getFromIndexedDB(key: string, store: string): Promise<unknown> {
  try {
    store = store.replace(" ", "");
    const db = await getOrCreateDB(store);
    const data = await db.get(store, key);
console.log("Data retrieved from IndexedDB:", data);

    if (
      data &&
      (!data.expirationTimeValue || Date.now() < data.expirationTimeValue)
    ) {
      return data.content;
    }

    await db.delete(store, key);
    return null;
  } catch (error) {
    console.error("Error retrieving from IndexedDB:", error);
    return null;
  }
}

async function deleteFromIndexedDB(key: string, store: string): Promise<void> {
  try {
    store = store.replace(" ", "");
    const db = await getOrCreateDB(store);
    await db.delete(store, key);
  } catch (error) {
    console.error("Error deleting from IndexedDB:", error);
    throw error;
  }
}

async function clearIndexedDB(store: string): Promise<void> {
  try {
    store = store.replace(" ", "");
    const db = await getOrCreateDB(store);
    await db.clear(store);
  } catch (error) {
    console.error("Error clearing IndexedDB:", error);
    throw error;
  }
}

async function getAllKeysFromIndexedDB(
  store: string
): Promise<{ key: IDBValidKey; size: number }[]> {
  try {
    store = store.replace(" ", "");
    const db = await getOrCreateDB(store);
    const keys = await db.getAllKeys(store);
    const values = await db.getAll(store);
    return keys.map((key, idx) => {
      const value = values[idx];
      const size = value ? new Blob([JSON.stringify(value)]).size : 0;
      return { key, size };
    });
  } catch (error) {
    console.error("Error retrieving all keys from IndexedDB:", error);
    return [];
  }
}
async function getAllFromIndexedDB(store: string): Promise<IndexedDBData[]> {
  try {
    store = store.replace(" ", "");
    const db = await getOrCreateDB(store);
    const keys = await getAllKeysFromIndexedDB(store);
    if (keys.length === 0) {
      return [];
    }
    const values = await db.getAll(store);
    return keys.map((key, idx) => {
      const value = values[idx];
      const expirationTimeValue = value?.expirationTimeValue;
      return {
        key: key.key as string,
        content: value.content,
        expirationTimeValue,
      };
    });
  } catch (error) {
    console.error("Error retrieving all from IndexedDB:", error);
    return [];
  }
}

async function getAvailableStorageSpaceInIndexedDB(): Promise<number | null> {
  try {
    if (navigator.storage && navigator.storage.estimate) {
      const { usage, quota } = await navigator.storage.estimate();
      const availableSpace = (quota || 1) - (usage || 0);
      return Math.floor(availableSpace * 0.7);
    }
    return 10 * 1024 * 1024;
  } catch (error) {
    console.error("Error retrieving available space in IndexedDB:", error);
    return null;
  }
}

async function getUsedSpaceInIndexedDB(): Promise<number | null> {
  try {
    if (navigator.storage && navigator.storage.estimate) {
      const { usage } = await navigator.storage.estimate();
      return Math.floor(usage || 0);
    }
    return null;
  } catch (error) {
    console.error("Error retrieving used space in IndexedDB:", error);
    return null;
  }
}

async function getUsedSpaceByStoreInIndexedDB(
  store: string
): Promise<number | null> {
  try {
    store = store.replace(" ", "");
    const db = await getOrCreateDB(store);
    const allData = await db.getAll(store);
    const totalBytes = allData.reduce((acc, item) => {
      const json = JSON.stringify(item);
      return acc + new Blob([json]).size;
    }, 0);
    return totalBytes;
  } catch (error) {
    console.error("Error retrieving used space by store in IndexedDB:", error);
    return null;
  }
}

export {
  saveToIndexedDB,
  getFromIndexedDB,
  deleteFromIndexedDB,
  clearIndexedDB,
  getAllKeysFromIndexedDB,
  getAllFromIndexedDB,
  getAvailableStorageSpaceInIndexedDB,
  getUsedSpaceInIndexedDB,
  getUsedSpaceByStoreInIndexedDB,
  getOrCreateDB,
};
export type { saveToIndexedDBProps, IndexedDBData };
export default getOrCreateDB;
