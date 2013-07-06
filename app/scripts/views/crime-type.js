define([
	'jquery',
	'underscore',
	'backbone',
	'leaflet',
	'../views/crime',
	'../channel',
  'text!../templates/crime-type.html'
	], function ($, _, Backbone, L, Crime, channel, CrimeTypeTemplate) {
		var CrimeType = Backbone.View.extend({

      className: 'icon-circle',

      events: {
        'click': 'clicked'
      },
    
			initialize: function () {
				this.layer = new L.LayerGroup();

				_.bindAll(this, 'render', 'addMarker', 'removeLayer', 'addLayer', 'updateCrimes');
				this.model.on('hide', this.removeLayer);
				this.model.on('show', this.addLayer);
				this.model.crimes.on('reset', this.render);
				channel.on('newCrimes', this.updateCrimes);
        channel.on('order:rerender', this.render);
			},

			render: function () {
				this.removeLayer();
				this.layer.clearLayers();
				this.model.crimes.each(this.addMarker);
				if (this.model.get('visibility')) {
					this.addLayer();
				}
        var html = _.template(CrimeTypeTemplate, this.model.toJSON());
        this.$el.html(html);
        (this.$el).addClass('_' + this.model.get('code'));
        return this;
			},

			addMarker: function (model) {
				var crime = new Crime({model: model});
				var marker = crime.returnMarker();
				marker.addTo(this.layer);
        model.marker = marker;
        marker.on('click', function () {
          channel.trigger('model:select', model);
        });
        model.on('destroy', function () {
          console.log('model destroyed!');
        });
			},

			removeLayer: function () {
				window.map.removeLayer(this.layer);
			},

			addLayer: function () {
				window.map.addLayer(this.layer);
			},

			updateCrimes: function (crimes) {
				this.model.updateCrimes(crimes);
			},

      clicked: function (evt) {
        evt.preventDefault();
        this.model.toggle();

        if (this.model.get('visibility')) {
          this.addLayer();
          (this.$el).addClass('icon-circle-empty');
          (this.$el).removeClass('icon-circle');
          (this.$el).addClass('icon-circle');
        } else {
          this.removeLayer();
          (this.$el).removeClass('icon-circle');
          (this.$el).addClass('icon-circle-empty');
        }
      },

      isHidden: function() {
        var isHidden = this.model.get('visibility');
        return false;
      }
		});

		return CrimeType;
	}
);