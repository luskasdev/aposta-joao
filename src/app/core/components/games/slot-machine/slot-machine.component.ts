import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { BalanceChangeEvent } from '../../../data/models/BalanceChangeEvent';
import { Account } from '../../../data/models/Account';
import { TransactionType } from '../../../data/models/Enums/TransactionType';
import { DialogComponent, DialogData } from '../../../../shared/components';


@Component({
  selector: 'slot-machine',
  templateUrl: './slot-machine.component.html',
  standalone: false,
  styleUrl: './slot-machine.component.scss'
})
export class SlotMachineComponent implements OnInit {
  @Input() selectedAccount: Account | null = null;

  @Output() updateAccountBalance = new EventEmitter<BalanceChangeEvent>(); //return the amount to add/subtract

  resultText = ""
  
  amountControl = new FormControl<number>(1, [Validators.min(1), Validators.max(25)])

  get enableInputs() {
    return (
      this.selectedAccount != null && 
      this.selectedAccount.amount > 0
    ) && !this.rolling;
  }

  get enableRollButton(){
    return (
      this.selectedAccount != null && 
      this.selectedAccount.amount > 0
    ) && 
    !this.rolling && 
    this.amountControl.valid &&
    (this.amountControl.value ?? 0) > 0 && 
    (this.selectedAccount.amount - (this.amountControl.value ?? 0) >= 0)
  }
  
  constructor(
    private dialog: MatDialog,
    private fb: FormBuilder
  ){

  }

  rolling = false;
  result = new Array<string>();

  iconMap = ["banana", "seven", "cherry", "plum", "orange", "bell", "bar", "lemon", "melon"];
  // Width of the icons
  icon_width = 79;	
  // Height of one icon in the strip
  icon_height = 79;	
  // Number of icons in the strip
  num_icons = 9;
  // Max-speed in ms for animating one icon down
  time_per_icon = 100;
  // Holds icon indexes
  indexes = [0, 0, 0];
  
  // Define multipliers and weights
  iconMultipliers = {
    banana: Math.pow(2, 1), // 2^1 = 2
    lemon: Math.pow(2, 1),  // 2^1 = 2
    melon: Math.pow(2, 2),  // 2^2 = 4
    plum: Math.pow(2, 3),   // 2^3 = 8
    orange: Math.pow(2, 4), // 2^4 = 16
    bell: Math.pow(2, 5),   // 2^5 = 32
    cherry: Math.pow(2, 8), // 2^8 = 128
    seven: Math.pow(2, 9),  // 2^9 = 512
    bar: Math.pow(2, 10),   // 2^10= 1024
  };

  // Weights for each icon (inversely proportional to multiplier)
  iconWeights = {
    banana: 10, 
    lemon: 9,
    melon: 8,
    plum: 7,
    orange: 6,
    bell: 5,
    cherry: 4,
    seven: 3,
    bar: 2
  };


  async ngOnInit(): Promise<void> {
    this.amountControl = new FormControl<number>(1)
  }

  infoClick(){
    this.dialog.open(DialogComponent, {
      data: {
        primaryButtonText: "test",
        text: "hello",
        title: "LEGEND"
      } as DialogData
    })
  }

  onSlotMachineRoll(){
    // this.rollClick([0, 0, 0]);
    this.rollClick();
  }

