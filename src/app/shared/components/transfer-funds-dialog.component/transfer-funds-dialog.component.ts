import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TransferAccountRequest } from '../../../core/data/models/TransferAccountRequest';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ExchangeRate } from '../../../core/data/models/ExchangeRate';
import { Account } from '../../../core/data/models/Account';

@Component({
  selector: 'app-transfer-funds-dialog',
  templateUrl: './transfer-funds-dialog.component.html',
  styleUrls: ['./transfer-funds-dialog.component.scss'],
  standalone: false
})
export class TransferFundsDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<TransferFundsDialog>,
    @Inject(MAT_DIALOG_DATA) public data: TransferFundsDialogData
  ) { }

  fromAccounts = this.data.accounts;
  toAccounts = this.data.accounts;
  fromExchangeRate: number = 0;
  toExchangeRate: number = 0;
  exchangeResult: number = 0; 

  transferFundsForm = new FormGroup({
    fromAccount: new FormControl<string>("", [Validators.required]),
    toAccount: new FormControl<string>("", [Validators.required]),
    amount: new FormControl<number>(0, [Validators.required, Validators.min(1)])
  });

  get enableConfirmButton() {
    const isAmountWholeNumber = this.amount % 1 === 0 && this.amount > 0;
    const isExchangeRateResultWholeNumber = (this.exchangeResult !== null && this.exchangeResult % 1 === 0);
    const isAmountValid = (this.exchangeResult <= (this.getFromSelectedAccount()?.amount ?? 0));
  
    return (
      this.transferFundsForm.valid &&
      isAmountWholeNumber &&
      isExchangeRateResultWholeNumber &&
      isAmountValid
    );
  }
  get amount(){
    return this.transferFundsForm.controls.amount.value ?? 0;
  }

  ngOnInit(): void {
    // Initialize account lists
    this.fromAccounts = [...this.data.accounts];
    this.toAccounts = [...this.data.accounts];
    this.transferFundsForm.controls.fromAccount.patchValue(this.data.accountId);

    this.transferFundsForm.controls.fromAccount.valueChanges.subscribe((value) => {
      const fromAccountControl = this.transferFundsForm.controls.fromAccount;
      const toAccountControl = this.transferFundsForm.controls.toAccount;
      if(toAccountControl.value === fromAccountControl.value){
        this.transferFundsForm.controls.toAccount.patchValue("");
      }
    });

    this.transferFundsForm.controls.toAccount.valueChanges.subscribe((value) => {
      const toAccountControl = this.transferFundsForm.controls.fromAccount;
      const fromAccountControl = this.transferFundsForm.controls.toAccount;
      if(toAccountControl.value === fromAccountControl.value){
        this.transferFundsForm.controls.fromAccount.patchValue("");
      }
    });

    // Subscribe to form value changes
    this.transferFundsForm.valueChanges.subscribe((value) => {
      const { fromAccount, toAccount } = value;
      this.exchangeResult = this.fromExchangeRate * (this.transferFundsForm.controls.amount.value ?? 0)
      this.updateExchangeRate(fromAccount ?? null, toAccount ?? null);
    });
  }

  updateExchangeRate(fromAccountId: string | null, toAccountId: string | null): void {
    if (!fromAccountId || !toAccountId) {
      this.fromExchangeRate = 0;
      return;
    }

    const fromAccount = this.data.accounts.find(account => account.accountId === fromAccountId);
    const toAccount = this.data.accounts.find(account => account.accountId === toAccountId);

    if (fromAccount && toAccount) {
      const toRate = this.data.exchangeRates.find(
        er => er.fromCurrencyId === fromAccount.currencyId && er.toCurrencyId === toAccount.currencyId
      );
      this.toExchangeRate = toRate?.rate ?? 0;

      const fromRate = this.data.exchangeRates.find(
        er => er.fromCurrencyId === toAccount.currencyId && er.toCurrencyId === fromAccount.currencyId
      );
      this.fromExchangeRate = fromRate?.rate ?? 0; 
    }
  }

  onSubmit(){
    if (this.transferFundsForm.valid) {
      const formData = this.transferFundsForm.value;
      this.dialogRef.close({
        primaryButtonClicked: true,
        secondaryButtonClicked: false,
        data: {
          fromAccountId: formData.fromAccount,
          toAccountId: formData.toAccount,
          amount: this.exchangeResult,
          userId: this.data.userId,
        }
      } as TransferFundsDialogResult);
    }
  }

  getResultString(){
    var returnString = "";
    if(this.getFromSelectedAccount() && this.getToSelectedAccount() && this.amount > 0){
      const fromCurrencyCode = this.getFromSelectedAccount()?.currencyCode ?? ""
      const toCurrencyCode = this.getToSelectedAccount()?.currencyCode ?? ""
      returnString = `${this.exchangeResult} ${fromCurrencyCode} x ${this.toExchangeRate} => ${this.amount} ${toCurrencyCode}`
    }
    return returnString
  }
  
  getFromSelectedAccount(){
    return this.data.accounts.find(account => account.accountId === this.transferFundsForm.controls.fromAccount.value);
  }

  getToSelectedAccount(){
    return this.data.accounts.find(account => account.accountId === this.transferFundsForm.controls.toAccount.value);
  }

  onCloseDialog(buttonClicked: "primary" | "secondary"){
    this.dialogRef.close({
      primaryButtonClicked: buttonClicked == "primary",
      secondaryButtonClicked: buttonClicked == "secondary"
    } as TransferFundsDialogResult)
  }
}

export interface TransferFundsDialogData {
  accounts: Account[],
  userId: string,
  exchangeRates: ExchangeRate[],
  accountId: string,
}

export interface TransferFundsDialogResult {
  primaryButtonClicked: boolean;
  secondaryButtonClicked: boolean; 
  data: TransferAccountRequest
}