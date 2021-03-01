import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ICategoryData} from '../../../../interfaces/menu.interface';
import {MenuService} from '../../../../services/menu/menu.service';
import {SnackbarService} from '../../../../services/snackbar.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Location} from '@angular/common';
import {filter} from 'rxjs/operators';
import {type} from 'os';

@Component({
  selector: 'app-create-position',
  templateUrl: './create-position.component.html',
  styleUrls: ['./create-position.component.css']
})
export class CreatePositionComponent implements OnInit {

  createForm: FormGroup;

  categories: any;

  constructor(private menuService: MenuService,
              private snackbarService: SnackbarService,
              private router: Router,
              private location: Location,
              private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {
    this.categories = this.activatedRoute.snapshot.data.categories;
    this.initCreateForm();
  }

  private initCreateForm(): void {
    this.createForm = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.pattern(/^([a-zA-ZА-Яа-яЇїєЄёЁіІ`'-.,0-9!()? ]{1,30})$/)]),
      category: new FormControl(null, [Validators.required, Validators.pattern(/^([a-zA-Z-'0-9 ]{1,30})$/)]),
      image: new FormControl(null, [Validators.required]),
      price: new FormControl(null , [Validators.required, Validators.pattern(/^([0-9]{1,10})$/)]),
      weight: new FormControl(null, [Validators.required, Validators.pattern(/^([0-9]{1,10})$/)]),
      ingredients: new FormControl(null, [Validators.required, Validators.pattern(/^([a-zA-ZА-Яа-яЇїєЄёЁіІ`'-.,0-9!()? ]{1,300})$/)]),
      about_dish: new FormControl(null, [Validators.pattern(/^([a-zA-ZА-Яа-яЇїєЄёЁіІ`'-.,0-9!()? ]{1,300})$/)])
    });
  }

  nestFormData(): FormData {
    const createData = new FormData();
    const fields = Object.keys(this.createForm.value);
    fields.forEach(key => {
      if (this.createForm.value[key] instanceof File) {
        createData.append(key, this.createForm.value[key], this.createForm.value[key].name);
      } else {
        createData.append(key, this.createForm.value[key]);
      }
    });
    return createData;
  }

  handleAsyncValidation(error): void {
    if (error.error.message.name && error.error.message.name[0] === 'dish with this name already exists.') {
      this.createForm.get('name').setErrors({exists: true});
    }
  }

  createPosition(): void {
    this.menuService.createPosition(this.nestFormData()).subscribe( (data: ICategoryData) => {
      console.log(data);
      this.snackbarService.openSuccessSnackBar(`Категорія ${data.name} успішно створена!`);
      this.initCreateForm();
    }, error => {
      this.handleAsyncValidation(error);
    });
  }

  onFileChanged($event: any): void {
    this.createForm.controls.image.setValue($event.target.files[0]);
  }

  createPositionAndGoBackToList(): void {
    this.menuService.createPosition(this.nestFormData()).subscribe( (data: ICategoryData) => {
      this.snackbarService.openSuccessSnackBar(`Категорія ${data.name} успішно створена!`);
      this.router.navigate(['admin', 'positions']);
    }, error => {
      this.handleAsyncValidation(error);
    });
  }

}
