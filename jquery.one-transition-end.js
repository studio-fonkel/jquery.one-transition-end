(function ($) {

  var transitionEndType = whichTransitionEvent();


  /** --------------------------------------------------------------
    * $.fn.oneTransitionEnd (shorthand: $.fn.oTE)
    * Usage:

    // Do something after fading out an element
    const $element = $('.someElement').first();
    $element.oTE('opacity', () => {
      // do something
    }, parseFloat($element.css('opacity')) === 0).css('opacity', 0);
    ------------------------------------------------------------- **/
  $.fn.oneTransitionEnd = function (property, callback, conditionsToSkip) {
    if (conditionsToSkip === true) {
      callback();
      return this;
    }

    var that = this;

    if (transitionEndType) {
      var innerCallback = function (event) {
        if (event.originalEvent.propertyName.substr(-(property.length)) === property && event.target == that[0]) {
          callback();
          that.off(transitionEndType, innerCallback);
        }
      };

      this.on(transitionEndType, innerCallback);
    }

    else {
      callback();
    }

    return this;
  };


  /** --------------------------------------------------------------
    * $.fn.oneTransitionEndPromisified (shorthand: $.fn.oTEP)
    * Usage:

    // Do something after fading out an element
    const $element = $('.someElement').first();
    $element.oTEP('opacity', parseFloat($element.css('opacity')) === 0, () => {
      $element.css('opacity', 0);
    }).then(() => {
      // do something
    });
    ------------------------------------------------------------- **/
  $.fn.oneTransitionEndPromisified = function (property, conditionsToSkip, transitionAction) {
    var that = this;

    return new Promise(function (resolve) {
      that.oneTransitionEnd(property, resolve, conditionsToSkip);
      transitionAction();
    });
  };


  /** --------------------------------------------------------------
    * Shorthands
    ------------------------------------------------------------- **/
  $.fn.oTE = $.fn.oneTransitionEnd;
  $.fn.oTEP = $.fn.oneTransitionEndPromisified;


  /** --------------------------------------------------------------
    * Helpers
    ------------------------------------------------------------- **/
  // whichTransitionEvent function from David Walsh: http://davidwalsh.name/css-animation-callback
  function whichTransitionEvent () {
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
