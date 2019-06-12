import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { Observable } from 'rxjs';
import { LocalStorageService } from 'angular-2-local-storage';
import "rxjs";

import { environment } from '../../environments/environment';
import { HeaderButtonsService } from '../Services/headerButtons.service';

@Injectable()
export class LoginService {

  
  constructor(
    private http: Http,
    private localStorageService: LocalStorageService,
    private headerButtonsService: HeaderButtonsService
  ) {
  }

  loginCheck(email, password) {
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);

    return this.http.post("/users/login", { email, password }, { headers: reqHeaders })
    .toPromise()
    .then((res) => 
    { console.log(res,"DATA")
      this.localStorageService.set("token", JSON.parse(res["_body"]).data.token);
      this.localStorageService.set("isJudge", JSON.parse(res["_body"]).data.isJudge);
      this.localStorageService.set("isAdmin", JSON.parse(res["_body"]).data.isAdmin);
      this.localStorageService.set("isCLeader", JSON.parse(res["_body"]).data.isCLeader);
      this.localStorageService.set("isRLeader", JSON.parse(res["_body"]).data.isRLeader);
      this.localStorageService.set("isGLeader", JSON.parse(res["_body"]).data.isGLeader);
      if(JSON.parse(res["_body"]).data.isAdmin){
        this.headerButtonsService.setIsSignedInAdmin();
      }
      if(JSON.parse(res["_body"]).data.isCLeader){
        this.headerButtonsService.setIsSignedInCLeader();
      }
      if(JSON.parse(res["_body"]).data.isRLeader){
        this.headerButtonsService.setIsSignedInRLeader();
      }
      if(JSON.parse(res["_body"]).data.isGLeader){
        this.headerButtonsService.setIsSignedInGLeader();
      }

      this.localStorageService.set("email", email);
    })
    ;
  }

  getUser(): Observable<any> {    
    const reqHeaders: Headers = new Headers();
    reqHeaders.append('Content-Type', 'application/json');
    const currentToken = this.localStorageService.get('token');
    reqHeaders.append('Authorization', 'Bearer ' + currentToken);
    return this.http.get("/users/user", { headers: reqHeaders });
  }

}