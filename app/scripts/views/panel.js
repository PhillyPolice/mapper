define([
  'jquery',
  'underscore',
  'backbone',
  'text!../templates/panel.html',
  'text!../templates/results.html',
  '../controls/date-picker',
  '../channel'
  ], function ($, _, Backbone, PanelTemplate, ResultsTemplate, DatePicker, channel) {

    var Panel = Backbone.View.extend({

      el: $('#right-pane'),

      events: {
        'click a.results-back': 'clicked'
      },

      initialize: function () {
        channel.on('newCrimes', this.renderResults, this);
        this.render();
      },

      render: function () {
        this.$el.html(PanelTemplate);
        DatePicker.init();
      },

      renderResults: function () {
        this.$el.html(ResultsTemplate);
      },

      clicked: function () {
        this.render();
      }

    });
    return Panel;
  }
);