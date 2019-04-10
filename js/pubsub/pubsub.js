import DataStore from './datastore.js';

class PubSub {
  constructor() {
    this.datastore = DataStore
    this.subscribers = [];
  }

  subscribe(newsItem, request, parameters, callback) {
    this.subscribers.push({
      newsItem,
      request,
      parameters,
      callback
    });
    console.log(this.subscribers);
  }

  unsubscribe(callback) {
    // TODO implement!
  }

  publish(newsItem, data) {

    // publish the new/changed data
    this.datastore.setRequest({
      newsItem,
      data
    });

    // alert all susbscribers to new/changed data
    this.subscribers.filter(subscriber => (subscriber.newsItem == newsItem)).forEach((subscriber) => {
      subscriber.callback(this.datastore.getRequest(subscriber.request));
    });
  }

  getData(request, data) {
    // I decided to have the PubSub class act as the interface to
    // all transactions between modules and datastore, hence
    // this handles non-publish/subscribe requests for info
    // such as getting totals before publishing a new record
    // eg request of 'CheckedTotal' returns 'getCheckedTotal()' in datastore
    // I added 'data' as part of the request if a parameter needed to be passed in
    // such as specific id (not implemented here)
    return this.datastore.getRequest({
      request,
      data
    });
  }
}

export default new PubSub();