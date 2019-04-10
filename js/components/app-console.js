import PubSub from '../pubsub/pubsub.js';

class appConsole extends HTMLElement {
  constructor() {
		super();
		this.pubsub = PubSub;
		this.renderData = this.renderData.bind(this);
		this.renderData(this.pubsub.getData('getPeople', null));
		this.pubsub.subscribe('NewPerson', 'getPeople', null, this.renderData);
		this.pubsub.subscribe('ChangePerson', 'getPeople', null, this.renderData);
		this.pubsub.subscribe('DeletePerson', 'getPeople', null, this.renderData);
  }

	// renders all data from 'getPeople()'
	renderData(data){
		this.innerHTML = `	
		<small>&lt;app-console&gt;</small>
		<h2>Console monitoring stuff</h2>
		<p><span class="bold">${data.length}</span> people so far, <span class="bold">
		${this.pubsub.getData('getCheckedTotal', null)}</span> are checked</p>
		`;
	}
}

customElements.define('app-console', appConsole);