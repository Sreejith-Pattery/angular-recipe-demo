import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipes.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id:number;
  isEdit:boolean=false;
  recipeForm:FormGroup;

  constructor(
    private route:ActivatedRoute, 
    private recipeService:RecipeService,
    private router:Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params:Params)=>{
      this.id = +params['id'];
      this.isEdit = params['id']!=null;
      // console.log(this.isEdit);
      this.initForm();
    })
  }

  private initForm(){
    let recipeName = '';
    let recipeUrl = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if(this.isEdit){
      const recipe = this.recipeService.getRecipeById(this.id);
      recipeName = recipe.name;
      recipeUrl = recipe.imagePath;
      recipeDescription = recipe.description;
      if(recipe['ingredients']!=null){
        for(let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name,Validators.required),
              amount:new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          )
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath':new FormControl(recipeUrl, Validators.required),
      'description':new FormControl(recipeDescription, Validators.required),
      'ingredients':recipeIngredients
    })
  }

  OnAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name:new FormControl(null, Validators.required),
        amount:new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    )
  }

  OnSubmit(){
    /*
    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']
    )
    if(this.isEdit){
      this.recipeService.updateRecipe(this.id, newRecipe)
    } else {
      this.recipeService.addRecipe(newRecipe);
    }
    console.log(this.recipeForm.value);*/

    
    if(this.isEdit){
      this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }

    this.OnCancel();
  }

  OnCancel(){
    this.router.navigate(['../'], {relativeTo:this.route} );
  }

  onDeleteIngredient(index:number)
  {
    // console.log(this.recipeForm.get('ingredients'));
    
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

}
