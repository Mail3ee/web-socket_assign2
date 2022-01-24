const express = require('express');
const socket = require('socket.io');
const app = express()

app.set('view engine', 'ejs');
app.use(express.static('public'));

app.get('/', (req, res) =>{
    res.render("home");
})

const server = app.listen(3000, () =>{
    console.log("server starting")
})

const io = socket(server);

io.on("connection", (socket) => {
    let lvl = 0
    const num = Math.floor(Math.random() * 10);
    console.log(num);
    console.log("Client Connected");
    socket.send("Please  type START to start game");

    socket.on("message", (data) => {
        console.log(data)
        if(lvl == 0){
            if(data == "START"){
                lvl = 1
                socket.send("Guess the number btw 0 - 10");
            }else{
                socket.send("Please  type START to start game");
            }
        }else if(lvl == 1){
            let input_num = parseInt(data)
            if(input_num != NaN){
                if(input_num == num){
                    socket.send("Correct!! Congretolation");
                    socket.send("refresh");
                }else{
                    let diff = Math.abs(input_num - num);  
                    if(diff == 1){
                        socket.send("So Close");
                    }else{
                        socket.send("Unlucky");
                    }
                }
            }else{
                socket.send("Please type only Number");
            }
        }
    });
})