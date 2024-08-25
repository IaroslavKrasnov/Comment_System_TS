var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
import { getElements, sortBy } from './utils.js';
import { Comment } from './comment.js';
var Comments = /** @class */ (function () {
    function Comments(comments) {
        var _this = this;
        this._elements = {};
        this.updateComments = function () {
            _this._commentContain = JSON.parse(localStorage.getItem('comments'));
            localStorage.setItem('favoriteState', 'false');
            _this.introduce();
        };
        this.showFavoriteComments = function () {
            var isFavoriteState = localStorage.getItem('favoriteState') === 'true';
            if (isFavoriteState) {
                var favoriteComments = JSON.parse(localStorage.getItem('favorite'));
                _this.renderComments(favoriteComments);
            }
            else {
                _this._commentContain = JSON.parse(localStorage.getItem('comments'));
            }
        };
        this.patchCommentData = function (data) {
            _this._commentContain = JSON.parse(localStorage.getItem('comments'));
            var patchedData = _this._commentContain.map(function (comment) {
                return comment.uuid === data.uuid ? data : comment;
            });
            localStorage.setItem('comments', JSON.stringify(patchedData));
        };
        this._comments = comments;
        this._commentContain = JSON.parse(localStorage.getItem('comments'));
        this.introduce();
    }
    Comments.prototype.introduce = function () {
        if (!this._commentContain)
            return;
        var parentComments = this._commentContain.filter(function (item) { return !item.parent; });
        this.renderComments(sortBy(parentComments));
        this.loadingAnimation();
    };
    Comments.prototype.loadingAnimation = function () {
        var _this = this;
        document.addEventListener('DOMContentLoaded', function () {
            return _this._comments.classList.add('load_animation');
        });
    };
    Comments.prototype.renderComments = function (comments) {
        var _this = this;
        this._comments.innerHTML = comments
            .map(function (comment) { return "<div data-element=\"".concat(comment.uuid, "\"></div>"); })
            .join('');
        getElements(this._comments, this._elements);
        Object.entries(this._elements).forEach(function (_a) {
            var _b = __read(_a, 2), id = _b[0], element = _b[1];
            new Comment(element, id, _this.updateComments, _this.patchCommentData, _this.showFavoriteComments);
        });
    };
    return Comments;
}());
export { Comments };
