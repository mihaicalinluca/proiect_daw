import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { BlogPost } from '../models/blogpost';
import { Quote } from '../models/quote';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {

  myAppUrl: string;
  myApiUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(private http: HttpClient) {
      this.myAppUrl = environment.appUrl;
      this.myApiUrl = 'api/Quotes/';
  }

  getQuotes(): Observable<Quote[]> {
    return this.http.get<Quote[]>(this.myAppUrl + this.myApiUrl)
    .pipe(
      retry(1),
      catchError(this.errorHandler)
    );
  }

  getQuote(quoteId: number): Observable<Quote> {
      return this.http.get<Quote>(this.myAppUrl + this.myApiUrl + quoteId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  saveQuote(quote): Observable<Quote> {
      return this.http.post<Quote>(this.myAppUrl + this.myApiUrl, JSON.stringify(quote), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  updateQuote(quoteId: number, quote): Observable<Quote> {
      return this.http.put<Quote>(this.myAppUrl + this.myApiUrl + quoteId, JSON.stringify(quote), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  deleteQuote(quoteId: number): Observable<Quote> {
      return this.http.delete<Quote>(this.myAppUrl + this.myApiUrl + quoteId)
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
