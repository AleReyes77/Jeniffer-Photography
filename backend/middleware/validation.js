const validateContact = (req, res, next) => {
  const { name, email, subject, message } = req.body;
  const errors = [];

  if (!name || name.trim().length < 2) {
    errors.push('El nombre debe tener al menos 2 caracteres');
  }

  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    errors.push('Por favor ingresa un email válido');
  }

  if (!subject || subject.trim().length < 5) {
    errors.push('El asunto debe tener al menos 5 caracteres');
  }

  if (!message || message.trim().length < 10) {
    errors.push('El mensaje debe tener al menos 10 caracteres');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      success: false,
      message: 'Errores de validación',
      errors
    });
  }

  next();
};

module.exports = {
  validateContact
};