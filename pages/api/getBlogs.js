

const sqlite3 = require('sqlite3').verbose();

export default async function getBlogs(req, res) {
  const db = new sqlite3.Database('./database/mydb.db', (err) => {
    if (err) {
      console.error(err.message);
      return res.status(500).json({ error: 'Failed to open database connection' });
    }
  });

  try {
    // SELECT * FROM blogs
    const blogs = await new Promise((resolve, reject) => {
      db.all(`
      SELECT blogs.*, 
  GROUP_CONCAT(categories.name) as category_names, 
  users.name as user_name 
  FROM blogs 
    INNER JOIN users ON blogs.user_id = users.id
    INNER JOIN blog_categories ON blogs.id = blog_categories.blog_id
    INNER JOIN categories ON blog_categories.category_id = categories.id 
    GROUP BY blogs.id
      `, (err, rows) => {
        // INNER JOIN categories ON blogs.category_ids = categories.id 
        // INNER JOIN blog_categories ON blogs.id = blog_categories.blog_id
        // INNER JOIN categories ON blog_categories.category_id = categories.id
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
    res.status(200).json({ blogs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve data from database' });
  } finally {
    db.close();
  }
}
// SELECT blogs.*, categories.name as category_name, users.name as user_name FROM blogs INNER JOIN categories ON blogs.category_ids = categories.id INNER JOIN users ON blogs.user_id = users.id