import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {MatPaginatorModule} from '@angular/material/paginator';


import { AppComponent } from './app.component';
import { PostCreateComponent } from './post-create/post-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { PostListComponent } from './post-list/post-list.component';
import {PostsService } from './posts.service';
import {AppRoutingModule} from './app-routing/app-routing.module';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component'
import {AuthIntercepter} from './auth-interceptor'

@NgModule({
  declarations: [
    AppComponent,
    PostCreateComponent,
    HeaderComponent,
    PostListComponent,
    LoginComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    HttpClientModule,
    AppRoutingModule,
    MatProgressSpinnerModule,
    MatPaginatorModule
  ],
  providers: [PostsService,{provide : HTTP_INTERCEPTORS, useClass: AuthIntercepter,multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
