var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") return Reflect.decorate(decorators, target, key, desc);
    switch (arguments.length) {
        case 2: return decorators.reduceRight(function(o, d) { return (d && d(o)) || o; }, target);
        case 3: return decorators.reduceRight(function(o, d) { return (d && d(target, key)), void 0; }, void 0);
        case 4: return decorators.reduceRight(function(o, d) { return (d && d(target, key, o)) || o; }, desc);
    }
};
var http_1 = require('angular2/http');
var angular2_1 = require('angular2/angular2');
var router_1 = require('angular2/router');
var home_1 = require('./components/home/home');
var App = (function () {
    function App() {
    }
    App = __decorate([
        router_1.RouteConfig([
            { path: '/', component: home_1.Home }
        ]),
        angular2_1.Component({
            selector: 'app',
            bindings: [http_1.HTTP_BINDINGS]
        }),
        angular2_1.View({
            directives: [router_1.RouterOutlet],
            template: "\n    <header>\n      <h1>Hi</h1>\n    </header>\n    <main>\n      <router-outlet></router-outlet>\n    </main>\n  "
        })
    ], App);
    return App;
})();
exports.App = App;
