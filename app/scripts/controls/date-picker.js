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
    DatePicker.init = function () {
      // TODO: Fix the start and end dates - for some reason isn't working how it should    
      var datePickerStart = $('input.datepicker_start').Zebra_DatePicker({
        pair: $('input.datepicker_end'),
        direction: ['2006-01-01', lastDay],
        start_date: firstOfMonth
      });

      datePickerStart[0].value = firstOfMonth;

      var datePickerEnd = $('input.datepicker_end').Zebra_DatePicker({
        direction: ['2006-01-01', lastDay],
        start_date: firstOfMonth
      });

      datePickerEnd[0].value = lastDay;

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

      channel.on('getDates', function() {
        channel.trigger('startDate', datePickerStart[0].value);
        channel.trigger('endDate', datePickerEnd[0].value);
      });
    };

    return DatePicker;
	}
);