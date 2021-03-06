define([
  'jquery',
  'underscore',
  'backbone',
  'text!../templates/panel.html',
  'text!../templates/results.html',
  'text!../templates/crime.html',
  '../controls/date-picker',
  '../channel'
  ], function ($, _, Backbone, PanelTemplate, ResultsTemplate, CrimeTemplate, DatePicker, channel) {

    var Panel = Backbone.View.extend({

      el: $('#right-pane'),

      events: {
        'click a.results-back': 'resultsBack',
        'click a.crime-back': 'crimeBack'
      },

      initialize: function () {
        channel.on('newCrimes', this.renderResults, this);
        channel.on('model:select', this.renderCrime, this);
        this.render();
      },

      render: function () {
        this.$el.html(PanelTemplate);
        DatePicker.init();
      },

      renderResults: function (Crimes) {
        if (Crimes) {
          var crimeTotal = Crimes.length;
          var start = Crimes.start;
          var end = Crimes.end;
          this.results = _.template(ResultsTemplate, {total: crimeTotal, startDate: start, endDate: end});
          this.$el.html(this.results);
        } else {
          this.$el.html(this.results);
        }
        channel.trigger('results:rerendered');
      },

      renderCrime: function (model) {
        this.$el.html(_.template(CrimeTemplate, model.toJSON()));
      },

      resultsBack: function () {
        this.render();
      },

      crimeBack: function () {
        this.renderResults();
        channel.trigger('order:rerender');
      }

    });
    return Panel;
  }
);