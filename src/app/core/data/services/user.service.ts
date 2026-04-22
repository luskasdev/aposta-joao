import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "../../../../environments/environment";
import { User } from "../models/User";

@Injectable()
export class UserService{
  constructor(
    private http:HttpClient
  ) {}

  getUsers(configId: string):Observable<User[]> {
    return this.http.get<User[]>(`${environment.apiUrl}/User/GetAll?configId=${configId}`)
  }

  getCurrentUser(){
    return this.http.get<User>(`${environment.apiUrl}/api/User/me`)
  }
}