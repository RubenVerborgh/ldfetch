var ldfetch = require('../lib/ldfetch.js');
var fetch = new ldfetch();

/**
 * This example script shows how you can discover all subjects mentioned on the hydra:previous page of a Linked Data resource
 */

//Prefixes to be added to the N3 Store so we can query the data in an easier fashion
fetch.addPrefix("hydra","http://www.w3.org/ns/hydra/core#");

var url1 = 'http://linked.open.gent/parking';
//but works as well flawlessly with this:
//var url1 = 'http://graph.spitsgids.be/'

//Execute the request and do something with the response
console.log("Requesting url1: " + url1);
fetch.get(url1).then(response => {
  console.log("Redirected to: " + response.url);
  console.log("Requesting the previous page: " + response.store.getTriples(null,"hydra:previous")[0].object);
  fetch.get(response.store.getTriples(null,"hydra:previous")[0].object).then((response2) => {
    //this does not work due to a bug in follow-redirects: https://github.com/olalonde/follow-redirects/issues/61
    console.log("final url that was requested: " + response2.url);
    //just return the subjects:
    console.log(response2.store.getSubjects());
  });
});

