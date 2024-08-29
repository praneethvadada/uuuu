import express from 'express';
import sequelize from './config/db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import {
    studentroutes,
    trainerroutes,
    solutionroutes,
    scoreroutes,
    questionroutes,
    questionCollegeRoute,
    domainroute,
    collegeroute,
    batchroute,
    adminroute
  } from './routes';
// import printRoutes from './conf/routes.js';

dotenv.config();

const app = express();

// app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use('/students', studentroutes);
app.use('/trainers', trainerroutes);
app.use('/solutions', solutionroutes);
app.use('/scores', scoreroutes);
app.use('/questions', questionroutes);
app.use('/question-college', questionCollegeRoute);
app.use('/domains', domainroute);
app.use('/colleges', collegeroute);
app.use('/batches', batchroute);
app.use('/admins', adminroute);



// if (process.env.NODE_ENV === 'development') {
//     printRoutes(app);
//   }
const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
    app.listen(PORT, '0.0.0.0', () => console.log(`Server running on http://0.0.0.0:${PORT}`));
}).catch(err => console.log(err));
