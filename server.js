import express from 'express';
import bodyParser from 'body-parser';
import { MercadoPagoConfig, Preference } from 'mercadopago'; // Importar correctamente MercadoPago
import cors from 'cors';  

// Configuración de Mercado Pago con las credenciales de producción (asegúrate de estar usando las correctas)
const client = new MercadoPagoConfig({ 
  accessToken: 'APP_USR-7189162433437834-111522-45dec1225d6214adc2bbc3227b85d259-2101032830' 
});

const app = express();
const port = 3000;

app.use(cors());

// Middleware para parsear el body de las solicitudes
app.use(bodyParser.json());

// Endpoint para procesar el pago
app.post('/process_payment', (req, res) => {
  const paymentData = req.body;

  // Crear el pago con los datos proporcionados
  mercadopago.payment.create(paymentData)
    .then((payment) => {
      res.status(200).json({ payment });
    })
    .catch((error) => {
      console.error('Error al crear el pago', error);
      res.status(500).json({ error: 'Error al procesar el pago' });
    });
});

// Inicia el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
