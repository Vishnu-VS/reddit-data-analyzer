import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Endpoint } from './endpoint';
import { Filter } from './filter';
import { Comments } from './comments';
import { Submissions } from './submissions';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchService } from '../search-service.service';
import { SearchQuery } from '../search-bar/search-query';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [MessageService]
})
export class SearchComponent implements OnInit, OnDestroy {
  endpoint: String;
  rawResponse: any;
  q: string;
  subreddits: any;
  subredditsFormatted: string = '';
  code: any;
  size: number = 25;
  languages: string[] = ['json'];
  filters: Filter[];
  selectedFilters: Filter[];
  beforeFilter: Date;
  afterFilter: Date;
  showBefore = false;
  showAfter = false;
  before: number;
  after: number;
  beforeValidation: number;
  afterValidation: number;
  queryParameters: any = {};
  generatedUrl: string;
  responseRecieved = false;
  sizeParams: String;
  comments: Comments[] = [];
  submissions: Submissions[] = [];
  validParams = true;
  querySubscription: any;
  searchSubscription: any;
  searchResultTerm: string = '';

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private searchService: SearchService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.subscribeSearch();
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
    this.querySubscription = this.route.queryParams.subscribe((params) => {
      this.validParams = true;
      this.q = params['q'];
      this.endpoint = params['endpoint'];
      if (this.endpoint === undefined) {
        this.validParams = false;
      }
      this.sizeParams = params['size'];
      this.before = Number(params['before']);
      this.after = Number(params['after']);
      console.log(typeof this.before);
      if (this.before) {
        this.beforeValidation = new Date(this.before).getTime();
        if (this.beforeValidation < 0) {
          // console.log("before - validated");
          this.validParams = false;
        }
      }
      if (this.after) {
        this.afterValidation = new Date(this.after).getTime();
        console.log(this.size);
        if (this.afterValidation < 0) {
          this.validParams = false;
        }
      }
      if (!this.q) {
        this.validParams = false;
      }
      if (this.validParams) {
        this.submit();
      }
      else{
        this.messageService.add({severity:'warn', summary: 'Please search again', detail: 'Incompatible query parameters'});
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: null,
          // queryParamsHandling: 'merge'
        });
      }
    });
  }

  subscribeSearch() {
    this.searchSubscription = this.searchService.searchEvent.subscribe(
      (searchQuery: SearchQuery) => {
        console.log(searchQuery);
        this.submitForRouting(searchQuery);
      }
    );
  }

  submitForRouting(searchQuery: SearchQuery) {
    this.queryParameters = {};
    this.queryParameters.html_decode = true;
    this.queryParameters.endpoint = searchQuery.endpoint;
    this.queryParameters.q = searchQuery.q;
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
      this.queryParameters.subreddit = this.subredditsFormatted;
    }
    if (this.size) {
      this.queryParameters.size = this.size;
    }
    if (this.beforeFilter && this.showBefore) {
      this.queryParameters.before = Math.round(
        this.beforeFilter.getTime() / 1000
      );
    }
    if (this.afterFilter && this.showAfter) {
      this.queryParameters.after = Math.round(
        this.afterFilter.getTime() / 1000
      );
    }

    console.log(this.queryParameters);
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: this.queryParameters,
      // queryParamsHandling: 'merge'
    });
  }

  ngOnDestroy() {
    // this.querySubscription.unsubscribe();
    this.searchSubscription.unsubscribe();
  }
  endpointChange(event: any) {
    // console.log(event);
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
    }
  }

  submit() {
    // console.log(event);
    // console.log(this.subreddits);
    // console.log(this.queryParameters);
    // var options;
    this.queryParameters = {};
    this.queryParameters.html_decode = true;
    if (this.endpoint == 'submission'){
      this.queryParameters.over_18 = false;
    }
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
      // options = {
      //   params: {
      //     subreddit: this.subredditsFormatted,
      //     q: this.q,
      //     size: this.size,
      //   },
      // };
      this.queryParameters.subreddit = this.subredditsFormatted;
    }
    this.queryParameters.q = this.q;
    if (this.sizeParams) {
      this.queryParameters.size = this.sizeParams;
    }
    if (this.before) {
      this.queryParameters.before = this.before;
    }
    if (this.after) {
      this.queryParameters.after = this.after;
    }
    this.http
      .get('https://api.pushshift.io/reddit/' + this.endpoint + '/search', {
        params: this.queryParameters,
        observe: 'response',
      })
      .subscribe((res) => {
        // debugger;
        // this.endpoint = this.selectedEndpoint;
        this.searchResultTerm = this.queryParameters.q;
        console.log(res);
        this.generatedUrl = res.url;
        this.rawResponse = res.body;
        this.code = JSON.stringify(this.rawResponse, null, 2);
        if (this.endpoint == 'submission') {
          this.submissions = [];
          this.comments = null;
          for (let i = 0; i < this.rawResponse.data.length; i++) {
            this.submissions[i] = {} as Submissions;
            this.submissions[i].author = this.rawResponse.data[i].author;
            this.submissions[i].authorUrl =
              'https://reddit.com/user/' + this.rawResponse.data[i].author;
            this.submissions[i].score = this.rawResponse.data[i].score;
            this.submissions[i].created_utc =
              this.rawResponse.data[i].created_utc + '000';
            this.submissions[i].permalink = this.rawResponse.data[i].permalink;
            this.submissions[i].permalinkUrl =
              'https://reddit.com' + this.rawResponse.data[i].permalink;
            this.submissions[i].title = this.rawResponse.data[i].title;
            this.submissions[i].url = this.rawResponse.data[i].url;
            this.submissions[i].subreddit =
              'r/' + this.rawResponse.data[i].subreddit;
            this.submissions[i].subredditUrl =
              'https://reddit.com/r/' + this.rawResponse.data[i].subreddit;
            if (this.rawResponse.data[i].hasOwnProperty('preview')) {
              try {
                if (
                  this.rawResponse.data[i].preview.images[0].resolutions
                    .length > 0
                ) {
                  // console.log(this.rawResponse.data[i].preview.images[0].resolutions[1].url);
                  this.submissions[i].previewUrl = this.rawResponse.data[
                    i
                  ].preview.images[0].resolutions[1].url.replace(/&amp;/g, '&');
                  // console.log(this.rawResponse.data[i].preview.images[0].resolutions[1].url);
                }
              } catch (err) {
                console.log(err);
              }
            }
          }
          console.log(this.submissions.length);
        } else if (this.endpoint == 'comment') {
          this.comments = [];
          this.submissions = null;
          for (let i = 0; i < this.rawResponse.data.length; i++) {
            this.comments[i] = {} as Comments;
            this.comments[i].author = this.rawResponse.data[i].author;
            this.comments[i].authorUrl =
              'https://reddit.com/user/' + this.rawResponse.data[i].author;
            this.comments[i].score = this.rawResponse.data[i].score;
            this.comments[i].created_utc =
              this.rawResponse.data[i].created_utc + '000';
            this.comments[i].permalink = this.rawResponse.data[i].permalink;
            this.comments[i].permalinkUrl =
              'https://reddit.com' + this.rawResponse.data[i].permalink;
            this.comments[i].body = this.rawResponse.data[i].body;
            this.comments[i].subreddit =
              'r/' + this.rawResponse.data[i].subreddit;
            this.comments[i].subredditUrl =
              'https://reddit.com/r/' + this.rawResponse.data[i].subreddit;
          }
          console.log(this.comments.length);
        }
        this.responseRecieved = true;
      },
      (err) => {
        console.log(err);
        this.messageService.add({severity:'error', summary: "Unkown Error Occurred", detail: "Please try again later"});
      });
  }
}
