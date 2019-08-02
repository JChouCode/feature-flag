import mongoose from "mongoose"

const flagSchema = new mongoose.Schema({
  feature: String,
  description: String,
  enabled: Boolean
});

flagSchema.methods.dbAddFlag = async function (feature) {
  await new this.model("flag").save()
}

flagSchema.methods.dbRemoveFlag = async function (feature) {
  return new this.model("flag").save()
}

flagSchema.methods.dbToggleFlag = async function (feature) {
  await this.Model.findOne({
      feature: feature
    },
    async function (err: Error, doc: any) {
      if (err) {
        console.error(err);
        return
      } else {
        if (doc.enabled) {
          doc.enabled = false;
        } else {
          doc.enabled = true;
        }
      }
      await doc.save();
    }
  );
}

flagSchema.methods.dbGetFlags = function () {
  return new this.model("flag").save()
}

flagSchema.methods.dbGetFlag = function (feature) {
  return new this.model("flag").save()
}


module.exports = flagSchema;