import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ShoppingService } from '../../Services/shopping.service';
import { ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
/** shopping-edit component*/
export class ShoppingEditComponent implements OnInit, OnDestroy {
  /** shopping-edit ctor */
  constructor(private shoppingService: ShoppingService) {

  }

  addButtonCaption = 'Add';
  addedItem!: ingredient
  @ViewChild('shoppingForm') slForm!: NgForm;
  updateSubscript!: Subscription;
  selectedItemId = 0;

  ngOnInit(): void {
    this.updateSubscript = this.shoppingService.selectShoppingItem.subscribe(
      (ingre: ingredient) => {
        this.slForm.setValue({
          'itemName': ingre.name,
          'qty': ingre.quantity
        });
        this.addButtonCaption = 'Update';
        this.selectedItemId = ingre.id;
      });
  }

  onSubmit(shoppingForm: NgForm) {
    if (this.addButtonCaption == 'Add') {
      const shoppingId = this.shoppingService.getNewShoppingListId();
      this.addedItem = new ingredient(shoppingForm.value.itemName, shoppingForm.value.qty, shoppingId);
      this.shoppingService.shoppingItemAdded.next([this.addedItem]);
    } else {
      this.addedItem = new ingredient(shoppingForm.value.itemName, shoppingForm.value.qty, this.selectedItemId);
      this.shoppingService.updateShoppingItem.next(this.addedItem);
      this.addButtonCaption = 'Add';
    }
    shoppingForm.reset();
  }

  onItemDelete() {
    this.shoppingService.removeShoppingListItem.next();
    this.addButtonCaption = 'Add';
  }

  onItemReset(shoppingForm: NgForm) {
    shoppingForm.reset();
    this.addButtonCaption = 'Add';
  }

  ngOnDestroy(): void {
    this.updateSubscript.unsubscribe();
  }

}
