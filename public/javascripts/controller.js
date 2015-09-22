$(function() {
    var socket = io();
    $('#controller_backing').bind('touchstart click', function(e) {
       e.preventDefault();
        return false;
    });

    var timer;
    $('#up').bind('touchstart click', function(){
        clearInterval(timer);
        $(this).css('background', '#b3c2bf');
        timer = setInterval(function() {
            socket.emit('up');
        }, 20);
        return false;
    });
    $('#up').bind("touchend touchcancel", function(e){
        clearInterval(timer);
        $(this).css('background', '#e3ece5');
    });
    $('#right').bind('touchstart click', function(){
        clearInterval(timer);
        $(this).css('background', '#b3c2bf');
        timer = setInterval(function() {
            socket.emit('right');
        }, 20);
        return false;
    });
    $('#right').bind("touchend touchcancel", function(e){
        clearInterval(timer);
        $(this).css('background', '#e3ece5');
    });
    $('#down').bind('touchstart click',function(){
        clearInterval(timer);
        $(this).css('background', '#b3c2bf');
        timer = setInterval(function() {
            socket.emit('down');
        }, 20);
        return false;
    });
    $('#down').bind("touchend touchcancel", function(e){
        clearInterval(timer);
        $(this).css('background', '#e3ece5');
    });
    $('#left').bind('touchstart click',function(){
        clearInterval(timer);
        $(this).css('background', '#b3c2bf');
        timer = setInterval(function() {
            socket.emit('left');
        }, 20);
        return false;
    });
    $('#left').bind("touchend touchcancel", function(e){
        clearInterval(timer);
        $(this).css('background', '#e3ece5');
    });

    socket.on('up', function() {
        $('#verticalPhone').append($('<li>').text("up pressed"));
    });
    socket.on('right', function() {
        $('#verticalPhone').append($('<li>').text("right pressed"));
    });
    socket.on('down', function() {
        $('#verticalPhone').append($('<li>').text("down pressed"));
    });
    socket.on('left', function() {
        $('#verticalPhone').append($('<li>').text("left pressed"));
    });
});
