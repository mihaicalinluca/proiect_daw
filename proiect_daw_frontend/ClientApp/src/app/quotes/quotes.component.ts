import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Quote } from '../models/quote';
import { QuoteService } from '../services/quote.service';

@Component({
  selector: 'app-quotes',
  templateUrl: './quotes.component.html',
  styleUrls: ['./quotes.component.css']
})
export class QuotesComponent implements OnInit {

  quotes$: Observable<Quote[]>;

  constructor(private quoteService: QuoteService) {
  }

  ngOnInit() {
    this.loadBlogPosts();
  }

  loadBlogPosts() {
    this.quotes$ = this.quoteService.getQuotes();
  }

  delete(quoteId) {
    const ans = confirm('Do you want to delete blog post with id: ' + quoteId);
    if (ans) {
      this.quoteService.deleteQuote(quoteId).subscribe((data) => {
        this.loadBlogPosts();
      });
    }
  }

}
