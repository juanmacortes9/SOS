<script>
	import Router from 'svelte-spa-router';
	import Home from './Home.svelte';   // Sera donde se pueda seleccionar a que API acceder 
	import globalDivorces from './DivorcesGUI/App.svelte'; // Sera donde se carga la tabla de datos 
	import EditDivorce from './DivorcesGUI/EditDivorce.svelte';
	
	import DivorcesGraph from './DivorcesGUI/DivorcesGraph.svelte';
	import DivorcesGraph2 from './DivorcesGUI/DivorcesGraph2.svelte';
	import NotFound from './NotFound.svelte';

	
	const routes = {
		"/": Home,
		"/globalDivorcesAPI/:country/:year": EditDivorce,
		"/globalDivorcesAPI":globalDivorces, 
		"/globalDivorcesAPI/DivorcesGraph": DivorcesGraph,
		"/globalDivorcesAPI/DivorcesGraph2": DivorcesGraph2,
		"*": NotFound
	};
</script>

<main>
	<Router {routes} />
</main>