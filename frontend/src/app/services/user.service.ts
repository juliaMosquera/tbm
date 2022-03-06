import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private env: string;
  constructor(private _http: HttpClient) {  //Se ponen todos los services, guard es decir todo lo que tiene @angular van aqui
    this.env = environment.APP_URL;
   }

   registerUser(user: any){
     return this._http.post<any>(this.env + '/user/register', user);
   }
   login(user: any){
    return this._http.post<any>(this.env + '/user/login', user);
  }

  loggedIn(){
     return !!localStorage.getItem('token'); //devuelve un true y flase, solo se aplica cuando la respuesta sea true o flase
  }

  getToken(){ // devuelve el token
    return localStorage.getItem('token');
  }

  logout(){
    localStorage.removeItem('token');
  }

}
