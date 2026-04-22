import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ShackState } from '../../data/store/shack.reducer';
import { Store } from '@ngrx/store';
import { ShackActions, ShackSelectors } from '../../data/store';

@Component({
  selector: 'home-container',
  templateUrl: './home-container.html',
  standalone: false,
})
export class HomeContainer implements OnInit {
  userAccounts$ = this.store.select(ShackSelectors.getUserAccounts);
  selectedAccount$ = this.store.select(ShackSelectors.getSelectedAccount);
  currentUser$ = this.store.select(ShackSelectors.getCurrentUser)
  accountHistory$ = this.store.select(ShackSelectors.getAccountHistory);
  loadingUserAccounts$ = this.store.select(ShackSelectors.getUserAccountsLoading)
  loadingUserAccountHistory$ = this.store.select(ShackSelectors.getUserAccountHistoryLoading)

  constructor(
    private store: Store<ShackState>
  ) {}
  
  ngOnInit(): void {
    this.store.dispatch(ShackActions.GetExchangeRates())
    this.store.dispatch(ShackActions.GetCurrentUser())
  }

  accountSelectionChange(accountId:string){
    this.store.dispatch(ShackActions.SelectedAccountChange({ accountId }))
  }

  transferFunds(){
    this.store.dispatch(ShackActions.OpenTransferFundsDialog())
  }

  refreshSelectedAccount(){
    this.store.dispatch(ShackActions.GetUserAccounts());
  }
}
