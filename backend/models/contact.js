const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'El nombre es requerido'],
        trim: true,
        maxlength: [100, 'El nombre no puede exceder 100 caracteres']
    },
    email: {
        type: String,
        required: [true, 'El email es requerido'],
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Por favor ingresa un email válido']
    },
    subject: {
        type: String,
        required: [true, 'El asunto es requerido'],
        trim: true,
        maxlength: [200, 'El asunto no puede exceder 200 caracteres']
    },
    message: {
        type: String,
        required: [true, 'El mensaje es requerido'],
        trim: true,
        maxlength: [2000, 'El mensaje no puede exceder 2000 caracteres']
    },
    phone: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['nuevo', 'en_proceso', 'respondido', 'archivado'],
        default: 'nuevo'
    },
    ipAddress: String,
    userAgent: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    respondedAt: Date,
    response: String
});

// Índices para mejor rendimiento
contactSchema.index({ createdAt: -1 });
contactSchema.index({ status: 1 });
contactSchema.index({ email: 1 });

module.exports = mongoose.model('Contact', contactSchema);