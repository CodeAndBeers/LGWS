// var assert = require('assert')
// var crypto = require('crypto')
// var Buffer = require('buffer').Buffer
// var SECRET_KEY = "ChuckN0rrisL1kesPur3D3PapaSuperKey"
// var ENCODING = 'hex'
// var text = "This is the text to cipher!"
// var cipher = crypto.createCipher('des-ede3-cbc', SECRET_KEY)
// var cryptedPassword = cipher.update(text, 'utf8',ENCODING)
// cryptedPassword+= cipher.final(ENCODING)
//
// var decipher = crypto.createDecipher('des-ede3-cbc', SECRET_KEY)
// var decryptedPassword = decipher.update(cryptedPassword, ENCODING,'utf8')
// decryptedPassword += decipher.final('utf8')
//
// assert.equal(text, decryptedPassword)
//
// console.log("Crypted Text:", cryptedPassword)
// console.log("Decrypted Text:", decryptedPassword)

exports.decrypt = function (code) {
  return code;
}

exports.encrypt = function (id) {
  return id;
}
