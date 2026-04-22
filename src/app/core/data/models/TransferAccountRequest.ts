export interface TransferAccountRequest {
  userId:string;
  fromAccountId: string;
  toAccountId: string;
  amount: number;
}