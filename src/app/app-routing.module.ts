import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserComponent } from './users/user/user.component';
import { UsersComponent } from './users/users.component';
import { EditServerComponent } from './servers/edit-server/edit-server.component';
import { ServerComponent } from './servers/server/server.component';
import { ServersComponent } from './servers/servers.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './auth-guard.service';
import { CanDeactivateGuard } from './servers/edit-server/can-deactivate-guard.service';
import { ServerResolver } from './servers/server/server-resolve.service';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'servers', canActivateChild: [AuthGuard], component: ServersComponent, children:
    [
      { path: ':id', component: ServerComponent, resolve: {server: ServerResolver} },
      { path: ':id/edit', component: EditServerComponent, canDeactivate: [CanDeactivateGuard] }
    ]
  },
  { path: 'users', component: UsersComponent, children:
    [
      { path: ':id/:name', component: UserComponent }
    ]
  },
  { path: '**', component: PageNotFoundComponent, data: {message: 'Page Not Found'}}
];

@NgModule ({
  imports: [
    RouterModule.forRoot(appRoutes, {useHash: true})
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {

}
