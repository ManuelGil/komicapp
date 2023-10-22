import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { CharactersRoutingModule } from './characters-routing.module';
import { CharactersComponent } from './characters.component';
import { ListCharactersComponent } from './components/list-characters/list-characters.component';
import { GetCharacterComponent } from './components/get-character/get-character.component';

@NgModule({
  declarations: [
    CharactersComponent,
    ListCharactersComponent,
    GetCharacterComponent,
  ],
  imports: [CommonModule, CharactersRoutingModule, FontAwesomeModule],
})
export class CharactersModule {}
