import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params, RouterEvent } from '@angular/router';
import { RecipeService } from '../../Services/recipe.service';
import { ShoppingService } from '../../Services/shopping.service';
import { ingredient } from '../../shared/ingredient.model';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
/** recipe-detail component*/
export class RecipeDetailComponent implements OnInit {
  /** recipe-detail ctor */
  constructor(private shoppingService: ShoppingService,
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService) {
  }

  selectedRecipeVal!: Recipe;
  recipeId = 0;

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.recipeId = +params['id'];
      this.selectedRecipeVal = this.recipeService.GetRecipe(this.recipeId);
    });
  }

  AddShoppingList(ingredients: ingredient[]) {
    this.shoppingService.addShoppingItem(ingredients);
  }

  EditRecipe(recipeId: number) {
    this.router.navigate(['recipes/' + this.recipeId + '/edit']);
  }

  DeleteRecipe(recipeId: number) {
    this.recipeService.deleteRecipe(recipeId);
    this.recipeService.refreshRecipeList.next();
    this.router.navigate(['recipes']);
}

}


