import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';


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
    private dataService: DataService) { }

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
    this.dataService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(resp => {
        this.user = resp;
        if (resp) {
          this.router.navigate(['perfil']);
          localStorage.setItem('currentUser', JSON.stringify(resp));
        }
        else {
          this.loading = false;
          this.error = "Usuario ou senha errados";
          this.loginForm.reset();
          this.submitted = false;
        }
      },
      error => {
        this.loading = false;
        this.submitted = false;
      });
  }

}
