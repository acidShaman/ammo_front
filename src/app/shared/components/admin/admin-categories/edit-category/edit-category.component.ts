import {Component, OnInit} from '@angular/core';
import {Location} from '@angular/common';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ICategoryData} from '../../../../interfaces/menu.interface';
import {UserService} from '../../../../services/user/user.service';
import {SnackbarService} from '../../../../services/snackbar.service';
import {Router} from '@angular/router';
import {MenuService} from '../../../../services/menu/menu.service';
import {IUserEdit} from '../../../../interfaces/user.interface';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  editForm: FormGroup;
  category: Partial<ICategoryData>;
  URL = 'http://localhost:8000';
  newImageUrl: string | ArrayBuffer;

  constructor(private location: Location,
              private userService: UserService,
              private snackbarService: SnackbarService,
              private router: Router,
              private menuService: MenuService) {
  }

  ngOnInit(): void {
    this.category = this.location.getState();
    console.log(this.location.getState());
    this.initEditForm();
  }

  private initEditForm(): void {
    this.editForm = new FormGroup({
      name: new FormControl(this.category.name || null, [Validators.pattern(/^([a-zA-ZА-Яа-яЇїєЄёЁіІ`'-.,0-9 ]{1,30})$/)]),
      category: new FormControl(this.category.category || null, [Validators.pattern(/^([a-zA-Z-'0-9 ]{1,30})$/)]),
      image: new FormControl(this.category.image || null),
      isShown: new FormControl(this.category.isShown || null)
    });
    this.editForm.markAsPristine();
    console.log(this.editForm.value);
  }

  nestFormData(): FormData {
    console.log(this.editForm.value);
    const createData = new FormData();
    if (this.editForm.value.name && this.editForm.value.name !== this.category.name) {
      createData.append('name', this.editForm.value.name);
    }
    if (this.editForm.value.category && this.editForm.value.category !== this.category.category) {
      createData.append('category', this.editForm.value.category.toLowerCase());
    }
    if (this.editForm.value.image && this.editForm.value.image !== this.category.image) {
      createData.append('image', this.editForm.value.image, this.editForm.value.image.name);
    }
    if (this.editForm.value.isShown && this.editForm.value.isShown !== this.category.isShown) {
      createData.append('isShown', this.editForm.value.isShown);
    }
    createData.forEach( ((value, key) => console.log(key, '---', value)));
    return createData;
  }

  handleAsyncValidation(error): void {
    if (error.error.message.category && error.error.message.category[0] === 'category with this category already exists.') {
      this.editForm.get('category').setErrors({exists: true});
    }
    if (error.error.message.name && error.error.message.name[0] === 'category with this name already exists.') {
      this.editForm.get('name').setErrors({exists: true});
    }
  }

  editCategory(): void {
    this.menuService.editCategory(this.nestFormData(), this.category.id).subscribe((data: ICategoryData) => {
      console.log(data);
      this.category = data;
    }, error => {
      console.log(error);
      this.handleAsyncValidation(error);
    });
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

  // createCategoryAndGoBackToList(): void {
  //   this.menuService.createCategory(this.nestFormData()).subscribe((data: ICategoryData) => {
  //     this.snackbarService.openSuccessSnackBar(`Категорія ${data.name} успішно створена!`);
  //     this.router.navigate(['admin', 'categories']);
  //   }, error => {
  //     this.handleAsyncValidation(error);
  //   });
  // }

  resetImage(): void {
    this.newImageUrl = null;
  }

  setIsShown($event: any): void {
    this.editForm.value.isShown = $event.checked;
    console.log(this.editForm.value);
  }
}
