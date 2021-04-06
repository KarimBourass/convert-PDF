import { MergePageComponent } from './component/merge-page/merge-page.component';
import { HomeComponent } from './component/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SplitPageComponent } from './component/split-page/split-page.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'merge', component:MergePageComponent },
  { path: 'split', component:SplitPageComponent },
  { path: '**', redirectTo: '/home' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
