import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((mod) => mod.AuthModule),
  },
  {
    path: 'customers',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./customers/customers.module').then((mod) => mod.CustomersModule),
  },

  {
    path: 'products',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./products/products.module').then((mod) => mod.ProductsModule),
  },

  {
    path: '',
    canActivate: [AuthGuard],
    component: DashboardComponent,
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
