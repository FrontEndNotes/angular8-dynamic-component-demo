import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.component.html',
    styleUrls: ['./modal.component.scss']
})
export class ModalComponent {

    @Input() title: string;
    @Input() body: string;
    @Output() close: EventEmitter<void> = new EventEmitter<void>();

    onClose() {
        this.close.emit();
    }
}
