import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public loginApi(data: any): Observable<any> {
    let apiData = environment.apiUrl + '/accounts/login/';
    return this.http.post(apiData, data);
  }


  public userData(): Observable<any> {
    let apiData = environment.apiUrl + '/accounts/user/' + localStorage.getItem('userId') + '/';
    return this.http.get(apiData);
  }

  public graphData(stage_type: string): Observable<any> {
    let apiData = environment.apiUrl + '/leads/dashboard/graph/';
    const payload = {
      'stage_type': stage_type
    }
    return this.http.get(apiData, { params: payload });
  }

  public probabilityData(stage_type: string): Observable<any> {
    let apiData = environment.apiUrl + '/leads/probability/analysis/';
    const payload = {
      'stage_type': stage_type
    }
    return this.http.get(apiData, { params: payload });
  }

  public leadStatus(): Observable<any> {
    let apiData = environment.apiUrl + '/leads/stage/';
    return this.http.get(apiData);
  }

  public leadList(stage_type: string,searchKey:any): Observable<any> {
    let apiData = environment.apiUrl + '/leads/';
    const payload = {
      'stage_type': stage_type,
      'limit':10,
      'offset':0,
      'search':searchKey,
      'ordering':'-probability'
    }
    return this.http.get(apiData,{params:payload});
  }


}
