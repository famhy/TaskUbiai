import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {Annotation} from "../../Annotation"
import { Document } from '../../Document';
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    
  })
};
@Injectable({
  providedIn: 'root'
})
export class AnnotationService {

  constructor(private http:HttpClient) { }

  getDocement():Observable<Document[]> {
    console.log(this.http.get<Document[]>("http://localhost:3000/document"))
    return this.http.get<Document[]>("http://localhost:3000/document");
  }

  addAnnotation(annotation:Annotation):Observable<Annotation>{
    return this.http.post<Annotation>("http://localhost:3000/annotation",annotation,httpOptions)
  }
}
