import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component
import { LoginComponent } from './components/login/login.component';
import { SpendComponent } from './components/spend/add/spend.component';
import { SpendListComponent } from './components/spend/list/spend-list.component';

// Auth
import { UserResolver } from './core/user.resolver';
import { AuthGuard } from './core/auth.guard';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'spend', component: SpendComponent,  resolve: { data: UserResolver}},
  { path: 'spend-list', component: SpendListComponent,  resolve: { data: UserResolver}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
