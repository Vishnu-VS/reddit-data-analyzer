import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Endpoint } from './endpoint';
import { Filter } from './filter';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  endpoints: Endpoint[];
  selectedEndpoint: Endpoint;
  submittedEndpoint: Endpoint;
  rawResponse: any;
  sanitizedResponse: any;
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
  queryParameters: any = {};
  generatedUrl: string;

  constructor(private http: HttpClient) {
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
    console.log(this.selectedFilters);
    if (this.selectedFilters.length > 0) {
      this.showBefore = false;
      this.showAfter = false;
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
      this.beforeFilter = this.afterFilter = null;
    }
  }

  submit(event: any) {
    // console.log(event);
    // console.log(this.subreddits);
    // console.log(this.queryParameters);
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
          size: this.size
        },
      };
      this.queryParameters.subreddit = this.subredditsFormatted;
    }
    this.queryParameters.q = this.q;
    this.queryParameters.size = this.size;
    // console.log(options);
    if (this.beforeFilter) {
      // console.log('Before');
      console.log(Math.round(this.beforeFilter.getTime() / 1000));
      this.queryParameters.before = Math.round(
        this.beforeFilter.getTime() / 1000
      );
    }
    if (this.afterFilter) {
      // console.log('After');
      console.log(Math.round(this.afterFilter.getTime() / 1000));
      this.queryParameters.after = Math.round(
        this.afterFilter.getTime() / 1000
      );
    }
    // this.http
    //   .get(
    //     'https://api.pushshift.io/reddit/' +
    //       this.selectedEndpoint.urlSegment +
    //       '/search',
    //     {params: this.queryParameters}
    //   )
    //   .subscribe((res) => {
    //     // console.log(res);
    //     // this.rawResponse = res;
    //     // this.code = JSON.stringify(this.rawResponse, null, 2);
    //   });

    this.http
      .get(
        'https://api.pushshift.io/reddit/' +
          this.selectedEndpoint.urlSegment +
          '/search',
        { params: this.queryParameters, observe: 'response' }
      )
      .subscribe((res) => {
        debugger;
        this.submittedEndpoint = this.selectedEndpoint;
        console.log(res);
        this.generatedUrl = res.url;
        this.rawResponse = res.body;
        this.code = JSON.stringify(this.rawResponse, null, 2);
        if(this.selectedEndpoint.urlSegment == "submission"){
          for(let i = 0; i < this.rawResponse.data.length; i++){
            if(this.rawResponse.data[i].hasOwnProperty('preview')){
              if(this.rawResponse.data[i].preview.images[0].resolutions.length > 0){
                //console.log(this.rawResponse.data[i].preview.images[0].resolutions[1].url);
                this.rawResponse.data[i].preview.images[0].resolutions[1].url = this.rawResponse.data[i].preview.images[0].resolutions[1].url.replace(/&amp;/g,"&");
                //console.log(this.rawResponse.data[i].preview.images[0].resolutions[1].url);
              }
            }
          }
          console.log(this.rawResponse);
        }
      });
  }
}
