import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';

import { ServersService } from '../servers.service';
import {CanDeactivateComponent} from "./can-deactivate-guard.service";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanDeactivateComponent {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  queryParams;
  allowEdit = false;
  onChanges = false;

  constructor(private serversService: ServersService,
              private actRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    console.log(this.actRoute.snapshot.queryParams);
    console.log(this.actRoute.snapshot.fragment);
    this.actRoute.queryParams.subscribe(
      (params) => {
        this.allowEdit = params['allowEdit'] === '1' ? true : false;
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
    this.onChanges = true;
    this.router.navigate(['../'], {relativeTo: this.actRoute});
  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
    if (!this.allowEdit) {
      return true;
    }

    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.onChanges) {
      return confirm('Do you really want to discard changes?');
    } else {
      return true;
    }
  }

}
