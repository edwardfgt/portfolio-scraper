const express = require("express");
const evmRoutes = require("./routes/evmRoutes");

const cors = require("cors");

const app = express();
app.use(cors({ origin: true, credentials: true }));

const port = 3000;

app.use(express.json());
app.use("/api/evm", evmRoutes);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
