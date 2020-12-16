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

  constructor(private http: HttpClient) {
    this.endpoints = [
      {name: 'Comments',urlSegment: 'comment'},
      {name: 'Submission', urlSegment: 'submission'},
      {name: 'Subreddit', urlSegment: 'subreddit'}
    ];
    var options = {
      params: {
        subreddit: 'news',
        q: 'phone'
      },
    }
    this.http.get("https://api.pushshift.io/reddit/comment/search", options).subscribe(res => {
      console.log(res);
      this.rawResponse = JSON.stringify(res);
    });
  }

  ngOnInit(): void {

  }

}
