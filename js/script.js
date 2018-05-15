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
APP.createNamespace('APP.models.identeties');
APP.createNamespace('APP.utilities.actions');

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


$("document").ready(function () {
    var a = $('.scroll-pane');
    a.jScrollPane({
        maintainPosition: true,
        stickToBottom: true,
        contentWidth: 200
    });

    a.data("jsp").scrollTo(0, 1000);
})

window.onresize = function () {
    $('.scroll-pane').jScrollPane({
        maintainPosition: true,
        stickToBottom: true
    });
}
