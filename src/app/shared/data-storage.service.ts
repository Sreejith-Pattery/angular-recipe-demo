import { Injectable } from "@angular/core";
import { RecipeService } from "../recipes/recipe.service";
import { Http, Response } from "@angular/http";
import { Recipe } from "../recipes/recipes.model";
//import 'rxjs/add/operator/map';
import 'rxjs/Rx';
import { AuthService } from "../auth/auth.service";
import { auth } from "firebase";

@Injectable()
export class DataStorageService {

    constructor(private recipeService:RecipeService, private http:Http, private authService:AuthService){  
    }

    storeRecipes(){
        const token = this.authService.getToken();
        // return this.http.put('https://cordovapushdemo-b4699.firebaseio.com/recipe.json?auth='+token, 
        return this.http.put('https://myidlibot.firebaseio.com/recipe.json?auth='+token,
        // https://myidlibot.firebaseio.com/
        this.recipeService.getRecipes());
    }

    getRecipes(){
        const token = this.authService.getToken();
        // this.http.get('https://cordovapushdemo-b4699.firebaseio.com/recipe.json?auth='+token)
        this.http.get('https://myidlibot.firebaseio.com/recipe.json?auth='+token)
        //this will not work without rxjs-compat, install "rxjs-compat": "^6.1.0"
        .map(
            (response:Response)=>{
                const recipes:Recipe[] = response.json();
                for(let recipe of recipes){
                    if(!recipe["ingredients"]){
                        recipe["ingredients"] = [];
                    }
                }
                return recipes;
            }
        )
        .subscribe(
            (recipes:Recipe[])=>{
                //const recipes:Recipe[] = response.json();
                this.recipeService.setRecipes(recipes);
                console.log(recipes);
            }
        );
    }
}