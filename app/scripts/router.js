define([
	'backbone',
  'channel'
	], function (Backbone, channel) {
		'use strict';

		var AppRouter = Backbone.Router.extend({
			routes: {
				'test/:id': 'showRegion'
			},

      showRegion: function (id) {
        channel.trigger('newRegion', id);
      }
		});

		return AppRouter;
	}
);