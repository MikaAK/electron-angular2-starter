import {HTTP_BINDINGS} from 'angular2/http'
import {Component, View} from 'angular2/angular2'
import {RouterOutlet, RouteConfig} from 'angular2/router'
import {Home} from './components/home/home'

@RouteConfig([
  { path: '/', component: Home }
])
@Component({
  selector: 'app',
  bindings: [HTTP_BINDINGS]
})
@View({
  directives: [RouterOutlet],
  template: `
    <header>
      <h1>Hi</h1>
    </header>
    <main>
      <router-outlet></router-outlet>
    </main>
  `
})
export class App {
  constructor() {
  
  }
}
