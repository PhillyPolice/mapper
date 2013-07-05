define([
  'jquery',
  'underscore',
  'backbone',
  'text!../templates/panel.html',
  '../controls/date-picker'
  ], function ($, _, Backbone, PanelTemplate, DatePicker) {

    var Panel = Backbone.View.extend({

      el: $('#right-pane'),

      initialize: function () {
        this.render();
        DatePicker.init();
      },

      render: function () {
        this.$el.append(PanelTemplate);
      }
    })
    return Panel;
  }
);