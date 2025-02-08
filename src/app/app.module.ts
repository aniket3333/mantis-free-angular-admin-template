import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    NgxUiLoaderModule.forRoot({
      bgsColor: 'red',
      bgsPosition: 'bottomCenter',
      bgsSize: 40,
      bgsType: 'rectangleBounce', // background spinner type
      fgsType: 'chasingDots', // foreground spinner type
      pbDirection: 'leftToRight', // progress bar direction
      pbThickness: 5, // progress bar thickness
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA] // Add this line
})
export class AppModule {}
