<script>
    //@ts-check
    import compareItems from '../compareWeighted.js'
    import { createEventDispatcher } from 'svelte';

	export let name;
    /** @type {Map<{id: string, text: string}, number>} */
    export let weightByItem;

    $: priorisationArray = [...weightByItem]
        .map(([item, weight]) => ({item, weight, previousWeight: weight}))
        .sort(({weight: weight1}, {weight: weight2}) => weight1 - weight2)

    const dispatch = createEventDispatcher();

    /**
     * @param {{ item: { id: string; text: string; }; weight: number; previousWeight: number; }[]} newPrio
     */
    function dispatchPriorisationChanged(newPrio){
        newPrio.sort(compareItems)
        const prioMap = new Map(newPrio.map(({item, weight}) => ([item, weight])))
        dispatch('priorisation-change', prioMap)
    }

    function getMaxWeight(){
        return Math.max(...priorisationArray.map(({weight}) => weight || 0))
    }


    /**
     * @param {{ item?: { id: string; text: string; }; weight: any; previousWeight: any; }} item
     */
    function addItemToPriorisation(item){
        const maxWeight = getMaxWeight()
        item.weight = maxWeight + 1;
        item.previousWeight = item.weight;

        dispatchPriorisationChanged(priorisationArray)
    }

    function weightChange(weightedItem, newWeight){
        const {item, previousWeight} = weightedItem

        throw `there is an off-by-one somewhere`

        weightedItem.weight = newWeight
        // is there an existing item with this weight already?
        const otherItemWithNewWeight = priorisationArray.find(({item: i}) => i !== item && weightByItem.get(i) === weightByItem.get(item))?.item
        if(otherItemWithNewWeight){
            if(weightByItem.get(otherItemWithNewWeight) < previousWeight){
                const weightedItemsToAdjust = priorisationArray.filter(({item: i}) => i !== item && weightByItem.get(i) >= weightByItem.get(otherItemWithNewWeight) && weightByItem.get(i) < previousWeight)
                console.log('itemsToAdjust', weightedItemsToAdjust, weightByItem.get(otherItemWithNewWeight), previousWeight)
                for(const wit of weightedItemsToAdjust){
                    wit.weight = wit.weight + 1
                    wit.previousWeight = wit.weight
                }
            }
            else{
                const weightedItemsToAdjust = priorisationArray.filter(({item: i}) => i !== item && weightByItem.get(i) <= weightByItem.get(otherItemWithNewWeight) && weightByItem.get(i) > previousWeight)
                for(const wit of weightedItemsToAdjust){
                    wit.weight = wit.weight - 1
                    wit.previousWeight = wit.weight
                }
            }
        }
        

        weightedItem.previousWeight = weightedItem.weight

        dispatchPriorisationChanged(priorisationArray)
    }

</script>

<section>
    <h3>{name}</h3>

    <ol>
        {#each priorisationArray as weightedItem (weightByItem.item)}
        <li>
            <span>{weightedItem.item.text}</span>
            <span class="weight">
                weight: 
                {#if weightedItem.weight}
                    <input type="number" step="1" min="1" value={weightedItem.weight} on:input={e => weightChange(weightedItem, Number(e.target.value))}>
                {:else}
                    <button on:click={() => addItemToPriorisation(weightedItem)} >Ajouter</button>
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
