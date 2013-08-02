define([
  'jquery',
  'underscore',
  'backbone',
  'leaflet',
  'collections/crimes',
  '../channel',
  '../config',
  '../views/panel',
  'models/user-input',
  'text!templates/attribution.html',
  'controls/polygon-draw',
  '../models/crime-type',
  '../views/crime-type'
  ], function ($, _, Backbone, L, Crimes, channel, config, Panel, UserInput, AttributionTemplate, DrawControl, CrimeTypeModel, CrimeTypeView) {

    var HomeView = Backbone.View.extend({

      el: $('body'),

      model: UserInput,

      initialize: function () {

        var panel = new Panel();

        Crimes.once('sync', this.createTypes, this);

        Crimes.on('sync', this.collectionReset);

        var self = this;

        channel.on('startDate', function (date) {
          self.model.set('startDate', date);
          Crimes.start = date;
        });

        channel.on('endDate', function (date) {
          self.model.set('endDate', date);
          Crimes.end = date;
        });

        channel.on('newRegion', this.loadRegion, this);

        this.model.on('change', this.fetchCrimes, this);

        channel.trigger('getDates');

        window.map = L.map('map', {
          center: new L.LatLng(39.952335, -75.163789),
          zoom: 13,
          attributionControl: false,
          touchZoom: true,
          dragging: true,
          maxBounds: new L.LatLngBounds([39.849719,-75.308533], [40.123346,-74.904785])
        });

        var tonerUrl = 'http://{S}tile.stamen.com/toner/{Z}/{X}/{Y}.png';

        var url = tonerUrl.replace(/({[A-Z]})/g, function(s) { return s.toLowerCase(); });

        var basemap = new L.tileLayer(url, {
          subdomains: ['','a.','b.','c.','d.'],
          minZoom: 0,
          maxZoom: 20,
          type: 'png'
        });
        basemap.addTo(map);

        var mapAttribution = new L.Control.Attribution({
          prefix: false,
          position: 'bottomright'
        });

        mapAttribution.addAttribution(AttributionTemplate);
        map.addControl(mapAttribution);
        
        var drawControl = DrawControl;

        map.addControl(DrawControl);

        this.drawnPolygon = new L.FeatureGroup();

        // Update userInput model when geometry drawn
        map.on('draw:created', function(evt) {
          geometry = {};
          geometry.rings = [];
          var tempArray = [];
          geometry.spatialReference = {'wkid': 4326};

          for (var i=0; i < evt.layer._latlngs.length; i = i + 1) {
            var lat = evt.layer._latlngs[i].lat;
            var lng = evt.layer._latlngs[i].lng;
            tempArray.push([lng, lat]);
          }

          tempArray.push([evt.layer._latlngs[0].lng, evt.layer._latlngs[0].lat]);
          geometry.rings.push(tempArray);
          var queryGeometry = JSON.stringify(geometry);

          Crimes.geometry = queryGeometry;
          self.model.set('geometry', queryGeometry);

          self.drawnPolygon.clearLayers();
          map.addLayer(self.drawnPolygon);
          self.drawnPolygon.addLayer(evt.layer);
          map.fitBounds(self.drawnPolygon.getBounds());

        });

        this.render();

      },

      createTypes: function () {
        $.each(config.types, function(index, type) {
          var typeModel = new CrimeTypeModel({
            code: type.code,
            name: type.name
          });
          var typeView = new CrimeTypeView({model: typeModel});
          //panel.renderResults();
          channel.on('results:rerendered', function () {
            $('#results').append(typeView.render().el);
          });
          
        });
      },

      fetchCrimes: function () {
        if (Crimes.geometry === '') {
          console.log('Don\'t fetch because there\'s no geometry yet');
        } else {
          Crimes.fetch();
        }
      },

      collectionReset: function (collection) {
        channel.trigger('newCrimes', collection);
      },

      render: function () {
        return this;
      },

      // Just a test
      loadRegion: function (id) {
        console.log('Loading region ' + id + ' for AppView!');
      }
    });

    return HomeView;
  }
);