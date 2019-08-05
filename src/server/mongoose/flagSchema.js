const mongoose = require("mongoose")

class FeatureFlag {

  Model
  flagSchema

  constructor() {
    this.flagSchema = new mongoose.Schema({
      feature: String,
      description: String,
      enabled: Boolean
    });
    this.Model = mongoose.model("", this.flagSchema);
  }

  async getAll() {
    return await this.Model.find((error, docs) => {
      return docs.map(doc => {
        return {
          feature: doc.feature,
          description: doc.description,
          enabled: doc.enabled
        }
      });
    });
  }

  async getFlag(feature) {
    return await this.Model.findOne({
      feature: feature
    }, (error, doc) => {
      return {
        feature: doc.feature,
        description: doc.description,
        enabled: doc.enabled
      }
    })
  }

  async addFlag(feature, description, enabled) {
    return new this.Model({
      feature: feature,
      description: description,
      enabled: enabled
    }).save();
  }

  async removeFlag(feature) {
    return await this.Model.findOneAndDelete({
      feature: feature
    }, (error, doc) => {
      if (error) {
        console.error(error);
        return {};
      }
      return {
        feature: doc.feature,
        description: doc.description,
        enabled: doc.enabled
      }
    });
  }

  async toggleFlag(feature) {
    return await this.Model.findOne({
        feature: feature
      },
      async function (err, doc) {
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
        return {
          feature: doc.feature,
          description: doc.description,
          enabled: !doc.enabled
        }
      }
    );
  }
}

module.exports = FeatureFlag;