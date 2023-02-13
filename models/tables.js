// models/tables.js

export async function createUserTable() {
    await run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        published_date timestamp DEFAULT CURRENT_TIMESTAMP,
        image TEXT ,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        password TEXT NOT NULL,
        about TEXT,
        isEditor INTEGER NOT NULL DEFAULT 0,
        isAdmin INTEGER NOT NULL DEFAULT 0
      )
    `);
  }
  
  export async function createCategoryTable() {
    await run(`
      CREATE TABLE IF NOT EXISTS categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        published_date timestamp DEFAULT CURRENT_TIMESTAMP,
        name TEXT NOT NULL,
        color TEXT NOT NULL,
        slug TEXT NOT NULL
      )
    `);
  }
  
  export async function createBlogTable() {
    await run(`
      CREATE TABLE IF NOT EXISTS blogs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        published_date timestamp DEFAULT CURRENT_TIMESTAMP,
        user_id INTEGER NOT NULL,
        category_ids TEXT NOT NULL,
        title TEXT NOT NULL,
        body TEXT NOT NULL,
        image TEXT NOT NULL,
        slug TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )
    `);
  }
  
  export async function createBlogCategoriesTable() {
    await run(`
      CREATE TABLE IF NOT EXISTS blog_categories (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        blog_id INTEGER NOT NULL,
        category_id INTEGER NOT NULL,
        FOREIGN KEY (blog_id) REFERENCES blogs(id)
        ON DELETE CASCADE,
        FOREIGN KEY (category_id) REFERENCES categories(id)
        ON DELETE CASCADE
      )
    `);
  }
  
  