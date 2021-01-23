import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BlogPost } from '../models/blogpost';
import { Article } from '../models/article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient) {
      this.myAppUrl = environment.appUrl;
      this.myApiUrl = 'api/Articles/';
  }

  getArticles(): Observable<Article[]> {
    return this.http.get<Article[]>(this.myAppUrl + this.myApiUrl)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getArticle(articleId: number): Observable<Article> {
      return this.http.get<Article>(this.myAppUrl + this.myApiUrl + articleId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  saveArticle(article): Observable<Article> {
      return this.http.post<Article>(this.myAppUrl + this.myApiUrl, JSON.stringify(article), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updateArticle(articleId: number, article): Observable<Article> {
      return this.http.put<Article>(this.myAppUrl + this.myApiUrl + articleId, JSON.stringify(article), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteArticle(articleId: number): Observable<Article> {
      return this.http.delete<Article>(this.myAppUrl + this.myApiUrl + articleId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
