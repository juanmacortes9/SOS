<script>

	import {
			onMount
		} from "svelte";
		
		import {
			pop
		} from "svelte-spa-router";
		import Table from "sveltestrap/src/Table.svelte";
		import Button from "sveltestrap/src/Button.svelte";
		import Input from "sveltestrap/src/Input.svelte";

	let divorces = [];
	let newDivorce={
		country: "",
		year: parseInt(""),
		divorce: parseInt(""),
		crude_rate: parseFloat(""),
		variation: parseFloat("")

	};

	onMount(getDivorces());

	async function getDivorces() {

		const res = await fetch("/api/v1/global-divorces");
		console.log("Fetching divorces...");

		if(res.ok){
			console.log("Ok: ");
			const json = await res.json();
			divorces = json;
			console.log("Received " + divorces.length + " divorces.");
		}
		else{console.log("ERROR!");}

	}

	async function insertDivorce() {
		console.log("Inserting divorce..." + JSON.stringify(newDivorce));
		if (newDivorce.country == "" || newDivorce.country == null || newDivorce.year == "" 
			|| newDivorce.year == null) {
			
			alert("Se debe incluir el nombre del país y el año obligatoriamente");
		} else {
				const res = await fetch("/api/v1/global-divorces", {
					method: "POST",
					body: JSON.stringify(newDivorce),
					headers: {
						"Content-Type": "application/json"
					}
				}).then(function (res) {
					getDivorces();
				});
			}
	}

	async function deleteDivorce(country,year) {
		console.log("Deleting divorce..." + JSON.stringify(country)+ + JSON.stringify(year) );
		const res = await fetch("/api/v1/global-divorces/" + country+"/"+year, {
			method: "DELETE"
		}).then(function (res) {
			getDivorces();
		});
	}


</script>

<main>
	{#await divorces}
		Loading divorces...
	{:then divorces}
		<Table>
			<thead>
				<tr>
					<th>País</th>
					<th>Año</th>
					<th>Divorcios</th>
					<th>Tasa bruta</th>
					<th>Variación</th>
					<th>Actions</th>

				</tr>
			</thead>
			<tbody>
				<tr>
					<td><input bind:value="{newDivorce.country}"></td>
					<td><input type="number" bind:value="{newDivorce.year}"></td>
					<td><input type="number" bind:value="{newDivorce.divorce}"></td>
					<td><input type="number" bind:value="{newDivorce.crude_rate}"></td>
					<td><input type="number" bind:value="{newDivorce.variation}"></td>
					<td> <Button outline  color="primary" on:click={insertDivorce}>Insertar</Button> </td>
				</tr>
				{#each divorces as d}
					<tr>
						<td>{d.country}</td>
						<td>{d.year}</td>
						<td>{d.divorce}</td>
						<td>{d.crude_rate}</td>
						<td>{d.variation}</td>
						<td> <Button outline  color="danger" on:click={deleteDivorce(d.country, d.year)}>Eliminar</Button> </td>

					</tr>
				{/each}
			</tbody>
			

		</Table>
	{/await}
</main>
