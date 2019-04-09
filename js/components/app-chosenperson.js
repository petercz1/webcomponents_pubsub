import PubSub from '../pubsub/pubsub.js';

class appChosenPerson extends HTMLElement {
  constructor(person) {
    super();
    this.pubsub = PubSub;
    this.renderData = this.renderData.bind(this);
    this.renderData(person)
  }

  renderData(person) {
    this.person = person;
	this.innerHTML = `
		${person.id}: ${person.name}</br>
    `;
  }
}

export default appChosenPerson;

customElements.define('app-chosenperson', appChosenPerson);