import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingLIstService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('Crater', 'landscape', 'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cGljfGVufDB8fDB8fA%3D%3D&w=1000&q=80',
            [
                new Ingredient('Meat', 25),
                new Ingredient('French Fries', 5)
            ]),
        new Recipe('Lasagne', 'Lasagne are pasta', 'https://cdn-icons-png.flaticon.com/512/2927/2927347.png',
            [
                new Ingredient('Celery', 2),
                new Ingredient('Tomato', 2)
            ])
    ];

    getRecipes() {
        return this.recipes.slice(); //Return a copy of the original array.
    }

    constructor(private slService: ShoppingLIstService) { }

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
    }
}