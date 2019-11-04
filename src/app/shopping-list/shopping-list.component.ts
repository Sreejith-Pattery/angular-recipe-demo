import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingSubscription:Subscription;


  ingredients:Ingredient[] = [];
  constructor(private slService:ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();
    this.ingSubscription = this.slService.ingredientsChanged.subscribe(
      (ingredients:Ingredient[])=>{
        this.ingredients = ingredients;
      }
    )
  }

  ngOnDestroy(): void {
    this.ingSubscription.unsubscribe();
  }

  OnitemSelect(index:number){
    // console.log("edit item index"+index);
    this.slService.startedEditing.next(index);
  }
  

}
