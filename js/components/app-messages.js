import PubSub from '../pubsub/pubsub.js';

class appMessages extends HTMLElement {
  constructor() {
		super();
		this.pubsub = PubSub;
		this.renderData = this.renderData.bind(this);
		this.renderData(this.pubsub.getData('Message', null));
		this.pubsub.subscribe('message', 'getMessage', null, this.renderData);
  }
  	// renders last message
	renderData(message){
		this.innerHTML = `
			<small>&lt;app-messages&gt;</small>
			<h2>Messages</h2>
			${message.component ?
				`<p>Component: &lt;${message.component}&gt;, message: ${message.text}</p>`
			:''}
		`;
	}
}

customElements.define('app-messages', appMessages);