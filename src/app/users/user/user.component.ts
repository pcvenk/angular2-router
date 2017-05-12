import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  user: {id: number, name: string};

  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.activeRoute);
    this.user = {
      id: this.activeRoute.snapshot.params['id'],
      name: this.activeRoute.snapshot.params['name']
    };

    //the params object is an observable, you subscribe to it and gets fired
    //only on change
    this.activeRoute.params.subscribe(
      (params) => {
        this.user.id = params['id'];
        this.user.name = params['name'];
      }
    );

  }

}
