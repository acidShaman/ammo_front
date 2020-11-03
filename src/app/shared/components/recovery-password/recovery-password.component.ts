import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../services/user/auth.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {NavBarComponent} from '../nav-bar/nav-bar.component';
import {LoginComponent} from '../login/login.component';
import {SnackbarService} from '../../services/snackbar.service';

@Component({
  selector: 'app-recovery-password',
  templateUrl: './recovery-password.component.html',
  styleUrls: ['./recovery-password.component.css']
})
export class RecoveryPasswordComponent implements OnInit {
  pwdRecoveryForm: FormGroup;

  constructor(private authService: AuthService, private dialog: MatDialog, private dialogRef: MatDialogRef<LoginComponent>, private snackbarService: SnackbarService) {
  }

  ngOnInit(): void {
    this.pwdRecoveryForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  requestResetPwd(): void {
    const email = this.pwdRecoveryForm.controls.email.value;
    this.authService.resetPasswordRequest(email).subscribe((response) => {
      if (response.status === 'OK') {
        this.snackbarService.openSuccessSnackBar('На вашу пошту має прийти лист з силкою на віндновлення паролю!');
      }
      console.log(response);
    }, (error) => {
      if (error.status === 400) {
        this.snackbarService.openFailureSnackBar('Вашої пошти немає в базі даних!');
      }
    });
    this.dialogRef.close();
    this.pwdRecoveryForm.controls.email.setValue('');
  }

  onSubmit(): void {
    this.requestResetPwd();
  }
}
