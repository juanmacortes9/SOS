<script>
	import Router from 'svelte-spa-router';
	import Home from './Home.svelte';   // Sera donde se pueda seleccionar a que API acceder 
	import globalMarriages from './DivorcesGUI/App.svelte'; // Sera donde se carga la tabla de datos 
	import EditDivorce from './DivorcesGUI/EditDivorce.svelte';
	import NotFound from './NotFound.svelte';
	
	const routes = {
		"/": Home,
		"/global-divorces/:country/:year": EditDivorce,
		"/globalDivorcesAPI":globalDivorces, 
		"*": NotFound
	};
</script>

<main>
	<Router {routes} />
</main>