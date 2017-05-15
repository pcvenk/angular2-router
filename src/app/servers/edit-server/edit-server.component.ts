import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  queryParams;
  allowEdit = false;

  constructor(private serversService: ServersService,
              private actRoute: ActivatedRoute) { }

  ngOnInit() {
    console.log(this.actRoute.snapshot.queryParams);
    console.log(this.actRoute.snapshot.fragment);
    this.actRoute.queryParams.subscribe(
      (params) => {
        this.allowEdit = params['allowEdit'] === '1'? true : false;
        console.log(this.queryParams);
      }
    );
    this.actRoute.fragment.subscribe();
    this.server = this.serversService.getServer(1);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
  }

}
