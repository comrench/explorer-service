import { STATUS } from "../util/constants";
import { root } from "../util/testData";

const filterDirStructure = (tempRoot) => {
  console.log(tempRoot);
  const newRoot = JSON.parse(JSON.stringify(tempRoot));
  for (let key in tempRoot.children) {
    if (tempRoot.children.hasOwnProperty(key)) {
      delete newRoot.children[key].children;
    }
  }
  return newRoot;
};

const getDirStructure = async (tempRoot) => {
  return await filterDirStructure(tempRoot);
};

const getDirStructureController = async (req, res) => {
  // this is for the logger
  const methodName = "getDirStructureController";
  console.log("request received");
  try {
    // mock api call
    const dirStructure = await getDirStructure(root);
    res.status(STATUS.SUCCESS).send(dirStructure);
  } catch (error) {
    res.status(STATUS.SERVER_ERROR).send({
      error,
    });
  }
};

const getChildStructure = (path) => {
  const pathArray = path.split("/");
  console.log(pathArray);
  let jsonPath = root;
  for (let item in pathArray) {
    if (pathArray[item]) {
      jsonPath = jsonPath.children[pathArray[item]];
    }
  }
  return jsonPath;
};

const getDirStructureWithPathController = async (req, res) => {
  const path = req.params["0"];
  console.log(req.params["0"]);
  try {
    const childStructure = getChildStructure(path);
    const dirStructure = await getDirStructure(childStructure);
    res.status(STATUS.SUCCESS).send(dirStructure);
  } catch (error) {
    res.status(STATUS.SERVER_ERROR).send({
      error,
    });
  }
};

export { getDirStructureController, getDirStructureWithPathController };
