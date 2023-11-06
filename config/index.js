require("dotenv").config();

const config = {
  MONGO_URL: process.env.MONGO_URL,
  PORT: process.env.PORT,
};

const checkEnv = () => {
  let crash = false;
  for (let key in config) {
    if (!config[key]) {
      console.log("Please add the env variable for", key);
      crash = true;
    }
  }
  if (crash) process.exit(1);
};
checkEnv();

module.exports = config;
