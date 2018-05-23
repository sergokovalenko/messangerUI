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
    me: { id: 100, login: "BestGuy", url: "img/profiles/my.jpg", name: "Sergey", surname: "Kovalenko", regDate: "6/10/1998", status: "Online", email: "best@people.math" },
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
        profiles = APP.models.entities.profiles,
        me = APP.models.entities.me,
        buttons = APP.models.buttons;
    fields = APP.models.fields;

    function showDialogs() {
        var $form = $('.jspPane:eq(0)'),
            $names = {},
            $dialogs = {},
            html = '',
            i = 0,
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
        for (i = 0; i < dialogs.length; i++) {
            elem = dialogs[i];

            html += '<div class="dialog"><img class="profile-photo" src="' + elem.url + '" alt="user">' +
                '<a class="dial-name">' + elem.name + ' ' + elem.surname + '</a>' +
                '<span class="last-message-time">' + elem.date + '</span>' +
                '<div class="short-message">' + elem.lastMessage + '</div>' +
                '<span class="badge">' + elem.unreaded + '</span></div>';
        }

        $form.html(html);

        $names = $('.dial-name');
        $dialogs = $('.dialog');

        for (i = 0; i < $names.length; i++) {
            $dialogs[i].current = i;
            $dialogs[i].onclick = openDialog;

            $names[i].current = i;
            $names[i].onclick = function (e) {
                e.stopPropagation();
                showModal(dialogs[this.current].id);
            };
        }
    }

    function openDialog() {
        var data = { currentUserId: me.id, showId: dialogs[this.current].id }

        $.ajax({
            url: "GetMessage",
            data: JSON.stringify(data),
            success: function (request) {
                var res = JSON.parse(request);
                dialogs = res;
                //дальнейшая работа
            },
            error: function (e) {
                // console.log(e);
            }
        });

        $('.dialog').removeClass('activeted');
        $(this).addClass('activeted');

        alert('show dialog for id: ' + dialogs[this.current].id);
    }

    function showModal(id) {
        var html = "", i = id,
            user = {};
        $modalBody = $('.modal-body'),
            $modalFooter = $('.modal-footer');

        $.ajax({
            url: "GetProfileInfo",
            data: JSON.stringify(id),
            success: function (request) {
                var res = JSON.parse(request);
                //дальнейшая работа
            },
            error: function (e) {
                console.log(e);
            }
        });

        if (i != 100) {
            user = profiles[i];
        }
        else {
            user = me;
        }

        html = '<div class="row"><div class="col-xs-5"><img class="profile-img" src="img/profiles/my.jpg" alt="user photo"></div>' +
            '<div class="col-xs-7"><div class="name text-center">' + user.name + ' ' + user.surname + '</div>' +
            '<div class="status text-center" >' + user.status + '</div>' +
            '<button type="button" class="btn btn-default btn-write" data-dismiss="modal">Write</button></div></div></div>';

        $modalBody.html(html);

        html = '<div class="row"><div class="col-xs-5"><h4 class="profile-info text-right">E-mail:</h4>' +
            '<h4 class="profile-info text-right">Login:</h4><h4 class="profile-info text-right">Registration:</h4></div>' +
            '<div class="col-xs-7"><h4 class="profile-info text-left">' + user.email + '</h4>' +
            '<h4 class="profile-info text-left">' + user.login + '</h4>' +
            '<h4 class="profile-info text-left">' + user.regDate + '</h4 ></div ></div >';

        $modalFooter.html(html);

        $('.btn-write').on('click', openDialog);

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

    function initializeSearch() {
        fields.$searchField.on('blur', function () {
            var value = this.val();

            //получение данных на основании фильтра
            $.ajax({
                url: "GetDialogs",
                data: JSON.stringify(value),
                success: function (request) {
                    var res = JSON.parse(request);
                    //дальнейшая работа
                },
                error: function (e) {
                    console.log(e);
                }
            });
        });
    }

    function initialization() {
        buttons.$btnSearch.on('click', function () {
            fields.$searchField.focus();
            fields.$searchField.val("");
        });

        buttons.$btnSettings.on('click', function () {
            showModal(me.id);
        });

        initializeScroll();
        // initializeSearch();
    }

    return {
        showDialogs: showDialogs,
        initialization: initialization,
    }
})();


$("document").ready(function () {
    var actions = APP.utilities.actions;

    actions.initialization();
    actions.showDialogs();
});