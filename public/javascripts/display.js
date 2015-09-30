$(function() {
    var socket = io();

    function detectMobile() {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            document.location.replace("http://socketsidekick.herokuapp.com/controller");
        }
    }
    window.onload = detectMobile;

    // Drawing canvas
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var clients=[]; // Clients are used to deal with each socket connection
    var players=[]; // Player objects

    // function to get the index of the array which has the attribute passed in
    function getIndex(array, attr, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].hasOwnProperty(attr) && array[i][attr] === value) {
                return i;
            }
        }
        return -1;
    }

    // playerNum gives index of player in players array by linking it to the socket's id
    var playerNum = 0; 
    socket.on('new client', function(data) {
        clients.push({ id: data.id, index: playerNum });
        console.log("data.id: " + data.id + "     playerNum: " + playerNum);
        initializePlayer();
        playerNum++;
    });
    
    socket.on('up', function(data) {
        var cIndex = getIndex(clients, 'id', data);
        var pIndex = clients[cIndex].index;
        console.log("attemping to move player: " + pIndex);
        movePlayers(0, pIndex);
    });
    socket.on('right', function(data) {
        var cIndex = getIndex(clients, 'id', data);
        var pIndex = clients[cIndex].index;
        console.log("attemping to move player: " + pIndex);
        movePlayers(1, pIndex);
    });
    socket.on('down', function(data) {
        var cIndex = getIndex(clients, 'id', data);
        var pIndex = clients[cIndex].index;
        console.log("attemping to move player: " + pIndex);
        movePlayers(2, pIndex);
    });
    socket.on('left', function(data) {
        var cIndex = getIndex(clients, 'id', data);
        var pIndex = clients[cIndex].index;
        console.log("attemping to move player: " + pIndex);
        movePlayers(3, pIndex);
    });
    
    socket.on('user disconnected', function(data) {
        var cIndex = getIndex(clients, 'id', data);
        console.log("disconnecting");
        players.splice(clients[cIndex].index, 1);
        clients.splice(cIndex, 1);
    });


    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, false);
    setInterval(draw, 1000/60);

    function resizeCanvas() {
        var w = window.innerWidth,
            h = window.innerHeight;
        canvas.width = w;
        canvas.height = h;
        ctx.translate(w/2, h/2);
        draw();
    }
 
    function randomColor() {
        var characters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += characters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
    
    // On socket.io connection
    function initializePlayer() {
        var mColor = randomColor();
        var mSize = Math.random() * 28 + 15;
        players.push({
            size: mSize,
            /*
            x: Math.random() * 2000 - 1000,
            y: Math.random() * 2000 - 1000,
            */
            x: mSize/2,
            y: mSize/2,
            color: mColor
        });
    }

    function draw() {
        ctx.save();
        ctx.setTransform(1,0,0,1,0,0);
        ctx.clearRect(0,0,ctx.canvas.width,ctx.canvas.height);
        ctx.restore();

        drawPlayers();
    }

    function drawPlayers() {
        for (var i=0, numPlayers=players.length; i < numPlayers; i++) {
            var player = players[i];
            var size = player.size;
            ctx.save();
            ctx.translate(player.x - size, player.y - size);
            ctx.beginPath();
            ctx.arc(player.x,player.y,size,0,2*Math.PI);
            ctx.fillStyle = player.color;
            ctx.fill();
            ctx.closePath();
            ctx.restore();
        }
    }

    function movePlayers(dir, playerIndex) {
        var player = players[playerIndex];
        // Up
        if (dir == 0) {
            player.y -= 5;
        }
        // Right
        if (dir == 1) {
            player.x += 5;
        }
        // Down
        if (dir == 2) {
            player.y += 5;
        }
        // Left
        if (dir == 3) {
            player.x -= 5;
        }
    }

    // testing moving an object on canvas
    $(document).keydown(function(e) {
        if (e.keyCode == 37) {
            movePlayers(3, 0);
        }
        if (e.keyCode == 38) {
            movePlayers(0, 0);
        }
        if (e.keyCode == 39) {
            movePlayers(1, 0);
        }
        if (e.keyCode == 40) {
            movePlayers(2, 0);
        }
        if (e.keyCode == 32)
            console.log(clients.length);
    });
})
