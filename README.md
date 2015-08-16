# Micro-View-Management
A Simple ViewManager for initing, opening and closing views.

## Example Usage
```javascript

    var viewManager = new ViewManager();


    function View(data) {
      this.data = data;
    };

    View.prototype = {

      init: function( data, done ) {
        this.el = document.createElement('div')
        this.el.classList.add('section')
        this.el.innerHTML = "<p>View: "+this.data.title+"</p>"
        document.body.appendChild(this.el)
        done();
      },

      animateIn: function( data, done ) {
        TweenMax.to(
          this.el,
          0.4,
          {
            opacity: 1,
            onComplete: done
          }
        )
      },

      animateOut: function( data, done ) {
        TweenMax.to(
          this.el,
          0.4,
          {
            opacity: 0,
            onComplete: done
          }
        )
      },

      destroy: function( data, done ) {
        this.el.parentNode.removeChild(this.el)
        done();
      }
    };

    var view1 = new View({title: "Home"});
    var view2 = new View({title: "About"});
```
