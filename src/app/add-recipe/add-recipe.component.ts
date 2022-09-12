import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { take } from 'rxjs';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss'],
})
export class AddRecipeComponent implements OnInit {
  categories: any[] = [];

  title = new FormControl('', [Validators.required]);

  description = new FormControl('', [Validators.required]);

  isMattsFav: boolean = false;

  categoryCtrl = new FormControl('', [Validators.required]);

  selectedCategory: any;

  @ViewChild('autosize') autosize: CdkTextareaAutosize | undefined;

  constructor(private recipeService: RecipeService, private _ngZone: NgZone) {}

  ngOnInit(): void {
    this.recipeService.getCategories().subscribe((cats: any) => {
      this.categories = cats;
    });
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this._ngZone.onStable
      .pipe(take(1))
      .subscribe(() => this.autosize?.resizeToFitContent(true));
  }
}
