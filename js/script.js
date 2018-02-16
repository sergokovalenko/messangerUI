$("document").ready(function () {
    var a = $('.scroll-pane');
    a.jScrollPane({
        maintainPosition: true,
        stickToBottom: true,
        contentWidth: 200
    });

    a.data("jsp").scrollTo(0,1000);
})

window.onresize = function(){
    $('.scroll-pane').jScrollPane({
        maintainPosition: true,
        stickToBottom: true
    });
}