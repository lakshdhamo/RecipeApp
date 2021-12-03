import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from '../recipes/recipe.model';
import { ingredient } from '../shared/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService implements OnInit {
  constructor() {

  }

  refreshRecipeList = new Subject<void>();

  ngOnInit(): void {

  }

  private recipes: Recipe[] = [
    new Recipe("A Test Recipe1",
      "This is a simple test 1",
      "https://www.whiskaffair.com/wp-content/uploads/2016/12/Tomato-Chicken-Curry-1-1.jpg",
      [
        new ingredient('Cheicken', 2),
        new ingredient('Onion', 5)
      ],
      1
    ),
    new Recipe("A Test Recipe 2",
      "This is a simple test 2",
      "https://www.whiskaffair.com/wp-content/uploads/2016/12/Tomato-Chicken-Curry-1-1.jpg",
      [
        new ingredient('Mutton', 1),
        new ingredient('Masala', 3)
      ],
      2
    )
  ];

   GetRecipeValues(): Recipe[]  {
    return this.recipes.slice();
}

  GetRecipe(recipeId: number) {
    const recipeVal = this.recipes.slice().find(x => x.id == recipeId);
    if (recipeVal) {
      return recipeVal;
    } else {
      /// throw error or send some default value
      return new Recipe('', '', '', [], 0);
    }
  }


  getRecipeLatestId(): number {
    return this.recipes.length + 1;
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.refreshRecipeList.next();
  }

  updateRecipe(recipe: Recipe) {
    let updatedRecipe = this.recipes.find(x => x.id == recipe.id);
    if (updatedRecipe) {
      updatedRecipe.name = recipe.name;
      updatedRecipe.imagePath = recipe.imagePath;
      updatedRecipe.description = recipe.description;
      updatedRecipe.ingredients = recipe.ingredients;
      this.refreshRecipeList.next();
    }
  }

  deleteRecipe(recipeId: number) {
    const index = this.recipes.findIndex(x => x.id == recipeId);
    if (index >= 0)
      this.recipes.splice(index, 1);
  }

}
