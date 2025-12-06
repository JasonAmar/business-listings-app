import { Business, BusinessWithId } from '@/types';
import * as SQLite from 'expo-sqlite';
import { useCallback, useEffect, useState } from 'react';

const useStorage = () => {
  const [db, setDb] = useState<SQLite.SQLiteDatabase>();
  const tableName__businesses = 'businesses';

  useEffect(() => {
    async function setup() {
      const db = await SQLite.openDatabaseAsync('databaseName');
      await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS ${tableName__businesses} (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, category TEXT NOT NULL, description TEXT NOT NULL);`);
      setDb(db);
    }

    setup();
  }, []);

  //implemented to allow efficient mulitple inserts at once
  const addBusinesses = useCallback(
    async (...businesses: Business[]) => {
      const insertQuery = `INSERT INTO ${tableName__businesses} (name, category, description) VALUES 
      ${businesses
        .map(
          ({ name, category, description }) =>
            `('${name}', '${category}', '${description}')`
        )
        .join(',')};
      `;
      let result;
      try {
        result = await db?.runAsync(insertQuery);
      } finally {
        if (!result) {
          throw new Error('Was not able to add to database');
        }
      }
    },
    [db]
  );

  const getAllBusinesses = useCallback(async () => {
    return (await db?.getAllAsync(
      `SELECT * FROM ${tableName__businesses}`
    )) as BusinessWithId[];
  }, [db]);

  //For development now & future versions if needed
  const deleteAllBusinesses = useCallback(async () => {
    return (await db?.getAllAsync(
      `DELETE FROM ${tableName__businesses}`
    )) as BusinessWithId[];
  }, [db]);

  return { addBusinesses, getAllBusinesses, deleteAllBusinesses };
};

export default useStorage;
