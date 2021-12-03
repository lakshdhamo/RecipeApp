import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ingredient } from '../shared/ingredient.model';
import { ShoppingService } from '../Services/shopping.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']

})
/** shopping-list component*/
export class ShoppingListComponent implements OnInit, OnDestroy {
  /** shopping-list ctor */
  constructor(private shoppingService: ShoppingService, private renderer: Renderer2) {

  }
  ingredients!: ingredient[];
  addShoppingItemSub!: Subscription;
  removeShoppingListItem!: Subscription;
  updateShoppingItem!: Subscription;
  selectedIngredient!: string;

  ngOnInit() {
    this.ingredients = this.shoppingService.getShoppingList();

    this.addShoppingItemSub = this.shoppingService.shoppingItemAdded.subscribe(data => {
      this.shoppingService.addShoppingItem(data);
      this.ingredients = this.shoppingService.getShoppingList();
    });

    this.removeShoppingListItem = this.shoppingService.removeShoppingListItem.subscribe(
      () => {
        this.shoppingService.removeShoppingItem(this.selectedIngredient);
        this.ingredients = this.shoppingService.getShoppingList();
      });

    this.updateShoppingItem = this.shoppingService.updateShoppingItem.subscribe(
      (ingre: ingredient) => {
        this.shoppingService.updateShoppingListItem(ingre);
        this.ingredients = this.shoppingService.getShoppingList();
      }
    );
  }

  onSelectIngredient(ingredientItem: ingredient, event: any) {
    this.selectedIngredient = ingredientItem.name;
    this.renderer.addClass(event.target, 'active');
    this.shoppingService.selectShoppingItem.next(ingredientItem);
  }

  isActive(name: string) {
    return name == this.selectedIngredient;
  }

  ngOnDestroy() {
    this.addShoppingItemSub.unsubscribe();
    this.removeShoppingListItem.unsubscribe();
    this.updateShoppingItem.unsubscribe();
  }

}
