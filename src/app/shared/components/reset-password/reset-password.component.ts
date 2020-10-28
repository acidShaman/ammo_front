import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {AuthService} from '../../services/user/auth.service';


class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = (form.control.hasError('notSame') && control.touched);
    return invalidCtrl;
  }
}

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  recoveryPwdForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  resetToken: string;

  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, private router: Router) {
  }

  ngOnInit(): void {
    this.recoveryPwdForm = new FormGroup({
      new_pwd: new FormControl('', [Validators.required, Validators.pattern(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/)]),
      confirm_pwd: new FormControl('', [Validators.required, Validators.pattern(/^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{6,})\S$/)])
    }, this.passwordValidator);
    this.activatedRoute.params.subscribe((params) => {
      this.resetToken = params.reset_token;
    });
  }

  resetPassword(): void {
    console.log('Reset request sent!');
    this.authService.resetPasswordConfirm(this.recoveryPwdForm.controls.new_pwd.value, this.resetToken).subscribe((response) => {
        console.log(response);
        if (response.status === 'OK') {
          console.log('Тепер ви можете зайти у ваш кабінет з новим паролем!');
          this.router.navigate(['']);
        }
      },
      (error) => {
      console.log(error);
      });
  }


  passwordValidator(control: FormGroup): any {
    const pass = control.controls.new_pwd.value;
    const confirmPass = control.controls.confirm_pwd.value;

    return pass === confirmPass ? null : {notSame: true};
  }
}
