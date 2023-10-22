import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CharactersComponent } from './characters.component';
import { GetCharacterComponent } from './components/get-character/get-character.component';
import { ListCharactersComponent } from './components/list-characters/list-characters.component';

const routes: Routes = [
  {
    path: '',
    component: CharactersComponent,
    children: [
      {
        path: 'list',
        component: ListCharactersComponent,
        data: {
          title: 'List of characters',
        },
      },
      {
        path: 'get/:id',
        component: GetCharacterComponent,
        data: {
          title: 'Character profile',
        },
      },
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: '**', redirectTo: 'list', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CharactersRoutingModule {}
