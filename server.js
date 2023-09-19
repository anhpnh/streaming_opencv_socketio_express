let cv = require('opencv4nodejs');
let express = require("express");
let app = express();
app.use(express.static("./public"));
app.set("view engine", "ejs");
app.set("views", "./views");
let PORT = process.env.PORT || 3000;

let server = require("http").Server(app);
let io = require("socket.io")(server);
server.listen(PORT, () => {
    console.log(`Server started ${PORT}`);
});

let rtsp = "rtsp://admin:Admin@123@camgtlhp.hopto.org:555";
let wCap = new cv.VideoCapture(rtsp);
//wCap.set(cv.CAP_PROP_FRAME_WIDTH, 720);
//wCap.set(cv.CAP_PROP_FRAME_HEIGHT, 420);
let FPS = 60;

//Lắng nghe kết nối lên server
io.on("connection", function (socket) {
    console.log("Client connected: " + socket.id);

});

setInterval(() => {
    let frame = wCap.read();
    //frame_ = frame.resize(720, 1280);
    let image = cv.imencode('.jpg', frame).toString('base64');
    io.emit('camgtlhp555_image', image);
}, 1000/FPS)

app.get("/", function (req, res) {
    res.render("index");
});