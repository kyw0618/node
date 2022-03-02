// routes.js
const express = require("express");
const Account = require("./schema/accountModel");
const router = express.Router();

// GET 요청 시 처리할 로직
router.get("/", (req, res) => {
    try {
        const accounts = await.Account.find();
        res.json(accounts);
    }
    catch(err) {
        res.status(500).json({message:error.message})
    }
  res.send("GET 요청을 수신했습니다.");
});

// POST 요청 시 처리할 로직
router.post("/", (req, res) => {
  res.send("POST 요청을 수신했습니다.");
})

// PATCH 요청 시 처리할 로직
router.put("/:id", (req, res) => {
  res.send("PUT 요청을 수신했습니다.");
})

// DELETE 요청 시 처리할 로직
router.delete("/:id", (req, res) => {
  res.send("DELETE 요청을 수신했습니다.");
})

module.exports = router;