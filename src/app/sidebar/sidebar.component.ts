import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  categories: any[] = [];

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipeService.getCategories().subscribe((item: any) => {
      console.log(item);
      this.categories = item;
    });
  }
}

export class Category {
  name: string;
  id: string;
  constructor(name: string, id: string) {
    this.name = name;
    this.id = id;
  }
}
