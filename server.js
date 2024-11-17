import express from 'express';
import cors from 'cors';
import { MercadoPagoConfig, Preference } from 'mercadopago';

// Configuración de Mercado Pago
const client = new MercadoPagoConfig({ accessToken: 'APP_USR-7189162433437834-111522-45dec1225d6214adc2bbc3227b85d259-2101032830' });
const preference = new Preference(client);

// Crear servidor Express
const app = express();

// Habilitar CORS
app.use(cors());

// Habilitar la lectura de JSON
app.use(express.json());

// Endpoint para crear preferencia de pago
app.post('/create_preference', (req, res) => {
  preference.create({
    body: {
      items: [
        {
          title: 'Producto de prueba',  // Nombre del producto
          quantity: 1,                  // Cantidad del producto
          unit_price: 100,              // Precio por unidad
        },
      ],
      back_urls: {
        success: 'http://localhost:8100/success',   // URL de éxito
        failure: 'http://localhost:8100/failure',   // URL de error
        pending: 'http://localhost:8100/pending',   // URL de estado pendiente
      },
      auto_return: 'approved',  // Redirige automáticamente después del pago aprobado
    },
  })
    .then(response => {
      // Imprimir la respuesta completa para depurar
      console.log('Respuesta completa de Mercado Pago:', response); 
      // Verificar si 'init_point' está presente en la respuesta
      if (response.body && response.body.init_point) {
        res.json({ init_point: response.body.init_point });
      } else {
        console.error('No se encontró el campo init_point');
        res.status(500).send('No se encontró el campo init_point');
      }
    })
    .catch(error => {
      // Si ocurre un error al crear la preferencia, se muestra el error en consola
      console.error('Error al crear preferencia', error.response ? error.response.body : error);
      res.status(500).send('Error al crear preferencia');
    });
});

// Iniciar el servidor en el puerto 3001
app.listen(3001, () => {
  console.log('Servidor corriendo en http://localhost:3001');
});
