import { run } from '../../lib/db';
import _ from "lodash";


export default async (req, res) => {
  switch (req.method) {
    case 'POST':
      const { name, slug, color } = req.body;
      await run(
        'INSERT INTO categories (name, slug, color) VALUES (?, ?, ?)',
        [name, slug, color]
      );
      res.json({ message: 'Category added successfully' });
      break;
    default:
      res.status(405).end();
      break;
  }
};