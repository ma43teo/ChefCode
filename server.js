import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { MercadoPagoConfig, Payment } from 'mercadopago';

const app = express();

app.use(cors());
app.use(bodyParser.json());

// Configuración de Mercado Pago
const client = new MercadoPagoConfig({
  accessToken: 'TEST-7189162433437834-111522-475b16cd8a9cd3d21c8ab3cba4918cef-2101032830',
});

// Endpoint para procesar pagos
app.post('/process_payment', async (req, res) => {
  const {
    amount,
    token,
    description,
    installments,
    paymentMethodId,
    issuerId,
    payer: { email, identification },
  } = req.body;

  console.log('Datos recibidos en el backend:', req.body);

  if (!amount || !token || !paymentMethodId || !installments || !email || !identification) {
    return res.status(400).json({ error: 'Faltan parámetros requeridos para procesar el pago' });
  }

  try {
    const payment = new Payment(client);
    const paymentData = {
      transaction_amount: parseFloat(amount), // Aseguramos que sea número
      token,
      description,
      installments: parseInt(installments, 10), // Aseguramos que sea entero
      payment_method_id: paymentMethodId,
      issuer_id: issuerId,
      payer: {
        email,
        identification,
      },
    };

    const result = await payment.create(paymentData);
    console.log('Resultado de la solicitud de pago:', result);
    res.json(result);
  } catch (error) {
    console.error('Error al procesar el pago:', error.message || error);
    res.status(500).json({ error: error.message || 'Error desconocido' });
  }
});

app.listen(3000, () => {
  console.log('Servidor escuchando en http://localhost:3000');
});
