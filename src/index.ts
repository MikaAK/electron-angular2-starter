import {App} from './app'
import {bind, bootstrap} from 'angular2/angular2'
import {ROUTER_BINDINGS, HashLocationStrategy, LocationStrategy, ROUTER_PRIMARY_COMPONENT} from 'angular2/router'

bootstrap(App, [
    ROUTER_BINDINGS, 
    bind(ROUTER_PRIMARY_COMPONENT).toValue(App),
    bind(LocationStrategy).toClass(HashLocationStrategy)
])
