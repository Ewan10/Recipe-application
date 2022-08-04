import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from "../recipes/recipe.service";
import { map, tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipes();
        return this.http.put('https://recipe-application-abd28-default-rtdb.europe-west1.firebasedatabase.app/recipes.json', recipes)
            .subscribe(response => {
                console.log(response);
            });
    }

    fetchRecipes() {
        return this.http.get<Recipe[]>('https://recipe-application-abd28-default-rtdb.europe-west1.firebasedatabase.app/recipes.json')
            .pipe(
                map(      //Here map is the rxjs operator.
                    recipes => {
                        return recipes.map(recipe => {
                            return {
                                ...recipe,
                                ingredients: recipe.ingredients ? recipe.ingredients : []
                            };
                        });   //Here map is the JS function acting on a array.
                    }),
                tap(recipes => {
                    this.recipeService.setRecipes(recipes);
                })
            )
    }
}