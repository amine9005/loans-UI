import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomersComponent } from './customers/customers.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { LoansComponent } from './loans/loans.component';
import { PaymentsComponent } from './payments/payments.component';
import { SettingsComponent } from './settings/settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: 'customers', component: CustomersComponent },
  { path: 'loans', component: LoansComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'invoices', component: InvoicesComponent },
  { path: 'payments', component: PaymentsComponent },
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth.module').then((mod) => mod.AuthModule),
  },
  {
    path: 'products',
    loadChildren: () =>
      import('./products/products.module').then((mod) => mod.ProductsModule),
  },
  { path: 'dashboard', component: DashboardComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
