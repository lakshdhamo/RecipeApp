import { Component, Input} from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
    selector: 'app-recipe-item',
    templateUrl: './recipe-item.component.html',
    styleUrls: ['./recipe-item.component.css']
})
/** recipe-item component*/
export class RecipeItemComponent {
  /** recipe-item ctor */
  constructor() {

  }
  @Input() recipe!: Recipe
  
}
