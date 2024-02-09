import App from './App.svelte';

const emojo = ['🍇','🍈','🍉','🍊','🍋','🍌','🍍','🥭','🍎','🍏','🍐','🍑','🍒','🍓','🫐','🥝','🍅', '🫒','🥥']

const items = emojo.map((em, i) => ({
	id: Math.random().toString(36).slice(2),
	text: `Manger #${i+1} - ${em}`,
	weight: i+1
}))

const app = new App({
	target: document.querySelector('main'),
	props: {
		priorizedList: items,
		priorisationByPerson: new Map([
			['David', items.map(({id, text}) => ({id, text}))]
		])
	}
});
