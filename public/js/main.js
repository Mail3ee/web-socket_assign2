(function connect() {
    let socket = io.connect('http://localhost:3000')

    socket.on("message", (data) => {
        if(data == 'refresh'){
            $('.input-box').hide()
            setTimeout(() => {
                location.reload();
                $('.input-box').show()
            }, 3000);
            return
        }
        $(".text").text(data)
    });

    $('.input-box').keyup(function(e){
        if(e.keyCode == 13)
        {
            socket.send($('.input-box').val())
            $('.input-box').val("")
        }
    });

})();