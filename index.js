"use strict";

class ViewManager {

  constructor() {
    this.currentView = null;
    this.newView = null;
  }

  /*
   *  Show View
   */

  show(view, onComplete, data = {}) {

    this.data = data;

    if( view !== this.newView && view !== this.currentView ) {

      /*
       * Destroy old view if needed
       */

      if( this.newView && this.newView.destroy ){
        this.newView.destroy(this.data, function() { });
      }

      this.newView = view;
      view.init( this.data, this.swap.bind( this, this.newView, onComplete ) );
    }
  }

  /*
   * Swap content
   */

  swap(newView, onComplete) {
    if( newView === this.newView ) {
      let oldView = this.currentView;
      let onOldOut;

      /**
       * On new View in
       */
      let onNewIn = function() {
        if( onComplete ) {
          onComplete( newView, oldView );
        }
      };

      /**
       *  Bring in new View
       */
      let bringInNewView = function() {
        this.currentView = newView;
        this.newView = null;

        if( newView.animateIn ) {
          newView.animateIn( this.data, onNewIn );
        } else {
          onNewIn();
        }
      }.bind( this );

      /**
       * Bring out old View
       */
      let takeOutOldView = function() {

        // if there's an animateOut function execute it on oldContent
        if( oldView.animateOut ) {
          oldView.animateOut( this.data, onOldOut );
        } else {
          onOldOut();
        }
      }.bind( this );

      /**
       * Destroy old View
       */
      let destroyOldView = function() {
        if( oldView.destroy ) {
          oldView.destroy( this.data, function() { } );
        }
      }.bind( this );

      /**
       * If View already visible
       */
      if( this.currentView ) {

        onOldOut = () => {
          destroyOldView();
          bringInNewView();
        };

        takeOutOldView();

      /**
       * Else just show new content
       */
      } else {
        bringInNewView();
      }
    }
  }

}

if (typeof module !== "undefined" && module.exports) {
  module.exports = function instance(settings){
    return new ViewManager(settings);
  };
}
