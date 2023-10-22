import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ComicsRoutingModule } from './comics-routing.module';
import { ComicsComponent } from './comics.component';
import { ListComicsComponent } from './components/list-comics/list-comics.component';
import { GetComicComponent } from './components/get-comic/get-comic.component';

@NgModule({
  declarations: [ComicsComponent, ListComicsComponent, GetComicComponent],
  imports: [CommonModule, ComicsRoutingModule],
})
export class ComicsModule {}
