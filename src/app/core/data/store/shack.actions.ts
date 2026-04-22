import { createAction, props } from "@ngrx/store";
import { Account } from "../models/Account";
import { BalanceChangeEvent } from "../models/BalanceChangeEvent";
import { TransferAccountRequest } from "../models/TransferAccountRequest";
import { ExchangeRate } from "../models/ExchangeRate";
import { User } from "../models/User";
import { AccountHistory } from "../models/AccountHistory";

//#region User Actions

export const GetCurrentUser = createAction(
  '[Shack] Get Current User'
)

export const GetCurrentUserSuccess = createAction(
  '[Shack] Get Current User Success',
  props<{user: User}>()
)

export const GetCurrentUserFailure = createAction(
  '[Shack] Get Current User Failure',
  props<{error: string}>()
)
//#endregion
//#region Currency and Exchange Actions

export const GetExchangeRates = createAction(
  '[Shack] Get Exchange Rates'
)

export const GetExchangeRatesSuccess = createAction(
  '[Shack] Get Exchange Rates Success',
  props<{ result: ExchangeRate[] }>()
)

export const GetExchangeRatesFailure = createAction(
  '[Shack] Get Exchange Rates Failure',
  props<{ error: string }>()
)

//#region Account Actions

export const RefreshAccounts = createAction(
  '[Shack] Refresh Accounts'
)

export const GetUserAccounts = createAction(
  '[Shack] Get User Accounts'
)

export const GetUserAccountsSuccess = createAction(
  '[Shack] Get User Accounts Success',
  props<{ accounts: Account[] }>()
)

export const GetUserAccountsFailure = createAction(
  '[Shack] Get User Accounts Failure',
  props<{error: string}>()
)

export const GetUserAccountHistory = createAction(
  '[Shack] Get User Accounts History'
)

export const GetUserAccountHistorySuccess = createAction(
  '[Shack] Get User Accounts History Success',
  props<{accounts: AccountHistory[]}>()
)

export const GetUserAccountHistoryFailure = createAction(
  '[Shack] Get User Accounts History Failure',
  props<{error: string}>()
)

export const SelectedAccountChange = createAction(
  '[Shack] - Selected Account Change',
  props<{ accountId:string }>()
)

export const TransferAccountFunds = createAction(
  '[Shack] Transfer Account Funds',
  props<{ request: TransferAccountRequest }>()
)

export const TransferAccountFundsSuccess = createAction(
  '[Shack] Transfer Account Funds Success'
)

export const TransferAccountFundsFailure = createAction(
  '[Shack] Transfer Account Funds Failure',
  props<{ error: string }>()
)
export const OpenTransferFundsDialog = createAction(
  '[Shack] Open Transfer Funds Dialog',
)

export const OpenTransferFundsDialogSuccess = createAction(
  '[Shack] Open Transfer Funds Dialog Success',
  props<{ request: TransferAccountRequest }>()
)

export const OpenTransferFundsDialogFailure = createAction(
  '[Shack] Open Transfer Funds Dialog Failure',
  props<{ error?: string }>()
)

export const NoOperation = createAction(
  '[Shack] No Operation'
)