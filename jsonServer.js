const jsonServer = require("json-server");
const fs = require("fs");

const server = jsonServer.create();

server.use(jsonServer.bodyParser);
server.use(jsonServer.defaults());

server.post("/user/register", (req, res) => {
  fs.readFile("db.json", (err, data) => {
    if (err) {
      res.json({ result: "error", error: err });
      return;
    }
    const jsonData = JSON.parse(data);
    req.body.userGrade = 1;
    jsonData.user.push(req.body);
    fs.writeFile("db.json", JSON.stringify(jsonData), () => {
      res.json({ result: "ok" });
    });
  });
});

server.post("/user/login", (req, res) => {
  fs.readFile("db.json", (err, data) => {
    // readFile 중 에러.
    if (err) {
      res.json({ result: "error", error: err });
      return;
    }
    const jsonData = JSON.parse(data);
    let userIdx = jsonData.user.findIndex(
      (user) => user.userId === req.body.userId
    );
    // user 정보가 없음.
    if (userIdx === -1) {
      res.json({ result: "user not found" });
      return;
    }
    userIdx = jsonData.user.findIndex(
      (user) => user.password === req.body.password
    );
    // password 불일치.
    if (userIdx === -1) {
      res.json({ result: "password not equal" });
      return;
    }
    const { userId, userName, userImg, userGrade } = jsonData.user[userIdx];
    res.json({ result: "ok", data: { userId, userName, userImg, userGrade } });
  });
});

server.listen(4000, () => console.log("✅ Server Opened... PORT 4000"));
