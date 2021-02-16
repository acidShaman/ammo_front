import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.css']
})
export class CreateCategoryComponent implements OnInit {

  createForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.initCreateForm();
    this.createForm.valueChanges.subscribe(console.log);
  }

  private initCreateForm(): void {
    this.createForm = new FormGroup({
      name: new FormControl(null, [Validators.pattern(/^([a-zA-ZА-Яа-яЇїєЄёЁіІ`'.,-]{2,30})$/)]),
      value: new FormControl(null, [Validators.pattern(/^([a-zA-Z-']{1,30})$/)]),
      image: new FormControl(null),
      isShown: new FormControl(false, [Validators.required])
    });
  }
}
