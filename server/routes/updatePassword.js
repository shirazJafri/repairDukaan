const router = require("express").Router();
const user = require("../models/User")
const bcrypt = require('bcrypt-nodejs');
//onst repairs = require("../models/Repair")
const authorization = require("../middleware/authorization");
//const { Router } = require("express");

router.post("/api/customer/change", authorization, async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    const user_1 = await user.findOne({_id: req.user}).lean();

    if(!user_1) {
        return res.json({
            "header": {
                "error": 1
            },
            "message": "User doesn't exist!"
        })
    }

    if(await bcrypt.compareSync(currentPassword, user_1.password)) {
        const saltRound = 10;
        const salt = bcrypt.genSaltSync(saltRound);
        const hash = bcrypt.hashSync(newPassword, salt);

        user.findByIdAndUpdate({_id: req.user}, {password: hash}, function(err, docs) {
            if(err) {
                console.log(err);
            }
            else {
                res.status(200).json({
                    "header": {
                        "error": 0
                    },
                    "message": "Success!"
                })
            }
        }).lean()
    }
    
    /*user.findByIdAndUpdate({_id: req.user}, { first_name: firstName, last_name: lastName }, function (err, docs) {
        if (err) {
            console.log(err);
        }
        else {
            res.status(200).json({
                "first_name": docs.first_name,
                "last_name": docs.last_name,
                "date_joined": docs.join_date,
            })
        }
    }).lean();*/
});
module.exports = router;