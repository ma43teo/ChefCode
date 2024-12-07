// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; 
import { HeaderComponent } from '../components/header/header.component'; 
import { FooterComponent } from '../components/footer/footer.component';
import { SidebarComponent } from '../sidebar/sidebar.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, SidebarComponent], 
  imports: [
    CommonModule,
    IonicModule 
  ],
  exports: [HeaderComponent, FooterComponent,SidebarComponent] 
})
export class SharedModule {}
