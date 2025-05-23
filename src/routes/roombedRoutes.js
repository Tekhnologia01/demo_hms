const express = require("express");
const {addRoom,getRoom,deleteRoom,updateRoom,addBed,deleteBed,getRoomType,getBedAndRoomRoomTypewise,getBedInfo,getRoomTypewise,getBed,getRoomBedCount,UpdateBed, getAvailableBeds, getAvailableBedsRoomwise, ChangeBed} = require("../controllers/roombedController");
const router = express.Router();
const {VerifyToken}=require("../middleware/VerifyToken")
router.use(VerifyToken);

router.get("/getroom", getRoom);

router.post("/addroom/:userId", addRoom);

router.delete("/deleteroom/:roomId", deleteRoom);

router.put("/updateroom/:roomId", updateRoom);

router.post("/addbed/:userId", addBed);

router.delete("/deletebed/:bedId", deleteBed);

router.get("/getroomtype", getRoomType);

router.get("/getbedandroomroomtypewise", getBedAndRoomRoomTypewise);

router.get("/getbedinfo", getBedInfo);

router.get("/getroomtypewise", getRoomTypewise);

router.get("/getbed", getBed);

router.get("/getroombedcount", getRoomBedCount);

router.post("/updatebed", UpdateBed);

router.get("/get_available_beds", getAvailableBeds);

router.get("/get_available_beds_roomwise", getAvailableBedsRoomwise);

router.post("/changebed", ChangeBed);



module.exports = router;
