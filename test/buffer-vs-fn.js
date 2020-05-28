// test string length function against Buffer
var assert = require("assert"),
  Buffer = require("buffer").Buffer;

function byteLength(str) {
  // returns the byte length of an utf8 string
  var s = str.length;
  for (var i=str.length-1; i>=0; i--) {
    var code = str.charCodeAt(i);
    if (code > 0x7f && code <= 0x7ff) s++;
    else if (code > 0x7ff && code <= 0xffff) s+=2;
  }
  return s;
}
function bufferSize(str) {
  return Buffer.from(str).length;
}
describe("string byte length function is accurate", () => {
  it("produces the same result as using Buffer", () => {

    const tests = ["Hello world", "åß∂ƒ", "ثبهخنى", "你好", "ха ха...шутка что ли?", ""];

    tests.forEach(item => {
      assert.equal(byteLength(item), bufferSize(item));
    });
  });
});