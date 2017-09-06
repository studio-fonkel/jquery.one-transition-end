(function ($) {

  $.fn.oneTransitionEnd = function(property, callback) {
    var that = this;
    var innerCallback = function (event) {
        if (event.originalEvent.propertyName.substr(- property.length) === property) {
            callback();
            that.off(whichTransitionEvent(), innerCallback);
        }
    };

    this.on(whichTransitionEvent(), innerCallback);

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

