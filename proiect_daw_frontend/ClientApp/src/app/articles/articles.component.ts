import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../models/article';
import { ArticleService } from '../services/article.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {

  articles$: Observable<Article[]>;

  constructor(private articleService: ArticleService) { }

  ngOnInit() {
    this.loadArticles();
  }
  loadArticles(){
    this.articles$ = this.articleService.getArticles();
  }
  delete(articleId) {
    const ans = confirm('Do you want to delete article with id: ' + articleId);
    if (ans) {
      this.articleService.deleteArticle(articleId).subscribe((data) => {
        this.loadArticles();
      });
    }
  }

}
