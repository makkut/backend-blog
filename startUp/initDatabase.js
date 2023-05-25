import { fileURLToPath } from "url";
import path from "path";
import fs from "fs";
import { ProfessionModel } from "../models/profession.model.js";
import { QualityModel } from "../models/quality.model.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const professionMock = path.join(__dirname, "../mock", "profession.json");
const qualitiesMock = path.join(__dirname, "../mock", "qualities.json");

let professionJson = loadFile(professionMock);
let qualitiesJson = loadFile(qualitiesMock);

function loadFile(json) {
  try {
    const data = fs.readFileSync(json);
    return JSON.parse(data);
  } catch (err) {
    console.error(err);
    return [];
  }
}

export default async () => {
  const professions = await ProfessionModel.find();
  if (professions.length !== professionJson.length) {
    await createInitialEntity(ProfessionModel, professionJson);
  }
  const qualities = await QualityModel.find();
  if (qualities.length !== qualitiesJson.length) {
    await createInitialEntity(QualityModel, qualitiesJson);
  }
};

async function createInitialEntity(Model, data) {
  await Model.collection.drop();
  return Promise.all(
    data.map(async (item) => {
      try {
        delete item._id;
        const newItem = new Model(item);
        await newItem.save();
        return newItem;
      } catch (error) {
        return error;
      }
    })
  );
}
