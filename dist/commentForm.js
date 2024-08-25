var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { getElements } from './utils.js';
import { getUser } from './request.js';
var Elements;
(function (Elements) {
    Elements["avatar"] = "avatar";
    Elements["name"] = "name";
    Elements["charCount"] = "charCount";
    Elements["error"] = "error";
    Elements["form"] = "form";
    Elements["textArea"] = "textArea";
    Elements["buttonSend"] = "buttonSend";
    Elements["buttonCancel"] = "buttonCancel";
})(Elements || (Elements = {}));
var CommentForm = /** @class */ (function () {
    function CommentForm(commentForm, updateComments, updateCounter, parent) {
        var _this = this;
        if (parent === void 0) { parent = null; }
        this._elements = {};
        this._sampleCommentForm = "\n    <form action=\"/\" class=\"form\" data-element=\"".concat(Elements.form, "\">\n      <div class=\"user_wrapper\">\n        <img alt=\"commenter avatar\" data-element=\"").concat(Elements.avatar, "\"/>\n        <p data-element=\"").concat(Elements.name, "\"></p>\n      </div>\n      <div class=\"textarea_wrapper\">\n        <textarea class=\"textarea\" placeholder=\"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0442\u0435\u043A\u0441\u0442 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u044F...\" data-element=\"").concat(Elements.textArea, "\"></textarea>\n        <div class=\"validation_wrapper\">\n          <p data-element=\"").concat(Elements.charCount, "\">\u041C\u0430\u043A\u0441. 1000 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432</p>\n          <p data-element=\"").concat(Elements.error, "\">\u0421\u043B\u0438\u0448\u043A\u043E\u043C \u0434\u043B\u0438\u043D\u043D\u043E\u0435 \u0441\u043E\u043E\u0431\u0449\u0435\u043D\u0438\u0435</p>\n        </div>\n      </div>\n      <div class=\"form_btn_wrapper\">\n        <button class=\"form_btn\" type=\"submit\" disabled data-element=\"").concat(Elements.buttonSend, "\">\u041E\u0442\u043F\u0440\u0430\u0432\u0438\u0442\u044C</button>\n        <button class=\"form_btn\" data-element=\"").concat(Elements.buttonCancel, "\">\u041E\u0442\u043C\u0435\u043D\u0430</button>\n      </div>\n    </form>\n  ");
        this.onSubmit = function (event, textArea) {
            var _a;
            event.preventDefault();
            if (!textArea.value)
                return;
            var comments = JSON.parse(localStorage.getItem('comments'));
            var data = __assign(__assign({}, _this._user), { comment: textArea.value, date: new Date(), favorite: false, rating: Math.floor(Math.random() * 201 - 100), increment: true, decrement: true, parent: (_a = _this._parent) === null || _a === void 0 ? void 0 : _a.uuid });
            comments.push(data);
            localStorage.setItem('comments', JSON.stringify(comments));
            textArea.value = '';
            _this._updateCounter();
            _this._updateComments();
            _this.introduce();
        };
        this.onCancel = function () {
            _this._commentForm.remove();
        };
        this._commentForm = commentForm;
        this._parent = parent;
        this._updateComments = updateComments;
        this._updateCounter = updateCounter;
        this.introduce();
    }
    CommentForm.prototype.introduce = function () {
        var _this = this;
        this._commentForm.innerHTML = this._sampleCommentForm;
        getElements(this._commentForm, this._elements);
        if (!this._parent) {
            this._elements[Elements.buttonCancel].remove();
            delete this._elements[Elements.buttonCancel];
        }
        getUser()
            .then(function (user) { return (_this._user = user); })
            .then(function () { return _this.updateUser(); });
        this.addListeners();
    };
    CommentForm.prototype.addListeners = function () {
        var _this = this;
        var form = this._elements[Elements.form];
        var textArea = this._elements[Elements.textArea];
        var cancelBtn = this._elements[Elements.buttonCancel];
        form.addEventListener('submit', function (event) { return _this.onSubmit(event, textArea); });
        cancelBtn === null || cancelBtn === void 0 ? void 0 : cancelBtn.addEventListener('click', this.onCancel);
        textArea.addEventListener('input', function () { return _this.autoResizeTextArea(textArea); });
    };
    CommentForm.prototype.autoResizeTextArea = function (textArea) {
        var countLineBreaks = textArea.value.match(/\n/g);
        textArea.style.height = 'auto';
        textArea.style.height = "".concat(textArea.scrollHeight, "px");
        if (textArea.scrollHeight >= 400) {
            textArea.style.overflow = 'visible';
        }
        if (countLineBreaks) {
            textArea.rows = countLineBreaks.length + 1;
        }
        else if (textArea.value.length <= 36 && !countLineBreaks) {
            textArea.rows = 1;
            textArea.style.height = '65px';
        }
        this.formSymbolValidation(textArea);
    };
    CommentForm.prototype.formSymbolValidation = function (textArea) {
        var charCountElement = this._elements.charCount;
        var errorElement = this._elements.error;
        var buttonElement = this._elements.buttonSend;
        this._charCount = textArea.value.length;
        this._charCount && this._charCount <= 1000
            ? (buttonElement.disabled = false)
            : (buttonElement.disabled = true);
        if (this._charCount || this._charCount === 0)
            charCountElement.innerText = "".concat(this._charCount, "/1000");
        this._charCount > 1000
            ? ((charCountElement.style.color = 'rgba(255, 0, 0)'),
                (charCountElement.style.opacity = '1'),
                (errorElement.style.visibility = 'visible'))
            : ((charCountElement.style.color = 'rgba(0, 0, 0'),
                (charCountElement.style.opacity = '0.4'),
                (errorElement.style.visibility = 'hidden'));
    };
    CommentForm.prototype.updateUser = function () {
        this._elements[Elements.avatar].setAttribute('src', this._user.avatar);
        this._elements[Elements.name].innerHTML = this._user.name;
    };
    return CommentForm;
}());
export { CommentForm };
