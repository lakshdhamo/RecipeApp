import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../Services/recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
/** recipe-list component*/
export class RecipeListComponent implements OnInit {
  /** recipe-list ctor */
  constructor(private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.recipes = this.recipeService.GetRecipeValues();
    this.recipeService.refreshRecipeList.subscribe(
      () => this.recipes = this.recipeService.GetRecipeValues()
    );
  }

  recipes!: Recipe[];
  NavigateNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }

}
