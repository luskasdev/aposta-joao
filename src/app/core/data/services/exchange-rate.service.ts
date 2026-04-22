import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { Account } from "../models/Account";
import { ExchangeRate } from "../models/ExchangeRate";
import { Observable } from "rxjs";
@Injectable()
export class ExchangeRateService {
  constructor(
    private http:HttpClient
  ) {}

  getExchangeRates(): Observable<ExchangeRate[]>{
    return this.http.get<ExchangeRate[]>(`${environment.apiUrl}/api/ExchangeRates/GetAll`)
  }
}