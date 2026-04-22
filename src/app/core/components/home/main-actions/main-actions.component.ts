import { Component, EventEmitter, Inject, input, Input, OnChanges, OnInit, Output } from '@angular/core';
import { Account } from '../../../data/models/Account';
import { AuthService } from '@auth0/auth0-angular';
import { environment } from '../../../../../environments/environment';
import { User } from '../../../data/models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'main-actions',
  templateUrl: './main-actions.component.html',
  standalone: false,
  styleUrl: './main-actions.component.scss'
})
export class MainActionsComponent implements OnInit, OnChanges {
  @Input() currentUser: User | null = null;
  @Input() accounts: Account[] = []
  @Input() selectedAccount: Account | null = null;

  @Output() accountSelectionChange = new EventEmitter<string>();
  @Output() transferFunds = new EventEmitter<void>();
  @Output() refreshSelectedAccount = new EventEmitter();
  
  get isAdminUser(){
    return this.currentUser?.isAdmin;
  }

  get selectedAccountBalanace(){
    return this.selectedAccount ? `${this.selectedAccount.amount} - ${this.selectedAccount.currencyCode}` : "";
  }
  

  constructor(    
    private auth: AuthService,
    private router: Router
  ) {}
  
  ngOnInit(): void {
    
  }

  ngOnChanges (){
  }

  gamesClick(){
    this.router.navigate(["games"])
  }

  logoutClick(){
    this.auth.logout({ logoutParams: { returnTo: `${environment.auth.authorizationParams.redirect_uri}` } });
  }

  transferFundsClick(){
    this.transferFunds.emit();
  }
  
}
