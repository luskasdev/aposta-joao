import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ShackState } from '../../data/store/shack.reducer';
import { Store } from '@ngrx/store';
import { ShackActions, ShackSelectors } from '../../data/store';

@Component({
  selector: 'games-container',
  templateUrl: './games-container.html',
  standalone: false,
})
export class GamesContainer {
  userAccounts$ = this.store.select(ShackSelectors.getUserAccounts);
  selectedAccount$ = this.store.select(ShackSelectors.getSelectedAccount);
  currentUser$ = this.store.select(ShackSelectors.getCurrentUser)

  constructor(
    private store: Store<ShackState>
  ) {
    
  }

  public rollSlotMachine(){
    // this.store.dispatch(ShackActions.RollSlotMachine)
  }
}
