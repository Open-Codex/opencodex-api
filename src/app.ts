import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import testRoutes from './routes/test.routes';
import authRoutes from './routes/auth.routes';
import usersRoutes from './routes/users.routes';
import skillsRoutes from './routes/skills.routes';
import rolesRoutes from './routes/roles.routes';
import projectsRoutes from './routes/projects.route';
import joinRequestRoutes from './routes/joinRequest.routes';
import vacanciesRoutes from './routes/vacancies.routes';
import categoriesRoutes from './routes/categories.routes';
import logRatingsRoutes from './routes/logRatings.routes';
import projetcInteractions from './routes/projectInteractions.routes';

const app = express();

// Configurations and Middlewares
const allowedOrigins = ['http://localhost:3000'];
dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors({
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  exposedHeaders: ['set-cookie', 'Authorization'],
}));

// Routes
app.use('/test', testRoutes);
app.use('/auth', authRoutes);
app.use('/users', usersRoutes);
app.use('/skills', skillsRoutes);
app.use('/roles', rolesRoutes);
app.use('/projects', projectsRoutes);
app.use('/join-requests', joinRequestRoutes);
app.use('/vacancies', vacanciesRoutes);
app.use('/categories', categoriesRoutes);
app.use('/ratings', logRatingsRoutes);
app.use('/project-interactions', projetcInteractions);

export default app;