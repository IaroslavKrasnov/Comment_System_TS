import { Main } from './main.js';
var App = /** @class */ (function () {
    function App() {
        this.basis = document.getElementById('app');
        this.main = new Main(this.basis);
        this.introduce();
    }
    App.prototype.introduce = function () {
        this.main.introduce();
    };
    return App;
}());
new App();
