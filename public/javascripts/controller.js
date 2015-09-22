$(function() {
    $(document).ready(function() {
        if (window.innerHeight > window.innerWidth) {
            // replace controller div with the verticalPhone div  
            $("horizontalPhone").hide();
        }
        alert("hi");
    });

    $(window).on("orientationchange", function(event) {
        if (event.orientation == "landscape")
            $("horizontalPhone").show();
    });
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



    /*
    // target elements with the "draggable" class
    interact('.draggable')
    .draggable({
        snap: {
            targets: [
            { x: 100, y: 200 },
            function (x, y) { return { x: x % 20, y: y}; }
            ],
            endOnly: true
        },
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        restrict: {
            restriction: "parent",
            endOnly: false,
            elementRect: { top: .4, left: 0, bottom: .6, right: 1 }
        },

        // call this function on every dragmove event
        onmove: dragMoveListener,
        // call this function on every dragend event
        onend: function (event) {
            var textEl = event.target.querySelector('p');

            textEl && (textEl.textContent =
                    'moved a distance of '
                    + (Math.sqrt(event.dx * event.dx +
                            event.dy * event.dy)|0) + 'px');
        }
    });

    function dragMoveListener (event) {
        var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

        // translate the element
        target.style.webkitTransform =
            target.style.transform =
            'translate(' + x + 'px, ' + y + 'px)';

        // update the posiion attributes
        target.setAttribute('data-x', x);
        target.setAttribute('data-y', y);
    }

    // this is used later in the resizing demo
    window.dragMoveListener = dragMoveListener;

    $(document).ready(function(){
        $("#stick").on("tap",function() {
            $("p").hide();
        })/*.on("taphold",function() {
            $(this).hide();
        });

        $("#innerBox").draggable({
            containment: "parent"
        });
    });

    // Centering the joystick
    function center() { var inner = document.getElementById('innerBox');
        var outer = document.getElementById('containingBox');

        inner.style.backgroundColor = red;
        inner.style.marginTop = 50px;// outer.style.width/2 - inner.style.width/2;
    }
    */
            

});
