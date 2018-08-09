import { Observable } from 'rxjs/Observable';
import { Employee } from './../models/employee.model';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/Rx';

@Injectable()
export class FormPoster{

  constructor(private http: Http){

  }

  postEmployeeForm(employee: Employee):Observable<any>{
    let body  = JSON.stringify(employee);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({ headers: headers});

    return this.http.post('http://localhost:3100/postemployee', body, options)
    .map(this.extractData)
    .catch(this.handleError);

  }

  getLanguages(): Observable<any>{
    return this.http.get('http://localhost:3100/getlanguages')
    .map(this.extractLanguages)
    .catch(this.handleError);
  }

  private extractData(res: Response){
    let body = res.json();
    return body.fields || { };
  }

  private handleError(error: any)
  {
    console.log('Post Error : ', error);
    return Observable.throw(error.statusText);
  }

  private extractLanguages(res: Response)
  {
    let body = res.json();
    return body.data || { };
  }
}
