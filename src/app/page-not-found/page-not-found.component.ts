import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  message: string;

  constructor(private actRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.actRoute);
    this.actRoute.data.subscribe(
      (data) => {
        this.message = data['message'];
      }
    );
  }


}
