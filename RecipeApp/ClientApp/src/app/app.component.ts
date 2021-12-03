import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
  
})
export class AppComponent {
  title = 'ClientApp';
  menuSelected = 'Recipe';

  onSelectRecipe(menuValue: string) {
    this.menuSelected = menuValue;
  }

}
