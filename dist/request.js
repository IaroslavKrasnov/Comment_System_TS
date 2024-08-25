export var userRequestUrl = 'https://randomuser.me/api/?inc=name,login,picture&noinfo&nat=us';
export var getUser = function () {
    return axios
        .get(userRequestUrl)
        .then(function (_a) {
        var data = _a.data;
        var _b = data.results[0], name = _b.name, login = _b.login, picture = _b.picture;
        var first = name.first, last = name.last;
        return {
            name: "".concat(first, " ").concat(last),
            uuid: login.uuid,
            avatar: picture.medium,
        };
    });
};
