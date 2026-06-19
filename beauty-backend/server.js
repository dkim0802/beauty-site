import express from 'express';
import cors from 'cors';
import nodemailer from 'nodemailer';

const app = express();
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true, 
  auth: {
    user: 'cubykinamika@gmail.com',
    pass: 'owgioadxtgxnngtr'
  },
});

app.post('/api/create-payment', async (req, res) => {
  try {
    const { amount, userEmail, userName } = req.body;

    const mailOptions = {
      from: '"Beautyshop" <cubykinamika@gmail.com>',
      to: `${userEmail},  cubykinamika@gmail.com`, 
      subject: 'Успешная покупка в салоне BeautySpace',
      html: `
        <div style="font-family: sans-serif; padding: 25px; border: 1px solid #ff7ebb; border-radius: 12px; max-width: 500px; margin: 0 auto;">
          <h2 style="color: #ff7ebb; margin-top: 0;">Салем, ${userName}</h2>
          <p style="font-size: 16px; color: #333;">Спасибо за покупку в нашем бьюти-пространстве.</p>
          
          <div style="background-color: #fff0f5; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 5px 0;"><b>Товар:</b> Эксклюзивный Бьюти-Бокс</p>
            <p style="margin: 5px 0;"><b>Сумма к оплате:</b> <span style="color: #ff7ebb; font-size: 18px; font-weight: bold;">${amount} ₸</span></p>
            <p style="margin: 5px 0;"><b>Статус заказа:</b> Оплачено успешно</p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
          <p style="font-size: 12px; color: #999; text-align: center;">Письмо сформировано автоматически приложением Beautyshop.</p>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    console.log(`Письмо для ${userEmail} успешно отправлено.`);

    res.json({ success: true });
  } catch (error) {
    console.error('Ошибка отправки почты на сервере:', error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(5001, () => console.log('Сервер уведомлений успешно запущен на порту 5001'));
