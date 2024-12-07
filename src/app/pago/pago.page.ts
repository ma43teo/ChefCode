import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { loadMercadoPago } from '@mercadopago/sdk-js';
import { ToastController } from '@ionic/angular'; // Importar el ToastController
import { getFirestore, doc, updateDoc } from 'firebase/firestore'; // Importar Firebase Firestore


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
  total: number = 0;
  pedidoId: string = ''; // Aquí almacenamos el ID del pedido

  constructor(
    private route: ActivatedRoute, 
    private toastController: ToastController
  ) {}

  async ngOnInit() {
    // Configura Firebase
   

    // Obtener el total de la ruta
    this.total = parseFloat(this.route.snapshot.queryParams['total']);
    // Obtener el ID del pedido de la ruta (o de otro parámetro)
    this.pedidoId = this.route.snapshot.queryParams['pedidoId'] || '';

    try {
      await loadMercadoPago();
    } catch (error) {
      console.error('Error al cargar el SDK de MercadoPago:', error);
      return;
    }

    const mp = new window.MercadoPago('TEST-2b3a2413-545d-4c1c-9dec-c81eb99f3531');

    const cardForm = mp.cardForm({
      amount: this.total.toString(),
      iframe: true,
      form: {
        id: 'form-checkout',
        cardNumber: { id: 'form-checkout__cardNumber', placeholder: 'Número de tarjeta' },
        expirationDate: { id: 'form-checkout__expirationDate', placeholder: 'MM/YY' },
        securityCode: { id: 'form-checkout__securityCode', placeholder: 'CVC' },
        cardholderName: { id: 'form-checkout__cardholderName', placeholder: 'Titular de la tarjeta' },
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
            cardholderName,
          } = cardForm.getCardFormData();

          // Verificar si los campos obligatorios están completos
          const isValid = token && paymentMethodId && issuerId && installments;

          if (!isValid) {
            console.log('Algunos campos faltan, pero se procesará con los datos disponibles');
          }

          const paymentData: any = {
            token,
            issuerId,
            paymentMethodId,
            amount: parseFloat(amount),
            installments: parseInt(installments, 10),
            description: 'Compra de ejemplo',
            payer: {
              email: cardholderEmail || '',
              identification: {
                type: identificationType || '',
                number: identificationNumber || '',
              },
            },
          };

          if (cardholderName) {
            paymentData.cardholderName = cardholderName;
          }

          // Simulación del procesamiento del pago (sin backend)
          try {
            setTimeout(async () => {
              console.log('Pago procesado con éxito:', paymentData);

              // Guardar en Firebase el ID del pedido con los detalles de pago
              const db = getFirestore();
              const pedidoRef = doc(db, 'pedidos', this.pedidoId); // Obtener referencia al pedido por su ID

              const updatedPaymentData = {
                paymentStatus: 'success',
                paymentMethod: paymentData.paymentMethodId,
                amount: paymentData.amount,
                installments: paymentData.installments,
                payerEmail: paymentData.payer.email,
                cardholderName: paymentData.cardholderName || '', // Asegurarse de que no sea undefined
                issuerId: paymentData.issuerId, // Banco emisor

              };

              await updateDoc(pedidoRef, updatedPaymentData); // Actualiza el documento con los datos de pago

              // Mostrar un mensaje emergente (Toast) al usuario
              this.showToast('Pago realizado con éxito');
            }, 2000); // Simula un retardo de 2 segundos como si fuera un servidor real
          } catch (error) {
            console.error('Error al procesar el pago:', error);
            this.showToast('Hubo un problema al procesar el pago');
          }
        },
      },
    });
  }

  async showToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }
}
