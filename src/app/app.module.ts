import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { RouterModule } from '@angular/router';
import { routes } from './app-routing.module';

// Module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';

// Firebase Module
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

// Auth
import { AuthGuard } from './core/auth.guard';
import { AuthService } from './core/auth.service';
import { UserService } from './core/user.service';
import { UserResolver } from './core/user.resolver';

// Service
import { SpendService } from './service/spend.service';
import { CategoryPipe } from './shared/category.pipe';

// Component
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { SpendComponent } from './components/spend/add/spend.component';
import { SpendPublicListComponent } from './components/spend/list/public/spend-public-list.component';
import { SpendPrivateListComponent } from './components/spend/list/private/spend-private-list.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SpendComponent,
    SpendPublicListComponent,
    SpendPrivateListComponent,
    CategoryPipe,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    RouterModule,
    BrowserAnimationsModule,
    MaterialModule,
    RouterModule.forRoot(routes, { useHash: false }),
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule,   // imports firebase/auth, only needed for auth features
    AngularFireDatabaseModule
  ],
  providers: [AuthService, UserService, UserResolver, AuthGuard, SpendService],
  bootstrap: [AppComponent]
})
export class AppModule { }
