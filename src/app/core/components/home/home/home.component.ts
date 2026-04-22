import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Account } from '../../../data/models/Account';
import { User } from '../../../data/models/User';
import { AccountHistory } from '../../../data/models/AccountHistory';
import { BalanceChangeEvent } from '../../../data/models/BalanceChangeEvent';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  standalone: false,
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{
  @Input() accounts: Account[] = []
  @Input() selectedAccount: Account | null = null;
  @Input() currentUser: User | null = null;
  @Input() accountHistory: AccountHistory[] = []
  @Input() loadingUserAccounts: boolean = false;
  @Input() loadingUserAccountHistory: boolean = false;
  
  @Output() accountSelectionChange = new EventEmitter<string>();
  @Output() updateAccountBalance = new EventEmitter<BalanceChangeEvent>();
  @Output() refreshSelectedAccount = new EventEmitter();
  @Output() transferFunds = new EventEmitter<void>();

  ngOnInit(): void {
  }
}
