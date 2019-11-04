//import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') form:NgForm;
  editSubscription:Subscription
  editMode:boolean = false;
  editItemIndex:number;
  editIngredientItem:Ingredient;

  constructor(private slService:ShoppingListService) { }

  ngOnInit() {
    this.editSubscription = this.slService.startedEditing.subscribe(
      (index:number)=>{
        this.editItemIndex = index;
        this.editMode = true;
        this.editIngredientItem = this.slService.getIngredient(index);
        this.form.setValue({
          name:this.editIngredientItem.name,
          amount:this.editIngredientItem.amount
        })
      }
    );
  }

  onSubmit(form:NgForm){
    const value = form.value;
    // console.log(value.name+","+value.amount);
    const newIngredient = new Ingredient(value.name,value.amount);
    if(this.editMode){
      this.slService.updateIngredient(this.editItemIndex,newIngredient);
    } else {
      this.slService.addIngredient(newIngredient);
    }
    this.editMode = false;
    this.form.reset();
  }

  ngOnDestroy(): void {
    this.editSubscription.unsubscribe();
  }

  OnClear(){
    this.form.reset();
    this.editMode = false;
  }

  OnDelete(){
    this.slService.removeIngredient(this.editItemIndex);
    this.OnClear();
  }
}
