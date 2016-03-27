var Hashids = require("hashids"),
    hashids = new Hashids("I L0V3 P0RN", 0, "0123456789abcdefghijklmnopqrstuvwxyz");

exports.decrypt = function (code) {
  return hashids.decode(code);
}

exports.encrypt = function (id) {
  return hashids.encode(id);
}
