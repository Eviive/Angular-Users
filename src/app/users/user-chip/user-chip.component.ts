import { Component, Input } from '@angular/core';
import { MatChipsModule } from "@angular/material/chips";

@Component({
    standalone: true,
    selector: 'app-user-chip',
    templateUrl: './user-chip.component.html',
    styleUrl: './user-chip.component.scss',
    imports: [
        MatChipsModule
    ]
})
export class UserChipComponent {

    @Input({ required: true })
    isCurrentUser!: boolean;

}
