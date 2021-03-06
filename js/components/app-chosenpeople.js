import RootElement from './app-rootelement.js';
import PubSub from '../pubsub/pubsub.js';
import ChosenPerson from './app-chosenperson.js';

class appChosenPeople extends RootElement {
  constructor() {
    super();
    this.pubsub = PubSub;
    this.renderData(this.pubsub.getData('getChosenPeople', null));
    this.pubsub.subscribe('NewPerson', 'getChosenPeople', null, this.renderData);
    this.pubsub.subscribe('ChangePerson', 'getChosenPeople', null, this.renderData);
    this.pubsub.subscribe('DeletePerson', 'getChosenPeople', null, this.renderData);
  }

  // renders all data from 'getChosenPeople()'
  renderData(data) {
    this.innerHTML = `
      <small>&lt;app-chosenpeople&gt;</small>
      <h2>The chosen ones</h2>
      <div id="chosenones"></div>
    `;
    data.forEach(person => {
      this.querySelector('#chosenones').append(new ChosenPerson(person));
    });
    [...this.getElementsByTagName('input')].forEach(input => {
      input.setAttribute('disabled', true);
    });
  }
}

customElements.define('app-chosenpeople', appChosenPeople);

export default appChosenPeople;