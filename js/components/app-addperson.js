import PubSub from '../pubsub/pubsub.js';

class appAddperson extends HTMLElement {
  constructor() {
    super();
    this.pubsub = PubSub;
    // binds 'this' to these methods
    this.renderData = this.renderData.bind(this);
    this.addPerson = this.addPerson.bind(this);
    this.renderData();
  }

  renderData() {
    this.innerHTML = `
      <small>&lt;app-addperson&gt;</small>
      <h2>Enter a name</h2>
      <input type="text" id="name" value='bruno'></input>
      <button id="newPerson">add person</button>
      <p>(To speed up testing I'm using generateName() to select a random value for name)</p>
    `;
    document.querySelector('#newPerson').addEventListener('click', this.addPerson);
  }

  addPerson() {
    let person = {
      name: document.querySelector('#name').value,
      checked: true,
      // id: this.pubsub.getData('Count', null) + 1
    };
    this.pubsub.publish('NewPerson', person);
    this.pubsub.publish('Message', {"component": "app-addperson", "text": "adding " + person.name});
    this.generateName();
  }

  // random name generator for testing, saves having to type a value into the input box
  generateName(){
    let names = ['bill', 'bob','brenda', 'bert','barry', 'brian', 'boomer', 'butch', 'benny', 'bessie', 'bonza','bunty', 'boris'];
    this.querySelector('#name').value = names[Math.floor(Math.random() * names.length)];
  }

}

customElements.define('app-addperson', appAddperson);

export default appAddperson;