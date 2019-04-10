import PubSub from '../pubsub/pubsub.js';

class appConsole extends HTMLElement {
  constructor() {
		super();
		this.pubsub = PubSub;
		this.renderData = this.renderData.bind(this);
		this.renderData(this.pubsub.getData('People', null));
		this.pubsub.subscribe('newPerson', 'getPeople', null, this.renderData);
  }
  	
	// renders all data from 'getPeople()'
	renderData(data){
		this.innerHTML = `	
		<small>&lt;app-console&gt;</small>
		<h2>Console monitoring stuff</h2>
		<p><span class="bold">${data.length}</span> people so far, <span class="bold">
		${this.pubsub.getData('CheckedTotal', null)}</span> are checked</p>
		`;
	}
}

customElements.define('app-console', appConsole);