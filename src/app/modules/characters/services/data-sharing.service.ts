import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  // private fields
  private dataSubject: BehaviorSubject<string>;

  // public fields
  data$: Observable<string>;

  constructor() {
    this.dataSubject = new BehaviorSubject<string>('');
    this.data$ = this.dataSubject.asObservable();
  }

  sendData(data: string) {
    this.dataSubject.next(data);
  }
}
