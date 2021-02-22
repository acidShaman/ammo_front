import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IUserEdit} from '../../../../interfaces/user.interface';
import {MenuService} from '../../../../services/menu/menu.service';
import {Router} from '@angular/router';
import {SnackbarService} from '../../../../services/snackbar.service';
import {ICategoryData} from '../../../../interfaces/menu.interface';
import {jsGlobalObjectValue} from '@angular/compiler-cli/src/ngtsc/partial_evaluator/src/known_declaration';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  createForm: FormGroup;

  constructor(private menuService: MenuService, private router: Router, private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.initCreateForm();
  }

  private initCreateForm(): void {
    this.createForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.pattern(/^([a-zA-ZА-Яа-яЇїєЄёЁіІ`'-.,0-9 ]{1,30})$/)]),
      category: new FormControl(null, [Validators.required, Validators.pattern(/^([a-zA-Z-'0-9 ]{1,30})$/)]),
      image: new FormControl(null, [Validators.required]),
      isShown: new FormControl(false)
    });
  }

  nestFormData(): FormData {
    const createData = new FormData();
    const fields = Object.keys(this.createForm.value);
    fields.forEach(key => {
      if (this.createForm.value[key] instanceof File) {
        createData.append(key, this.createForm.value[key], this.createForm.value[key].name);
      } else {
        createData.append(key, key === 'category' ? this.createForm.value[key].toLowerCase() : this.createForm.value[key]);
      }
    });
    return createData;
  }

  handleAsyncValidation(error): void {
    if (error.error.message.category && error.error.message.category[0] === 'category with this category already exists.') {
      this.createForm.get('category').setErrors({exists: true});
    }
    if (error.error.message.name && error.error.message.name[0] === 'category with this name already exists.') {
      this.createForm.get('name').setErrors({exists: true});
    }
    if (error.error.message.image && error.error.message.image[0] === 'The submitted data was not a file. Check the encoding type on the form.') {
      this.createForm.get('image').setErrors({required: true});
    }
  }

  createCategory(): void {
    this.menuService.createCategory(this.nestFormData()).subscribe( (data: ICategoryData) => {
      this.snackbarService.openSuccessSnackBar(`Категорія ${data.name} успішно створена!`);
      this.initCreateForm();
    }, error => {
      this.handleAsyncValidation(error);
    });
  }

  onFileChanged($event: any): void {
    this.createForm.controls.image.setValue($event.target.files[0]);
  }

  createCategoryAndGoBackToList(): void {
    this.menuService.createCategory(this.nestFormData()).subscribe( (data: ICategoryData) => {
      this.snackbarService.openSuccessSnackBar(`Категорія ${data.name} успішно створена!`);
      this.router.navigate(['admin', 'categories']);
    }, error => {
      this.handleAsyncValidation(error);
    });
  }
}
