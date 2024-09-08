import { Component, OnInit } from '@angular/core';
import { Auth, getAuth, sendPasswordResetEmail } from '@angular/fire/auth';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage implements OnInit {
  email: string = '';
  codeSent: boolean = false;
 
  
  

  constructor(
    private auth: Auth,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private router: Router
  ) {}

  ngOnInit() {
  }

  async sendVerificationEmail() {
    const loading = await this.loadingController.create();
    await loading.present();

    try {
      await sendPasswordResetEmail(this.auth, this.email);
      this.codeSent = true;
      this.showAlert('Éxito', 'Se ha enviado un enlace de recuperacion a tu correo electrónico.');
    } catch (error) {
      console.error('Error en el envío del correo:', error);
      this.showAlert('Error', 'No se pudo enviar el enlace de recuperacion. Revisa tu correo e inténtalo de nuevo.');
    } finally {
      loading.dismiss();
    }
  }

 

  private async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });

    await alert.present();
  }

  volverlogin(){
    this.router.navigate(['/loginmovil']);
  }
}
