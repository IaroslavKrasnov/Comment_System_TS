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
export function getElements(basis, elements) {
    __spreadArray([], __read(basis.querySelectorAll('[data-element]')), false).forEach(function (element) {
        if (element instanceof HTMLElement) {
            elements[element.dataset.element] = element;
        }
    });
}
export var _ = function () { };
export function sortBy(comments) {
    var sortAttribute = localStorage.getItem('sort');
    switch (sortAttribute) {
        case 'date':
            return comments.sort(function (a, b) { return new Date(a.date).getTime() - new Date(b.date).getTime(); });
        case 'relevance':
            return comments.sort(function (a, b) { return new Date(b.date).getTime() - new Date(a.date).getTime(); });
        case 'rating':
            return comments.sort(function (a, b) { return b.rating - a.rating; });
        case 'replies':
            var storageComms_1 = __spreadArray([], __read(JSON.parse(localStorage.getItem('comments'))), false);
            var parentWithReplyCount = comments.map(function (comment) {
                var replyCount = storageComms_1.filter(function (item) { return item.parent === comment.uuid; }).length;
                return __assign(__assign({}, comment), { replyCount: replyCount });
            });
            return parentWithReplyCount.sort(function (a, b) { return b.replyCount - a.replyCount; });
    }
}
