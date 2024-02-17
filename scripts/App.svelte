<script>
    //@ts-check
	import Priorisation from './components/Priorisation.svelte'
	import PriorizedList from './components/PriorizedList.svelte'

    import compareItems from './compareWeighted.js'
	
	/** @type { {id: string, text: string}[] }*/
	export let items
	/** @type {Map<string, Map<{id: string, text: string}, number>>}*/
	export let priorisationByPerson;

	$: priorizedList = computePriorizedList(priorisationByPerson)

	function computePriorizedList(priorisationByPerson){
		const weightByItem = new Map()

		for(const weightedItems of priorisationByPerson.values()){
			for(const [item, weight] of weightedItems){
				let cumulWeight = weightByItem.get(item) || 0

				weightByItem.set(
					item, 
					cumulWeight + (weight || Infinity)
				)
			}
		}

		return [...weightByItem]
			.map(([item, weight]) => ({item, weight})) 
			.sort(compareItems)
	}

	function changePriorisation(name, {detail: newPriorisation}){
		priorisationByPerson.set(name, newPriorisation)
		priorisationByPerson = priorisationByPerson // re-render
	}


    function addPerson(name) {
        priorisationByPerson.set(name, new Map(items.map(item => [item, undefined])))
		priorisationByPerson = priorisationByPerson // re-render
    }
</script>

<h1>Priorisation collective - vue omnisciente</h1>
<section class="omni">
	<PriorizedList {priorizedList} />

	<section>
		<h2>Priorisation par personne</h2>
		<section class="per-person">
			{#each [...priorisationByPerson] as [name, priorisation]}
				<Priorisation {name} weightByItem={priorisation} on:priorisation-change={newPrio => changePriorisation(name, newPrio)}/>
			{/each}
			<form on:submit|preventDefault={e => addPerson(e.target.elements['person-name'].value)}>
				<label>
					Nom <input name="person-name" type="text">
				</label>
				<button type="submit">Rajouter une personne</button>
			</form>
		</section>
	</section>
</section>

<style lang="scss">
	
	:global(main) {
		text-align: center;
		padding: 1em;
		max-width: 240px;
		margin: 0 auto;

		@media (min-width: 640px) {
			max-width: none;
		}
	}
	
	.omni{
		display: flex;
		flex-direction: row;
		justify-content: space-between;

		.per-person{
			display: flex;
			flex-direction: row;
			align-items: flex-start;
			justify-content: center;

			form{
				display: flex;
				flex-direction: column;
				align-items: flex-start;
				justify-content: center;

				input{
					margin-left: 1em;
				}
			}
		}
	}



</style>
