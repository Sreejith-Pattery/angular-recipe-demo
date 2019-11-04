import { Recipe } from "./recipes.model";
import { Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list/shopping-list.service";
import { Subject } from "rxjs";

@Injectable()
export class RecipeService {
    recipeEdited = new Subject<Recipe[]>();
    private recipes:Recipe[] = [
    new Recipe('Pizza','bread, cheese and others','https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/frying-pan-pizza-easy-recipe-collection.jpg',[
        new Ingredient('bread',1),
        new Ingredient('cheese',20)
    ]),
    new Recipe('Tacos','mexican veg and biscuits','https://c1.staticflickr.com/1/678/22057544234_36aebd41cc_b.jpg',[
        new Ingredient('vegitables',10),
        new Ingredient('biscuites',10)
    ]),
    new Recipe('Salad','veg and fruits','https://media.defense.gov/2011/Feb/04/2000288219/780/780/0/110201-F-6881R-001.JPG',[
        new Ingredient('vegitables',10),
        new Ingredient('fruits',10)
    ])
  ];

  constructor(private slService:ShoppingListService){}

  getRecipes(){
      return this.recipes.slice();
  }

  getRecipeById(id:number){
      return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients:Ingredient[]){
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe:Recipe){
      this.recipes.push(recipe);
    //   ç
      this.recipeEdited.next(this.recipes.slice());
  }

  updateRecipe(index:number, newRecipe:Recipe){
      this.recipes[index] = newRecipe;
    //   console.log(newRecipe);
      this.recipeEdited.next(this.recipes.slice());
  }

  deleteRecipe(index:number){
      this.recipes.splice(index,1);
    //   console.log(this.recipes);
      this.recipeEdited.next(this.recipes.slice());
  }

  setRecipes(recipes:Recipe[]){
      this.recipes = recipes;
      this.recipeEdited.next(this.recipes.slice());
  }
}