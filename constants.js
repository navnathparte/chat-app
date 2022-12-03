import { config } from "dotenv";
config();

const constantsInfo = {
  PORT: process.env.PORT,
  JWTKEY: process.env.JWTKEY,
  MONGODB_CONNECTION: process.env.MONGODB_CONNECTION,
};

(function () {
    Object.entries(constantsInfo).forEach((ent) => {
    if (!ent[1] || (ent[1] && ent[1].toString().trim() === ""))
      throw new Error("Please provide proper env variables");
  });
})();
export default constantsInfo;
