import RootElement from './app-rootelement.js';

class appChosenPerson extends RootElement {
  constructor(person) {
    super();
    this.person = person;
    this.renderData()
  }

  renderData() {
	this.innerHTML = `
		${this.person.id}: ${this.person.name}</br>
    `;
  }
}

export default appChosenPerson;

customElements.define('app-chosenperson', appChosenPerson);