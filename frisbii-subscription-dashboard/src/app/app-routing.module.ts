import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { CustomerPage } from './pages/customer/customer.page';

const routes: Routes = [
  { path: '', component: DashboardPage },
  { path: 'customers/:handle', component: CustomerPage },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
