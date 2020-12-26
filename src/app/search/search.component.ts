import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


interface Endpoint {
  name: string,
  urlSegment: string
}

interface Filter {
  name: string,
  code: string
}


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})


export class SearchComponent implements OnInit {

  endpoints: Endpoint[];

  selectedEndpoint: Endpoint;

  rawResponse: any;
  q:string;
  subreddits: any;
  subredditsFormatted: string = "";
  showSubredditTextBox = false;
  code: any;
  size: number = 25;
  languages: string[] = ["json"];
  filters: Filter[];
  selectedFilters: Filter[];

  constructor(private http: HttpClient, private changeDetectorRef: ChangeDetectorRef) {
    this.endpoints = [
      {name: 'Comments',urlSegment: 'comment'},
      {name: 'Submission', urlSegment: 'submission'},
      {name: 'Subreddit', urlSegment: 'subreddit'}
    ];
  }

  ngOnInit(): void {
    this.filters = [{
      name: "Before",
      code: "before"
    },
    {
      name: "After",
      code: "after"
    }];
    this.selectedEndpoint = this.endpoints[0];
  }

  endpointChange(event: any){
    // console.log(event);
    if(event.value.name == "Subreddit"){
      this.showSubredditTextBox = true;
    }
  }

  onHighlight(event){
    // console.log(event);
  }

  subredditOutOfFocus(e){
    // console.log(e);
  }

  filterDropdownChange(e){
    console.log(e);
  }

  submit(event: any){
    // console.log(event);
    // console.log(this.subreddits);
    var options;
    this.subredditsFormatted = "";
    if(this.subreddits){
      for(let i=0; i<this.subreddits.length; i++){
        if(this.subredditsFormatted == ""){
          this.subredditsFormatted = this.subreddits[i];
        }
        else{
          this.subredditsFormatted = this.subredditsFormatted + "," + this.subreddits[i];
        }
      }
      // console.log(this.subredditsFormatted);
      options = {
        params: {
          subreddit: this.subredditsFormatted,
          q: this.q,
          size: this.size
        },
      }
    }
    else{
      options = {
        params: {
          q: this.q,
          size: this.size
        },
      }
    }
    this.http.get("https://api.pushshift.io/reddit/"+this.selectedEndpoint.urlSegment+"/search", options).subscribe(res => {
      // console.log(res);
      this.rawResponse = res;
      this.code = JSON.stringify(this.rawResponse, null, 2);
    });
  }

}
