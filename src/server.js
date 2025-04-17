const dotenv = require("dotenv");
const handleConnectDB = require("./middlewares/databaseConnection");
const app = require("./app");

dotenv.config();

const port = process.env.PORT || 3000;

async function startServer() {
  try {
    await handleConnectDB();
    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (err) {
    console.error("Failed to connect to DB:", err);
  }
}

startServer();
