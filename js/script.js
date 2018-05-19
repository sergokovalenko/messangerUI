var APP = APP || {};
APP.createNamespace = function (path) {
    var parts = path.split('.'),
        parent = APP,
        i = 0;

    if (parts[i] === 'APP') {
        parts = parts.slice(1);
    }

    for (i = 0; i < parts.length; i += 1) {
        if (typeof parent[parts[i]] === "undefined") {
            parent[parts[i]] = {};
        }

        parent = parent[parts[i]];
    }

    return parent;
}

APP.createNamespace('APP.models.buttons');
APP.createNamespace('APP.models.fields');
APP.createNamespace('APP.models.entities');
APP.createNamespace('APP.models.identeties');
APP.createNamespace('APP.utilities.actions');
APP.createNamespace('APP.utilities.ajax');

APP.models.entities = {
    dialogs: [{ id: 1, url: "img/profiles/my.jpg", name: "ivan", surname: "ivanov", lastMessage: "last msg", date: "9:05PM", unreaded: 5 },
    { id: 2, url: "img/profiles/my.jpg", name: "vova", surname: "ivanov", lastMessage: "last msg", date: "Yestarday", unreaded: 5 },
    { id: 3, url: "img/profiles/my.jpg", name: "vasya", surname: "ivanov", lastMessage: "last mess", date: "9:00 PM", unreaded: 5 },
    { id: 4, url: "img/profiles/my.jpg", name: "petya", surname: "ivanov", lastMessage: "last ", date: "5:05 PM", unreaded: 5 },],
    profiles: [{ id: 1, login: "boss", url: "img/profiles/my.jpg", name: "ivan", surname: "ivanov", regDate: "5/19/2018", status: "Offline", email: "mail1@google.com" },
    { id: 2, login: "hero", url: "img/profiles/my.jpg", name: "vova", surname: "ivanov", regDate: "5/15/2018", status: "Online", email: "mail2@google.com" },
    { id: 3, login: "MeetBoss", url: "img/profiles/my.jpg", name: "vasya", surname: "ivanov", regDate: "5/12/2018", status: "Online", email: "mail3@google.com" },
    { id: 4, login: "IAmHacker", url: "img/profiles/my.jpg", name: "petya", surname: "ivanov", regDate: "5/18/2018", status: "Online", email: "mail4@google.com" }]
}

APP.models.buttons = {
    $btnSettings: $('.settings-btn'),
    $btnSearch: $('.search-btn'),
    $btnCreateConvers: $('.create-conversation'),
    $btnSendMess: $('#send-message'),
    $btnSendPict: $('#send-picture'),
    $btnRusLang: $('.dropdown-menu li:nth-child(1)'),
    $btnRusLang: $('.dropdown-menu li:nth-child(2)'),
};

APP.models.fields = {
    $sendField: $('.send-field'),
    $searchField: $('.search-field input'),
};

APP.utilities.actions = (function () {
    var dialogs = APP.models.entities.dialogs,
        profiles = APP.models.entities.profiles;

    function showDialogs() {
        var $form = $('.jspPane:eq(0)'),
            $names = {},
            html = '',
            elem = {};

        //получение диалогов из ajax
        $.ajax({
            url: "GetDialogs",
            success: function (request) {
                var res = JSON.parse(request);
                dialogs = res;
                //дальнейшая работа
            },
            error: function (e) {
                console.log(e);
            }
        });

        //работа с данными
        for (let i = 0; i < dialogs.length; i++) {
            elem = dialogs[i];

            html += '<div class="dialog"><img class="profile-photo" src="' + elem.url + '" alt="user">' +
                '<a class="dial-name">' + elem.name + ' ' + elem.surname + '</a>' +
                '<span class="last-message-time">' + elem.date + '</span>' +
                '<div class="short-message">' + elem.lastMessage + '</div>' +
                '<span class="badge">'+elem.unreaded+'</span></div>';
        }

        $form.html(html);;

        $names = $('.dial-name');

        for (let i = 0; i < $names.length; i++) {
            $names[i].current = i;
            $names[i].onclick = showModal;
        }
    }

    function showModal() {
        var html = "", i = this.current,
            $modalBody = $('.modal-body'),
            $modalFooter = $('.modal-footer');

        $.ajax({
            url: "GetProfileInfo",
            data: JSON.stringify(i),
            success: function (request) {
                var res = JSON.parse(request);
                //дальнейшая работа
            },
            error: function (e) {
                console.log(e);
            }
        });

        html = '<div class="row"><div class="col-xs-5"><img class="profile-img" src="img/profiles/my.jpg" alt="user photo"></div>' +
            '<div class="col-xs-7"><div class="name text-center">' + profiles[i].name + ' ' + profiles[i].surname + '</div>' +
            '<div class="status text-center" >' + profiles[i].status + '</div>' +
            '<button type="button" class="btn btn-default btn-write" data-dismiss="modal">Write</button></div></div></div>';

        $modalBody.html(html);

        html = '<div class="row"><div class="col-xs-5"><h4 class="profile-info text-right">E-mail:</h4>' +
            '<h4 class="profile-info text-right">Login:</h4><h4 class="profile-info text-right">Registration:</h4></div>' +
            '<div class="col-xs-7"><h4 class="profile-info text-left">' + profiles[i].email + '</h4>' +
            '<h4 class="profile-info text-left">' + profiles[i].login + '</h4>' +
            '<h4 class="profile-info text-left">' + profiles[i].regDate + '</h4 ></div ></div >';

        $modalFooter.html(html);

        $('#Modal').modal('show');
    }

    function initializeScroll() {
        var scrollPane = $('.scroll-pane');
        scrollPane.jScrollPane({
            maintainPosition: true,
            stickToBottom: true,
            contentWidth: 200
        });

        scrollPane.data("jsp").scrollTo(0, 1000);

        window.onresize = function () {
            $('.scroll-pane').jScrollPane({
                maintainPosition: true,
                stickToBottom: true
            });
        }
    }

    return {
        showDialogs: showDialogs,
        initializeScroll: initializeScroll,
    }
})();


$("document").ready(function () {
    var actions = APP.utilities.actions;

    actions.initializeScroll();
    actions.showDialogs();
});