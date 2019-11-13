var assert = require("assert"),
  sizeof = require("../lib/sizeof");
var initialDocSize = 32;
describe("sizeof", function() {
  it("basic", function() {
    assert.equal(4 + initialDocSize, sizeof("abc"));
    assert.equal(8 + initialDocSize, sizeof(123));
    assert.equal(1 + initialDocSize, sizeof(false));
  });
  it("null", function() {
    assert.equal(1 + initialDocSize, sizeof(null));
    assert.equal(5 + initialDocSize, sizeof({ abc: null }));
    assert.equal(5 + initialDocSize, sizeof(["abc", null]));
  });
  it("array", function() {
    assert.equal(8 + initialDocSize, sizeof(["abc", "abc"]));
    assert.equal(16 + initialDocSize, sizeof([123, 123]));
    assert.equal(2 + initialDocSize, sizeof([false, true]));
  });
  it("object", function() {
    assert.equal(8 + initialDocSize, sizeof({ abc: "abc" }));
    assert.equal(12 + initialDocSize, sizeof({ 123: 123 }));
    assert.equal(7 + initialDocSize, sizeof({ false: true }));
  });
  it("nested", function() {
    assert.equal(
      33 + initialDocSize,
      sizeof({ key: { name: "abc", age: 123, active: true } })
    );
    assert.equal(17 + initialDocSize, sizeof({ key: ["abc", 123, true] }));
  });
});
