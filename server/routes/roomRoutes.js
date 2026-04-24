const router = require("express").Router();
const c = require("../controllers/roomController");
const auth = require("../middleware/authMiddleware");
const role = require("../middleware/roleMiddleware");

router.get("/", auth, c.getRooms);
router.post("/", auth, role("admin"), c.createRoom);
router.put("/:id", auth, role("admin"), c.updateRoom);
router.delete("/:id", auth, role("admin"), c.deleteRoom);

module.exports = router;
