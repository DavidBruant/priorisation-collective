import App from './App.svelte';

const emojo = ['🍇','🍈','🍉','🍊','🍋','🍌','🍍','🥭','🍎','🍏','🍐','🍑','🍒','🍓','🫐','🥝','🍅', '🫒','🥥']

const items = emojo.map((em, i) => Object.freeze({
	id: Math.random().toString(36).slice(2),
	text: `Manger #${i+1} - ${em}`
}))

const app = new App({
	target: document.querySelector('main'),
	props: {
		priorisationByPerson: new Map([
			['David', new Map(items.map(item => [item, undefined]))]
		])
	}
});
