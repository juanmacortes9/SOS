

<svelte:head>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.js" on:load = "{loadGraph}" ></script>
</svelte:head>


<script>
import Button from "sveltestrap/src/Button.svelte";
import  {pop} from "svelte-spa-router";
async function loadGraph(){

    const raw_data = await fetch("/api/v2/global-divorces");
    let data = await raw_data.json();

    let countries = Array.from(new Set(data.map(d => {return d.country;})));
    let divorces = Array.from(new Set(data.map(d=> {return d.divorce})));

    function ejemplo2(len) {
    var colores = [];
    for( var i = 0; i<len; i++){
        var str = 'rgb(';
        for( var j = 0; j<3;j++){
            var aleatorio = Math.round(Math.random()*255);
            str = str+aleatorio;
            if(j<2){str = str+',';}
            
        }
        str = str+')';
        colores[i] = str;
    }


    return colores;
    }
    console.log(ejemplo2(countries.length));

    var ctx = document.getElementById("MyChart").getContext("2d");
    var myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: countries,
            datasets: [{
            data: divorces,
            backgroundColor: ejemplo2(countries.length)
        }],
            

        },

    });
}
</script>

<main>
<h3>Grafica Chart.js</h3> 

<canvas id="MyChart" style="display: block; width: 710px; height: 355px;"></canvas>
<div><Button outline color="secondary" on:click="{pop}" > <i class="fas fa-arrow-circle-left"></i> Atrás </Button>
</div>

</main>

