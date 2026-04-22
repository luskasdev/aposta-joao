export interface AccountHistory {
  changeDate: Date,
  newAmount: number,
  previousAmount: number,
  transactionAmount: number,
  transactionNotes: string,
  currencyCode:string
}