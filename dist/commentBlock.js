import { getElements } from './utils.js';
import { ControlPanel } from './controlPanel.js';
import { CommentForm } from './commentForm.js';
import { Comments } from './comments.js';
var Elements;
(function (Elements) {
    Elements["controlPanel"] = "controlPanel";
    Elements["commentForm"] = "commentForm";
    Elements["comments"] = "comments";
})(Elements || (Elements = {}));
var CommentBlock = /** @class */ (function () {
    function CommentBlock(commentBlock) {
        var _this = this;
        this._elements = {};
        this._sampleCommentBlock = "\n    <div class=\"control_panel\" data-element=\"".concat(Elements.controlPanel, "\"></div>\n    <div class=\"comment_form\" data-element=\"").concat(Elements.commentForm, "\"></div>\n    <div data-element=\"").concat(Elements.comments, "\"></div>\n  ");
        this.updateCounter = function () {
            _this._controlPanel.updateCounter();
        };
        this.updateComments = function () {
            _this._comments.updateComments();
        };
        this.showFavoriteComments = function () {
            _this._comments.showFavoriteComments();
        };
        this._commentBlock = commentBlock;
        this.introduce();
    }
    CommentBlock.prototype.introduce = function () {
        this._commentBlock.innerHTML = this._sampleCommentBlock;
        getElements(this._commentBlock, this._elements);
        if (!localStorage.getItem('comments'))
            localStorage.setItem('comments', '[]');
        localStorage.setItem('sort', 'relevance');
        if (!localStorage.getItem('favorite'))
            localStorage.setItem('favorite', '[]');
        localStorage.setItem('favoriteState', 'false');
        this._controlPanel = new ControlPanel(this._elements[Elements.controlPanel], this.updateComments, this.showFavoriteComments);
        new CommentForm(this._elements[Elements.commentForm], this.updateComments, this.updateCounter);
        this._comments = new Comments(this._elements[Elements.comments]);
    };
    return CommentBlock;
}());
export { CommentBlock };
