// import express from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import cookieParser from 'cookie-parser';
// import connectDB from './config/db.js';
// import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';

// // Import routes
// import authRoutes from './routes/authRoutes.js';
// import studentRoutes from './routes/studentRoutes.js';
// import teacherRoutes from './routes/teacherRoutes.js';
// import noticeRoutes from './routes/noticeRoutes.js';
// import eventRoutes from './routes/eventRoutes.js';
// import galleryRoutes from './routes/galleryRoutes.js';
// import superAdminRouter from './routes/superAdminRoute.js';
// import adminRouter from './routes/adminRoute.js'
// // Load environment variables
// dotenv.config();

// // Connect to MongoDB
// connectDB();
// const allowedOrigins = [
//   'http://localhost:5173',
//   'https://mansarovar-public-school-green.vercel.app',
//   'https://celebrated-tulumba-ad76da.netlify.app'
// ];
// const app = express();
// const PORT = process.env.PORT || 5000;

// // Get current directory
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);

// // Middleware
// app.use(express.json());
// app.use(cookieParser());
// // app.use(cors({
// //   origin: process.env.NODE_ENV === 'production'
// //     ? [process.env.CLIENT_URL, 'https://mansarovar-public-school-green.vercel.app']
// //     : ['http://localhost:5173', 'https://mansarovar-public-school-green.vercel.app'],
// //   credentials: true
// // }));

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true);
//     if (allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true
// }));

// // Ignore favicon requests (prevent crash)
// app.get('/', (req, res) => res.status(204).end());

// // Ignore favicon requests (prevent crash)
// app.get('/favicon.ico', (req, res) => res.status(204).end());

// app.use('/test', (req, res) => {
//   res.status(200).json({ message: 'Test route working' });
// });

// // API Routes
// app.use('/api/auth', authRoutes);
// app.use('/api/superadmin', superAdminRouter);
// app.use('/api/admin', adminRouter) // @create new
// app.use('/api/students', studentRoutes);
// app.use('/api/teachers', teacherRoutes);
// app.use('/api/notices', noticeRoutes);
// app.use('/api/events', eventRoutes);
// app.use('/api/gallery', galleryRoutes);

// // Serve static assets if in production
// if (process.env.NODE_ENV === 'production') {
//   // Set static folder
//   app.use(express.static('dist'));

//   // Any route that is not API will be redirected to index.html
//   app.get('*', (req, res) => {
//     res.sendFile(join(__dirname, '../dist/index.html'));
//   });
// }

// // Global error handler
// app.use((err, req, res) => {
//   console.error(err.stack);
//   res.status(err.statusCode || 500).json({
//     success: false,
//     message: err.message || 'Internal Server Error',
//   });
// });

// // Start server
// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// // });
// export default app;

// server.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectDB from './config/db.js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Allowed CORS origins
const allowedOrigins = [
  'http://localhost:5173',
  'https://mansarovar-public-school-green.vercel.app',
  'https://celebrated-tulumba-ad76da.netlify.app' // remove spaces
];

const app = express();

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS (production-safe)
app.use(
  cors({
    origin(origin, callback) {
      if (!origin) return callback(null, true); // allow server-to-server / curl
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error('Not allowed by CORS'));
    },
    credentials: true
  })
);

// Optional: log incoming requests (helpful on prod)
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health / test route
app.get('/test', (req, res) => {
  res.status(200).json({ message: 'Test route working' });
});

// Import routes
import authRoutes from './routes/authRoutes.js';
import studentRoutes from './routes/studentRoutes.js';
import teacherRoutes from './routes/teacherRoutes.js';
import noticeRoutes from './routes/noticeRoutes.js';
import eventRoutes from './routes/eventRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import superAdminRouter from './routes/superAdminRoute.js';
import adminRouter from './routes/adminRoute.js';

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/superadmin', superAdminRouter);
app.use('/api/admin', adminRouter);
app.use('/api/students', studentRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/notices', noticeRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/gallery', galleryRoutes);

// Serve static assets if in production (this matters more if you combine frontend+backend)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));

  app.get('*', (req, res) => {
    res.sendFile(join(__dirname, '../dist/index.html'));
  });
}

// Global error handler (must have 4 args)
app.use((err, req, res, next) => {
  console.error('Global error handler:', err.stack);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || 'Internal Server Error'
  });
});

// ❌ Do NOT call app.listen() on Vercel
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

export default app;
