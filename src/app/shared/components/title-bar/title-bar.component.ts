import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'title-bar',
  templateUrl: './title-bar.component.html',
  standalone: false,
  styleUrl: './title-bar.component.scss'
})
export class TitleBarComponent {
  constructor(
    private router: Router
  ) {}

  public navigateToHome(){
    this.router.navigate(["/home"])
  }
}
