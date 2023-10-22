import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, map, of } from 'rxjs';

import { CharactersModel } from '../../models/characters.model';
import { CharactersHttpService } from '../../services/characters-http.service';

export type CharactersType = CharactersModel | undefined;

@Component({
  selector: 'app-get-character',
  templateUrl: './get-character.component.html',
  styleUrls: ['./get-character.component.scss'],
})
export class GetCharacterComponent implements OnDestroy {
  // private fields
  private charactersSubscr: Subscription;
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  charactersSubject: BehaviorSubject<CharactersType>;
  characters$: Observable<CharactersType>;

  constructor(
    private route: ActivatedRoute,
    private http: CharactersHttpService,
  ) {
    this.charactersSubject = new BehaviorSubject<CharactersType>(undefined);
    this.characters$ = this.charactersSubject.asObservable();
    this.charactersSubscr = this.getCharacters().subscribe();
    this.unsubscribe.push(this.charactersSubscr);
  }

  get CharactersValue(): CharactersType {
    return this.charactersSubject.value;
  }

  set CharactersValue(characters: CharactersType) {
    this.charactersSubject.next(characters);
  }

  getCharacters(): Observable<CharactersType> {
    const id = this.route.snapshot.paramMap.get('id');

    return this.http.getById(Number(id)).pipe(
      map((response) => {
        if (response.code === 200) {
          console.log(response.data)
          this.charactersSubject.next(response.data);
          return response.data;
        } else {
          return of(undefined);
        }
      }),
    );
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
