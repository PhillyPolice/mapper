/* jshint -W106 */
define([
	'jquery',
	'../channel',
	'zebra'
	], function ($, channel) {

		var formatDate = function(d) {
			var year = d.getFullYear();
			var month = d.getMonth() + 1;
			month = ('0' + month).slice(-2);
			var day = ('0' + d.getDate()).slice(-2);
			return year + '-' + month + '-' + day;
		};

		var today = new Date();

		var lastDay = today;
		lastDay.setDate(today.getDate() - 2);
		lastDay = formatDate(lastDay);

		var firstOfMonth = today;
		firstOfMonth.setDate(1);
		firstOfMonth = formatDate(firstOfMonth);

    var DatePicker = {};

    DatePicker.status = false;

    DatePicker.init = function () {
      console.log('In init of date picker');
      console.log(this);
      // TODO: Fix the start and end dates - for some reason isn't working how it should    
      this.startDate = $('input.datepicker_start').Zebra_DatePicker({
        pair: $('input.datepicker_end'),
        direction: ['2006-01-01', lastDay],
        start_date: firstOfMonth
      });

      this.startDate[0].value = firstOfMonth;

      this.endDate = $('input.datepicker_end').Zebra_DatePicker({
        direction: ['2006-01-01', lastDay],
        start_date: firstOfMonth
      });

      this.endDate[0].value = lastDay;

      $('input.datepicker_start').Zebra_DatePicker({
        onSelect: function(format, dateStr, dateObj, element) {
          var newDate = dateObj;
          newDate.setDate(dateObj.getDate() + 1);

          var dpEnd = $('input.datepicker_end').data('Zebra_DatePicker');
          dpEnd.update({
            direction: [formatDate(newDate), lastDay]
          });

          channel.trigger('startDate', dateStr);
        }
      });

      $('input.datepicker_end').Zebra_DatePicker({
        onSelect: function(format, dateStr, dateObj, element) {
          channel.trigger('endDate', dateStr);
        }
      });

      var self = this;

      channel.on('getDates', function() {
        console.log(self);
        channel.trigger('startDate', self.startDate[0].value);
        channel.trigger('endDate', self.endDate[0].value);
      });
      
      this.status = true;
    };

    DatePicker.isInitialized = function () {
        if (this.status) {
          return true;
        } else {
          return false;
        }
      };

    return DatePicker;
	}
);