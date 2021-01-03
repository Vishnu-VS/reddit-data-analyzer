import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SearchService } from '../search-service.service';
import { Endpoint } from '../search/endpoint';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent implements OnInit {
  endpoints: Endpoint[];
  selectedEndpoint: Endpoint;
  q: String;

  constructor(private router: Router, private searchEvent: SearchService) {
    this.endpoints = [
      { name: 'Comments', urlSegment: 'comment' },
      { name: 'Submission', urlSegment: 'submission' },
      { name: 'Subreddit', urlSegment: 'subreddit' },
    ];
    this.selectedEndpoint = this.endpoints[1];
  }

  ngOnInit(): void {}

  endpointChange(event: any) {
    // console.log(event);
  }

  submit(event: any) {
    // this.router.navigate(['/search'], {
    //   queryParams: { endpoint: this.selectedEndpoint.urlSegment, q: this.q },
    // });
    if(this.q){
      this.sendMessage();
    }
  }

  sendMessage(): void {
    this.searchEvent.searchEvent.next({ endpoint: this.selectedEndpoint.urlSegment, q: this.q });
  }
}
