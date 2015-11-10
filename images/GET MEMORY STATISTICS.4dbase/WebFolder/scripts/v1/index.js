(function($, a, m, w){		function filterEvent(e){		e.stopPropagation();		e.preventDefault();			return false;	}		//disable text selection on page		$('body').on('selectstart', filterEvent).on('drop', filterEvent).on('dragover', filterEvent).css({		'-webkit-user-select':'none',		'-moz-user-select':'none',		'-ms-user-select':'none',		'-o-user-select':'none',		'user-select':'none'	}); 	a.set({'delay':1500});    m.lang(navigator.language);	    w.history.replaceState('Object', 'Title', '/');     var once$ = $('#once');    var start$ = $('#start');    var stop$ = $('#stop');    var count$ = $('#count');    var chart$ = $('#chart');    var count = 0;    var api = {'ready':false, 'timer':null, 'interval':100, 'start':null, 'initialSeries':{ name: 'start', data: [] }};     api.run = function(mode){        $.post('/4daction/api/' + mode, "", function(data, status, xhr){            count++;            count$.text(count);            if(api.ready == false){                api.start = m(new Date).format('LLL');                api.initialSeries.data.push(data.cacheSize.value);                api.initialSeries.data.push(data.usedCacheSize.value);                api.initialSeries.data.push(data.physicalMemorySize.value);                api.initialSeries.data.push(data.freeMemory.value);                api.initialSeries.data.push(data.usedPhysicalMemory.value);                api.initialSeries.data.push(data.UsedVirtualMemory.value);                api.initialSeries.data.push(data.stackMemory.value);                api.initialSeries.data.push(data.freeStackMemory.value);                chart(api);                api.ready = true;            }            api.series[0].data[0].update(data.cacheSize.value);            api.series[0].data[1].update(data.usedCacheSize.value);            api.series[0].data[2].update(data.physicalMemorySize.value);            api.series[0].data[3].update(data.freeMemory.value);            api.series[0].data[4].update(data.usedPhysicalMemory.value);            api.series[0].data[5].update(data.UsedVirtualMemory.value);            api.series[0].data[6].update(data.stackMemory.value);            api.series[0].data[7].update(data.freeStackMemory.value);            //console.log(data);        });    }     once$.on('click', function(){api.run(0);});     start$.on('click', function(e){        start$.attr('disabled', true);        stop$.attr('disabled', false);        api.timer = setInterval(function(){api.run(0);}, api.interval);    });     stop$.on('click', function(e){        start$.attr('disabled', false);        stop$.attr('disabled', true);        clearInterval(api.timer);        api.timer = null;        a.success('STOPPED!');    }).attr('disabled', true);             function chart(api){    chart$.highcharts({        chart: {            type: 'bar',            events: {                load: function () {                    api.series = this.series;                }            }        },        colors : ['#ffdd77', '#aacc00'],        credits: {            enabled: false        },        title: {            text: 'GET MEMORY STATISTICS'        },        subtitle: {            text: 'from: ' + api.start        },        xAxis: {            categories: ['cacheSize', 'usedCacheSize', 'Physical Memory Size', 'Free Memory', 'Used physical memory', 'Used virtual memory', 'Stack memory', 'Free stack memory'],            title: {                text: null            }        },        yAxis: {            min: 0,            title: {                text: null,                align: 'high'            },            labels: {                overflow: 'justify'            }        },        plotOptions: {            bar: {                dataLabels: {                    enabled: false                }            }        },        series: [{            name: 'now',            data: [0, 0, 0, 0, 0, 0, 0, 0]        }, api.initialSeries]    });    }    })(jQuery, alertify, moment, window);