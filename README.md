 Inspired by git@github.com:miktam/sizeof.git

# firestore-size

![npm bundle size](https://img.shields.io/bundlephobia/min/firestore-size)
[![MIT license](http://img.shields.io/badge/license-MIT-brightgreen.svg)](http://opensource.org/licenses/MIT)
![Dependents (via libraries.io)](https://img.shields.io/librariesio/dependents/npm/firestore-size)
![npm](https://img.shields.io/npm/v/firestore-size)
This tiny package calculates the approximate size (in bytes) of a Firestore document. 

## Installation

```js
npm i firestore-size
```

### Usage

```js
import sizeof from 'firestore-size'

const snapshot = db
      .collection("data")
      .doc(id)
      .get();
      
const bytes = sizeof(snapshot.data());
console.log( bytes > 1000 ? "I'm in awe of the size of this lad!": "Ew..")
```
## How it works

- Array -	The sum of the sizes of its values
- Boolean -	1 byte
- Bytes -	Byte length
- Date and time -	8 bytes
- Floating-point number -	8 bytes
- Geographical point - 16 bytes
- Integer -	8 bytes
- Map	- The size of the map, calculated the same way as document size
- Null -	1 byte
- Reference	- The document name size
- Text string -	Number of UTF-8 encoded bytes + 1

More on how the size is calculated in firestore docs - [documentation](https://firebase.google.com/docs/firestore/storage-size#document-name-size)

## Important notice

Does not take into account the name of the document.

For a document in the subcollection ```users/jeff/tasks``` with a string document ID of ```my_task_id```, the document name size is 6 + 5 + 6 + 11 + 16 = 44 bytes. [More about it in docs.](https://firebase.google.com/docs/firestore/storage-size#document-name-size)

Does not take into account indexing. Indexes can be disabled - [docs](https://firebase.google.com/docs/firestore/query-data/index-overview?authuser=0#single-field_index_exemptions) - to free up more space. 

## Caught a Bug?
[Fork](https://help.github.com/articles/fork-a-repo/) this repository to your own GitHub account and then [clone](https://help.github.com/articles/cloning-a-repository/) it to your local device

As always, you can run the tests using: `npm test`
