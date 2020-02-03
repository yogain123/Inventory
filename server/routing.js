const express = require("express");
const router = express.Router();
const Order = require("./models/Order");
const Inventory = require("./models/Inventory");
const Account = require("./models/Account");
router.get("/", (req, res, next) => {
  res.send("Hello!");
});

router.post("/account", async (req, res, next) => {
  let reqData = req.body;
  let account = new Account(reqData);
  await account.save();
  res.send({ state: "User Added Successfully", respose: reqData });
});

router.post("/order", async (req, res, next) => {
  let reqData = req.body;
  let id = Date.now();
  reqData._id = id;
  reqData.orderId = id;
  let { status, totalProduct } = await checkProductAvailibility(
    reqData.productId,
    reqData.totalProduct
  );
  if (status) {
    let order = new Order(reqData);
    await order.save();
    await Inventory.findByIdAndUpdate(reqData.productId, {
      totalProduct: totalProduct - reqData.totalProduct
    });
    return res.send({ state: "Order placed successfully", respose: reqData });
  }
  return res
    .status(404)
    .send({ state: "Product Not in Stock", respose: reqData });
});

router.post("/inventory/fill", async (req, res, next) => {
  let reqData = req.body;
  let id = Date.now();
  reqData._id = id;
  reqData.productId = id;
  let inventory = new Inventory(reqData);
  await inventory.save();
  res.send({ state: "Product Added to inventory", respose: reqData });
});

async function checkProductAvailibility(productId, totalProductRequest) {
  let productDetails = await Inventory.findById(productId);
  if (totalProductRequest <= productDetails.totalProduct) {
    return { status: true, totalProduct: productDetails.totalProduct };
  }
  return { status: false, totalProduct: productDetails.totalProduct };
}

module.exports = router;
