// @ts-check
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { connect } from "mongoose";

export default __dirname;

export async function connectMongo() {
  try {
    await connect(
      "mongodb+srv://hugoabrahamv19:nUnEo6GgvLB16DT8@codercluster.foujega.mongodb.net/ecommerce?retryWrites=true&w=majority"
    );
    console.log("success pluging to mongo");
  } catch (e) {
    console.log(e);
    throw new Error("Error de conexión");
  }
}

