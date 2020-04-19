import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientService {

  constructor(private http: HttpClient) { }
  ipServer = "http://localhost:3000";
data;

  register(body:any)
  {
    return this.http.post(this.ipServer+'/register',body,{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }
  listUsers()
  {
    return this.http.get(this.ipServer+'/listPatient',{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  getgouvernerat()
  {
    return this.http.get(this.ipServer+'/getgouvernerat',{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

  getdelegation()
  {
    return this.http.get(this.ipServer+'/getdelegation',{
      observe:'body',
      headers:new HttpHeaders().append('Content-Type','application/json')
    });
  }

}
