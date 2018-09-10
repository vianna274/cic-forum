import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';
import { UserService } from '../../services/user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  user: any;
  error: string;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private dataService: DataService,
    private userService: UserService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    if (this.loginForm.invalid)
      return;

    this.loading = true;
    this.dataService.getUser(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(resp => {
        this.user = resp;
        if (resp[0]) {
          this.userService.insertUser(resp[0]);
          this.userService.updateCurrentUser();
          this.router.navigate(['/']);
        }
        else {
          this.loading = false;
          this.error = "Usuario ou senha errados";
          this.loginForm.reset();
          this.submitted = false;
        }
      },
      error => {
        console.log(error);
        this.loading = false;
        this.submitted = false;
      });
  }

}
