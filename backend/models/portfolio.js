const mongoose = require('mongoose');

const portfolioSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'El título es requerido'],
        trim: true,
        maxlength: [100, 'El título no puede exceder 100 caracteres']
    },
    category: {
        type: String,
        required: [true, 'La categoría es requerida'],
        enum: ['retrato', 'boda', 'paisaje', 'evento', 'producto', 'arquitectura']
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'La descripción no puede exceder 500 caracteres']
    },
    imageUrl: {
        type: String,
        required: [true, 'La imagen es requerida']
    },
    thumbnailUrl: String,
    tags: [String],
    featured: {
        type: Boolean,
        default: false
    },
    views: {
        type: Number,
        default: 0
    },
    likes: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: Date
});

portfolioSchema.index({ category: 1, createdAt: -1 });
portfolioSchema.index({ featured: 1 });
portfolioSchema.index({ tags: 1 });

module.exports = mongoose.model('Portfolio', portfolioSchema);