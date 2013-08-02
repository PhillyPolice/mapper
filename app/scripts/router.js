define([
	'backbone',
  'channel'
	], function (Backbone, channel) {
		'use strict';

		var AppRouter = Backbone.Router.extend({
			routes: {
				'test/:id': 'showRegion',
        'about': 'showAbout'
			},

      showRegion: function (id) {
        channel.trigger('newRegion', id);
      },

      showAbout: function () {
        channel.trigger('route:about');
      }
		});

		return AppRouter;
	}
);