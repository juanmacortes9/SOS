<script>

import Button from "sveltestrap/src/Button.svelte";
import  {pop} from "svelte-spa-router";



async function loadGraph(){


    const raw_data = await fetch("/api/v2/global-divorces");
    let data = await raw_data.json();

    let countries = Array.from(new Set(data.map(d => {return d.country;})));
    let years = Array.from(new Set(data.map(d => {return d.year})));

    let series_graph = [];
    var objeto = {};


    for(var i = 0; i<years.length; i++){
        var divorce_year =  [];
        for(var j = 0; j<data.length; j++){
            if(data[j].year == years[i]){
                console.log("entra");
                divorce_year[j] = data[j].divorce;
            }
            else{
                divorce_year[j] = 0;
            }
        }
        series_graph.push({
            "name": years[i],
            "data": divorce_year
        });

    }
   
    let serie_final = series_graph;
    console.log(serie_final);

    Highcharts.chart('container', {
    chart: {
        type: 'column'
    },
    title: {
        text: 'Número de divorcios por paises'
    },
    subtitle: {
        text: 'Fuente: https://datosmacro.expansion.com/demografia/divorcios'
    },
    xAxis: {
        categories: countries,
        crosshair: true
    },
    yAxis: {
     //   tickInterval: 10,
        min: 0,
        title: {
            text: 'Nº de divorcios'
        }
    },
    tooltip: {
        headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
        pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.0f} </b></td></tr>',
        footerFormat: '</table>',
        shared: true,
        useHTML: true
    },
    plotOptions: {
        column: {
            pointPadding: 0.2,
            borderWidth: 0
        }
    },
    series: serie_final,
});
}


</script>

<svelte:head><script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/highcharts.js"></script>
<script src="https://code.highcharts.com/modules/exporting.js"></script>
<script src="https://code.highcharts.com/modules/export-data.js"></script>
<script src="https://code.highcharts.com/modules/accessibility.js" on:load = "{loadGraph}"></script>
</svelte:head>



<main>
    <h2>Gráfico highchart</h2>

    <figure class="highcharts-figure">
        <div id="container"></div>
        <p class="highcharts-description">
            Gráfico de columnas que compara el número de divorcios por paises y años.
        </p>
    </figure>
    <div>
<Button outline color="secondary" on:click="{pop}" > <i class="fas fa-arrow-circle-left"></i> Atrás </Button>
</div>
</main>

<style>.highcharts-figure, .highcharts-data-table table {
    min-width: 310px; 
    max-width: 900px;
    margin: 1em auto;
}

#container {
    height: 700px;
}

.highcharts-data-table table {
	font-family: Verdana, sans-serif;
	border-collapse: collapse;
	border: 1px solid #EBEBEB;
	margin: 10px auto;
	text-align: center;
	width: 100%;
	max-width: 500px;
}
.highcharts-data-table caption {
    padding: 1em 0;
    font-size: 1.2em;
    color: #555;
}
.highcharts-data-table th {
	font-weight: 600;
    padding: 0.5em;
}
.highcharts-data-table td, .highcharts-data-table th, .highcharts-data-table caption {
    padding: 0.5em;
}
.highcharts-data-table thead tr, .highcharts-data-table tr:nth-child(even) {
    background: #f8f8f8;
}
.highcharts-data-table tr:hover {
    background: #f1f7ff;
}
</style>