"use strict";

// get bytes in string
// https://stackoverflow.com/a/5515960/591487
function lengthInUtf8Bytes(str) {
  var m = encodeURIComponent(str).match(/%[89ABab]/g);
  return str.length + (m ? m.length : 0);
}

function sizeOfObject(object) {
  if (object === null) {
    return 1;
  }
  //GeoPoint
  if (object.hasOwnProperty("_lat") && typeof object.isEqual === "function")
    return 16;
  //Date
  if (
    typeof object.toDate === "function" ||
    typeof object.getDate === "function"
  )
    return 8;
  //Reference
  if (typeof object.onSnapshot === "function") {
    return object["_key"]["path"]["segments"]
      .slice(object["_key"]["path"]["offset"])
      .reduce(function(acc, curr) {
        return acc + curr.length + 1;
      }, 16);
  }
  var bytes = 0;
  for (var key in object) {
    if (!Object.hasOwnProperty.call(object, key)) {
      continue;
    }

    bytes += sizeof(key);
    try {
      bytes += sizeof(object[key]);
    } catch (ex) {
      if (ex instanceof RangeError) {
        // circular reference detected, final result might be incorrect
        // let's be nice and not throw an exception
        bytes = 0;
      }
    }
  }

  return bytes;
}

function sizeof(object) {

  var objectType = typeof object;
  switch (objectType) {
    case "string":
      return lengthInUtf8Bytes(object) + 1;
    case "boolean":
      return 1;
    case "number":
      return 8;
    case "object":
      if (Array.isArray(object)) {
        return object.map(sizeof).reduce(function(acc, curr) {
          return acc + curr;
        }, 0);
      } else {
        return sizeOfObject(object);
      }
    default:
      return 0;
  }
}

function sizeOfDoc(object) {
  return 32 + sizeof(object);
}
module.exports = sizeOfDoc;
