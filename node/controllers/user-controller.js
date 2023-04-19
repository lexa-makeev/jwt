const userService = require("../service/user-service");
const passwordHash = require("password-hash");
const generate_jwt = require("../utils/generate_jwt");
var http = require("http");
var Cookies = require("cookies");

class UserController {
  async auth(req, res) {
    try {
      const { login, pass } = req.body;
      const hash = await userService.getHash(login);
      if (passwordHash.verify(pass, hash)) {
        const cookies = new Cookies(req, res);
        const access = await generate_jwt(login, "access");
        const refresh = await generate_jwt(login, "refresh");
        cookies.set("refresh", refresh, {
          maxAge: Date.now() + 50,
          httpOnly: true,
        });
        res.send(access);
      } else {
        res.status(401).send("Кодовое слово");
      }
    } catch (error) {
      res.status(500).send("Ошибка, ёп твою");
    }
  }
  async create(req, res) {
    try {
      const { login, pass, repPass } = req.body;
      if (pass === repPass) {
        const hash = passwordHash.generate(pass);
        const data = await userService.create(login, hash);
        data.created
          ? res.send(data.user)
          : res.status(500).send("ЕСТЬ ТАКИЕ!");
      } else {
        res.status(500).send("Пароли не совпадают!");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  }
}
module.exports = new UserController();
