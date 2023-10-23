import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, Subscription, map, of } from 'rxjs';

import { CharacterModel } from 'src/app/modules/models/character.model';
import { ComicsModel } from '../../models/comics.model';
import { CharactersHttpService } from '../../services/characters-http.service';

export type CharacterType = CharacterModel | undefined;
export type ComicsType = ComicsModel | undefined;

@Component({
  selector: 'app-get-character',
  templateUrl: './get-character.component.html',
  styleUrls: ['./get-character.component.scss'],
})
export class GetCharacterComponent implements OnDestroy {
  // private fields
  private characterSubscr: Subscription;
  private comicsSubscr: Subscription;
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  // public fields
  characterSubject: BehaviorSubject<CharacterType>;
  character$: Observable<CharacterType>;
  comicsSubject: BehaviorSubject<ComicsType>;
  comics$: Observable<ComicsType>;

  constructor(
    private route: ActivatedRoute,
    private http: CharactersHttpService,
  ) {
    this.characterSubject = new BehaviorSubject<CharacterType>(undefined);
    this.character$ = this.characterSubject.asObservable();
    this.characterSubscr = this.getCharacter().subscribe();
    this.unsubscribe.push(this.characterSubscr);

    this.comicsSubject = new BehaviorSubject<ComicsType>(undefined);
    this.comics$ = this.comicsSubject.asObservable();
    this.comicsSubscr = this.getComics().subscribe();
    this.unsubscribe.push(this.comicsSubscr);
  }

  get CharacterValue(): CharacterType {
    return this.characterSubject.value;
  }

  set CharacterValue(character: CharacterType) {
    this.characterSubject.next(character);
  }

  getCharacter(): Observable<CharacterType> {
    const id = this.route.snapshot.paramMap.get('id');

    return this.http.getById(Number(id)).pipe(
      map((response) => {
        if (response.code === 200) {
          this.characterSubject.next(response.data.results[0]);
          return response.data.results[0];
        } else {
          return of(undefined);
        }
      }),
    );
  }

  getComics(): Observable<ComicsType> {
    const id = this.route.snapshot.paramMap.get('id');

    return this.http.getComicsById(Number(id)).pipe(
      map((response) => {
        if (response.code === 200) {
          this.comicsSubject.next(response.data);
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
