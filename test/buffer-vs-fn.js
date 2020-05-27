// test string length function against Buffer
var assert = require("assert"),
  Buffer = require("buffer").Buffer;

function lengthInUtf8Bytes(str) {
  var m = encodeURIComponent(str).match(/%[89ABab]/g);
  return str.length + (m ? m.length : 0);
}
function bufferSize(str) {
  return Buffer.from(str).length;
}
describe("string byte length function is accurate", () => {
  it("produces the same result as using Buffer", () => {

    const tests = ["Hello world", "åß∂ƒ", "ثبهخنى", "你好", "ха ха...шутка что ли?", ""];

    tests.forEach(item => {
      assert.equal(lengthInUtf8Bytes(item), bufferSize(item));
    });
  });
});