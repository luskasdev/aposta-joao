import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../../environments/environment";
import { Account } from "../models/Account";
import { TransferAccountRequest } from "../models/TransferAccountRequest";
import { AccountHistory } from "../models/AccountHistory";

@Injectable()
export class AccountService {
  constructor(
    private http:HttpClient
  ) {}

  getUserAccounts(){
    return this.http.get<Account[]>(`${environment.apiUrl}/api/account/GetByUser`)
  }

  transferFunds(request: TransferAccountRequest){
    return this.http.put<boolean>(`${environment.apiUrl}/api/account/TransferFunds`, request)
  }

  getUserAccountHistory(accountId: string){
    return this.http.get<AccountHistory[]>(`${environment.apiUrl}/api/account/GetAccountHistory/${accountId}`)
  }
}