import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from '../models/article';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-article-add-edit',
  templateUrl: './article-add-edit.component.html',
  styleUrls: ['./article-add-edit.component.css']
})
export class ArticleAddEditComponent implements OnInit {

  form: FormGroup;
  actionType: string;
  formTitle: string;
  formBody: string;
  articleId: number;
  errorMessage: any;
  existingArticle: Article;

  constructor(private articleService: ArticleService, private formBuilder: FormBuilder, private avRoute: ActivatedRoute, private router: Router) {
    const idParam = 'id';
    this.actionType = 'Add';
    this.formTitle = 'title';
    this.formBody = 'body';
    if (this.avRoute.snapshot.params[idParam]) {
      this.articleId = this.avRoute.snapshot.params[idParam];
    }

    this.form = this.formBuilder.group(
      {
        articleId: 0,
        title: ['', [Validators.required]],
        body: ['', [Validators.required]],
      }
    )
  }

  ngOnInit() {

    if (this.articleId > 0) {
      this.actionType = 'Edit';
      this.articleService.getArticle(this.articleId)
        .subscribe(data => (
          this.existingArticle = data,
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
      let article: Article = {
        dt: new Date(),
        creator: 'Martin',
        title: this.form.get(this.formTitle).value,
        body: this.form.get(this.formBody).value
      };

      this.articleService.saveArticle(article)
        .subscribe((data) => {
          this.router.navigate(['/articles']);
        });
    }

    if (this.actionType === 'Edit') {
      let article: Article = {
        articleId: this.existingArticle.articleId,
        dt: this.existingArticle.dt,
        creator: this.existingArticle.creator,
        title: this.form.get(this.formTitle).value,
        body: this.form.get(this.formBody).value
      };
      this.articleService.updateArticle(article.articleId, article)
        .subscribe((data) => {
          this.router.navigate(['/articles']);
        });
    }
  }

  cancel() {
    this.router.navigate(['/articles']);
  }

  get title() { return this.form.get(this.formTitle); }
  get body() { return this.form.get(this.formBody); }

}
