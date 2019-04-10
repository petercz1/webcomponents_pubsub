class DataStore {

  constructor() {
    // create datastores
    this.people = [];
    this.message = {};
  }

  // getRequest() and setRequest() are the primary getters/setters
  // they work by appending 'get' or 'set to the 'listener.request' string
  // and then use that as the function name.
  // I added 'listener.data' in case someone wants to extend the idea
  // by passing a variable eg id (not implemented here)
  getRequest(subscriber) {
    //let req = subscriber.request;
    return this[subscriber.request](subscriber.parameters);
    //return res;
  }

  setRequest(request) {
    let req = 'set' + request.newInfo;
    let res = this[req](request.data);
    return res;
  }

  // get data of various types
  getPeople() {
    return this.people
  }

  getChosenPeople() {
    return (this.people.filter(person => (person.checked == true)));
  }

  getCheckedTotal() {
    return (this.people.filter(person => (person.checked == true)).length);
  }
  getCount() {
    return this.people.length;
  }

  // get and set messages
  
  getMessage() {
    return this.message;
  }
  setMessage(data) {
    this.message = data;
  }

  // create/change data

  setNewPerson(data) {
    // find max id
    let max = Math.max(...this.people.map(obj => obj.id), 0);
    // increment it
    data.id = max + 1;
    // add it
    this.people.push(data);
    //}
  }
  setChangePerson(data) {
    this.getPeople().filter(person => (person.id == data.id)).checked = data.checked;
  }
  setDeletePerson(data) {
    // filter returns a copy of the array, which then replaces the original
    this.people = this.people.filter(person => {
      return person.id != data.id;
    })
  }
}

export default new DataStore();