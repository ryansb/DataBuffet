$(function () {
	var chart;
	$(document).ready(function() {
		document.chart_id = $('#chart_id').val();
		
		setTimeout(requestChart, 100);
		
		$('#increment-x').click(function(event) {
			addCoord(document, event, 'x', 1)
		});
		$('#increment-y').click(function(event) {
			addCoord(document, event, 'y', 1)
		});
		$('#decrement-x').click(function(event) {
			addCoord(document, event, 'x', -1)
		});
		$('#decrement-y').click(function(event) {
			addCoord(document, event, 'y', -1)
		});
		chart = new Highcharts.Chart({
			chart: {
					renderTo: 'container',
					defaultSeriesType: 'spline',
			},
			title: {
					text: 'Updated live!'
			},
			xAxis: {
					minPadding: 0.2,
					maxPadding: 0.2,
					title: {
						text: 'X',
						margin: 80
					}
			},
			yAxis: {
					minPadding: 0.2,
					maxPadding: 0.2,
					title: {
						text: 'Y',
						margin: 80
					}
			},
			series: [{
					name: 'Random data',
					data: []
			}]
		 });
	});

	function requestChart() {
		var host = 'ws://localhost:8000/chart/data?chart_id=' + document.chart_id;
		var first_round = true
		var websocket = new WebSocket(host);

		websocket.onopen = function (evt) { };
		websocket.onmessage = function(evt) {
			p = $.parseJSON(evt.data)['chartPoints'];
			if (first_round) {
				for (i=1; i<p.length; i++) {
					chart.series[0].addPoint(p[i], false, false);
				}
				first_round = false
			}
			$('#count').html("[" + p[p.length-1] + "]");
			chart.series[0].addPoint(p[p.length-1], true, true);
		};
		websocket.onerror = function (evt) { };
	}

	function addCoord(document, event, coord, amount) {
		p = $.parseJSON($('#count')[0].childNodes[0].data);
		if (coord == 'y') {
			p[1] = p[1] + amount
		}
		if (coord == 'x') {
			p[0] = p[0] + amount
		}
		d = {chart_id: document.chart_id, payload: JSON.stringify({chart: 'LineGraph', x: p[0], y: p[1]})}
		$(event.target).attr('disabled', 'disabled');
		jQuery.post(
			'//localhost:8000/chart',
			d,
			function(data, status, xhr) {
				$(event.target).removeAttr('disabled');
			},
			'json'
		);
	}
});
