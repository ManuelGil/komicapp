import { Component, OnDestroy } from '@angular/core';
import {
  faChevronDown,
  faChevronLeft,
  faChevronRight,
  faChevronUp,
} from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject, Observable, Subscription, map, of } from 'rxjs';

import { CharactersModel } from '../../models/characters.model';
import { CharactersHttpService } from '../../services/characters-http.service';
import { DataSharingService } from '../../services/data-sharing.service';

export type CharactersType = CharactersModel | undefined;

@Component({
  selector: 'app-list-characters',
  templateUrl: './list-characters.component.html',
  styleUrls: ['./list-characters.component.scss'],
})
export class ListCharactersComponent implements OnDestroy {
  // private fields
  private charactersSubscr: Subscription;
  private dataSubscr: Subscription;
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  // public fields
  charactersSubject: BehaviorSubject<CharactersType>;
  characters$: Observable<CharactersType>;
  faChevronUp = faChevronUp;
  faChevronDown = faChevronDown;
  faChevronLeft = faChevronLeft;
  faChevronRight = faChevronRight;
  search = '';
  order = 'asc';
  page = 1;

  constructor(
    private http: CharactersHttpService,
    private dataSharingService: DataSharingService,
  ) {
    this.charactersSubject = new BehaviorSubject<CharactersType>(undefined);
    this.characters$ = this.charactersSubject.asObservable();
    this.charactersSubscr = this.getCharacters().subscribe();
    this.unsubscribe.push(this.charactersSubscr);

    this.dataSubscr = this.dataSharingService.data$.subscribe((search) => {
      this.updateCharacters({ search });
    });
    this.unsubscribe.push(this.dataSubscr);
  }

  get CharactersValue(): CharactersType {
    return this.charactersSubject.value;
  }

  set CharactersValue(characters: CharactersType) {
    this.charactersSubject.next(characters);
  }

  getCharacters(): Observable<CharactersType> {
    const args = {
      name: this.search,
      limit: 24,
      offset: 24 * (this.page - 1),
      order: this.order,
    };

    return this.http.getAll(args).pipe(
      map((response) => {
        if (response.code === 200) {
          this.charactersSubject.next(response.data);
          return response.data;
        } else {
          return of(undefined);
        }
      }),
    );
  }

  updateCharacters(args?: { search?: string; order?: string; page?: number }) {
    if (args?.search) {
      this.search = args.search;
    } else {
      this.search = '';
    }

    if (args?.order) {
      this.order = args.order;
    }

    if (args?.page) {
      this.page = args.page;
    }

    this.charactersSubscr.unsubscribe();
    this.charactersSubscr = this.getCharacters().subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
