import { Component, OnInit } from '@angular/core';


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

  constructor() {
    this.endpoints = [
      {name: 'Comments',urlSegment: 'comment'},
      {name: 'Submission', urlSegment: 'submission'},
      {name: 'Subreddit', urlSegment: 'subreddit'}
  ];
  }





  ngOnInit(): void {

  }

}
