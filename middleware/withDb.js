import sqlite3 from "sqlite3";

const withDb = (handler) => async (req, res) => {
  const db = await sqlite3.open("./database/mydb.db");
  req.db = db;
  return handler(req, res);
};

export default withDb;
