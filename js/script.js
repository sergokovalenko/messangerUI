$("document").ready(function () {
    var a = $('.scroll-pane');
    a.jScrollPane({
        maintainPosition: true,
        stickToBottom: true
    });

    a.data("jsp").scrollTo(0,1000);
})