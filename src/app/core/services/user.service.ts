import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from '@angular/core';
import { User } from "@app/users/user.model";
import { environment } from "@env/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private readonly http = inject(HttpClient);

    private readonly baseUrl = environment.apiBaseUrl;

    getUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.baseUrl}`);
    }

    getUser(id: number | string): Observable<User> {
        return this.http.get<User>(`${this.baseUrl}/${id}`);
    }

    addUser(user: User): Observable<User> {
        return this.http.post<User>(`${this.baseUrl}`, user);
    }

    updateUser(user: User): Observable<User> {
        return this.http.put<User>(`${this.baseUrl}/${user.id}`, user);
    }

    deleteUser(user: User): Observable<User> {
        return this.http.delete<User>(`${this.baseUrl}/${user.id}`);
    }

}
