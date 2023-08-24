import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

const apiurl= environment.APIURL+'/api/admin';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  refreshTokenInterval: any;


  constructor(private http:HttpClient,  private route: Router) { }


proceedLogin(usercred: any){
return this.http.put<any>(apiurl + "admin/login", usercred)
}

adminLogin(data: any){
  return this.http.put<any>(apiurl + "/login", data)
  }

anyUserLogin(anyuserlogin:any){
  return this.http.post<any> (apiurl + "login", anyuserlogin)
}

IsLoggedIn(){
  return localStorage.getItem('token')!=null;
}


logOut(): void {
  localStorage.removeItem('token');
  // this.tokenService.removeAccessToken();
  // this.tokenService.removeRefreshToken();
  setTimeout(() => {
    clearInterval(this.refreshTokenInterval);
    this.refreshTokenInterval = null;
    this.route.navigate(['/auth/login']);
  }, 1000);
}


}
