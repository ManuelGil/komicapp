import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Md5 } from 'ts-md5';
import { ResponseModel } from '../../models/response.model';

const API_CHARACTERS_URL = `${environment.apiUrl}/characters`;

const PUBLIC_KEY = environment.publicKey;
const PRIVATE_KEY = environment.privateKey;

type ArgsType = {
  name: string;
  limit: number;
  offset: number;
  order: string;
};

@Injectable({
  providedIn: 'root',
})
export class CharactersHttpService {
  constructor(private http: HttpClient) {}

  // public methods
  getAll(args: ArgsType): Observable<ResponseModel> {
    const ts = Date.now();

    const md5 = new Md5();
    const hash = String(
      md5.appendStr(`${ts}${PRIVATE_KEY}${PUBLIC_KEY}`).end(),
    );

    const fromObject = {
      ts,
      apikey: PUBLIC_KEY,
      hash,
      limit: args.limit,
      offset: args.offset,
    };

    if (args.name !== '') {
      Object.assign(fromObject, { nameStartsWith: args.name });
    }

    if (args.order === 'asc') {
      Object.assign(fromObject, { orderBy: 'name' });
    } else {
      Object.assign(fromObject, { orderBy: '-name' });
    }

    const params = new HttpParams({ fromObject });

    return this.http.get(API_CHARACTERS_URL, { params });
  }

  getById(id: number): Observable<ResponseModel> {
    const ts = Date.now();

    const md5 = new Md5();
    const hash = String(
      md5.appendStr(`${ts}${PRIVATE_KEY}${PUBLIC_KEY}`).end(),
    );

    const fromObject = {
      ts,
      apikey: PUBLIC_KEY,
      hash,
    };

    const params = new HttpParams({ fromObject });

    return this.http.get(`${API_CHARACTERS_URL}/${id}`, { params });
  }
}
