// Generated by CoffeeScript 1.7.1
var ModalLogic, exports,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

exports = exports != null ? exports : window;

exports.ModalLogic = ModalLogic = (function() {
  function ModalLogic() {
    this.showModal = __bind(this.showModal, this);
    this.createOrUpdateModalContent = __bind(this.createOrUpdateModalContent, this);
    var that;
    that = this;
    $('a[data-remote][modal]').on('ajax:complete', function(jq_event, xhr) {
      var response;
      response = JSON.parse(xhr.responseText);
      if (response != null) {
        if (response.close != null) {
          return window.location = response.redirect_location != null ? response.redirect_location : window.location;
        } else {
          return that.createOrUpdateModalContent(response);
        }
      } else {
        return that.createOrUpdateModalContent({
          title: 'Error',
          body: 'There was an error.  Please reload the page and try again'
        });
      }
    });
  }

  ModalLogic.prototype.processResponse = function(jq_event, xhr) {
    var response, that;
    that = this;
    response = JSON.parse(xhr.responseText);
    if (response != null) {
      if (response.close != null) {
        return window.location = response.redirect_location != null ? response.redirect_location : window.location;
      } else {
        return that.createOrUpdateModalContent(response);
      }
    } else {
      return that.createOrUpdateModalContent({
        title: 'Error',
        body: 'There was an error.  Please reload the page and try again'
      });
    }
  };

  ModalLogic.prototype.createOrUpdateModalContent = function(context) {
    var $modal, html, that;
    html = HandlebarsTemplates['modal/crud']({
      modal: context
    });
    $modal = $('.modal.modal-logic');
    if ($modal.length > 0) {
      $modal.modal('hide').replaceWith(html);
    } else {
      $('body').append(html);
    }
    that = this;
    $('form[data-remote][modal]').on('ajax:complete', function(jq_event, xhr) {
      return that.processResponse(jq_event, xhr);
    });
    return this.showModal();
  };

  ModalLogic.prototype.showModal = function() {
    return $('.modal.modal-logic').modal('show');
  };

  return ModalLogic;

})();
