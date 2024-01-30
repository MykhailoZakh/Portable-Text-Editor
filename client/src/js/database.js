import { openDB } from 'idb';

const initdb = async () =>
  openDB('pte', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('pte')) {
        console.log('pte database already exists');
        return;
      }
      db.createObjectStore('pte', { keyPath: 'id', autoIncrement: true });
      console.log('pte database created');
    },
  });

// Adding content to DataBase

export const putDb = async (content) => {
  // create connection to DB
  const pteDb = await openDB('pte', 1);
  // create new transaction and specify privileges
  const tx = pteDb.transaction('pte', 'readwrite');
  // open new objectStore obj
  const store = tx.objectStore('pte');
  // put method to add content
  const request = store.put({ id: 1, value: content });
  // Get confirmation of the request.
  const result = await request;

  console.log('The data was successfully saved to the database!', result);

};

// Retrieves the database's content

export const getDb = async () => {

  // create connection to DB
  const pteDb = await openDB('pte', 1);
  // create new transaction and specify privileges
  const tx = pteDb.transaction('pte', 'readonly');
  // open new objectStore obj
  const store = tx.objectStore('pte');
  // get method to retive content
  const request = store.get(1);
  // Get confirmation of the request.
  const result = await request;
  return result?.value;

};

initdb();