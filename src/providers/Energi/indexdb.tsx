export const MAX_AGE = 1000 * 60 * 60

export const openIndexDb = async (name: string) => {
  if (!("indexedDB" in window)) {
    return null
  }
  const request = (window as any).indexedDB.open(name, 1)
  request.onupgradeneeded = (event: any) => {
    const db = event.target.result;
    if (!db.objectStoreNames.contains(name)) {
      db.createObjectStore(name, { keyPath: "method" });
    }
  }
  return read(request)
};

export function read (store: any) {
  return new Promise<any>((res, rej) => {
    store.onerror = (e: any) => rej(e)
    store.onsuccess = (event: any) => {
      const db = event.target.result;
      res(db)
    }
  })
}
