const express = require("express");
const app = express();
const fs = require("fs");
const http = require("http").Server(app);
const cors = require("cors");

const socketIO = require("socket.io")(http, {
  cors: {
    origin: "https://127.0.0.1:3000",
  },
});

function findProduct(nameKey, productsArray, last_bidder, new_price) {
  for (let i = 0; i < productsArray.length; i++) {
    if (productsArray[i].name === nameKey) {
      productsArray[i].last_bidder = last_bidder;
      productsArray[i].price = new_price;
    }
  }
  const stringData = JSON.stringify(productData, null, 2);
  fs.writeFile("data.json", stringData, (err) => {
    if (err) {
      console.error("[findProduct] Error writing file", err);
    }
  });
}

const PORT = 4000;

//Gets the JSON file and parse the file into JavaScript object
const rawData = fs.readFileSync("data.json");
const productData = JSON.parse(rawData);

app.use(cors());

socketIO.on("connection", (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  socket.on("disconnect", () => {
    console.log("🔥: A user disconnected");
  });

  socket.on("addProduct", (data) => {
    productData["products"].push(data);
    const stringData = JSON.stringify(productData, null, 2);
    fs.writeFile("data.json", stringData, (err) => {
      if (err) {
        console.error("[addProduct] Error writing file", err);
      }
    });

    socket.emit("addProductResponse", data);
  });

  socket.on("bidProduct", (data) => {
    findProduct(
      data.name,
      productData["products"],
      data.last_bidder,
      data.amount
    );

    socket.emit("bidProductResponse", data);
  });
});

//Returns the JSON file
app.get("/api", (req, res) => {
  res.json(productData);
});

http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
