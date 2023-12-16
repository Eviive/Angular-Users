import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatListModule } from "@angular/material/list";
import { MatPaginatorModule, PageEvent } from "@angular/material/paginator";
import { RouterLink } from "@angular/router";
import { Filter, Page } from "@app/shared/types/app";
import { UserItemComponent } from "@app/users/user-item/user-item.component";
import { UserSearchBarComponent } from "@app/users/user-search-bar/user-search-bar.component";
import { User } from "@app/users/user.model";

@Component({
    standalone: true,
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrl: './user-list.component.scss',
    imports: [
        MatButtonModule,
        RouterLink,
        MatCardModule,
        MatListModule,
        UserItemComponent,
        UserSearchBarComponent,
        MatPaginatorModule
    ]
})
export class UserListComponent implements OnChanges {

    @Input({ required: true })
    users!: User[];

    displayedUsers: User[] | null = null;

    page: Page = {
        index: 0,
        size: 10,
        length: 0,
        disabled: false
    };
    readonly pageSizeOptions = [5, 10, 25] as const;

    ngOnChanges(changes: SimpleChanges): void {
        const change = changes['users'];

        if (
            change === undefined ||
            change.previousValue !== undefined ||
            !change.currentValue ||
            this.displayedUsers !== null
        ) return;

        this.page.length = this.users.length;
        this.handlePageEvent({
            pageIndex: this.page.index,
            pageSize: this.page.size,
            length: this.users.length
        });
    }

    filterUsers(filter: Filter<User>) {
        const filterValue = filter.value;
        const filteredUsers = this.users.filter(user => {
            const userValue = user[filter.key].toString().toLowerCase();

            if (filterValue === '') {
                this.page.disabled = false;
                return true;
            }

            this.page.disabled = true;

            return filter.key === 'id' && typeof filterValue === 'number'
                ? filterValue === Number(userValue)
                : userValue.includes(filterValue.toString().toLowerCase());
        });
        if (filterValue !== '') {
            this.page = {
                index: 0,
                size: filteredUsers.length,
                length: filteredUsers.length,
                disabled: true
            };
        } else {
            this.page = {
                index: 0,
                size: 10,
                length: this.users.length,
                disabled: false
            };
        }
        this.displayedUsers = filteredUsers;
    }

    handlePageEvent(e: PageEvent) {
        this.page = {
            ...this.page,
            index: e.pageIndex,
            size: e.pageSize
        };
        this.displayedUsers = this.users.slice(
            this.page.index * this.page.size,
            this.page.index * this.page.size + this.page.size
        );
    }

}
