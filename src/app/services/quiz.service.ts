import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  private url='https://quizapi.io//api/v1/questions'

  constructor(private http: HttpClient) {
   }

  public getQuestions(dificulty:string, limit:number):Observable<any>{

    let headers={'X-Api-Key': environment.quizApiKey};
    return this.http.get(`${this.url}?dificulty=${dificulty}&limit=${limit}`, {headers:headers})

  }
}
