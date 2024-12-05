import { Component, OnInit } from '@angular/core';
import { loadMercadoPago } from '@mercadopago/sdk-js';

declare global {
  interface Window {
    MercadoPago: any;
  }
}

@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
})
export class PagoPage implements OnInit {
  constructor() {}

  async ngOnInit() {
    try {
      await loadMercadoPago();
    } catch (error) {
      console.error('Error al cargar el SDK de MercadoPago:', error);
      return;
    }

    const mp = new window.MercadoPago('TEST-2b3a2413-545d-4c1c-9dec-c81eb99f3531');

    const cardForm = mp.cardForm({
      amount: '100.5', // Monto de la transacción
      iframe: true,
      form: {
        id: 'form-checkout',
        cardNumber: { id: 'form-checkout__cardNumber', placeholder: 'Número de tarjeta' },
        expirationDate: { id: 'form-checkout__expirationDate', placeholder: 'MM/YY' },
        securityCode: { id: 'form-checkout__securityCode', placeholder: 'CVC' },
        cardholderName: { id: 'form-checkout__cardholderName', placeholder: 'Titular' },
        issuer: { id: 'form-checkout__issuer', placeholder: 'Banco emisor' },
        installments: { id: 'form-checkout__installments', placeholder: 'Cuotas' },
        cardholderEmail: { id: 'form-checkout__cardholderEmail', placeholder: 'Correo electrónico' },
      },
      callbacks: {
        onFormMounted: (error: any) => {
          if (error) {
            console.warn('Error al montar el formulario:', error);
          } else {
            console.log('Formulario montado correctamente');
          }
        },
        onSubmit: async (event: Event) => {
          event.preventDefault();

          const {
            paymentMethodId,
            issuerId,
            cardholderEmail,
            amount,
            token,
            installments,
            identificationNumber,
            identificationType,
          } = cardForm.getCardFormData();

          if (!token || !paymentMethodId || !issuerId || !installments) {
            console.error('Faltan datos para procesar el pago');
            return;
          }

          const paymentData = {
            token,
            issuerId,
            paymentMethodId,
            amount: parseFloat(amount),
            installments: parseInt(installments, 10),
            description: 'Descripción del producto',
            payer: {
              email: cardholderEmail,
              identification: {
                type: identificationType,
                number: identificationNumber,
              },
            },
          };

          try {
            const response = await fetch('http://localhost:3000/process_payment', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(paymentData),
            });

            if (!response.ok) {
              const errorData = await response.json();
              throw new Error(errorData.error || 'Error desconocido');
            }

            const result = await response.json();
            console.log('Pago procesado con éxito:', result);
          } catch (error) {
            console.error(
              'Error al procesar el pago:',
              error instanceof Error ? error.message : error
            );
          }
        },
        onFetching: (resource: any) => {
          console.log('Fetching resource:', resource);
          const progressBar = document.querySelector('.progress-bar');
          if (progressBar) progressBar.removeAttribute('value');

          return () => {
            if (progressBar) progressBar.setAttribute('value', '0');
          };
        },
      },
    });
  }
}
