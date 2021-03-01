import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MenuService} from '../../../../services/menu/menu.service';
import {SnackbarService} from '../../../../services/snackbar.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {ICategoryData, IDishData} from '../../../../interfaces/menu.interface';

@Component({
  selector: 'app-edit-position',
  templateUrl: './edit-position.component.html',
  styleUrls: ['./edit-position.component.css']
})
export class EditPositionComponent implements OnInit {
  editForm: FormGroup;
  categories: any;
  position: Partial<IDishData>;
  newImageUrl: string | ArrayBuffer;
  URL = 'http://localhost:8000';
  currentCategory: any;


  constructor(private menuService: MenuService,
              private snackbarService: SnackbarService,
              private router: Router,
              private location: Location,
              private activatedRoute: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.categories = this.activatedRoute.snapshot.data.categories;
    this.position = this.location.getState();
    console.log(this.position);
    this.categories.forEach(category => {
      if (category.name === this.position.category_name) {
        this.currentCategory = category;
      }
    });
    this.initEditForm();
  }


  private initEditForm(): void {
    this.editForm = new FormGroup({
      name: new FormControl(this.position.name || null, [Validators.required, Validators.pattern(/^([a-zA-ZА-Яа-яЇїєЄёЁіІ`'-_.,0-9!()? ]{1,30})$/)]),
      category: new FormControl(null, [Validators.required, Validators.pattern(/^([a-zA-Z-'0-9 ]{1,30})$/)]),
      image: new FormControl(this.position.image || null),
      price: new FormControl(this.position.price || null, [Validators.required, Validators.pattern(/^([0-9]{1,10})$/)]),
      weight: new FormControl(this.position.weight || null, [Validators.required, Validators.pattern(/^([0-9]{1,10})$/)]),
      ingredients: new FormControl(this.position.ingredients || null, [Validators.required, Validators.pattern(/^([a-zA-ZА-Яа-яЇїєЄёЁіІ`'-.,0-9!()? ]{1,300})$/)]),
      about_dish: new FormControl(this.position.about_dish || null, [Validators.pattern(/^([a-zA-ZА-Яа-яЇїєЄёЁіІ`'-.,0-9!()? ]{1,300})$/)])
    });
    this.editForm.controls.category.setValue(this.currentCategory.id);
  }


  nestFormData(): FormData {
    console.log(this.editForm.value);
    const createData = new FormData();
    if (this.editForm.value.name && this.editForm.value.name !== this.position.name) {
      createData.append('name', this.editForm.value.name);
    }
    if (this.editForm.value.category && this.editForm.value.category !== this.position.category_name) {
      createData.append('category', this.editForm.value.category);
    }
    if (this.editForm.value.price && this.editForm.value.price !== this.position.price) {
      createData.append('price', this.editForm.value.price);
    }
    if (this.editForm.value.weight && this.editForm.value.weight !== this.position.weight) {
      createData.append('weight', this.editForm.value.weight);
    }
    if (this.editForm.value.ingredients && this.editForm.value.ingredients !== this.position.ingredients) {
      createData.append('ingredients', this.editForm.value.ingredients);
    }
    if (this.editForm.value.about_dish && this.editForm.value.about_dish !== this.position.about_dish) {
      createData.append('about_dish', this.editForm.value.about_dish);
    }
    // if (this.editForm.value.image && this.editForm.value.image !== this.position.image) {
    //   createData.append('image', this.editForm.value.image, this.editForm.value.image.name);
    // }
    createData.forEach(((value, key) => console.log(key, '---', value)));
    return createData;
  }


  onFileChanged($event: any): void {
    const reader = new FileReader();
    if ($event.target.files && $event.target.files.length > 0) {
      this.editForm.controls.image.setValue($event.target.files[0]);
      const file = $event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.newImageUrl = reader.result;
      };
    }
  }

  resetImage(): void {
    this.newImageUrl = null;
  }

  handleAsyncValidation(error): void {
    if (error.error.message.name && error.error.message.name[0] === 'dish with this name already exists.') {
      this.editForm.get('name').setErrors({exists: true});
    }
  }

  editPosition(): void {
    this.menuService.editPosition(this.nestFormData(), this.position.id).subscribe((data: ICategoryData) => {
      this.snackbarService.openSuccessSnackBar(` Позиція ${data.name} успішно оновлена!`);
      this.position = data;
    }, error => {
      console.log(error);
      this.handleAsyncValidation(error);
    });
  }
}
