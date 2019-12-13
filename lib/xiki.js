'use babel';

import XikiView from './xiki-view';
import { CompositeDisposable } from 'atom';

export default {

  xikiView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.xikiView = new XikiView(state.xikiViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.xikiView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'xiki:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.xikiView.destroy();
  },

  serialize() {
    return {
      xikiViewState: this.xikiView.serialize()
    };
  },

  toggle() {
    // console.log('Xiki was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
