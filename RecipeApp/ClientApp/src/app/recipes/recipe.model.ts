import { ingredient } from "../shared/ingredient.model";

export class Recipe {
  public id: number;
  name: string;
  description: string;
  imagePath: string;
  ingredients: ingredient[];
  constructor(name: string, description: string, imagePath: string, ingredients: ingredient[], public recipeId:number = 0) {
    this.id = recipeId;
    this.name = name;
    this.description = description;
    this.imagePath = imagePath;
    this.ingredients = ingredients;
  }
}
