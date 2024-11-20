import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'splash',
    loadChildren: () => import('./splash/splash.module').then( m => m.SplashPageModule)
  },
  {
    path: 'bienvenida',
    loadChildren: () => import('./bienvenida/bienvenida.module').then( m => m.BienvenidaPageModule)
  },
  {
    path: 'registro',
    loadChildren: () => import('./registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./pedidos/pedidos.module').then( m => m.PedidosPageModule)
  },
  {
    path: 'reservaciones',
    loadChildren: () => import('./reservaciones/reservaciones.module').then( m => m.ReservacionesPageModule)
  },
  {
    path: 'loginmovil',
    loadChildren: () => import('./loginmovil/loginmovil.module').then( m => m.LoginmovilPageModule)
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./recuperar/recuperar.module').then( m => m.RecuperarPageModule)
  },
  {
    path: 'menu',
    loadChildren: () => import('./menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'reservas',
    loadChildren: () => import('./reservas/reservas.module').then( m => m.ReservasPageModule)
  },
  {
    path: 'perfilmovil',
    loadChildren: () => import('./perfilmovil/perfilmovil.module').then( m => m.PerfilmovilPageModule)
  },
  {
    path: 'pedidos-anteriores',
    loadChildren: () => import('./pedidos-anteriores/pedidos-anteriores.module').then( m => m.PedidosAnterioresPageModule)
  },
  {
    path: 'pedido-detalle',
    loadChildren: () => import('./pedido-detalle/pedido-detalle.module').then( m => m.PedidoDetallePageModule)
  },
  {
    path: 'ordenar',
    loadChildren: () => import('./ordenar/ordenar.module').then( m => m.OrdenarPageModule)
  },
  {
    path: 'entradas',
    loadChildren: () => import('./entradas/entradas.module').then( m => m.EntradasPageModule)
  },
  {
    path: 'platos-principales',
    loadChildren: () => import('./platos-principales/platos-principales.module').then( m => m.PlatosPrincipalesPageModule)
  },
  {
    path: 'postres',
    loadChildren: () => import('./postres/postres.module').then( m => m.PostresPageModule)
  },
  {
    path: 'bebidas',
    loadChildren: () => import('./bebidas/bebidas.module').then( m => m.BebidasPageModule)
  },
  {
    path: 'altaproducto',
    loadChildren: () => import('./altaproducto/altaproducto.module').then( m => m.AltaproductoPageModule)
  },
  {
    path: 'home-web',
    loadChildren: () => import('./home-web/home-web.module').then( m => m.HomeWebPageModule)
  },
  {
    path: 'pedidos-aceptar',
    loadChildren: () => import('./pedidos-aceptar/pedidos-aceptar.module').then( m => m.PedidosAceptarPageModule)
  },
  {
    path: 'perfil-web',
    loadChildren: () => import('./perfil-web/perfil-web.module').then( m => m.PerfilWebPageModule)
  },
  {
    path: 'admin-productos',
    loadChildren: () => import('./admin-productos/admin-productos.module').then( m => m.AdminProductosPageModule)
  },  {
    path: 'elegir',
    loadChildren: () => import('./elegir/elegir.module').then( m => m.ElegirPageModule)
  },
  {
    path: 'entrega',
    loadChildren: () => import('./entrega/entrega.module').then( m => m.EntregaPageModule)
  },
  {
    path: 'editar',
    loadChildren: () => import('./editar/editar.module').then( m => m.EditarPageModule)
  },
  {
    path: 'pago',
    loadChildren: () => import('./pago/pago.module').then( m => m.PagoPageModule)
  },
  {
    path: 'exito',
    loadChildren: () => import('./exito/exito.module').then( m => m.ExitoPageModule)
  },
  {
    path: 'fracaso',
    loadChildren: () => import('./fracaso/fracaso.module').then( m => m.FracasoPageModule)
  },
  {
    path: 'agregar',
    loadChildren: () => import('./agregar/agregar.module').then( m => m.AgregarPageModule)
  },
  {
    path: 'confirmar',
    loadChildren: () => import('./confirmar/confirmar.module').then( m => m.ConfirmarPageModule)
  },





];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
