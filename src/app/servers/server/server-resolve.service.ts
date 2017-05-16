import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';

interface Server {
  id: string;
  name: string;
  status: string;
}

export class ServerResolver implements Resolve<Server> {
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Server> | Promise<Server> | Server  {

  };
}
