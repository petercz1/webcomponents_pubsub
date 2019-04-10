import PubSub from '../pubsub/pubsub.js';
import Person from './app-person.js';

class appPeople extends HTMLElement {
  constructor() {
    super();
    this.pubsub = PubSub;
    this.renderData = this.renderData.bind(this);
    this.renderData(this.pubsub.getData('People',null));
    this.pubsub.subscribe('newPerson', 'getPeople', null, this.renderData, 'People', null);
  }

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