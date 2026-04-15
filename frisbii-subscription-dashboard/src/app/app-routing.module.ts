import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardPage } from './pages/dashboard/dashboard.page';
import { CustomerDetailComponent } from './customers/customer-detail/customer-detail.component';

const routes: Routes = [
  { path: '', component: DashboardPage },
  { path: 'customers/:handle', component: CustomerDetailComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
