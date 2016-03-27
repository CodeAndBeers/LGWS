var Hashids = require("hashids"),
    hashids = new Hashids("I L0V3 P0RN");

exports.decrypt = function (code) {
  return hashis.decode(code);
}

exports.encrypt = function (id) {
  return hashids.encode(id);
}
