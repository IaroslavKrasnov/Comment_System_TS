import { getElements } from './utils.js';
import { CommentBlock } from './commentBlock.js';
var Elements;
(function (Elements) {
    Elements["commentsBlock"] = "commentsBlock";
})(Elements || (Elements = {}));
var Main = /** @class */ (function () {
    function Main(basis) {
        this._sections = {};
        this._sample = "\n        <section class=\"commentsBlock\" data-element=\"commentsBlock\"></section>\n      </div>\n    </main>\n  ";
        this._basis = basis;
    }
    Main.prototype.introduce = function () {
        this._basis.innerHTML = this._sample;
        getElements(this._basis, this._sections);
        new CommentBlock(this._sections[Elements.commentsBlock]);
    };
    return Main;
}());
export { Main };
