import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipes.model';
// import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe:Recipe;
  @Input() index:Number;
  //@Output() recipeSelected = new EventEmitter<void>();
  // constructor(private recipeService:RecipeService) { }

  ngOnInit() {
  }

//   onSelect(){
// //    this.recipeSelected.emit();
//     this.recipeService.recipeSelected.emit(this.recipe);
//   }


}
