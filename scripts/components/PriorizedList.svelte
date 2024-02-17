<script>
	export let priorizedList;
</script>

<section>
    <h2>Priorisation collective</h2>
    <ol>
        {#each priorizedList as {item: {text}, weights}}
        <li>
            <span>{text}</span>
            {#if weights.some(w => w !== Infinity)}
                <span class="weight">weight: {weights.filter(w => w !== Infinity).sort((a, b) => a - b).join(', ')}</span>
            {/if}
        </li>
        {/each}
    </ol>
</section>

<style lang="scss">
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
            }
        }
    }
	
</style>
