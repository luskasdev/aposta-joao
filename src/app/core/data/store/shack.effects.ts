import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, withLatestFrom, of, switchMap, concatMap, mergeMap, tap, filter} from "rxjs";
import { Store, select } from "@ngrx/store";
import { ShackState } from "./shack.reducer";
import { AccountService, ExchangeRateService, UserService } from "../services";
import * as ShackActions from "./shack.actions";
import { Router } from "@angular/router";
import { ShackSelectors } from ".";
import { MatDialog } from "@angular/material/dialog";
import { DialogComponent, DialogData, DialogResult, TransferFundsDialog, TransferFundsDialogData, TransferFundsDialogResult } from "../../../shared/components";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable()
export class ShackEffects {
  private readonly SNACK_BAR_DURATION = 5000; 

  constructor(
    private store: Store<ShackState>,
    private actions$: Actions,
    private router: Router,
    private userService: UserService,
    private exchangeRateService: ExchangeRateService,
    private accountService: AccountService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  getCurrentUser$ = createEffect(() => this.actions$.pipe(
    ofType(
      ShackActions.GetCurrentUser,
    ),
    switchMap(action => 
      this.userService.getCurrentUser().pipe(
        map(user => ShackActions.GetCurrentUserSuccess({ user })),
        catchError(error => of(ShackActions.GetCurrentUserFailure({ error: error.message })))
      )
    )
  ));

  
  getExchangeRates$ = createEffect(() => this.actions$.pipe(
    ofType(
      ShackActions.GetExchangeRates,
    ),
    switchMap(action => 
      this.exchangeRateService.getExchangeRates().pipe(
        map(result => ShackActions.GetExchangeRatesSuccess({ result })),
        catchError(error => of(ShackActions.GetExchangeRatesFailure({ error: error.message })))
      )
    )
  ));

  transferFundsDialog$ = createEffect(() => this.actions$.pipe(
    ofType(
      ShackActions.OpenTransferFundsDialog
    ),
    withLatestFrom(
      this.store.select(ShackSelectors.getUserAccounts),
      this.store.select(ShackSelectors.getExchangeRates),
      this.store.select(ShackSelectors.getCurrentUser),
      this.store.select(ShackSelectors.getSelectedAccount)
    ),
    switchMap(([action, accounts, exchangeRates, currentUser, selectedAccount]) => {
        const dialogRef = this.dialog.open(TransferFundsDialog, { data: { 
          accounts: accounts, 
          exchangeRates: exchangeRates,
          accountId: selectedAccount?.accountId,
          userId: currentUser?.id
        } as TransferFundsDialogData });

        return dialogRef.afterClosed().pipe(
          switchMap((result: TransferFundsDialogResult) => {
            if(result.primaryButtonClicked){
              return of(ShackActions.OpenTransferFundsDialogSuccess({ request: result.data  }));
            } else {
              return of(ShackActions.OpenTransferFundsDialogFailure({}));
            }
          }),
          catchError((error: any) => of(ShackActions.OpenTransferFundsDialogFailure({error: "An error occured while transfering funds"})))
        );
      }
    )
  ));

  transferFundsRequest$ = createEffect(() => this.actions$.pipe(
    ofType(
      ShackActions.OpenTransferFundsDialogSuccess
    ),
    switchMap((action) => {
        return this.accountService.transferFunds(action.request).pipe(
          map(() => ShackActions.TransferAccountFundsSuccess()),
          catchError(() => of(ShackActions.TransferAccountFundsFailure({error: "Unable to transfer funds"})))
        );
      }
    )
  ));

  triggerGetUserAccounts$ = createEffect(() => this.actions$.pipe(
    ofType(
      ShackActions.GetCurrentUserSuccess,
      ShackActions.TransferAccountFundsSuccess
    ),
    switchMap((action) => {
      return of(ShackActions.GetUserAccounts())
    })
  ))


  getUserAccounts$ = createEffect(() => this.actions$.pipe(
    ofType(
      ShackActions.GetUserAccounts,
    ),
    withLatestFrom(this.store.select(ShackSelectors.getCurrentUser)),
    switchMap(([action, user]) => {
      if(user){
        return this.accountService.getUserAccounts().pipe(
          map(accounts => ShackActions.GetUserAccountsSuccess({ accounts })),
          catchError(error => of(ShackActions.GetUserAccountsFailure({ error: error.message })))
        )
      } else {
        return of(ShackActions.GetUserAccountsFailure({ error: "User is null" }))
      }
    })
  ));

  triggerGetUserAccountHistory$ = createEffect(() => this.actions$.pipe(
    ofType(
      ShackActions.SelectedAccountChange,
      ShackActions.GetUserAccountsSuccess
    ),
    switchMap((action) => {
      return of(ShackActions.GetUserAccountHistory())
    })
  ))

  getUserAccountsHistory$ = createEffect(() => this.actions$.pipe(
    ofType(
      ShackActions.GetUserAccountHistory,
    ),
    withLatestFrom(
      this.store.select(ShackSelectors.getCurrentUser),
      this.store.select(ShackSelectors.getSelectedAccount)
    ),
    switchMap(([action, user, account]) => {
      if(user && account){
        return this.accountService.getUserAccountHistory(account.accountId).pipe(
          map(accounts => ShackActions.GetUserAccountHistorySuccess({ accounts })),
          catchError(error => of(ShackActions.GetUserAccountHistoryFailure({ error: error.message })))
        )
      } else {
        return of(ShackActions.GetUserAccountHistoryFailure({ error: "user | selectedAccount is null" }))
      }
    })
  ));

  showTransferSuccessSnackBar$ = createEffect(() => this.actions$.pipe(
    ofType(
      ShackActions.TransferAccountFundsSuccess,
    ),
    tap((action) => {
      this.snackBar.open("Successfully Transfered Funds", undefined, {duration: this.SNACK_BAR_DURATION});
    })
    ), { dispatch: false }
  );

  showErrorSnackBar$ = createEffect(() => this.actions$.pipe(
    ofType(
      ShackActions.TransferAccountFundsFailure,
      ShackActions.GetUserAccountsFailure,
      ShackActions.GetCurrentUserFailure
    ),
    tap((action) => {
      this.snackBar.open(action.error, undefined, {duration: this.SNACK_BAR_DURATION});
    })
    ), { dispatch: false }
  );
}