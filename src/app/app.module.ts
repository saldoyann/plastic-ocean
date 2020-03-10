import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { IdeeService } from './services/idee.service';
import { Routes, RouterModule } from '@angular/router';

import { EmbedVideo } from 'ngx-embed-video';

const appRoutes: Routes = [
  { path: '', component: AppComponent, data: { title: 'Accueil' } },
  { path: '**', redirectTo: '' } 
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    NgbModule,
    EmbedVideo.forRoot(),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {anchorScrolling: 'enabled'})
  ],
  providers: [
    IdeeService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
