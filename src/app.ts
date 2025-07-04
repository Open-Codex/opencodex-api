import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import testRoutes from './routes/test.routes';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import skillRoutes from './routes/skill.routes';
import roleRoutes from './routes/role.routes';
import projectRoutes from './routes/project.route';
import joinRequestRoutes from './routes/joinRequest.routes';
import vacancyRoutes from './routes/vacancy.routes';
import categoryRoutes from './routes/category.routes';
import logRatingRoutes from './routes/logRating.routes';

const app = express();

// Configurations and Middlewares
dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// Routes
app.use('/test', testRoutes);
app.use('/auth', authRoutes);
app.use('/user', userRoutes);
app.use('/skill', skillRoutes);
app.use('/role', roleRoutes);
app.use('/project', projectRoutes);
app.use('/join-request', joinRequestRoutes);
app.use('/vacancy', vacancyRoutes);
app.use('/category', categoryRoutes);
app.use('/rating', logRatingRoutes);

export default app;