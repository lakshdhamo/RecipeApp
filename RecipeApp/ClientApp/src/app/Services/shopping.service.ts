import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingService implements OnInit {
  constructor() {

  }
  ngOnInit() {

  }

  shoppingItemAdded = new Subject<ingredient[]>();
  removeShoppingListItem = new Subject<void>();
  selectShoppingItem = new Subject<ingredient>();
  updateShoppingItem = new Subject<ingredient>();

  private ingredients: ingredient[] = [
    new ingredient("Apple", 10, 1),
    new ingredient("Tomato", 5, 2)
  ];

  addShoppingItem(item: ingredient[]) {

    this.ingredients = this.ingredients.concat(item);
  }

  removeShoppingItem(name: string) {
    const index = this.ingredients.findIndex(x => x.name == name);
    if (index >= 0) {
      this.ingredients.splice(index, 1);
    }
  }

  updateShoppingListItem(ingre: ingredient) {
    const item = this.ingredients.find(x => x.id == ingre.id);
    if (item) {
      item.name = ingre.name;
      item.quantity = ingre.quantity;
    }
  }

  getShoppingList() {
    return this.ingredients.slice();
  }

  getNewShoppingListId() {
    return this.ingredients.length + 1;
  }

}
