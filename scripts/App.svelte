<script>
	import Priorisation from './components/Priorisation.svelte'
	import PriorizedList from './components/PriorizedList.svelte'

	export let priorizedList;
	export let priorisationByPerson;

	function changePriorisation(name, {detail: newPriorisation}){
		priorisationByPerson.set(name, newPriorisation)
		priorisationByPerson = priorisationByPerson // re-render
	}
</script>

<h1>Priorisation collective - vue omnisciente</h1>
<section class="omni">
	<PriorizedList {priorizedList} />

	<section>
		<h2>Priorisation par personne</h2>
		{#each [...priorisationByPerson] as [name, priorisation]}
			<Priorisation {name} {priorisation} on:priorisation-change={newPrio => changePriorisation(name, newPrio)}/>
		{/each}
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
	}

</style>
