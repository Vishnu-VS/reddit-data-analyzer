import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';


interface Endpoint {
  name: string,
  urlSegment: string
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
  languages: string[] = ["json"];

  constructor(private http: HttpClient) {
    this.endpoints = [
      {name: 'Comments',urlSegment: 'comment'},
      {name: 'Submission', urlSegment: 'submission'},
      {name: 'Subreddit', urlSegment: 'subreddit'}
    ];

  }

  ngOnInit(): void {
    this.selectedEndpoint = this.endpoints[0];
  }

  endpointChange(event: any){
    console.log(event);
    if(event.value.name == "Subreddit"){
      this.showSubredditTextBox = true;
    }
  }

  onHighlight(event){
    console.log(event);
  }

  submit(event: any){
    console.log(event);
    console.log(this.subreddits);
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
      console.log(this.subredditsFormatted);
      var options = {
        params: {
          subreddit: this.subredditsFormatted,
          q: this.q
        },
      }
    }
    this.http.get("https://api.pushshift.io/reddit/"+this.selectedEndpoint.urlSegment+"/search", options).subscribe(res => {
      console.log(res);
      this.rawResponse = res;
      this.code = JSON.stringify(this.rawResponse, null, 2);
    });
  }

}
