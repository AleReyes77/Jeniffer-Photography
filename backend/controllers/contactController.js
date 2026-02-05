const Contact = require('../models/Contact');
const { sendContactEmail } = require('../config/email');

exports.createContact = async (req, res) => {
    try {
        const { name, email, subject, message, phone } = req.body;
        
        // Crear nuevo contacto
        const contact = new Contact({
            name,
            email,
            subject,
            message,
            phone,
            ipAddress: req.ip,
            userAgent: req.headers['user-agent']
        });

        await contact.save();

        // Enviar email
        const emailSent = await sendContactEmail({ name, email, subject, message });
        
        res.status(201).json({
            success: true,
            message: 'Mensaje enviado exitosamente',
            data: {
                id: contact._id,
                emailSent
            }
        });
    } catch (error) {
        console.error('Error en contacto:', error);
        res.status(500).json({
            success: false,
            message: 'Error al procesar el mensaje'
        });
    }
};

exports.getAllContacts = async (req, res) => {
    try {
        const { status, startDate, endDate, page = 1, limit = 20 } = req.query;
        
        let query = {};
        
        // Filtros
        if (status) query.status = status;
        if (startDate || endDate) {
            query.createdAt = {};
            if (startDate) query.createdAt.$gte = new Date(startDate);
            if (endDate) query.createdAt.$lte = new Date(endDate);
        }
        
        const contacts = await Contact.find(query)
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit));
        
        const total = await Contact.countDocuments(query);
        
        res.json({
            success: true,
            data: contacts,
            pagination: {
                page: parseInt(page),
                limit: parseInt(limit),
                total,
                pages: Math.ceil(total / limit)
            }
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener contactos'
        });
    }
};

exports.getContact = async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);
        
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contacto no encontrado'
            });
        }
        
        res.json({
            success: true,
            data: contact
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al obtener contacto'
        });
    }
};

exports.updateContact = async (req, res) => {
    try {
        const { status, response } = req.body;
        
        const updateData = { status };
        if (response) {
            updateData.response = response;
            updateData.respondedAt = new Date();
        }
        
        const contact = await Contact.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        );
        
        if (!contact) {
            return res.status(404).json({
                success: false,
                message: 'Contacto no encontrado'
            });
        }
        
        res.json({
            success: true,
            data: contact,
            message: 'Contacto actualizado'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error al actualizar contacto'
        });
    }
};