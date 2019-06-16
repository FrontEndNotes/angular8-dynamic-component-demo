import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ModalComponent } from './modal/modal.component';
import { PlaceholderDirective } from './placeholder.directive';

@NgModule({
    declarations: [
        AppComponent,
        ModalComponent,
        PlaceholderDirective
    ],
    imports: [
        BrowserModule
    ],
    providers: [],
    bootstrap: [AppComponent],
    entryComponents: [ModalComponent]
})
export class AppModule { }
