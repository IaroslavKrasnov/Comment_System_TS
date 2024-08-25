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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { getElements, _ } from './utils.js';
import { CommentForm } from './commentForm.js';
var Elements;
(function (Elements) {
    Elements["avatar"] = "avatar";
    Elements["name"] = "name";
    Elements["parent"] = "parent";
    Elements["parentName"] = "parentName";
    Elements["date"] = "date";
    Elements["comment"] = "comment";
    Elements["favorite"] = "favorite";
    Elements["rating"] = "rating";
    Elements["reply"] = "reply";
    Elements["replies"] = "replies";
    Elements["decrement"] = "decrement";
    Elements["increment"] = "increment";
    Elements["commentForm"] = "commentForm";
})(Elements || (Elements = {}));
var Comment = /** @class */ (function () {
    function Comment(comment, uuid, updateComments, patchCommentData, showFavoriteComments) {
        var _this = this;
        this._elements = {};
        this._sampleComment = "\n    <div class=\"comment_container\">\n      <img alt=\"commenter avatar\" class=\"avatar\" data-element=\"".concat(Elements.avatar, "\"/>\n      <div class=\"comment_inner\">\n        <div class=\"comment_info\">\n          <p data-element=\"").concat(Elements.name, "\"></p>\n          <div class=\"parent\" data-element=\"").concat(Elements.parent, "\">\n            <img class=\"parent_icon\" src=\"./images/arrow_reply.svg\" alt=\"arrow answer\"/>\n            <p data-element=\"").concat(Elements.parentName, "\"></p>\n          </div>\n          <p data-element=\"").concat(Elements.date, "\"></p>\n        </div>\n        <p data-element=\"").concat(Elements.comment, "\"></p>\n        <div class=\"comment_panel\">\n          <button class=\"reply_btn\" data-element=\"").concat(Elements.reply, "\">\n            <img src=\"./images/arrow_reply.svg\" alt=\"arrow reply\"/> \u041E\u0442\u0432\u0435\u0442\u0438\u0442\u044C\n          </button>\n          <button class=\"favorite_btn\" data-element=\"").concat(Elements.favorite, "\"></button>\n          <div class=\"vote_system\">\n            <div class=\"vote_btn\" data-element=\"").concat(Elements.decrement, "\">\n              <img src=\"./images/minus.svg\" alt=\"icon minus\" class=\"icon_minus\"/>\n            </div>\n            <p data-element=\"").concat(Elements.rating, "\"></p>\n            <div class=\"vote_btn\" data-element=\"").concat(Elements.increment, "\">\n              <img src=\"./images/plus.svg\" alt=\"icon plus\" class=\"icon_plus\"/>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  ");
        this.renderReplies = function () {
            var replies = _this._elements[Elements.replies];
            _this._repliesData.forEach(function (reply) {
                var existingElement = replies.querySelector("[data-uuid=\"".concat(reply.uuid, "\"]"));
                if (!existingElement) {
                    var element = document.createElement('div');
                    element.dataset.uuid = reply.uuid;
                    replies.appendChild(element);
                    new Comment(element, reply.uuid, _this._updateComments, _this._patchCommentData, _this._showFavoriteComments);
                }
            });
        };
        this.onReply = function () {
            if (!_this._elements[Elements.replies]) {
                _this._comment.insertAdjacentHTML('beforeend', "<div class=\"replies\" data-element=\"replies\"></div>");
                _this._elements[Elements.replies] = _this._comment.querySelector("[data-element=\"".concat(Elements.replies, "\"]"));
            }
            var replies = _this._elements[Elements.replies];
            var existingForm = null;
            if (!existingForm) {
                replies.insertAdjacentHTML('afterbegin', "<div class=\"comment_form\" data-element=\"".concat(Elements.commentForm, "\"></div>"));
                getElements(_this._comment, _this._elements);
                var formReply = _this._elements[Elements.commentForm];
                new CommentForm(formReply, _this.updateReplies, _, _this._newComment);
            }
        };
        this.onDecrement = function () {
            if (_this._newComment.decrement && !_this._newComment.increment) {
                _this._newComment.rating--;
                _this._newComment.increment = true;
            }
            else if (_this._newComment.decrement) {
                _this._newComment.rating--;
                _this._newComment.decrement = false;
            }
            _this._patchCommentData(_this._newComment);
            _this._updateComments();
        };
        this.onIncrement = function () {
            if (!_this._newComment.decrement && _this._newComment.increment) {
                _this._newComment.rating++;
                _this._newComment.decrement = true;
            }
            else if (_this._newComment.increment) {
                _this._newComment.rating++;
                _this._newComment.increment = false;
            }
            _this._patchCommentData(_this._newComment);
            _this._updateComments();
        };
        this.onFavorite = function () {
            _this._newComment.favorite = !_this._newComment.favorite;
            _this.updateFavoriteButton();
            var favorites = JSON.parse(localStorage.getItem('favorite')).filter(function (comment) { return comment.uuid !== _this._newComment.uuid; });
            if (_this._newComment.favorite) {
                favorites.push(_this._newComment);
            }
            localStorage.setItem('favorite', JSON.stringify(favorites));
            _this._patchCommentData(_this._newComment);
            _this._showFavoriteComments();
        };
        this.updateReplies = function () {
            var storageComms = __spreadArray([], __read(JSON.parse(localStorage.getItem('comments'))), false);
            _this._repliesData = storageComms.filter(function (item) { return item.parent === _this._newComment.uuid; });
            _this._elements[Elements.commentForm].remove();
            _this.renderReplies();
            _this._updateComments();
        };
        this._comment = comment;
        var storageComms = __spreadArray([], __read(JSON.parse(localStorage.getItem('comments'))), false);
        this._newComment = storageComms.find(function (item) { return item.uuid === uuid; });
        this._repliesData = storageComms.filter(function (item) { return item.parent === _this._newComment.uuid; });
        this._updateComments = updateComments;
        this._showFavoriteComments = showFavoriteComments;
        this._patchCommentData = patchCommentData;
        this.introduce();
    }
    Comment.prototype.introduce = function () {
        this._comment.innerHTML = this._sampleComment;
        getElements(this._comment, this._elements);
        this.configureComment();
        this.addListeners();
        if (this._repliesData.length) {
            this._comment.insertAdjacentHTML('beforeend', "<div class=\"replies\" data-element=\"".concat(Elements.replies, "\"></div>"));
            this._elements[Elements.replies] = this._comment.querySelector("[data-element=".concat(Elements.replies, "]"));
            this.renderReplies();
        }
    };
    Comment.prototype.configureComment = function () {
        var _this = this;
        var avatar = this._elements[Elements.avatar];
        var name = this._elements[Elements.name];
        var comment = this._elements[Elements.comment];
        var date = this._elements[Elements.date];
        var rating = this._elements[Elements.rating];
        var parent = this._elements[Elements.parent];
        var parentName = this._elements[Elements.parentName];
        var reply = this._elements[Elements.reply];
        var isParent = this._newComment.parent;
        avatar.setAttribute('src', this._newComment.avatar);
        name.innerHTML = this._newComment.name;
        comment.innerHTML = this._newComment.comment;
        date.innerHTML = new Date(this._newComment.date)
            .toLocaleString('ru-Ru', {
            day: '2-digit',
            month: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
        })
            .replace(',', ' ');
        this.updateFavoriteButton();
        rating.innerHTML = "".concat(this._newComment.rating);
        if (this._newComment.rating < 0) {
            rating.classList.add('negative_rating');
        }
        else {
            rating.classList.add('positive_rating');
        }
        if (!isParent) {
            parent === null || parent === void 0 ? void 0 : parent.remove();
            delete this._elements[Elements.parent];
        }
        else {
            var parentData = __spreadArray([], __read(JSON.parse(localStorage.getItem('comments'))), false).find(function (item) { return item.uuid === _this._newComment.parent; });
            if (parentData) {
                parentName.innerHTML = parentData.name;
                reply === null || reply === void 0 ? void 0 : reply.remove();
            }
        }
    };
    Comment.prototype.addListeners = function () {
        var reply = this._elements[Elements.reply];
        var decrement = this._elements[Elements.decrement];
        var increment = this._elements[Elements.increment];
        var favorite = this._elements[Elements.favorite];
        reply.addEventListener('click', this.onReply);
        decrement.addEventListener('click', this.onDecrement);
        increment.addEventListener('click', this.onIncrement);
        favorite.addEventListener('click', this.onFavorite);
    };
    Comment.prototype.updateFavoriteButton = function () {
        var favoriteButton = this._elements[Elements.favorite];
        favoriteButton.innerHTML = this._newComment.favorite
            ? "<img src=\"./images/completed_heart.svg\" alt=\"completed heart\"/> \u0412 \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u043C"
            : "<img src=\"./images/empty_heart.svg\" alt=\"empty heart\"/> \u0412 \u0438\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435";
    };
    return Comment;
}());
export { Comment };
