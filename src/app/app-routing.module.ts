import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Component
import { LoginComponent } from './components/login/login.component';
import { SpendComponent } from './components/spend/add/spend.component';
import { SpendPublicListComponent } from './components/spend/list/public/spend-public-list.component';
import { SpendPrivateListComponent } from './components/spend/list/private/spend-private-list.component';

// Auth
import { UserResolver } from './core/user.resolver';
import { AuthGuard } from './core/auth.guard';


export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
  { path: 'spend', component: SpendComponent,  resolve: { data: UserResolver}},
  { path: 'spend-public-list', component: SpendPublicListComponent,  resolve: { data: UserResolver}},
  { path: 'spend-private-list', component: SpendPrivateListComponent,  resolve: { data: UserResolver}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
