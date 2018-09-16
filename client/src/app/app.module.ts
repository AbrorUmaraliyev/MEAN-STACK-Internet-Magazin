import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
//Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MessageComponent } from './message/message.component'
import {AppRoutingModule} from './app-routing.module'
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';

//Service
import { RestApiService } from './rest-api.service';
import { DataService } from './data.service';
import { AuthGuardService } from './auth-guard.service';
import { ProfileComponent } from './profile/profile.component';
import { SettingsComponent } from './settings/settings.component';
import { AddressComponent } from './address/address.component';
import { CategoriesComponent } from './categories/categories.component';
import { PostProductComponent } from './post-product/post-product.component';
import { MyProductsComponent } from './my-products/my-products.component';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { SearchComponent } from './search/search.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MessageComponent,
    RegistrationComponent,
    LoginComponent,
    ProfileComponent,
    SettingsComponent,
    AddressComponent,
    CategoriesComponent,
    PostProductComponent,
    MyProductsComponent,
    CategoryComponent,
    ProductComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [RestApiService,DataService,AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
