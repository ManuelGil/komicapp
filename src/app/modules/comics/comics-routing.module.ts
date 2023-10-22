import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ComicsComponent } from './comics.component';
import { GetComicComponent } from './components/get-comic/get-comic.component';

const routes: Routes = [
  {
    path: '',
    component: ComicsComponent,
    children: [
      {
        path: 'get/:id',
        component: GetComicComponent,
        data: {
          title: 'Comic details',
        },
      },
      { path: '', redirectTo: 'get', pathMatch: 'full' },
      { path: '**', redirectTo: 'get', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComicsRoutingModule {}
