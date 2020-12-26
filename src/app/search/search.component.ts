import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Endpoint } from './endpoint';
import {Filter} from './filter';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  endpoints: Endpoint[];
  selectedEndpoint: Endpoint;
  rawResponse: any;
  q: string;
  subreddits: any;
  subredditsFormatted: string = '';
  showSubredditTextBox = false;
  code: any;
  size: number = 25;
  languages: string[] = ['json'];
  filters: Filter[];
  selectedFilters: Filter[];
  beforeFilter: Date;
  afterFilter: Date;
  showBefore = false;
  showAfter = false;

  constructor(
    private http: HttpClient
  ) {
    this.endpoints = [
      { name: 'Comments', urlSegment: 'comment' },
      { name: 'Submission', urlSegment: 'submission' },
      { name: 'Subreddit', urlSegment: 'subreddit' },
    ];
  }

  ngOnInit(): void {
    this.filters = [
      {
        name: 'Before',
        code: 'before',
      },
      {
        name: 'After',
        code: 'after',
      },
    ];
    this.selectedEndpoint = this.endpoints[0];
  }

  endpointChange(event: any) {
    // console.log(event);
    if (event.value.name == 'Subreddit') {
      this.showSubredditTextBox = true;
    }
  }

  onHighlight(event) {
    // console.log(event);
  }

  subredditOutOfFocus(e) {
    // console.log(e);
  }

  filterDropdownChange(e) {
    // console.log(e);
    // console.log(this.selectedFilters);
    if (this.selectedFilters.length > 0) {
      for (let i = 0; i < this.selectedFilters.length; i++) {
        switch (this.selectedFilters[i].code) {
          case 'before':
            this.showBefore = true;
            break;
          case 'after':
            this.showAfter = true;
            break;
        }
      }
    } else {
      this.showBefore = this.showAfter = false;
    }
  }

  submit(event: any) {
    // console.log(event);
    // console.log(this.subreddits);
    if(this.beforeFilter){
      console.log('Before');
      console.log(this.beforeFilter.getTime());
    }
    else if(this.afterFilter){
      console.log('After');
      console.log(this.afterFilter.getTime());
    }
    var options;
    this.subredditsFormatted = '';
    if (this.subreddits) {
      for (let i = 0; i < this.subreddits.length; i++) {
        if (this.subredditsFormatted == '') {
          this.subredditsFormatted = this.subreddits[i];
        } else {
          this.subredditsFormatted =
            this.subredditsFormatted + ',' + this.subreddits[i];
        }
      }
      // console.log(this.subredditsFormatted);
      options = {
        params: {
          subreddit: this.subredditsFormatted,
          q: this.q,
          size: this.size,
        },
      };
    } else {
      options = {
        params: {
          q: this.q,
          size: this.size,
        },
      };
    }
    this.http
      .get(
        'https://api.pushshift.io/reddit/' +
          this.selectedEndpoint.urlSegment +
          '/search',
        options
      )
      .subscribe((res) => {
        // console.log(res);
        this.rawResponse = res;
        this.code = JSON.stringify(this.rawResponse, null, 2);
      });
  }
}
