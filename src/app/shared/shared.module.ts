import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from '../main/layout/cards/cards.component';
import { FooterComponent } from '../main/layout/footer/footer.component';
import { NavbarComponent } from '../main/layout/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { TruncatePipe } from '../core/pipes/truncate.pipe';
import { CarouselComponent } from '../main/layout/carousel/carousel.component';



@NgModule({
  declarations: [ 
    ///components
    NavbarComponent, 
    FooterComponent, 
    CardsComponent,
    CarouselComponent,
    /// pipes
    TruncatePipe,
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[ 
        ///components
        NavbarComponent, 
        FooterComponent, 
        CardsComponent,
        CarouselComponent,
        /// pipes
        TruncatePipe,
  ]
})
export class SharedModule { }
