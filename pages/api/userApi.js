import { run } from '../../lib/db';
import _ from "lodash";


export default async (req, res) => {
  switch (req.method) {
    case 'POST':
        const { name, email, password, about,image, isAdmin, isEditor } = req.body;
            // const hash = await bcrypt.hash(password, 10);
            
            // let imageBuffer = null;
        
            // if (req.file) {
            //     imageBuffer = req.file.buffer;
            // }
            // console.log(imageBuffer)
            // console.log(req.body);
            await run(
                'INSERT INTO users (image, name, email, password, about, isAdmin, isEditor) VALUES (?, ?, ?, ?, ?, ?, ?)',
                [image, name, email, password, about, isAdmin, isEditor]
              );
      res.json({ message: 'User added successfully' });
      break;
    default:
      res.status(405).end();
      break;
  }
};