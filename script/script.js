var datas = new Array()
var values = new Array()

const resp = fetch('https://www.econdb.com/api/series/IPUS/?format=json')

    .then(resp => resp.json())
    .then(resp => {

        console.log(resp)
        for (i = 0; i < resp.data.dates.length; i++) {
            console.log(resp.data.dates[i] + "-" + resp.data.values[i])
            datas.push([resp.data.dates[i], resp.data.values[i]])
            
        }


        google.charts.load('current', { 'packages': ['corechart'] });
        google.charts.setOnLoadCallback(drawChart);

        function drawChart() {

            console.log(datas.length)
            if (datas.length > 0) {

                var dataanalize = google.visualization.arrayToDataTable([

                    ['Ano', 'Vendas'],
                    ...datas

                ]);

                var valores = {

                    title: 'Compania de Avaliação de Desempenho',
                    curveType: 'function',
                    legend: { position: 'bottom' }
                    
                };

                var chart = new google.visualization.LineChart(document.getElementById('grafico_curva'));

                chart.draw(dataanalize, valores);
            }
        }

    })