  async rollClick(desiredOutcome?: number[]): Promise<void> {
    if (this.rolling || !this.selectedAccount) {
      return; // Prevent multiple spins
    }
    this.rolling = true;

    const wager = this.amountControl.value ?? 0;
    this.updateAccountBalance.emit({
      transactionType: TransactionType.AccountToBank,
      amount: -Math.abs(wager),
      notes: "Slot Machine Bet",
    });
  
    const reelsList = document.querySelectorAll('.slots > .reel');
  
    const deltas = await Promise.all(
      [...reelsList].map((reel, i) =>
        this.roll(reel as HTMLElement, i, desiredOutcome ? desiredOutcome[i] : undefined)
      )
    );
  
    deltas.forEach((delta: number, i: number) => {
      this.indexes[i] = (this.indexes[i] + delta) % this.num_icons;
    });
  
    this.resultText = this.indexes.map((i) => this.iconMap[i]).join(' - ');
    this.result = this.indexes.map((i) => this.iconMap[i]);
  
    if (this.indexes[0] === this.indexes[1] && this.indexes[1] === this.indexes[2]) {
      const amount = wager * (this.iconMultipliers as any)[(this.iconMap as any)[(this.indexes as any)[0]]];
      console.log("You won: ", amount);
      console.log((this.iconMultipliers as any)[(this.iconMap as any)[(this.indexes as any)[0]]]);
      this.updateAccountBalance.emit({
        transactionType: TransactionType.BankToAccount,
        amount: amount,
        notes: "Slot Machine Win",
      });
      const winCls = this.indexes[0] === this.indexes[2] ? 'win2' : 'win1';
      const slots = document.querySelector('.slots');
      slots?.classList.add(winCls);
      setTimeout(() => {
        this.rolling = false;
        slots?.classList.remove(winCls);
      }, 2000);
    } else {
      this.rolling = false;
    }
  }
  

  /*
  * I stole this code from here: https://codepen.io/josfabre/pen/abReBvP?editors=1111
  * Modified it to have types and work in angular
  * The house edge of this slot machine is 96.31%.
  */
  async roll(reel: HTMLElement, offset = 0, desiredIndex?: number): Promise<number> {
    const currentIconIndex = this.indexes[offset];
  
    // If a desired index is provided, calculate delta to land there after spinning
    const additionalLoops = 3; // Number of full loops before stopping
    const delta = desiredIndex !== undefined
      ? additionalLoops * this.num_icons + ((desiredIndex - currentIconIndex + this.num_icons) % this.num_icons)
      : (offset + 2) * this.num_icons + this.getRandomWeightedIndex();

    return new Promise((resolve) => {
      const style = getComputedStyle(reel);
      const backgroundPositionY = parseFloat(style["background-position-y" as any]);
      const targetBackgroundPositionY = backgroundPositionY + delta * this.icon_height;
      const normTargetBackgroundPositionY = targetBackgroundPositionY % (this.num_icons * this.icon_height);

      setTimeout(() => {
        reel.style.transition = `background-position-y ${(8 + 1 * delta) * this.time_per_icon}ms cubic-bezier(.41,-0.01,.63,1.09)`;
        reel.style.backgroundPositionY = `${backgroundPositionY + delta * this.icon_height}px`;
      }, offset * 150);

      setTimeout(() => {
        reel.style.transition = `none`;
        reel.style.backgroundPositionY = `${normTargetBackgroundPositionY}px`;
        resolve(delta % this.num_icons);
      }, (8 + 1 * delta) * this.time_per_icon + offset * 150);
    });
  }

  // Get a random index using weighted probabilities
  getRandomWeightedIndex(): number {
    const totalWeight = Object.values(this.iconWeights).reduce((sum, weight) => sum + weight, 0);
    const randomValue = Math.random() * totalWeight;

    let cumulativeWeight = 0;
    for (let i = 0; i < this.iconMap.length; i++) {
      const icon = this.iconMap[i];
      cumulativeWeight += (this.iconWeights as any)[icon];
      if (randomValue < cumulativeWeight) {
        return i; // Return the index of the selected icon
      }
    }

    return 0; // Default to the first icon in case something goes wrong
  }

  // Function to calculate and log the odds
calculateOdds() {
  const totalWeight = Object.values(this.iconWeights).reduce((sum, weight) => sum + weight, 0);
  const iconOdds: { [key: string]: number } = {};
  for (let i = 0; i < this.iconMap.length; i++) {
    const icon = this.iconMap[i];
    iconOdds[icon] = ((this.iconWeights as  any)[icon] / totalWeight) * 100;
  }
  console.log("Icon Odds:");
  Object.entries(iconOdds).sort((a, b) => b[1] - a[1]).forEach(([icon, odds]) => {
    console.log(`${icon}: ${odds.toFixed(2)}%`);
  });

  const totalWinOdds = Object.values(iconOdds).reduce((sum, odds) => sum + (odds / 100) ** 3, 0) * 100;

  console.log("Total Odds of Winning (matching icon on all 3 reels):", totalWinOdds.toFixed(2), "%");
}
}