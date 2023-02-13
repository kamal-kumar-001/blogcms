const sqlite3 = require('sqlite3').verbose();

export default async function deleteBlog(req, res) {
  const db = new sqlite3.Database('./database/mydb.db', (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Failed to open database connection' });
    }
  });

  try {
    const id = req.query.id;
    const statement = db.prepare(`DELETE FROM blogs WHERE id = ?`);
    await new Promise((resolve, reject) => {
      statement.run(id, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve();
        }
      });
    });
    statement.finalize();
    res.status(200).json({ message: 'Blog successfully deleted' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete blog' });
  } finally {
    db.close();
  }
}
