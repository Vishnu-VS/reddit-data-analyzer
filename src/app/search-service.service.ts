import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SearchQuery } from './search-bar/search-query';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  searchEvent: Subject<SearchQuery> = new Subject();
  loading: Subject<boolean> = new Subject();

  constructor() { }
}
