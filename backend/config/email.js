const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    secure: false,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Verificar conexión del email
transporter.verify((error, success) => {
    if (error) {
        console.error('❌ Error configurando email:', error);
    } else {
        console.log('✅ Servidor de email listo');
    }
});

const sendContactEmail = async (contactData) => {
    const { name, email, subject, message } = contactData;
    
    const mailOptions = {
        from: `"Jeniffer Photography" <${process.env.EMAIL_USER}>`,
        to: process.env.ADMIN_EMAIL,
        replyTo: email,
        subject: `📩 Nuevo mensaje de contacto: ${subject}`,
        html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                <h2 style="color: #8A2BE2;">Nuevo Mensaje de Contacto</h2>
                <div style="background: #f5f5f5; padding: 20px; border-radius: 10px;">
                    <p><strong>👤 Nombre:</strong> ${name}</p>
                    <p><strong>📧 Email:</strong> ${email}</p>
                    <p><strong>📝 Asunto:</strong> ${subject}</p>
                    <p><strong>💬 Mensaje:</strong></p>
                    <p style="background: white; padding: 15px; border-radius: 5px; border-left: 4px solid #8A2BE2;">
                        ${message.replace(/\n/g, '<br>')}
                    </p>
                </div>
                <p style="margin-top: 20px; color: #666; font-size: 12px;">
                    Este mensaje fue enviado desde el formulario de contacto de jenifferphotography.com
                </p>
            </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        
        // Enviar copia al cliente
        await transporter.sendMail({
            from: `"Jeniffer Photography" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: '✅ Mensaje Recibido - Jeniffer Photography',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #8A2BE2;">¡Gracias por contactarme!</h2>
                    <p>Hola ${name},</p>
                    <p>He recibido tu mensaje y te responderé lo antes posible.</p>
                    <div style="background: #f5f5f5; padding: 15px; border-radius: 10px; margin: 20px 0;">
                        <p><strong>Tu mensaje:</strong></p>
                        <p style="background: white; padding: 10px; border-radius: 5px;">
                            ${message}
                        </p>
                    </div>
                    <p>Saludos,<br><strong>Jeniffer Photography</strong></p>
                    <hr>
                    <p style="color: #666; font-size: 12px;">
                        Teléfono: +505 84329491<br>
                        Email: jenifferariana95@gmail.com<br>
                        Horario: Lun-Sab 9:00am - 8:00pm
                    </p>
                </div>
            `
        });
        
        return true;
    } catch (error) {
        console.error('Error enviando email:', error);
        return false;
    }
};

module.exports = { transporter, sendContactEmail };