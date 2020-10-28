import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/user/auth.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {NavBarComponent} from '../nav-bar/nav-bar.component';
import {LoginComponent} from '../login/login.component';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css']
})
export class RecoveryPasswordComponent implements OnInit {
  pwdRecoveryForm: FormGroup;
  constructor(private authService: AuthService, private dialog: MatDialog, private dialogRef: MatDialogRef<LoginComponent>) { }

  ngOnInit(): void {
    this.pwdRecoveryForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  requestResetPwd(): void {
    const email = this.pwdRecoveryForm.controls.email.value;
    this.authService.resetPasswordRequest(email).subscribe((response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
    this.dialogRef.close();
    this.pwdRecoveryForm.controls.email.setValue('');
  }

  onSubmit(): void {
    this.requestResetPwd();
  }
}
