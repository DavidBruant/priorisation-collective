<script>
	export let priorizedList;
</script>

<section>
    <h2>Priorisation collective</h2>
    <ol>
        {#each priorizedList as {text, weight}}
        <li>
            <span>{text}</span>
            <span class="weight">weight: {weight}</span>
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
