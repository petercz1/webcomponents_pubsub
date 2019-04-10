import PubSub from '../pubsub/pubsub.js';
import Person from './app-person.js';

class appPeople extends HTMLElement {
  constructor() {
    super();
    this.pubsub = PubSub;
    this.renderData = this.renderData.bind(this);
    this.renderData(this.pubsub.getData('getPeople',null));
    this.pubsub.subscribe('NewPerson', 'getPeople', null, this.renderData);
    this.pubsub.subscribe('NewPerson', 'getPeople', null, this.renderData);
  }

  // renders all people returned from 'getPeople()'
  renderData(people) {
    this.innerHTML = `
      <small>&lt;app-people&gt;</small>
      <h2>All people</h2>
      <p> uncheck to deselect</p>
      <div id="people"></div>
    `;
    people.forEach(person => {
      this.querySelector('#people').append(new Person(person));
    });
  }
}

export default appPeople;

customElements.define('app-people', appPeople);