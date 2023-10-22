import { Component } from '@angular/core';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { DataSharingService } from './services/data-sharing.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
  styleUrls: ['./characters.component.scss'],
})
export class CharactersComponent {
  faMagnifyingGlass = faMagnifyingGlass;

  constructor(private dataSharingService: DataSharingService) {}

  search(event: Event) {
    this.dataSharingService.sendData(
      String((event.target as HTMLInputElement).value),
    );
  }
}
