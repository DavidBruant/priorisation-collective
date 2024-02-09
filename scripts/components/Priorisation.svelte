<script>
	export let name;
    export let priorisation;

    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();

    function dispatchPriorisationChanged(newPriorisation){
        dispatch('priorisation-change', newPriorisation)
    }

    function addItemToPriorisation(item){
        const maxWeight = Math.max(...priorisation.map(({weight}) => weight || 0))
        item.weight = maxWeight + 1;

        priorisation.sort((item1, item2) => {
            return (item1.weight || Infinity) - (item2.weight || Infinity)
        })
        
        dispatchPriorisationChanged(priorisation)
    }

</script>

<section>
    <h3>{name}</h3>

    <ol>
        {#each priorisation as item}
        <li>
            <span>{item.text}</span>
            <span class="weight">
                weight: 
                {#if item.weight}
                    <input type="number" step="1" min="1" value={item.weight}>    
                {:else}
                    <button on:click={() => addItemToPriorisation(item)} >Ajouter</button>
                {/if}
                
            </span>
        </li>
        {/each}
    </ol>
</section>

<style lang="scss">

    section{
        display: flex;
        flex-direction: column;
        align-items: center;

        
        ol{
            display: flex;
            flex-direction: column;
            list-style: none;
            
            width: 15rem;
            padding: 0.5rem;

            li{
                display: flex;
                flex-direction: column;
                
                width: 100%;
                padding: 1rem;
                margin-bottom: 0.5rem;
                border: 1px solid #555;
                border-radius: 1rem;

                .weight{
                    color: #555;

                    input{
                        display: inline-block;
                        width: 4em;
                        text-align: center;
                    }
                }
            }
        }
    }
	
</style>
