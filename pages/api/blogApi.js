import { run } from '../../lib/db';
import _, { result } from "lodash";
import formidable from "formidable";
import path from "path";
import fs from "fs/promises";
import { v4 as uuidv4 } from "uuid";

export const config = {
  api: {
    bodyParser: false,
  },
};

const readFile = (
  req,
  saveLocally
) => {
  const options = {};
  if (saveLocally) {
    options.uploadDir = path.join(process.cwd(), "/public/images");
    options.filename = (name, ext, path, form) => {
      return uuidv4() + ext+ path.originalFilename;
      // return uuidv4() +ext+ path.originalFilename;
      // return Date.now().toString() + "_" + path.originalFilename;
    };
  }
  options.maxFileSize = 4000 * 1024 * 1024;
  const form = formidable(options);
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      resolve({ fields, files });
    });
  });
};

const handler = async (req, res) => {
  switch (req.method) {
    case 'POST':
  try {
    await fs.mkdir(path.join(process.cwd() + "/public", "/images"), {
      recursive: true,
    });
  } catch (error) {
    console.error(error);
  }

  const { fields, files } = await readFile(req, true);
  const { title, body, user_id, slug, category_ids } = fields;
  const image = files.image.filepath.split('/').pop();
  // console.log(category_ids)

        const result = await run(
            'INSERT INTO blogs (title, body, image, slug, category_ids, user_id) VALUES (?,?,  ?, ?, ?, ?)',
            [title, body, image, slug, category_ids, user_id]
          );
          // const blogId = result.insertId;
          // console.log(result.insertId)
          console.log(result.id)
          const categoryIds = category_ids.split(",").map(id => parseInt(id));
          for (const categoryId of categoryIds) {
            await run(
              'INSERT INTO blog_categories (blog_id, category_id) VALUES (?, ?)',
              [result.id, categoryId]
            );
          }
          res.json({ message: 'Blog added successfully' });
          break;
        default:
          res.status(405).end();
          break;
      }

  // res.json({ success: true, message: "Blog added successfully" });
};

export default handler;
