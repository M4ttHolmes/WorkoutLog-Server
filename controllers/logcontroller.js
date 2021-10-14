const Express = require("express");
const router = Express.Router();

router.get("/", (req, res) => {
    res.send("LOG GET request success");
})

router.post("/", (req, res) => {
    res.send("LOG POST request success");
})

router.get("/:id", (req, res) => {
    res.send("LOG ID GET request success");
})

router.post("/:id", (req, res) => {
    res.send("LOG ID POST request success");
})

router.delete("/:id", (req, res) => {
    res.send("LOG ID DELETE request success");
})

module.exports = router;