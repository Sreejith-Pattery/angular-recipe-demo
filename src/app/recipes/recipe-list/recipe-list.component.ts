//import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipes.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipeEditSubscription:Subscription;
  recipes: Recipe[] = [

  ];
  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeEditSubscription = this.recipeService.recipeEdited.subscribe(
      ((updatedRecipes:Recipe[])=>{
        this.recipes = updatedRecipes;
      })
    )
  }

  onNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }


  ngOnDestroy(): void {
    this.recipeEditSubscription.unsubscribe();
  }
}
