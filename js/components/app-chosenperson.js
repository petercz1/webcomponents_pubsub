class appChosenPerson extends HTMLElement {
  constructor(person) {
    super();
    this.person = person;
    this.renderData = this.renderData.bind(this);
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