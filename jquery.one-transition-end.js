(function ($) {

  var transitionend = whichTransitionEvent();

  $.fn.oneTransitionEnd = function(property, callback) {
    var that = this;

    if (transitionend) {
      var innerCallback = function (event) {
        if (event.originalEvent.propertyName.substr(- property.length) === property && event.target == that[0]) {
          callback();
          that.off(transitionend, innerCallback);
        }
      };

      this.on(transitionend, innerCallback);
    }

    else {
      callback();
    }

    return this;
  };

  // Function from David Walsh: http://davidwalsh.name/css-animation-callback
  function whichTransitionEvent(){
    var t,
        el = document.createElement("fakeelement");

    var transitions = {
      "transition"      : "transitionend",
      "OTransition"     : "oTransitionEnd",
      "MozTransition"   : "transitionend",
      "WebkitTransition": "webkitTransitionEnd"
    };

    for (t in transitions){
      if (el.style[t] !== undefined){
        return transitions[t];
      }
    }
  }

})(jQuery);
