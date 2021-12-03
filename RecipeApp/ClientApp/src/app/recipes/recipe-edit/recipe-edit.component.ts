import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../../Services/recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
/** RecipeEdit component*/
export class RecipeEditComponent implements OnInit {
  /** RecipeEdit ctor */
  constructor(private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private recipeService: RecipeService) {

  }
  editMode = false;
  recipeId = 0;

  form!: FormGroup;
  submitted = false;

  ngOnInit() {
    this.route.params.subscribe(
      (param: Params) => {
        if (param['id']) {
          this.recipeId = param['id'];
          this.editMode = true;
        }
      }
    );
    this.buildForm();
  }

  buildForm(): void {
    let id = 0;
    let recipeName = '';
    let imagePath = '';
    let description = '';
    let recipe!: Recipe;;

    if (this.editMode) {
      recipe = this.recipeService.GetRecipe(this.recipeId);
      id = recipe.id;
      recipeName = recipe.name;
      imagePath = recipe.imagePath;
      description = recipe.description;
    }

    this.form = this.formBuilder.group(
      {
        recipeName: [recipeName, Validators.required],
        imagePath: [imagePath, Validators.required],
        description: [description, Validators.required],
        ingredients: this.formBuilder.array([])
      });

    if (this.editMode) {
      for (let item of recipe?.ingredients) {
        this.ingredients.push(this.newIngredient(item.name, item.quantity));
      }
    }
  }

  newIngredient(name: string, qty: number): FormGroup {
    return this.formBuilder.group({
      name: [name, Validators.required],
      quantity: [qty, [Validators.required, Validators.min(1), Validators.pattern('^(0|[1-9][0-9]*)$')]],
    })
  }

  addIngredient() {
    this.ingredients.push(this.newIngredient('', 0));
  }

  removeIngredient(i: number) {
    this.ingredients.removeAt(i);
  }

  get ingredients(): FormArray {
    return this.form.get("ingredients") as FormArray
  }

  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    if (this.editMode) {
      let recipe = new Recipe(this.form.value.recipeName, this.form.value.description, this.form.value.imagePath,
        this.form.value.ingredients, this.recipeId);
      this.recipeService.updateRecipe(recipe);
    } else {
      let id = +this.recipeService.getRecipeLatestId();
      let recipe = new Recipe(this.form.value.recipeName, this.form.value.description, this.form.value.imagePath,
        this.form.value.ingredients, id);
      this.recipeService.addRecipe(recipe);
    }
    this.submitted = false;
    this.form.reset();
  }

  onReset(): void {
    this.router.navigate(['recipes']);
  }

}
