import { NgOptimizedImage, NgStyle } from "@angular/common";
import { Component, Input } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatListModule } from "@angular/material/list";
import { RouterLink } from "@angular/router";
import { User } from "@app/users/user.model";

@Component({
    standalone: true,
    selector: 'app-user-item',
    templateUrl: './user-item.component.html',
    styleUrl: './user-item.component.scss',
    imports: [
        MatButtonModule,
        RouterLink,
        MatListModule,
        NgOptimizedImage,
        MatCardModule,
        NgStyle
    ]
})
export class UserItemComponent {

    @Input({ required: true })
    user!: User;

}
