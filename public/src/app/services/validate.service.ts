import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validateRegister(form: any): boolean {
    if (form.firstName === undefined || form.lastName === undefined || form.email === undefined || form.password === undefined) {
      return false;
    } else {
      return true;
    }
  }

  validateEmail(email: string): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }

  validatePasswords(password: string, confirm: string): boolean {
    if (password !== confirm) {
      return false;
    } else {
      return true;
    }
  }
}
