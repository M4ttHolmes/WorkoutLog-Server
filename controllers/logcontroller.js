const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate-jwt");
const { LogModel } = require("../models");
const Log = require("../models/log");


//* GET LOG ENTRIES FOR USER
router.get("/", validateJWT, async (req, res) => {
    let { id } = req.user;
    try {
        const userLogs = await LogModel.findAll({
            where: {
                owner: id
            }
        });
        res.status(200).json(userLogs);
    } catch (err) {
        res.status(500).json({ error: err});
    }
});



//* CREATE NEW WORKOUT LOG
router.post("/", validateJWT, async (req, res) => {
    const { description, definition, result } = req.body.log;
    const { id } = req.user;
    const logEntry = {
        description,
        definition,
        result,
        owner: id
    }
    try {
        const newLog = await LogModel.create(logEntry);
        res.status(200).json(newLog);
    } catch (err) {
        res.status(500).json({error: err});
    }
})


//* GET LOG BY ID
router.get("/:id", validateJWT, async (req, res) => {
    const { id } = req.params;
    try {
        const results = await LogModel.findAll({
            where: { id: id }
        });
        res.status(200).json(results);
    } catch (err) {
        res.status(500).json({ error: err});
    }
});


//* EDIT LOG BY ID
router.put("/:id", validateJWT, async (req, res) => {
    const { description, definition, result } = req.body.log;
    const logId = req.params.id;
    const userId = req.user.id;

    const query = {
        where:  {
            id: logId,
            owner: userId
        }
    };

    const updatedLog = {
        description: description,
        definition: definition,
        result: result
    };

    try{ 
        const update = await LogModel.update(updatedLog, query);
        res.status(200).json({
            message: "Edit successful."
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
})


//* DELETE LOG BY ID
router.delete("/:id", validateJWT, async (req, res) => {
    const ownerId = req.user.id;
    const logId = req.params.id;

    try {
        const query = {
            where: {
                id: logId,
                owner: ownerId
            }
        };
        await LogModel.destroy(query);
        res.status(200).json({ message: "Log Entry Deleted."});
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

module.exports = router;