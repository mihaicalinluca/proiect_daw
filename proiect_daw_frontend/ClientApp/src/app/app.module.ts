import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogPostsComponent } from './blog-posts/blog-posts.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { BlogPostAddEditComponent } from './blog-post-add-edit/blog-post-add-edit.component';
import { BlogPostService } from './services/blog-post.service';
import { ArticleComponent } from './article/article.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleAddEditComponent } from './article-add-edit/article-add-edit.component';
import { ArticleService } from './services/article.service';
import { QuoteComponent } from './quote/quote.component';
import { QuotesComponent } from './quotes/quotes.component';
import { QuoteAddEditComponent } from './quote-add-edit/quote-add-edit.component';
import { QuoteService } from './services/quote.service';

@NgModule({
  declarations: [
    AppComponent,
    BlogPostsComponent,
    BlogPostComponent,
    BlogPostAddEditComponent,
    ArticleComponent,
    ArticlesComponent,
    ArticleAddEditComponent,
    QuoteComponent,
    QuotesComponent,
    QuoteAddEditComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [
    BlogPostService,
    ArticleService,
    QuoteService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }