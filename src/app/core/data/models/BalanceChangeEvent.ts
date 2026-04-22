import { TransactionType } from "./Enums/TransactionType";

export interface BalanceChangeEvent {
    amount: number,
    notes: string,
    transactionType: TransactionType
}