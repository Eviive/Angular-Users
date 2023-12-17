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
        length: 0
    };
    readonly pageSizeOptions = [5, 10, 25] as const;

    filter: Filter<User> | null = null;

    ngOnChanges(changes: SimpleChanges) {
        if (changes['users']) {
            this.updateDisplayedUsers();
        }
    }

    handlePageChange(page: PageEvent) {
        this.page = {
            ...this.page,
            index: page.pageIndex,
            size: page.pageSize
        };

        this.updateDisplayedUsers();
    }

    updateDisplayedUsers(): void {
        let users = this.users;

        if (this.filter !== null) {
            users = this.filterUsers(users, this.filter);
        }

        this.page.length = users.length;

        users = users.slice(this.page.index * this.page.size, (this.page.index + 1) * this.page.size);

        this.displayedUsers = users;
    }

    private filterUsers(users: User[], filter: Filter<User>): User[] {
        const filterValue = filter.value;

        return users.filter(user => {
            const userValue = user[filter.key].toString().toLowerCase();

            return filter.key === 'id'
                ? filterValue === userValue
                : userValue.includes(filterValue.toString().toLowerCase());
        });
    }

}
