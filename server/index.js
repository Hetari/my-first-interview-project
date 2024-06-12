import 'express-async-errors';
import 'dotenv/config';
import express from 'express';

// Extra security packages
import helmet from 'helmet';
import cors from 'cors';

//  import db
import sequelize from './db/index.js';
import phone from './db/phoneModel.js';

import xlsx from 'xlsx';

const app = express();
app.set('trust proxy', 1);
app.use(express.json());
app.use(helmet());
app.use(cors());

app.get('/api/v1/phones', async (req, res) => {
  const allPhones = await phone.findAll({
    // done: false
  });

  return res.status(200).json({ phones: allPhones });
});

app.post('/api/v1/phones', async (req, res) => {
  const all = req.body;
  console.log(all);
  return res.status(200);
});

app.get('/api/v1/phones/:id', async (req, res) => {
  const id = req.params.id;
  const getPhone = await phone.findOne({
    where: {
      id: parseInt(id)
    }
  });

  return res.status(200).json({ phone: getPhone });
});

app.post('/test', (req, res) => {
  return res.status(200).send('Hello World!');
});

// global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

const insertCsvData = async (name) => {
  const data = xlsx.readFile(name);
  var sheet_name_list = data.SheetNames;
  var xlData = xlsx.utils.sheet_to_json(data.Sheets[sheet_name_list[0]]);

  try {
    await phone.bulkCreate(xlData);
  } catch (error) {
    console.log('no');
  }
};
// start the server
const serverStart = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({
      force: true
      // logging: false,
    });
    console.info('Database connected...');

    insertCsvData('./test.csv');

    const port = process.env.EXPRESS_PORT || 3000;
    const host = process.env.EXPRESS_HOST || 'localhost';

    app.listen(port, () => {
      console.debug(`Server is running on http://${host}:${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1); // Exit process with failure
  }
};

serverStart();
