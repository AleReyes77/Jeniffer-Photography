require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const compression = require('compression');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');

// Importar rutas
const contactRoutes = require('./routes/contact');
const portfolioRoutes = require('./routes/portfolio');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');

const app = express();

// Configurar rate limiting
const limiter = rateLimit({
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW) * 60 * 1000,
    max: parseInt(process.env.RATE_LIMIT_MAX),
    message: 'Demasiadas solicitudes desde esta IP, por favor intente más tarde.'
});

// Middlewares
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            scriptSrc: ["'self'", "'unsafe-inline'", "https://cdnjs.cloudflare.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:"],
            connectSrc: ["'self'"]
        }
    }
}));
app.use(compression());
app.use(morgan('combined'));
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(limiter);

// Servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, '..')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Rutas de API
app.use('/api/contact', contactRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

// Ruta para verificar estado del servidor - ¡AGREGADA AQUÍ!
app.get('/api/status', (req, res) => {
  res.json({
    status: 'online',
    message: 'Jeniffer Photography API',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'development',
    timestamp: new Date().toISOString()
  });
});

// Ruta para servir el index.html (SOLO para rutas no-API)
app.get('*', (req, res, next) => {
  // Si la ruta comienza con /api, pasar al manejador de errores 404
  if (req.path.startsWith('/api/')) {
    return next();
  }
  // De lo contrario, servir el frontend
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Conectar a MongoDB
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('✅ MongoDB conectado'))
  .catch(err => console.error('❌ Error de MongoDB:', err));
} else {
  console.log('🛠️  MongoDB URI no definida. Modo sin base de datos.');
}

// Manejo de errores 404 para rutas API
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Ruta API no encontrada',
    path: req.path,
    availableRoutes: [
      '/api/status',
      '/api/contact',
      '/api/portfolio',
      '/api/auth',
      '/api/admin'
    ]
  });
});

// Manejo de errores generales
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || 'Error interno del servidor'
    });
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📊 Entorno: ${process.env.NODE_ENV || 'development'}`);
    console.log(`📡 API Status: http://localhost:${PORT}/api/status`);
    
    if (process.env.EMAIL_USER) {
        console.log(`📧 Email configurado: ${process.env.EMAIL_USER}`);
    }
});