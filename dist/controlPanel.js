import { getElements } from './utils.js';
var Elements;
(function (Elements) {
    Elements["commentsFilter"] = "commentsFilter";
    Elements["counter"] = "counter";
    Elements["selectButton"] = "selectButton";
    Elements["selectDropdown"] = "selectDropdown";
    Elements["favoriteFilter"] = "favoriteFilter";
})(Elements || (Elements = {}));
var ControlPanel = /** @class */ (function () {
    function ControlPanel(controlPanel, updateComments, showFavoriteComments) {
        var _this = this;
        this._elements = {};
        this._selectData = [
            { key: 'date', value: 'По дате' },
            { key: 'rating', value: 'По количеству оценок' },
            { key: 'relevance', value: 'По актуальности' },
            { key: 'replies', value: 'По количеству ответов' },
        ];
        this._sampleControlPanel = "\n    <button class=\"comments_btn active\" data-element=\"".concat(Elements.commentsFilter, "\">\n      \u041A\u043E\u043C\u043C\u0435\u043D\u0442\u0430\u0440\u0438\u0438 <span data-element=\"").concat(Elements.counter, "\"></span>\n    </button>\n    <div class=\"btn_wrapper\">\n      <div class=\"select\">\n        <button class=\"select_btn\" data-element=\"").concat(Elements.selectButton, "\">\n          <span>\u041F\u043E \u0430\u043A\u0442\u0443\u0430\u043B\u044C\u043D\u043E\u0441\u0442\u0438</span> <img src=\"./images/arrow_up.svg\" alt=\"arrow up\"/>\n        </button>\n        <ul class=\"select_dropdown hide\"\n        data-element=\"").concat(Elements.selectDropdown, "\">\n          ").concat(this._selectData
            .map(function (item) {
            return "<li value=\"".concat(item.key, "\"><img src=\"./images/checkbox.svg\" alt=\"checkbox\"/> ").concat(item.value, "</li>");
        })
            .join(''), "\n        </ul>\n      </div>\n      <button class=\"favorite_btn\" data-element=\"").concat(Elements.favoriteFilter, "\">\n        <span>\u0418\u0437\u0431\u0440\u0430\u043D\u043D\u043E\u0435</span> <img src=\"./images/favorite_heart.svg\" alt=\"favorite heart\"/>\n      </button>\n    </div>\n  ");
        this.onSelectButton = function () {
            var button = _this._elements[Elements.selectButton];
            var icon = button.lastElementChild;
            var dropdown = _this._elements[Elements.selectDropdown];
            icon.classList.toggle('rotate');
            dropdown.classList.toggle('hide');
        };
        this.onSelectDropdown = function (event) {
            var button = _this._elements[Elements.selectButton];
            var dropdown = _this._elements[Elements.selectDropdown];
            if (event.target instanceof HTMLElement) {
                var listItem = event.target.closest('li');
                if (listItem) {
                    var favoriteFilter = _this._elements[Elements.favoriteFilter];
                    var commentsFilter = _this._elements[Elements.commentsFilter];
                    commentsFilter.classList.add('active');
                    favoriteFilter.classList.remove('active');
                    var sortType_1 = listItem.getAttribute('value');
                    var sortTypeLabel = _this._selectData.find(function (item) { return item.key === sortType_1; });
                    localStorage.setItem('sort', sortType_1);
                    button.innerHTML = "<span>".concat(sortTypeLabel === null || sortTypeLabel === void 0 ? void 0 : sortTypeLabel.value, "</span> <img src=\"./images/arrow_up.svg\" alt=\"arrow up\"/>");
                    var ListItems = dropdown.querySelectorAll('li');
                    ListItems.forEach(function (item) {
                        var checkMark = item.querySelector('img');
                        checkMark.style.visibility = 'hidden';
                    });
                    var checkMark = listItem.querySelector('img');
                    checkMark.style.visibility = 'visible';
                }
            }
            dropdown.classList.toggle('hide');
            _this._updateComments();
        };
        this._controlPanel = controlPanel;
        this._updateComments = updateComments;
        this._showFavoriteComments = showFavoriteComments;
        this.introduce();
    }
    ControlPanel.prototype.introduce = function () {
        this._controlPanel.innerHTML = this._sampleControlPanel;
        getElements(this._controlPanel, this._elements);
        this.updateCounter();
        this.addListeners();
        var defaultSort = localStorage.getItem('sort');
        var defaultListItem = this._elements[Elements.selectDropdown].querySelector("li[value=\"".concat(defaultSort, "\"] img"));
        if (defaultListItem) {
            defaultListItem.style.visibility = 'visible';
        }
    };
    ControlPanel.prototype.updateCounter = function () {
        var counter = this._elements[Elements.counter];
        var commentsCounter = JSON.parse(localStorage.getItem('comments')).filter(function (item) { return !item.parent; }).length;
        counter.innerHTML = "(".concat(commentsCounter, ")");
    };
    ControlPanel.prototype.addListeners = function () {
        var _this = this;
        var selectButton = this._elements[Elements.selectButton];
        var selectDropdown = this._elements[Elements.selectDropdown];
        var favoriteFilter = this._elements[Elements.favoriteFilter];
        var commentsFilter = this._elements[Elements.commentsFilter];
        selectButton.addEventListener('click', this.onSelectButton);
        selectDropdown.addEventListener('click', this.onSelectDropdown);
        favoriteFilter.addEventListener('click', function () {
            favoriteFilter.classList.add('active');
            commentsFilter.classList.remove('active');
            localStorage.setItem('favoriteState', 'true');
            _this._showFavoriteComments();
        });
        commentsFilter.addEventListener('click', function () {
            commentsFilter.classList.add('active');
            favoriteFilter.classList.remove('active');
            _this._updateComments();
        });
    };
    return ControlPanel;
}());
export { ControlPanel };
