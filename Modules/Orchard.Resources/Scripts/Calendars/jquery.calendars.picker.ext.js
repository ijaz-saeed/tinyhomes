/*
** NOTE: This file is generated by Gulp and should not be edited directly!
** Any changes made directly to this file will be overwritten next time its asset group is processed by Gulp.
*/

/* http://keith-wood.name/calendars.html
   Calendars date picker extensions for jQuery v2.0.1.
   Written by Keith Wood (kbwood{at}iinet.com.au) August 2009.
   Available under the MIT (http://keith-wood.name/licence.html) license. 
   Please attribute the author if you use it. */

(function($) { // Hide scope, no $ conflict

	var themeRollerRenderer = {
		picker: '<div{popup:start} id="ui-datepicker-div"{popup:end} class="ui-datepicker ui-widget ' +
		'ui-widget-content ui-helper-clearfix ui-corner-all{inline:start} ui-datepicker-inline{inline:end}">' +
		'<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all">' +
		'{link:prev}{link:today}{link:next}</div>{months}' +
		'{popup:start}<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix ' +
		'ui-corner-all">{button:clear}{button:close}</div>{popup:end}' +
		'<div class="ui-helper-clearfix"></div></div>',
		monthRow: '<div class="ui-datepicker-row-break">{months}</div>',
		month: '<div class="ui-datepicker-group">' +
		'<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix ui-corner-all">{monthHeader:MM yyyy}</div>' +
		'<table class="ui-datepicker-calendar"><thead>{weekHeader}</thead><tbody>{weeks}</tbody></table></div>',
		weekHeader: '<tr>{days}</tr>',
		dayHeader: '<th>{day}</th>',
		week: '<tr>{days}</tr>',
		day: '<td>{day}</td>',
		monthSelector: '.ui-datepicker-group',
		daySelector: 'td',
		rtlClass: 'ui-datepicker-rtl',
		multiClass: 'ui-datepicker-multi',
		defaultClass: 'ui-state-default',
		selectedClass: 'ui-state-active',
		highlightedClass: 'ui-state-hover',
		todayClass: 'ui-state-highlight',
		otherMonthClass: 'ui-datepicker-other-month',
		weekendClass: 'ui-datepicker-week-end',
		commandClass: 'ui-datepicker-cmd',
		commandButtonClass: 'ui-state-default ui-corner-all',
		commandLinkClass: '',
		disabledClass: 'ui-datepicker-disabled'
	};

	$.extend($.calendarsPicker, {

		/** Template for generating a calendar picker showing week of year.
			Found in the <code>jquery.calendars.picker.ext.js</code> module.
			@memberof CalendarsPicker */
		weekOfYearRenderer: $.extend({}, $.calendarsPicker.defaultRenderer, {
			weekHeader: '<tr><th class="calendars-week">' +
			'<span title="{l10n:weekStatus}">{l10n:weekText}</span></th>{days}</tr>',
			week: '<tr><td class="calendars-week">{weekOfYear}</td>{days}</tr>'
		}),

		/** ThemeRoller template for generating a calendar picker.
			Found in the <code>jquery.calendars.picker.ext.js</code> module.
			@memberof CalendarsPicker */
		themeRollerRenderer: themeRollerRenderer,

		/** ThemeRoller template for generating a calendar picker showing week of year.
			Found in the <code>jquery.calendars.picker.ext.js</code> module.
			@memberof CalendarsPicker */
		themeRollerWeekOfYearRenderer: $.extend({}, themeRollerRenderer, {
			weekHeader: '<tr><th class="ui-state-hover"><span>{l10n:weekText}</span></th>{days}</tr>',
			week: '<tr><td class="ui-state-hover">{weekOfYear}</td>{days}</tr>'
		}),

		/** Don't allow weekends to be selected.
			Found in the <code>jquery.calendars.picker.ext.js</code> module.
			@memberof CalendarsPicker
			@param date {CDate} The current date.
			@return {object} Information about this date.
			@example onDate: $.calendarsPicker.noWeekends */
		noWeekends: function(date) {
			return {selectable: date.weekDay()};
		},

		/** Change the first day of the week by clicking on the day header.
			Found in the <code>jquery.calendars.picker.ext.js</code> module.
			@memberof CalendarsPicker
			@param picker {jQuery} The completed datepicker division.
			@param calendar {BaseCalendar} The calendar implementation.
			@param inst {object} The current instance settings.
			@example onShow: $.calendarsPicker.changeFirstDay */
		changeFirstDay: function(picker, calendar, inst) {
			var target = $(this);
			picker.find('th span').each(function() {
				if (this.parentNode.className.match(/.*calendars-week.*/)) {
					return;
				}
				$('<a href="javascript:void(0)" class="' + this.className +
						'" title="Change first day of the week">' + $(this).text() + '</a>').
					click(function() {
						var dow = parseInt(this.className.replace(/^.*calendars-dow-(\d+).*$/, '$1'), 10);
						target.calendarsPicker('option', {firstDay: dow});
					}).
					replaceAll(this);
			});
		},

		/** A function to call when a date is hovered.
			@callback CalendarsPickerOnHover
			@param date {CDate} The date being hovered or <code>null</code> on exit.
			@param selectable {boolean} <code>true</code> if this date is selectable, <code>false</code> if not.
			@example function showHovered(date, selectable) {
	$('#feedback').text('You are viewing ' + (date ? date.formatDate() : 'nothing'));
 } */

		/** Add a callback when hovering over dates.
			Found in the <code>jquery.calendars.picker.ext.js</code> module.
			@memberof CalendarsPicker
			@param onHover {CalendarsPickerOnHover} The callback when hovering.
			@example onShow: $.calendarsPicker.hoverCallback(showHovered) */
		hoverCallback: function(onHover) {
			return function(picker, calendar, inst) {
				if ($.isFunction(onHover)) {
					var target = this;
					var renderer = inst.options.renderer;
					picker.find(renderer.daySelector + ' a, ' + renderer.daySelector + ' span').
						hover(function() {
							onHover.apply(target, [$(target).calendarsPicker('retrieveDate', this),
								this.nodeName.toLowerCase() === 'a']);
						},
						function() { onHover.apply(target, []); });
				}
			};
		},

		/** Highlight the entire week when hovering over it.
			Found in the <code>jquery.calendars.picker.ext.js</code> module.
			@memberof CalendarsPicker
			@param picker {jQuery} The completed datepicker division.
			@param calendar {BaseCalendar} The calendar implementation.
			@param inst {object} The current instance settings.
			@example onShow: $.calendarsPicker.highlightWeek */
		highlightWeek: function(picker, calendar, inst) {
			var target = this;
			var renderer = inst.options.renderer;
			picker.find(renderer.daySelector + ' a, ' + renderer.daySelector + ' span').
				hover(function() {
					$(this).parents('tr').find(renderer.daySelector + ' *').
						addClass(renderer.highlightedClass);
				},
				function() {
					$(this).parents('tr').find(renderer.daySelector + ' *').
						removeClass(renderer.highlightedClass);
				});
		},

		/** Show a status bar with messages.
			Found in the <code>jquery.calendars.picker.ext.js</code> module.
			@memberof CalendarsPicker
			@param picker {jQuery} The completed datepicker division.
			@param calendar {BaseCalendar} The calendar implementation.
			@param inst {object} The current instance settings.
			@example onShow: $.calendarsPicker.showStatus */
		showStatus: function(picker, calendar, inst) {
			var isTR = (inst.options.renderer.selectedClass === 'ui-state-active');
			var defaultStatus = inst.options.defaultStatus || '&#160;';
			var status = $('<div class="' + (!isTR ? 'calendars-status' :
				'ui-datepicker-status ui-widget-header ui-helper-clearfix ui-corner-all') + '">' +
				defaultStatus + '</div>').
				insertAfter(picker.find('.calendars-month-row:last,.ui-datepicker-row-break:last'));
			picker.find('*[title]').each(function() {
					var title = $(this).attr('title');
					$(this).removeAttr('title').hover(
						function() { status.text(title || defaultStatus); },
						function() { status.text(defaultStatus); });
				});
		},

		/** Allow easier navigation by month.
			Found in the <code>jquery.calendars.picker.ext.js</code> module.
			@memberof CalendarsPicker
			@param picker {jQuery} The completed datepicker division.
			@param calendar {BaseCalendar} The calendar implementation.
			@param inst {object} The current instance settings.
			@example onShow: $.calendarsPicker.monthNavigation */
		monthNavigation: function(picker, calendar, inst) {
			var target = $(this);
			var isTR = (inst.options.renderer.selectedClass === 'ui-state-active');
			var minDate = inst.curMinDate();
			var maxDate = inst.get('maxDate');
			var year = inst.drawDate.year();
			var html = '<div class="' + (!isTR ? 'calendars-month-nav' : 'ui-datepicker-month-nav') + '">';
			for (var i = 0; i < calendar.monthsInYear(year); i++) {
				var ord = calendar.fromMonthOfYear(year, i + calendar.minMonth) - calendar.minMonth;
				var inRange = ((!minDate || calendar.newDate(year, i + calendar.minMonth,
					calendar.daysInMonth(year, i + calendar.minMonth)).compareTo(minDate) > -1) && (!maxDate ||
					calendar.newDate(year, i + calendar.minMonth, calendar.minDay).compareTo(maxDate) < +1));
				html += '<div>' + (inRange ? '<a href="#" class="jd' +
					calendar.newDate(year, i + calendar.minMonth, calendar.minDay).toJD() + '"' : '<span') +
					' title="' + calendar.local.monthNames[ord] + '">' + calendar.local.monthNamesShort[ord] +
					(inRange ? '</a>' : '</span>') + '</div>';
			}
			html += '</div>';
			$(html).insertAfter(picker.find('div.calendars-nav,div.ui-datepicker-header:first')).
				find('a').click(function() {
					var date = target.calendarsPicker('retrieveDate', this);
					target.calendarsPicker('showMonth', date.year(), date.month());
					return false;
				});
		},

		/** Select an entire week when clicking on a week number.
			Use in conjunction with <code>weekOfYearRenderer</code>.
			Found in the <code>jquery.calendars.picker.ext.js</code> module.
			@memberof CalendarsPicker
			@param picker {jQuery} The completed datepicker division.
			@param calendar {BaseCalendar} The calendar implementation.
			@param inst {object} The current instance settings.
			@example onShow: $.calendarsPicker.selectWeek */
		selectWeek: function(picker, calendar, inst) {
			var target = $(this);
			picker.find('td.calendars-week span').each(function() {
				$('<a href="javascript:void(0)" class="' +
						this.className + '" title="Select the entire week">' +
						$(this).text() + '</a>').
					click(function() {
						var date = target.calendarsPicker('retrieveDate', this);
						var dates = [date];
						for (var i = 1; i < calendar.daysInWeek(); i++) {
							dates.push(date = date.newDate().add(1, 'd'));
						}
						if (inst.options.rangeSelect) {
							dates.splice(1, dates.length - 2);
						}
						target.calendarsPicker('setDate', dates).calendarsPicker('hide');
					}).
					replaceAll(this);
			});
		},

		/** Select an entire month when clicking on the week header.
			Use in conjunction with <code>weekOfYearRenderer</code>.
			Found in the <code>jquery.calendars.picker.ext.js</code> module.
			@memberof CalendarsPicker
			@param picker {jQuery} The completed datepicker division.
			@param calendar {BaseCalendar} The calendar implementation.
			@param inst {object} The current instance settings.
			@example onShow: $.calendarsPicker.selectMonth */
		selectMonth: function(picker, calendar, inst) {
			var target = $(this);
			picker.find('th.calendars-week').each(function() {
				$('<a href="javascript:void(0)" title="Select the entire month">' +
						$(this).text() + '</a>').
					click(function() {
						var date = target.calendarsPicker('retrieveDate', $(this).parents('table').
							find('td:not(.calendars-week) *:not(.calendars-other-month)')[0]);
						var dates = [date.day(1)];
						var dim = calendar.daysInMonth(date);
						for (var i = 1; i < dim; i++) {
							dates.push(date = date.newDate().add(1, 'd'));
						}
						if (inst.options.rangeSelect) {
							dates.splice(1, dates.length - 2);
						}
						target.calendarsPicker('setDate', dates).calendarsPicker('hide');
					}).
					appendTo(this);
			});
		},

		/** Select a month only instead of a single day.
			Found in the <code>jquery.calendars.picker.ext.js</code> module.
			@memberof CalendarsPicker
			@param picker {jQuery} The completed datepicker division.
			@param calendar {BaseCalendar} The calendar implementation.
			@param inst {object} The current instance settings.
			@example onShow: $.calendarsPicker.monthOnly */
		monthOnly: function(picker, calendar, inst) {
			var target = $(this);
			var selectMonth = $('<div style="text-align: center;"><button type="button">Select</button></div>').
				insertAfter(picker.find('.calendars-month-row:last,.ui-datepicker-row-break:last')).
				children().click(function() {
					var monthYear = picker.find('.calendars-month-year:first').val().split('/');
					target.calendarsPicker('setDate', calendar.newDate(
						parseInt(monthYear[1], 10), parseInt(monthYear[0], 10), calendar.minDay)).
						calendarsPicker('hide');
				});
			picker.find('.calendars-month-row table,.ui-datepicker-row-break table').remove();
		}
	});

})(jQuery);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImpxdWVyeS5jYWxlbmRhcnMucGlja2VyLmV4dC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQUFMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJqcXVlcnkuY2FsZW5kYXJzLnBpY2tlci5leHQuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvKiBodHRwOi8va2VpdGgtd29vZC5uYW1lL2NhbGVuZGFycy5odG1sXG4gICBDYWxlbmRhcnMgZGF0ZSBwaWNrZXIgZXh0ZW5zaW9ucyBmb3IgalF1ZXJ5IHYyLjAuMS5cbiAgIFdyaXR0ZW4gYnkgS2VpdGggV29vZCAoa2J3b29ke2F0fWlpbmV0LmNvbS5hdSkgQXVndXN0IDIwMDkuXG4gICBBdmFpbGFibGUgdW5kZXIgdGhlIE1JVCAoaHR0cDovL2tlaXRoLXdvb2QubmFtZS9saWNlbmNlLmh0bWwpIGxpY2Vuc2UuIFxuICAgUGxlYXNlIGF0dHJpYnV0ZSB0aGUgYXV0aG9yIGlmIHlvdSB1c2UgaXQuICovXG5cbihmdW5jdGlvbigkKSB7IC8vIEhpZGUgc2NvcGUsIG5vICQgY29uZmxpY3RcblxuXHR2YXIgdGhlbWVSb2xsZXJSZW5kZXJlciA9IHtcblx0XHRwaWNrZXI6ICc8ZGl2e3BvcHVwOnN0YXJ0fSBpZD1cInVpLWRhdGVwaWNrZXItZGl2XCJ7cG9wdXA6ZW5kfSBjbGFzcz1cInVpLWRhdGVwaWNrZXIgdWktd2lkZ2V0ICcgK1xuXHRcdCd1aS13aWRnZXQtY29udGVudCB1aS1oZWxwZXItY2xlYXJmaXggdWktY29ybmVyLWFsbHtpbmxpbmU6c3RhcnR9IHVpLWRhdGVwaWNrZXItaW5saW5le2lubGluZTplbmR9XCI+JyArXG5cdFx0JzxkaXYgY2xhc3M9XCJ1aS1kYXRlcGlja2VyLWhlYWRlciB1aS13aWRnZXQtaGVhZGVyIHVpLWhlbHBlci1jbGVhcmZpeCB1aS1jb3JuZXItYWxsXCI+JyArXG5cdFx0J3tsaW5rOnByZXZ9e2xpbms6dG9kYXl9e2xpbms6bmV4dH08L2Rpdj57bW9udGhzfScgK1xuXHRcdCd7cG9wdXA6c3RhcnR9PGRpdiBjbGFzcz1cInVpLWRhdGVwaWNrZXItaGVhZGVyIHVpLXdpZGdldC1oZWFkZXIgdWktaGVscGVyLWNsZWFyZml4ICcgK1xuXHRcdCd1aS1jb3JuZXItYWxsXCI+e2J1dHRvbjpjbGVhcn17YnV0dG9uOmNsb3NlfTwvZGl2Pntwb3B1cDplbmR9JyArXG5cdFx0JzxkaXYgY2xhc3M9XCJ1aS1oZWxwZXItY2xlYXJmaXhcIj48L2Rpdj48L2Rpdj4nLFxuXHRcdG1vbnRoUm93OiAnPGRpdiBjbGFzcz1cInVpLWRhdGVwaWNrZXItcm93LWJyZWFrXCI+e21vbnRoc308L2Rpdj4nLFxuXHRcdG1vbnRoOiAnPGRpdiBjbGFzcz1cInVpLWRhdGVwaWNrZXItZ3JvdXBcIj4nICtcblx0XHQnPGRpdiBjbGFzcz1cInVpLWRhdGVwaWNrZXItaGVhZGVyIHVpLXdpZGdldC1oZWFkZXIgdWktaGVscGVyLWNsZWFyZml4IHVpLWNvcm5lci1hbGxcIj57bW9udGhIZWFkZXI6TU0geXl5eX08L2Rpdj4nICtcblx0XHQnPHRhYmxlIGNsYXNzPVwidWktZGF0ZXBpY2tlci1jYWxlbmRhclwiPjx0aGVhZD57d2Vla0hlYWRlcn08L3RoZWFkPjx0Ym9keT57d2Vla3N9PC90Ym9keT48L3RhYmxlPjwvZGl2PicsXG5cdFx0d2Vla0hlYWRlcjogJzx0cj57ZGF5c308L3RyPicsXG5cdFx0ZGF5SGVhZGVyOiAnPHRoPntkYXl9PC90aD4nLFxuXHRcdHdlZWs6ICc8dHI+e2RheXN9PC90cj4nLFxuXHRcdGRheTogJzx0ZD57ZGF5fTwvdGQ+Jyxcblx0XHRtb250aFNlbGVjdG9yOiAnLnVpLWRhdGVwaWNrZXItZ3JvdXAnLFxuXHRcdGRheVNlbGVjdG9yOiAndGQnLFxuXHRcdHJ0bENsYXNzOiAndWktZGF0ZXBpY2tlci1ydGwnLFxuXHRcdG11bHRpQ2xhc3M6ICd1aS1kYXRlcGlja2VyLW11bHRpJyxcblx0XHRkZWZhdWx0Q2xhc3M6ICd1aS1zdGF0ZS1kZWZhdWx0Jyxcblx0XHRzZWxlY3RlZENsYXNzOiAndWktc3RhdGUtYWN0aXZlJyxcblx0XHRoaWdobGlnaHRlZENsYXNzOiAndWktc3RhdGUtaG92ZXInLFxuXHRcdHRvZGF5Q2xhc3M6ICd1aS1zdGF0ZS1oaWdobGlnaHQnLFxuXHRcdG90aGVyTW9udGhDbGFzczogJ3VpLWRhdGVwaWNrZXItb3RoZXItbW9udGgnLFxuXHRcdHdlZWtlbmRDbGFzczogJ3VpLWRhdGVwaWNrZXItd2Vlay1lbmQnLFxuXHRcdGNvbW1hbmRDbGFzczogJ3VpLWRhdGVwaWNrZXItY21kJyxcblx0XHRjb21tYW5kQnV0dG9uQ2xhc3M6ICd1aS1zdGF0ZS1kZWZhdWx0IHVpLWNvcm5lci1hbGwnLFxuXHRcdGNvbW1hbmRMaW5rQ2xhc3M6ICcnLFxuXHRcdGRpc2FibGVkQ2xhc3M6ICd1aS1kYXRlcGlja2VyLWRpc2FibGVkJ1xuXHR9O1xuXG5cdCQuZXh0ZW5kKCQuY2FsZW5kYXJzUGlja2VyLCB7XG5cblx0XHQvKiogVGVtcGxhdGUgZm9yIGdlbmVyYXRpbmcgYSBjYWxlbmRhciBwaWNrZXIgc2hvd2luZyB3ZWVrIG9mIHllYXIuXG5cdFx0XHRGb3VuZCBpbiB0aGUgPGNvZGU+anF1ZXJ5LmNhbGVuZGFycy5waWNrZXIuZXh0LmpzPC9jb2RlPiBtb2R1bGUuXG5cdFx0XHRAbWVtYmVyb2YgQ2FsZW5kYXJzUGlja2VyICovXG5cdFx0d2Vla09mWWVhclJlbmRlcmVyOiAkLmV4dGVuZCh7fSwgJC5jYWxlbmRhcnNQaWNrZXIuZGVmYXVsdFJlbmRlcmVyLCB7XG5cdFx0XHR3ZWVrSGVhZGVyOiAnPHRyPjx0aCBjbGFzcz1cImNhbGVuZGFycy13ZWVrXCI+JyArXG5cdFx0XHQnPHNwYW4gdGl0bGU9XCJ7bDEwbjp3ZWVrU3RhdHVzfVwiPntsMTBuOndlZWtUZXh0fTwvc3Bhbj48L3RoPntkYXlzfTwvdHI+Jyxcblx0XHRcdHdlZWs6ICc8dHI+PHRkIGNsYXNzPVwiY2FsZW5kYXJzLXdlZWtcIj57d2Vla09mWWVhcn08L3RkPntkYXlzfTwvdHI+J1xuXHRcdH0pLFxuXG5cdFx0LyoqIFRoZW1lUm9sbGVyIHRlbXBsYXRlIGZvciBnZW5lcmF0aW5nIGEgY2FsZW5kYXIgcGlja2VyLlxuXHRcdFx0Rm91bmQgaW4gdGhlIDxjb2RlPmpxdWVyeS5jYWxlbmRhcnMucGlja2VyLmV4dC5qczwvY29kZT4gbW9kdWxlLlxuXHRcdFx0QG1lbWJlcm9mIENhbGVuZGFyc1BpY2tlciAqL1xuXHRcdHRoZW1lUm9sbGVyUmVuZGVyZXI6IHRoZW1lUm9sbGVyUmVuZGVyZXIsXG5cblx0XHQvKiogVGhlbWVSb2xsZXIgdGVtcGxhdGUgZm9yIGdlbmVyYXRpbmcgYSBjYWxlbmRhciBwaWNrZXIgc2hvd2luZyB3ZWVrIG9mIHllYXIuXG5cdFx0XHRGb3VuZCBpbiB0aGUgPGNvZGU+anF1ZXJ5LmNhbGVuZGFycy5waWNrZXIuZXh0LmpzPC9jb2RlPiBtb2R1bGUuXG5cdFx0XHRAbWVtYmVyb2YgQ2FsZW5kYXJzUGlja2VyICovXG5cdFx0dGhlbWVSb2xsZXJXZWVrT2ZZZWFyUmVuZGVyZXI6ICQuZXh0ZW5kKHt9LCB0aGVtZVJvbGxlclJlbmRlcmVyLCB7XG5cdFx0XHR3ZWVrSGVhZGVyOiAnPHRyPjx0aCBjbGFzcz1cInVpLXN0YXRlLWhvdmVyXCI+PHNwYW4+e2wxMG46d2Vla1RleHR9PC9zcGFuPjwvdGg+e2RheXN9PC90cj4nLFxuXHRcdFx0d2VlazogJzx0cj48dGQgY2xhc3M9XCJ1aS1zdGF0ZS1ob3ZlclwiPnt3ZWVrT2ZZZWFyfTwvdGQ+e2RheXN9PC90cj4nXG5cdFx0fSksXG5cblx0XHQvKiogRG9uJ3QgYWxsb3cgd2Vla2VuZHMgdG8gYmUgc2VsZWN0ZWQuXG5cdFx0XHRGb3VuZCBpbiB0aGUgPGNvZGU+anF1ZXJ5LmNhbGVuZGFycy5waWNrZXIuZXh0LmpzPC9jb2RlPiBtb2R1bGUuXG5cdFx0XHRAbWVtYmVyb2YgQ2FsZW5kYXJzUGlja2VyXG5cdFx0XHRAcGFyYW0gZGF0ZSB7Q0RhdGV9IFRoZSBjdXJyZW50IGRhdGUuXG5cdFx0XHRAcmV0dXJuIHtvYmplY3R9IEluZm9ybWF0aW9uIGFib3V0IHRoaXMgZGF0ZS5cblx0XHRcdEBleGFtcGxlIG9uRGF0ZTogJC5jYWxlbmRhcnNQaWNrZXIubm9XZWVrZW5kcyAqL1xuXHRcdG5vV2Vla2VuZHM6IGZ1bmN0aW9uKGRhdGUpIHtcblx0XHRcdHJldHVybiB7c2VsZWN0YWJsZTogZGF0ZS53ZWVrRGF5KCl9O1xuXHRcdH0sXG5cblx0XHQvKiogQ2hhbmdlIHRoZSBmaXJzdCBkYXkgb2YgdGhlIHdlZWsgYnkgY2xpY2tpbmcgb24gdGhlIGRheSBoZWFkZXIuXG5cdFx0XHRGb3VuZCBpbiB0aGUgPGNvZGU+anF1ZXJ5LmNhbGVuZGFycy5waWNrZXIuZXh0LmpzPC9jb2RlPiBtb2R1bGUuXG5cdFx0XHRAbWVtYmVyb2YgQ2FsZW5kYXJzUGlja2VyXG5cdFx0XHRAcGFyYW0gcGlja2VyIHtqUXVlcnl9IFRoZSBjb21wbGV0ZWQgZGF0ZXBpY2tlciBkaXZpc2lvbi5cblx0XHRcdEBwYXJhbSBjYWxlbmRhciB7QmFzZUNhbGVuZGFyfSBUaGUgY2FsZW5kYXIgaW1wbGVtZW50YXRpb24uXG5cdFx0XHRAcGFyYW0gaW5zdCB7b2JqZWN0fSBUaGUgY3VycmVudCBpbnN0YW5jZSBzZXR0aW5ncy5cblx0XHRcdEBleGFtcGxlIG9uU2hvdzogJC5jYWxlbmRhcnNQaWNrZXIuY2hhbmdlRmlyc3REYXkgKi9cblx0XHRjaGFuZ2VGaXJzdERheTogZnVuY3Rpb24ocGlja2VyLCBjYWxlbmRhciwgaW5zdCkge1xuXHRcdFx0dmFyIHRhcmdldCA9ICQodGhpcyk7XG5cdFx0XHRwaWNrZXIuZmluZCgndGggc3BhbicpLmVhY2goZnVuY3Rpb24oKSB7XG5cdFx0XHRcdGlmICh0aGlzLnBhcmVudE5vZGUuY2xhc3NOYW1lLm1hdGNoKC8uKmNhbGVuZGFycy13ZWVrLiovKSkge1xuXHRcdFx0XHRcdHJldHVybjtcblx0XHRcdFx0fVxuXHRcdFx0XHQkKCc8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgY2xhc3M9XCInICsgdGhpcy5jbGFzc05hbWUgK1xuXHRcdFx0XHRcdFx0J1wiIHRpdGxlPVwiQ2hhbmdlIGZpcnN0IGRheSBvZiB0aGUgd2Vla1wiPicgKyAkKHRoaXMpLnRleHQoKSArICc8L2E+JykuXG5cdFx0XHRcdFx0Y2xpY2soZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0XHR2YXIgZG93ID0gcGFyc2VJbnQodGhpcy5jbGFzc05hbWUucmVwbGFjZSgvXi4qY2FsZW5kYXJzLWRvdy0oXFxkKykuKiQvLCAnJDEnKSwgMTApO1xuXHRcdFx0XHRcdFx0dGFyZ2V0LmNhbGVuZGFyc1BpY2tlcignb3B0aW9uJywge2ZpcnN0RGF5OiBkb3d9KTtcblx0XHRcdFx0XHR9KS5cblx0XHRcdFx0XHRyZXBsYWNlQWxsKHRoaXMpO1xuXHRcdFx0fSk7XG5cdFx0fSxcblxuXHRcdC8qKiBBIGZ1bmN0aW9uIHRvIGNhbGwgd2hlbiBhIGRhdGUgaXMgaG92ZXJlZC5cblx0XHRcdEBjYWxsYmFjayBDYWxlbmRhcnNQaWNrZXJPbkhvdmVyXG5cdFx0XHRAcGFyYW0gZGF0ZSB7Q0RhdGV9IFRoZSBkYXRlIGJlaW5nIGhvdmVyZWQgb3IgPGNvZGU+bnVsbDwvY29kZT4gb24gZXhpdC5cblx0XHRcdEBwYXJhbSBzZWxlY3RhYmxlIHtib29sZWFufSA8Y29kZT50cnVlPC9jb2RlPiBpZiB0aGlzIGRhdGUgaXMgc2VsZWN0YWJsZSwgPGNvZGU+ZmFsc2U8L2NvZGU+IGlmIG5vdC5cblx0XHRcdEBleGFtcGxlIGZ1bmN0aW9uIHNob3dIb3ZlcmVkKGRhdGUsIHNlbGVjdGFibGUpIHtcblx0JCgnI2ZlZWRiYWNrJykudGV4dCgnWW91IGFyZSB2aWV3aW5nICcgKyAoZGF0ZSA/IGRhdGUuZm9ybWF0RGF0ZSgpIDogJ25vdGhpbmcnKSk7XG4gfSAqL1xuXG5cdFx0LyoqIEFkZCBhIGNhbGxiYWNrIHdoZW4gaG92ZXJpbmcgb3ZlciBkYXRlcy5cblx0XHRcdEZvdW5kIGluIHRoZSA8Y29kZT5qcXVlcnkuY2FsZW5kYXJzLnBpY2tlci5leHQuanM8L2NvZGU+IG1vZHVsZS5cblx0XHRcdEBtZW1iZXJvZiBDYWxlbmRhcnNQaWNrZXJcblx0XHRcdEBwYXJhbSBvbkhvdmVyIHtDYWxlbmRhcnNQaWNrZXJPbkhvdmVyfSBUaGUgY2FsbGJhY2sgd2hlbiBob3ZlcmluZy5cblx0XHRcdEBleGFtcGxlIG9uU2hvdzogJC5jYWxlbmRhcnNQaWNrZXIuaG92ZXJDYWxsYmFjayhzaG93SG92ZXJlZCkgKi9cblx0XHRob3ZlckNhbGxiYWNrOiBmdW5jdGlvbihvbkhvdmVyKSB7XG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24ocGlja2VyLCBjYWxlbmRhciwgaW5zdCkge1xuXHRcdFx0XHRpZiAoJC5pc0Z1bmN0aW9uKG9uSG92ZXIpKSB7XG5cdFx0XHRcdFx0dmFyIHRhcmdldCA9IHRoaXM7XG5cdFx0XHRcdFx0dmFyIHJlbmRlcmVyID0gaW5zdC5vcHRpb25zLnJlbmRlcmVyO1xuXHRcdFx0XHRcdHBpY2tlci5maW5kKHJlbmRlcmVyLmRheVNlbGVjdG9yICsgJyBhLCAnICsgcmVuZGVyZXIuZGF5U2VsZWN0b3IgKyAnIHNwYW4nKS5cblx0XHRcdFx0XHRcdGhvdmVyKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0XHRvbkhvdmVyLmFwcGx5KHRhcmdldCwgWyQodGFyZ2V0KS5jYWxlbmRhcnNQaWNrZXIoJ3JldHJpZXZlRGF0ZScsIHRoaXMpLFxuXHRcdFx0XHRcdFx0XHRcdHRoaXMubm9kZU5hbWUudG9Mb3dlckNhc2UoKSA9PT0gJ2EnXSk7XG5cdFx0XHRcdFx0XHR9LFxuXHRcdFx0XHRcdFx0ZnVuY3Rpb24oKSB7IG9uSG92ZXIuYXBwbHkodGFyZ2V0LCBbXSk7IH0pO1xuXHRcdFx0XHR9XG5cdFx0XHR9O1xuXHRcdH0sXG5cblx0XHQvKiogSGlnaGxpZ2h0IHRoZSBlbnRpcmUgd2VlayB3aGVuIGhvdmVyaW5nIG92ZXIgaXQuXG5cdFx0XHRGb3VuZCBpbiB0aGUgPGNvZGU+anF1ZXJ5LmNhbGVuZGFycy5waWNrZXIuZXh0LmpzPC9jb2RlPiBtb2R1bGUuXG5cdFx0XHRAbWVtYmVyb2YgQ2FsZW5kYXJzUGlja2VyXG5cdFx0XHRAcGFyYW0gcGlja2VyIHtqUXVlcnl9IFRoZSBjb21wbGV0ZWQgZGF0ZXBpY2tlciBkaXZpc2lvbi5cblx0XHRcdEBwYXJhbSBjYWxlbmRhciB7QmFzZUNhbGVuZGFyfSBUaGUgY2FsZW5kYXIgaW1wbGVtZW50YXRpb24uXG5cdFx0XHRAcGFyYW0gaW5zdCB7b2JqZWN0fSBUaGUgY3VycmVudCBpbnN0YW5jZSBzZXR0aW5ncy5cblx0XHRcdEBleGFtcGxlIG9uU2hvdzogJC5jYWxlbmRhcnNQaWNrZXIuaGlnaGxpZ2h0V2VlayAqL1xuXHRcdGhpZ2hsaWdodFdlZWs6IGZ1bmN0aW9uKHBpY2tlciwgY2FsZW5kYXIsIGluc3QpIHtcblx0XHRcdHZhciB0YXJnZXQgPSB0aGlzO1xuXHRcdFx0dmFyIHJlbmRlcmVyID0gaW5zdC5vcHRpb25zLnJlbmRlcmVyO1xuXHRcdFx0cGlja2VyLmZpbmQocmVuZGVyZXIuZGF5U2VsZWN0b3IgKyAnIGEsICcgKyByZW5kZXJlci5kYXlTZWxlY3RvciArICcgc3BhbicpLlxuXHRcdFx0XHRob3ZlcihmdW5jdGlvbigpIHtcblx0XHRcdFx0XHQkKHRoaXMpLnBhcmVudHMoJ3RyJykuZmluZChyZW5kZXJlci5kYXlTZWxlY3RvciArICcgKicpLlxuXHRcdFx0XHRcdFx0YWRkQ2xhc3MocmVuZGVyZXIuaGlnaGxpZ2h0ZWRDbGFzcyk7XG5cdFx0XHRcdH0sXG5cdFx0XHRcdGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdCQodGhpcykucGFyZW50cygndHInKS5maW5kKHJlbmRlcmVyLmRheVNlbGVjdG9yICsgJyAqJykuXG5cdFx0XHRcdFx0XHRyZW1vdmVDbGFzcyhyZW5kZXJlci5oaWdobGlnaHRlZENsYXNzKTtcblx0XHRcdFx0fSk7XG5cdFx0fSxcblxuXHRcdC8qKiBTaG93IGEgc3RhdHVzIGJhciB3aXRoIG1lc3NhZ2VzLlxuXHRcdFx0Rm91bmQgaW4gdGhlIDxjb2RlPmpxdWVyeS5jYWxlbmRhcnMucGlja2VyLmV4dC5qczwvY29kZT4gbW9kdWxlLlxuXHRcdFx0QG1lbWJlcm9mIENhbGVuZGFyc1BpY2tlclxuXHRcdFx0QHBhcmFtIHBpY2tlciB7alF1ZXJ5fSBUaGUgY29tcGxldGVkIGRhdGVwaWNrZXIgZGl2aXNpb24uXG5cdFx0XHRAcGFyYW0gY2FsZW5kYXIge0Jhc2VDYWxlbmRhcn0gVGhlIGNhbGVuZGFyIGltcGxlbWVudGF0aW9uLlxuXHRcdFx0QHBhcmFtIGluc3Qge29iamVjdH0gVGhlIGN1cnJlbnQgaW5zdGFuY2Ugc2V0dGluZ3MuXG5cdFx0XHRAZXhhbXBsZSBvblNob3c6ICQuY2FsZW5kYXJzUGlja2VyLnNob3dTdGF0dXMgKi9cblx0XHRzaG93U3RhdHVzOiBmdW5jdGlvbihwaWNrZXIsIGNhbGVuZGFyLCBpbnN0KSB7XG5cdFx0XHR2YXIgaXNUUiA9IChpbnN0Lm9wdGlvbnMucmVuZGVyZXIuc2VsZWN0ZWRDbGFzcyA9PT0gJ3VpLXN0YXRlLWFjdGl2ZScpO1xuXHRcdFx0dmFyIGRlZmF1bHRTdGF0dXMgPSBpbnN0Lm9wdGlvbnMuZGVmYXVsdFN0YXR1cyB8fCAnJiMxNjA7Jztcblx0XHRcdHZhciBzdGF0dXMgPSAkKCc8ZGl2IGNsYXNzPVwiJyArICghaXNUUiA/ICdjYWxlbmRhcnMtc3RhdHVzJyA6XG5cdFx0XHRcdCd1aS1kYXRlcGlja2VyLXN0YXR1cyB1aS13aWRnZXQtaGVhZGVyIHVpLWhlbHBlci1jbGVhcmZpeCB1aS1jb3JuZXItYWxsJykgKyAnXCI+JyArXG5cdFx0XHRcdGRlZmF1bHRTdGF0dXMgKyAnPC9kaXY+JykuXG5cdFx0XHRcdGluc2VydEFmdGVyKHBpY2tlci5maW5kKCcuY2FsZW5kYXJzLW1vbnRoLXJvdzpsYXN0LC51aS1kYXRlcGlja2VyLXJvdy1icmVhazpsYXN0JykpO1xuXHRcdFx0cGlja2VyLmZpbmQoJypbdGl0bGVdJykuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0XHR2YXIgdGl0bGUgPSAkKHRoaXMpLmF0dHIoJ3RpdGxlJyk7XG5cdFx0XHRcdFx0JCh0aGlzKS5yZW1vdmVBdHRyKCd0aXRsZScpLmhvdmVyKFxuXHRcdFx0XHRcdFx0ZnVuY3Rpb24oKSB7IHN0YXR1cy50ZXh0KHRpdGxlIHx8IGRlZmF1bHRTdGF0dXMpOyB9LFxuXHRcdFx0XHRcdFx0ZnVuY3Rpb24oKSB7IHN0YXR1cy50ZXh0KGRlZmF1bHRTdGF0dXMpOyB9KTtcblx0XHRcdFx0fSk7XG5cdFx0fSxcblxuXHRcdC8qKiBBbGxvdyBlYXNpZXIgbmF2aWdhdGlvbiBieSBtb250aC5cblx0XHRcdEZvdW5kIGluIHRoZSA8Y29kZT5qcXVlcnkuY2FsZW5kYXJzLnBpY2tlci5leHQuanM8L2NvZGU+IG1vZHVsZS5cblx0XHRcdEBtZW1iZXJvZiBDYWxlbmRhcnNQaWNrZXJcblx0XHRcdEBwYXJhbSBwaWNrZXIge2pRdWVyeX0gVGhlIGNvbXBsZXRlZCBkYXRlcGlja2VyIGRpdmlzaW9uLlxuXHRcdFx0QHBhcmFtIGNhbGVuZGFyIHtCYXNlQ2FsZW5kYXJ9IFRoZSBjYWxlbmRhciBpbXBsZW1lbnRhdGlvbi5cblx0XHRcdEBwYXJhbSBpbnN0IHtvYmplY3R9IFRoZSBjdXJyZW50IGluc3RhbmNlIHNldHRpbmdzLlxuXHRcdFx0QGV4YW1wbGUgb25TaG93OiAkLmNhbGVuZGFyc1BpY2tlci5tb250aE5hdmlnYXRpb24gKi9cblx0XHRtb250aE5hdmlnYXRpb246IGZ1bmN0aW9uKHBpY2tlciwgY2FsZW5kYXIsIGluc3QpIHtcblx0XHRcdHZhciB0YXJnZXQgPSAkKHRoaXMpO1xuXHRcdFx0dmFyIGlzVFIgPSAoaW5zdC5vcHRpb25zLnJlbmRlcmVyLnNlbGVjdGVkQ2xhc3MgPT09ICd1aS1zdGF0ZS1hY3RpdmUnKTtcblx0XHRcdHZhciBtaW5EYXRlID0gaW5zdC5jdXJNaW5EYXRlKCk7XG5cdFx0XHR2YXIgbWF4RGF0ZSA9IGluc3QuZ2V0KCdtYXhEYXRlJyk7XG5cdFx0XHR2YXIgeWVhciA9IGluc3QuZHJhd0RhdGUueWVhcigpO1xuXHRcdFx0dmFyIGh0bWwgPSAnPGRpdiBjbGFzcz1cIicgKyAoIWlzVFIgPyAnY2FsZW5kYXJzLW1vbnRoLW5hdicgOiAndWktZGF0ZXBpY2tlci1tb250aC1uYXYnKSArICdcIj4nO1xuXHRcdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBjYWxlbmRhci5tb250aHNJblllYXIoeWVhcik7IGkrKykge1xuXHRcdFx0XHR2YXIgb3JkID0gY2FsZW5kYXIuZnJvbU1vbnRoT2ZZZWFyKHllYXIsIGkgKyBjYWxlbmRhci5taW5Nb250aCkgLSBjYWxlbmRhci5taW5Nb250aDtcblx0XHRcdFx0dmFyIGluUmFuZ2UgPSAoKCFtaW5EYXRlIHx8IGNhbGVuZGFyLm5ld0RhdGUoeWVhciwgaSArIGNhbGVuZGFyLm1pbk1vbnRoLFxuXHRcdFx0XHRcdGNhbGVuZGFyLmRheXNJbk1vbnRoKHllYXIsIGkgKyBjYWxlbmRhci5taW5Nb250aCkpLmNvbXBhcmVUbyhtaW5EYXRlKSA+IC0xKSAmJiAoIW1heERhdGUgfHxcblx0XHRcdFx0XHRjYWxlbmRhci5uZXdEYXRlKHllYXIsIGkgKyBjYWxlbmRhci5taW5Nb250aCwgY2FsZW5kYXIubWluRGF5KS5jb21wYXJlVG8obWF4RGF0ZSkgPCArMSkpO1xuXHRcdFx0XHRodG1sICs9ICc8ZGl2PicgKyAoaW5SYW5nZSA/ICc8YSBocmVmPVwiI1wiIGNsYXNzPVwiamQnICtcblx0XHRcdFx0XHRjYWxlbmRhci5uZXdEYXRlKHllYXIsIGkgKyBjYWxlbmRhci5taW5Nb250aCwgY2FsZW5kYXIubWluRGF5KS50b0pEKCkgKyAnXCInIDogJzxzcGFuJykgK1xuXHRcdFx0XHRcdCcgdGl0bGU9XCInICsgY2FsZW5kYXIubG9jYWwubW9udGhOYW1lc1tvcmRdICsgJ1wiPicgKyBjYWxlbmRhci5sb2NhbC5tb250aE5hbWVzU2hvcnRbb3JkXSArXG5cdFx0XHRcdFx0KGluUmFuZ2UgPyAnPC9hPicgOiAnPC9zcGFuPicpICsgJzwvZGl2Pic7XG5cdFx0XHR9XG5cdFx0XHRodG1sICs9ICc8L2Rpdj4nO1xuXHRcdFx0JChodG1sKS5pbnNlcnRBZnRlcihwaWNrZXIuZmluZCgnZGl2LmNhbGVuZGFycy1uYXYsZGl2LnVpLWRhdGVwaWNrZXItaGVhZGVyOmZpcnN0JykpLlxuXHRcdFx0XHRmaW5kKCdhJykuY2xpY2soZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0dmFyIGRhdGUgPSB0YXJnZXQuY2FsZW5kYXJzUGlja2VyKCdyZXRyaWV2ZURhdGUnLCB0aGlzKTtcblx0XHRcdFx0XHR0YXJnZXQuY2FsZW5kYXJzUGlja2VyKCdzaG93TW9udGgnLCBkYXRlLnllYXIoKSwgZGF0ZS5tb250aCgpKTtcblx0XHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHQvKiogU2VsZWN0IGFuIGVudGlyZSB3ZWVrIHdoZW4gY2xpY2tpbmcgb24gYSB3ZWVrIG51bWJlci5cblx0XHRcdFVzZSBpbiBjb25qdW5jdGlvbiB3aXRoIDxjb2RlPndlZWtPZlllYXJSZW5kZXJlcjwvY29kZT4uXG5cdFx0XHRGb3VuZCBpbiB0aGUgPGNvZGU+anF1ZXJ5LmNhbGVuZGFycy5waWNrZXIuZXh0LmpzPC9jb2RlPiBtb2R1bGUuXG5cdFx0XHRAbWVtYmVyb2YgQ2FsZW5kYXJzUGlja2VyXG5cdFx0XHRAcGFyYW0gcGlja2VyIHtqUXVlcnl9IFRoZSBjb21wbGV0ZWQgZGF0ZXBpY2tlciBkaXZpc2lvbi5cblx0XHRcdEBwYXJhbSBjYWxlbmRhciB7QmFzZUNhbGVuZGFyfSBUaGUgY2FsZW5kYXIgaW1wbGVtZW50YXRpb24uXG5cdFx0XHRAcGFyYW0gaW5zdCB7b2JqZWN0fSBUaGUgY3VycmVudCBpbnN0YW5jZSBzZXR0aW5ncy5cblx0XHRcdEBleGFtcGxlIG9uU2hvdzogJC5jYWxlbmRhcnNQaWNrZXIuc2VsZWN0V2VlayAqL1xuXHRcdHNlbGVjdFdlZWs6IGZ1bmN0aW9uKHBpY2tlciwgY2FsZW5kYXIsIGluc3QpIHtcblx0XHRcdHZhciB0YXJnZXQgPSAkKHRoaXMpO1xuXHRcdFx0cGlja2VyLmZpbmQoJ3RkLmNhbGVuZGFycy13ZWVrIHNwYW4nKS5lYWNoKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHQkKCc8YSBocmVmPVwiamF2YXNjcmlwdDp2b2lkKDApXCIgY2xhc3M9XCInICtcblx0XHRcdFx0XHRcdHRoaXMuY2xhc3NOYW1lICsgJ1wiIHRpdGxlPVwiU2VsZWN0IHRoZSBlbnRpcmUgd2Vla1wiPicgK1xuXHRcdFx0XHRcdFx0JCh0aGlzKS50ZXh0KCkgKyAnPC9hPicpLlxuXHRcdFx0XHRcdGNsaWNrKGZ1bmN0aW9uKCkge1xuXHRcdFx0XHRcdFx0dmFyIGRhdGUgPSB0YXJnZXQuY2FsZW5kYXJzUGlja2VyKCdyZXRyaWV2ZURhdGUnLCB0aGlzKTtcblx0XHRcdFx0XHRcdHZhciBkYXRlcyA9IFtkYXRlXTtcblx0XHRcdFx0XHRcdGZvciAodmFyIGkgPSAxOyBpIDwgY2FsZW5kYXIuZGF5c0luV2VlaygpOyBpKyspIHtcblx0XHRcdFx0XHRcdFx0ZGF0ZXMucHVzaChkYXRlID0gZGF0ZS5uZXdEYXRlKCkuYWRkKDEsICdkJykpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0aWYgKGluc3Qub3B0aW9ucy5yYW5nZVNlbGVjdCkge1xuXHRcdFx0XHRcdFx0XHRkYXRlcy5zcGxpY2UoMSwgZGF0ZXMubGVuZ3RoIC0gMik7XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHR0YXJnZXQuY2FsZW5kYXJzUGlja2VyKCdzZXREYXRlJywgZGF0ZXMpLmNhbGVuZGFyc1BpY2tlcignaGlkZScpO1xuXHRcdFx0XHRcdH0pLlxuXHRcdFx0XHRcdHJlcGxhY2VBbGwodGhpcyk7XG5cdFx0XHR9KTtcblx0XHR9LFxuXG5cdFx0LyoqIFNlbGVjdCBhbiBlbnRpcmUgbW9udGggd2hlbiBjbGlja2luZyBvbiB0aGUgd2VlayBoZWFkZXIuXG5cdFx0XHRVc2UgaW4gY29uanVuY3Rpb24gd2l0aCA8Y29kZT53ZWVrT2ZZZWFyUmVuZGVyZXI8L2NvZGU+LlxuXHRcdFx0Rm91bmQgaW4gdGhlIDxjb2RlPmpxdWVyeS5jYWxlbmRhcnMucGlja2VyLmV4dC5qczwvY29kZT4gbW9kdWxlLlxuXHRcdFx0QG1lbWJlcm9mIENhbGVuZGFyc1BpY2tlclxuXHRcdFx0QHBhcmFtIHBpY2tlciB7alF1ZXJ5fSBUaGUgY29tcGxldGVkIGRhdGVwaWNrZXIgZGl2aXNpb24uXG5cdFx0XHRAcGFyYW0gY2FsZW5kYXIge0Jhc2VDYWxlbmRhcn0gVGhlIGNhbGVuZGFyIGltcGxlbWVudGF0aW9uLlxuXHRcdFx0QHBhcmFtIGluc3Qge29iamVjdH0gVGhlIGN1cnJlbnQgaW5zdGFuY2Ugc2V0dGluZ3MuXG5cdFx0XHRAZXhhbXBsZSBvblNob3c6ICQuY2FsZW5kYXJzUGlja2VyLnNlbGVjdE1vbnRoICovXG5cdFx0c2VsZWN0TW9udGg6IGZ1bmN0aW9uKHBpY2tlciwgY2FsZW5kYXIsIGluc3QpIHtcblx0XHRcdHZhciB0YXJnZXQgPSAkKHRoaXMpO1xuXHRcdFx0cGlja2VyLmZpbmQoJ3RoLmNhbGVuZGFycy13ZWVrJykuZWFjaChmdW5jdGlvbigpIHtcblx0XHRcdFx0JCgnPGEgaHJlZj1cImphdmFzY3JpcHQ6dm9pZCgwKVwiIHRpdGxlPVwiU2VsZWN0IHRoZSBlbnRpcmUgbW9udGhcIj4nICtcblx0XHRcdFx0XHRcdCQodGhpcykudGV4dCgpICsgJzwvYT4nKS5cblx0XHRcdFx0XHRjbGljayhmdW5jdGlvbigpIHtcblx0XHRcdFx0XHRcdHZhciBkYXRlID0gdGFyZ2V0LmNhbGVuZGFyc1BpY2tlcigncmV0cmlldmVEYXRlJywgJCh0aGlzKS5wYXJlbnRzKCd0YWJsZScpLlxuXHRcdFx0XHRcdFx0XHRmaW5kKCd0ZDpub3QoLmNhbGVuZGFycy13ZWVrKSAqOm5vdCguY2FsZW5kYXJzLW90aGVyLW1vbnRoKScpWzBdKTtcblx0XHRcdFx0XHRcdHZhciBkYXRlcyA9IFtkYXRlLmRheSgxKV07XG5cdFx0XHRcdFx0XHR2YXIgZGltID0gY2FsZW5kYXIuZGF5c0luTW9udGgoZGF0ZSk7XG5cdFx0XHRcdFx0XHRmb3IgKHZhciBpID0gMTsgaSA8IGRpbTsgaSsrKSB7XG5cdFx0XHRcdFx0XHRcdGRhdGVzLnB1c2goZGF0ZSA9IGRhdGUubmV3RGF0ZSgpLmFkZCgxLCAnZCcpKTtcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdGlmIChpbnN0Lm9wdGlvbnMucmFuZ2VTZWxlY3QpIHtcblx0XHRcdFx0XHRcdFx0ZGF0ZXMuc3BsaWNlKDEsIGRhdGVzLmxlbmd0aCAtIDIpO1xuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0dGFyZ2V0LmNhbGVuZGFyc1BpY2tlcignc2V0RGF0ZScsIGRhdGVzKS5jYWxlbmRhcnNQaWNrZXIoJ2hpZGUnKTtcblx0XHRcdFx0XHR9KS5cblx0XHRcdFx0XHRhcHBlbmRUbyh0aGlzKTtcblx0XHRcdH0pO1xuXHRcdH0sXG5cblx0XHQvKiogU2VsZWN0IGEgbW9udGggb25seSBpbnN0ZWFkIG9mIGEgc2luZ2xlIGRheS5cblx0XHRcdEZvdW5kIGluIHRoZSA8Y29kZT5qcXVlcnkuY2FsZW5kYXJzLnBpY2tlci5leHQuanM8L2NvZGU+IG1vZHVsZS5cblx0XHRcdEBtZW1iZXJvZiBDYWxlbmRhcnNQaWNrZXJcblx0XHRcdEBwYXJhbSBwaWNrZXIge2pRdWVyeX0gVGhlIGNvbXBsZXRlZCBkYXRlcGlja2VyIGRpdmlzaW9uLlxuXHRcdFx0QHBhcmFtIGNhbGVuZGFyIHtCYXNlQ2FsZW5kYXJ9IFRoZSBjYWxlbmRhciBpbXBsZW1lbnRhdGlvbi5cblx0XHRcdEBwYXJhbSBpbnN0IHtvYmplY3R9IFRoZSBjdXJyZW50IGluc3RhbmNlIHNldHRpbmdzLlxuXHRcdFx0QGV4YW1wbGUgb25TaG93OiAkLmNhbGVuZGFyc1BpY2tlci5tb250aE9ubHkgKi9cblx0XHRtb250aE9ubHk6IGZ1bmN0aW9uKHBpY2tlciwgY2FsZW5kYXIsIGluc3QpIHtcblx0XHRcdHZhciB0YXJnZXQgPSAkKHRoaXMpO1xuXHRcdFx0dmFyIHNlbGVjdE1vbnRoID0gJCgnPGRpdiBzdHlsZT1cInRleHQtYWxpZ246IGNlbnRlcjtcIj48YnV0dG9uIHR5cGU9XCJidXR0b25cIj5TZWxlY3Q8L2J1dHRvbj48L2Rpdj4nKS5cblx0XHRcdFx0aW5zZXJ0QWZ0ZXIocGlja2VyLmZpbmQoJy5jYWxlbmRhcnMtbW9udGgtcm93Omxhc3QsLnVpLWRhdGVwaWNrZXItcm93LWJyZWFrOmxhc3QnKSkuXG5cdFx0XHRcdGNoaWxkcmVuKCkuY2xpY2soZnVuY3Rpb24oKSB7XG5cdFx0XHRcdFx0dmFyIG1vbnRoWWVhciA9IHBpY2tlci5maW5kKCcuY2FsZW5kYXJzLW1vbnRoLXllYXI6Zmlyc3QnKS52YWwoKS5zcGxpdCgnLycpO1xuXHRcdFx0XHRcdHRhcmdldC5jYWxlbmRhcnNQaWNrZXIoJ3NldERhdGUnLCBjYWxlbmRhci5uZXdEYXRlKFxuXHRcdFx0XHRcdFx0cGFyc2VJbnQobW9udGhZZWFyWzFdLCAxMCksIHBhcnNlSW50KG1vbnRoWWVhclswXSwgMTApLCBjYWxlbmRhci5taW5EYXkpKS5cblx0XHRcdFx0XHRcdGNhbGVuZGFyc1BpY2tlcignaGlkZScpO1xuXHRcdFx0XHR9KTtcblx0XHRcdHBpY2tlci5maW5kKCcuY2FsZW5kYXJzLW1vbnRoLXJvdyB0YWJsZSwudWktZGF0ZXBpY2tlci1yb3ctYnJlYWsgdGFibGUnKS5yZW1vdmUoKTtcblx0XHR9XG5cdH0pO1xuXG59KShqUXVlcnkpO1xuIl0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
