import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
              private router: Router,
              private actRoute: ActivatedRoute) { }

  ngOnInit() {
    this.actRoute.params.subscribe(
      (params: Params) => {
        //+ converts the id to a number
        this.server = this.serversService.getServer(+params['id']);
      }
    );
  }

  ediServer() {
    //Absolute path
    // this.router.navigate(['/servers', this.server.id, 'edit']);
    //Realative path to the path you are on
    this.router.navigate(['edit'], {relativeTo: this.actRoute});
  }

}
