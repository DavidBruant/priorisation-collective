<script>
    import compareItems from '../compareItems.js'
    import { createEventDispatcher } from 'svelte';

	export let name;
    export let priorisation;

    const dispatch = createEventDispatcher();

    function dispatchPriorisationChanged(newPriorisation){
        newPriorisation.sort(compareItems)
        console.log('newPriorisation', newPriorisation)
        dispatch('priorisation-change', newPriorisation)
    }

    function getMaxWeight(){
        return Math.max(...priorisation.map(({weight}) => weight || 0))
    }

    function addItemToPriorisation(item){
        const maxWeight = getMaxWeight()
        item.weight = maxWeight + 1;
        item.previousWeight = item.weight;

        dispatchPriorisationChanged(priorisation)
    }

    function weightChange(item){
        console.log('item', item, item.weight, item.previousWeight)

        // is there an existing item with this weight already?
        const otherItemWithNewWeight = priorisation.find((i) => i !== item && i.weight === item.weight)
        if(otherItemWithNewWeight){
            if(otherItemWithNewWeight.weight < item.previousWeight){
                const itemsToAdjust = priorisation.filter(i => i !== item && i.weight >= otherItemWithNewWeight.weight && i.weight < item.previousWeight)
                console.log('itemsToAdjust', itemsToAdjust, otherItemWithNewWeight.weight, item.previousWeight)
                for(const it of itemsToAdjust){
                    it.weight = it.weight + 1
                    it.previousWeight = it.weight
                }
            }
            else{
                const itemsToAdjust = priorisation.filter(i => i !== item && i.weight <= otherItemWithNewWeight.weight && i.weight > item.previousWeight)
                for(const it of itemsToAdjust){
                    it.weight = it.weight - 1
                    it.previousWeight = it.weight
                }
            }
        }
        
        item.previousWeight = item.weight

        dispatchPriorisationChanged(priorisation)
    }

</script>

<section>
    <h3>{name}</h3>

    <ol>
        {#each priorisation as item (item)}
        <li>
            <span>{item.text}</span>
            <span class="weight">
                weight: 
                {#if item.weight}
                    <input type="number" step="1" min="1" bind:value={item.weight} on:input={() => weightChange(item)}>
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
