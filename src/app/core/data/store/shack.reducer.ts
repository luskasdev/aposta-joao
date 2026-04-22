import { Action, createReducer, on, State } from "@ngrx/store";
import * as ShackActions from "./shack.actions"
import { Account } from "../models/Account";
import { ExchangeRate } from "../models/ExchangeRate";
import { User } from "../models/User";
import { AccountHistory } from "../models/AccountHistory";

export const SHACK_FEATURE_KEY = "shack"

export interface ShackState {
  currentUser: User | null,
  userAccounts: Account[],
  isUserAccountsLoading: boolean,
  accountHistory: AccountHistory[],
  isUserAccountHistoryLoading: boolean;
  selectedAccount: Account | null,
  exchangeRates: ExchangeRate[],
}

const initialState: ShackState = {
  currentUser: null,
  userAccounts: [],
  isUserAccountsLoading: false,
  accountHistory: [],
  isUserAccountHistoryLoading: false,
  selectedAccount: null,
  exchangeRates: [],
};

export const shackReducer = createReducer(
  initialState,
  on(ShackActions.GetExchangeRates, (state) => {
    return {
      ...state
    }
  }),
  on(ShackActions.GetExchangeRatesSuccess, (state, { result }) => {
    return {
      ...state,
      exchangeRates: result
    }
  }),
  on(ShackActions.GetCurrentUser, (state) => {
    return {
      ...initialState,
      exchangeRates: state.exchangeRates,
    }
  }),
  on(ShackActions.GetCurrentUserSuccess, (state, { user }) => {
    return {
      ...state,
      currentUser: user,
    }
  }),
  on(ShackActions.GetUserAccounts, (state) => {
    return {
      ...state,
      isUserAccountsLoading: true,
      accountHistory: [],
      userAccounts: [],
    }
  }),
  on(ShackActions.GetUserAccountsSuccess, (state, { accounts }) => {
    return {
      ...state,
      userAccounts: accounts,
      isUserAccountsLoading: false,
      selectedAccount: accounts.find(x => x.accountId == state.selectedAccount?.accountId) ?? accounts[0] ?? null
    }
  }),
  on(ShackActions.GetUserAccountsFailure, (state) => {
    return {
      ...state,
      isUserAccountsLoading: false
    }
  }),
  on(ShackActions.SelectedAccountChange, (state, { accountId }) => {
    const account = state.userAccounts.find(x => x.accountId == accountId);
    return {
      ...state,
      selectedAccount: account ?? null
    }
  }),
  on(ShackActions.GetUserAccountHistory, (state) => {
    return {
      ...state,
      accountHistory: [],
      isUserAccountHistoryLoading: true
    }
  }),
  on(ShackActions.GetUserAccountHistorySuccess, (state, { accounts }) => {
    return {
      ...state,
      accountHistory: accounts,
      isUserAccountHistoryLoading: false
    }
  }),
  on(ShackActions.GetUserAccountHistoryFailure, (state) => {
    return {
      ...state,
      isUserAccountHistoryLoading: false
    }
  })
)

export function reducer(state: ShackState | undefined, action: Action) {
  return shackReducer(state, action);

}