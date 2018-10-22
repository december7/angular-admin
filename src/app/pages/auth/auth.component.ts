import { Component, ElementRef, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '@app/api.service';
import { Base64 } from 'js-base64';

@Component({
  selector: 'auth',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./auth.scss')],
  template: require('./auth.html')
})
export class Auth {

  private _apiUrl:string = '/auth';

  public password:string;
  public editMode:Boolean = false;
  public slogans = ['请输入密码', '请输入密码', '请输入密码'];
  public slogan:string = this.slogans[Math.floor(Math.random() * 3)];

  constructor(public elem:ElementRef, 
              private _router: Router,
              private _apiService:ApiService) {}

  toEditMode(event:any) {
    this.editMode = !this.editMode;
  }

  quitEdit(event:any) {
    this.editMode = false;
  }

  onEnter(event:any) {
    this.editMode = false;
    if(!!this.password) {
      this.onSubmit();
    }
  }

  onSubmit() {
    this._apiService.post(this._apiUrl, { password: Base64.encode(this.password) })
    .then(auth => {
      if (auth.result.token) {
        localStorage.setItem('id_token', auth.result.token);
        this._router.navigate(['/dashboard']);
      }
    })
    .catch(error => {});
  }

  ngAfterViewChecked() {
    const inputs = this.elem.nativeElement.getElementsByTagName('input');
    if (inputs.length && inputs[0].focus) {
      inputs[0].focus();
    }
  }
}
