import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { PlaceholderDirective } from './placeholder.directive';
import { ModalComponent } from './modal/modal.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
    pageTitle = 'Dynamic components demo';
    showModal: boolean = false;

    titleText = 'Modal title - *ngIf';
    bodyText = 'Modal body - *ngIf';

    dynamicModalTitleText = 'Dynamic modal title text';
    dynamicModalBodyText = 'Dynamic modal body text';

    @ViewChild(PlaceholderDirective, {static: false}) alertHost: PlaceholderDirective;
    private dynamicModalCloseSubscription: Subscription;

    constructor (private componentFactoryResolver: ComponentFactoryResolver) {}

    onModalShow() {
        this.showModal = true;
    }

    onModalClose() {
        this.showModal = false;
    }


    /* dynamic */
    onShowDynamicModal() {
        this.showDynamic(this.dynamicModalTitleText, this.dynamicModalBodyText);
    }

    private showDynamic (title: string, body: string) {
        const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
        const hostViewContainerRef = this.alertHost.viewContainerRef;

        // NgModule > entryComponents needs to know about that component
        // entryComponents: [ModalComponent]
        hostViewContainerRef.clear();
        const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);
        componentRef.instance.title = title;
        componentRef.instance.body = body;

        this.dynamicModalCloseSubscription = componentRef.instance.close.subscribe( () => {
            this.dynamicModalCloseSubscription.unsubscribe();
            hostViewContainerRef.clear();
        });
    }

    ngOnDestroy() {
        if (this.dynamicModalCloseSubscription) {
            this.dynamicModalCloseSubscription.unsubscribe();
        }
    }
}
