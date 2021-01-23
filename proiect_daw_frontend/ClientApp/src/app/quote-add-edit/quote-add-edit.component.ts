import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Quote } from '../models/quote';
import { QuoteService } from '../services/quote.service';

@Component({
  selector: 'app-quote-add-edit',
  templateUrl: './quote-add-edit.component.html',
  styleUrls: ['./quote-add-edit.component.css']
})
export class QuoteAddEditComponent implements OnInit {

  form: FormGroup;
  actionType: string;
  formTitle: string;
  formBody: string;
  quoteId: number;
  errorMessage: any;
  existingQuote: Quote;

  constructor(private quoteService: QuoteService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) {
    const idParam = 'id';
    this.actionType = 'Add';
    this.formTitle = 'title';
    this.formBody = 'body';
    if (this.avRoute.snapshot.params[idParam]) {
      this.quoteId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {
        quoteId: 0,
        title: ['', [Validators.required]],
        body: ['', [Validators.required]],
      }
    )
  }

  ngOnInit() {

    if (this.quoteId > 0) {
      this.actionType = 'Edit';
      this.quoteService.getQuote(this.quoteId)
        .subscribe(data => (
          this.existingQuote = data,
          this.form.controls[this.formTitle].setValue(data.title),
          this.form.controls[this.formBody].setValue(data.body)
        ));
    }
  }

  save() {
    if (!this.form.valid) {
      return;
    }

    if (this.actionType === 'Add') {
      let quote: Quote = {
        dt: new Date(),
        creator: 'Martin',
        title: this.form.get(this.formTitle).value,
        body: this.form.get(this.formBody).value
      };

      this.quoteService.saveQuote(quote)
        .subscribe((data) => {
          this.router.navigate(['/quotes']);
        });
    }

    if (this.actionType === 'Edit') {
      let quote: Quote = {
        quoteId: this.existingQuote.quoteId,
        dt: this.existingQuote.dt,
        creator: this.existingQuote.creator,
        title: this.form.get(this.formTitle).value,
        body: this.form.get(this.formBody).value
      };
      this.quoteService.updateQuote(quote.quoteId, quote)
        .subscribe((data) => {
          this.router.navigate(['/quotes']);
        });
    }
  }

  cancel() {
    this.router.navigate(['/quotes']);
  }

  get title() { return this.form.get(this.formTitle); }
  get body() { return this.form.get(this.formBody); }
}

