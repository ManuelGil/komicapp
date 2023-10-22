import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const API_COMICS_URL = `${environment.apiUrl}/comics`;

const PUBLIC_KEY = environment.publicKey;
const PRIVATE_KEY = environment.privateKey;

@Injectable({
  providedIn: 'root',
})
export class ComicsHttpService {}
