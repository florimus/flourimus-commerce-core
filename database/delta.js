const isDelta = async (mongoose, scriptId) => {
  const collection = mongoose.connection.collection("script_audit");
  const isExists = await collection.findOne({ _id: scriptId });
  if (isExists) {
    return false;
  }
  return true;
};

const deltaSuccess = async (mongoose, scriptId) => {
  const collection = mongoose.connection.collection("script_audit");
  await collection.insertOne({
    _id: scriptId,
    at: Date.now(),
  });
};

module.exports = { isDelta, deltaSuccess };
