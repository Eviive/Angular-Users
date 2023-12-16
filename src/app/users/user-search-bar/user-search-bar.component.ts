import { AfterViewInit, Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { Filter } from "@app/shared/types/app";
import { isNotNullOrUndefined } from "@app/shared/utils/assertion";
import { Destroyed } from "@app/shared/utils/destroyed.component";
import { User } from "@app/users/user.model";
import { debounceTime, distinctUntilChanged, filter, fromEvent, map } from "rxjs";

@Component({
    standalone: true,
    selector: 'app-user-search-bar',
    templateUrl: './user-search-bar.component.html',
    styleUrl: './user-search-bar.component.scss',
    imports: [
        MatFormFieldModule,
        MatSelectModule,
        ReactiveFormsModule,
        MatInputModule,
        FormsModule
    ]
})
export class UserSearchBarComponent extends Destroyed implements AfterViewInit {

    @ViewChild('searchBarInput')
    readonly searchBarInput!: ElementRef<HTMLInputElement>;

    @Output()
    readonly searchBar = new EventEmitter<Filter<User>>();

    selectedKey: keyof User = 'email';

    ngAfterViewInit(): void {
        const input = this.searchBarInput.nativeElement;

        fromEvent(input, 'input')
            .pipe(
                this.untilDestroyed(),
                map(e => {
                    if (
                        !(e instanceof InputEvent) ||
                        !(e.target instanceof HTMLInputElement)
                    ) return null;

                    return this.selectedKey !== 'id'
                        ? e.target.value
                        : e.target.valueAsNumber;
                }),
                filter(isNotNullOrUndefined),
                debounceTime(300),
                distinctUntilChanged()
            )
            .subscribe(value =>
                this.searchBar.emit({
                    key: this.selectedKey,
                    value: value
                })
            );
    }

    handleCriteriaChange(key: keyof User) {
        this.searchBarInput.nativeElement.value = '';
        this.searchBar.emit({
            key: key,
            value: ''
        });
    }

}
