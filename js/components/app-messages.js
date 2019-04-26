import RootElement from './app-rootelement.js';

import PubSub from '../pubsub/pubsub.js';

class appMessages extends RootElement {
  constructor() {
		super();
		this.pubsub = PubSub;
		this.renderData(this.pubsub.getData('getMessage', null));
		this.pubsub.subscribe('Message', 'getMessage', null, this.renderData);
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