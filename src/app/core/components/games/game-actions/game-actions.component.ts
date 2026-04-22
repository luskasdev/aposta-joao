
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Account } from '../../../data/models/Account';
import { BalanceChangeEvent } from '../../../data/models/BalanceChangeEvent';

@Component({
  selector: 'game-actions',
  templateUrl: './game-actions.component.html',
  standalone: false,
  styleUrl: './game-actions.component.scss'
})
export class GameActionsComponent implements OnInit{
  @Input() selectedAccount: Account | null = null;

  @Output() updateAccountBalance = new EventEmitter<BalanceChangeEvent>(); 
  
  ngOnInit(): void {
  }
}
