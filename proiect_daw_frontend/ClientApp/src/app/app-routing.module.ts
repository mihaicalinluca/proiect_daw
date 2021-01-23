import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BlogPostsComponent } from './blog-posts/blog-posts.component';
import { BlogPostComponent } from './blog-post/blog-post.component';
import { BlogPostAddEditComponent } from './blog-post-add-edit/blog-post-add-edit.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleComponent } from './article/article.component';
import { ArticleAddEditComponent } from './article-add-edit/article-add-edit.component';
import { QuotesComponent } from './quotes/quotes.component';
import { QuoteComponent } from './quote/quote.component';
import { QuoteAddEditComponent } from './quote-add-edit/quote-add-edit.component';

const routes: Routes = [
  { path: '', component: BlogPostsComponent, pathMatch: 'full' },
  { path: 'blogpost/:id', component: BlogPostComponent },
  { path: 'add', component: BlogPostAddEditComponent },
  { path: 'blogpost/edit/:id', component: BlogPostAddEditComponent },

  { path:'articles', component: ArticlesComponent, pathMatch:'full'},
  { path: 'articles/article/:id', component: ArticleComponent },
  { path: 'articles/add', component: ArticleAddEditComponent},
  { path:'articles/edit/:id', component: ArticleAddEditComponent},

  { path:'quotes', component: QuotesComponent, pathMatch:'full'},
  { path: 'quotes/quote/:id', component: QuoteComponent },
  { path: 'quotes/add', component: QuoteAddEditComponent},
  { path:'quotes/edit/:id', component: QuoteAddEditComponent},

  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }