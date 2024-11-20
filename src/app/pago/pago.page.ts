declare const MercadoPago: any;

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pago',
  templateUrl: './pago.page.html',
  styleUrls: ['./pago.page.scss'],
})
export class PagoPage implements OnInit {
  ngOnInit() {
    this.initializeMercadoPago();
  }

  initializeMercadoPago() {
    const mp = new MercadoPago('APP_USR-77c2419f-fc05-48c5-a00c-3292c01b19a7', { locale: 'es-MX' });

    const bricksBuilder = mp.bricks();
    const settings = {
      initialization: {
        amount: 5,  // Monto en pesos mexicanos
        payer: { email: 'usuario@ejemplo.com' },  // Email del usuario
        installments: 1,  // Cuotas de pago
      },
      callbacks: {
        onReady: () => console.log('Brick listo'),
        onSubmit: (cardFormData: any) => this.processPayment(cardFormData),
        onError: (error: any) => console.error('Error en el Brick', error),
      },
    };
    

    bricksBuilder.create('cardPayment', 'cardPaymentBrick_container', settings);
  }

  processPayment(cardFormData: any) {
    fetch('http://localhost:3000/process_payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cardFormData),
    })
      .then((response) => response.json())
      .then((data) => console.log('Resultado del pago:', data))
      .catch((error) => console.error('Error al procesar el pago:', error));
  }
}
