import PubSub from '../pubsub/pubsub.js';

class appPerson extends HTMLElement {
  constructor(person) {
    super();
    this.pubsub = PubSub;
    this.renderData = this.renderData.bind(this);
    this.registerChange = this.registerChange.bind(this);
    this.registerDelete = this.registerDelete.bind(this);
    this.renderData(person)
  }

  renderData(person) {
    this.person = person;
    this.innerHTML = `
    <input type="checkbox" id="${person.id}" />
    <label for="${person.id}" class="label">${person.name}</label>
    <button class="delete">delete ${person.name}</button></br>
    `;
    if (person.checked) {
      this.querySelector('input').setAttribute('checked', true);
    }
    this.querySelector('input').addEventListener('change', this.registerChange);
    this.querySelector('button').addEventListener('click', this.registerDelete);
    // this.addEventListener('change', this.registerChange);
  }

  registerChange() {
    // publish change to status of person
    this.person.checked = !this.person.checked;
    this.pubsub.publish('Change', this.person);

    // generate and publish new message
    let txt = '';
    if (this.person.checked) {
      txt = `${this.person.name} is now selected &#128515;`;
    } else {
      txt = `${this.person.name} is now deselected &#128533;`;
    }
    this.pubsub.publish('Message', {
      "component": "app-person",
      "text": txt
    });
  }

  registerDelete() {
    this.pubsub.publish('Delete', this.person);
    this.pubsub.publish('Message', {
      "component": "app-person",
      "text": `deleting ${this.person.name} &#128561`
    });
  }
}

export default appPerson;

customElements.define('app-person', appPerson);
