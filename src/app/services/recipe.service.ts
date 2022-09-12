import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_ROOT } from 'sensitive/sensitive';

@Injectable({
  providedIn: 'root',
})
export class RecipeService {
  constructor(private http: HttpClient) {}

  getCategories() {
    return this.http.get(API_ROOT + '/api/category');
  }

  getRecipes() {
    return this.http.get(API_ROOT + '/api/recipe');
  }
}
