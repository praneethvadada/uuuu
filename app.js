import express from 'express';
// import bodyParser from 'body-parser';
import staffRoutes from './routes/adminroutes.js';
import sequelize from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import studentroutes from './routes/studentroutes.js';
// import printRoutes from './conf/routes.js';

dotenv.config();

const app = express();

// app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

app.use('/api/staff', staffRoutes);
app.use('/api',studentroutes);


// if (process.env.NODE_ENV === 'development') {
//     printRoutes(app);
//   }
const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
    app.listen(PORT, '0.0.0.0', () => console.log(`Server running on http://0.0.0.0:${PORT}`));
}).catch(err => console.log(err));
