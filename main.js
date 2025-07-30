const searchField = document.querySelector('#search')
const cardTmpl = document.querySelector('#card')
const field = document.querySelector('.out')
const addition = document.querySelector('#addition')


const addCard = (item) => {
	searchField.value = ''
	addition.innerHTML = ''
	const card = cardTmpl.content.cloneNode(true)
	card.querySelector('.alternative-name').textContent = `Name: ${item.name}`
	card.querySelector('.alternative-owner').textContent = `Owner: ${item.owner.login}`
	card.querySelector('.alternative-stars').textContent = `Stars: ${item.stargazers_count}`
	card.querySelector('.card-button').addEventListener('click', (evt) => {
		evt.target.parentNode.remove()
	})
	field.append(card)

}

const getRepositoriess = async (searchItem) => {
	return await fetch(`https://api.github.com/search/repositories?q=${searchItem}`, {
		headers: {
			'X-GitHub-Api-Version': '2022-11-28'
		}
	})
		.then(response => {
			if (response.ok) {
				response.json().then(res => {
					addition.textContent = ''
					const items = res.items.slice(0, 5)
					if (items.length === 0) {
						addition.innerHTML = '<p class="no-results">Такой репозиторий не найден!</p>'
					} else {
						items.forEach(item => {
							const alternative = document.createElement('p')
							alternative.className = 'alternative'
							alternative.textContent = `${item.name}`
							alternative.addEventListener('click', () => addCard(item))
							addition.append(alternative)
						})
					}
				})
			} else {
				addition.innerHTML = '<p class="no-results">Я за вами не успел, попробуйте снова <br> ввести название репозитория</p>'
			}
		})
}

const debounce = (fn, delay) => {
	let timer;
	return function (...args) {
		clearTimeout(timer)
		timer = setTimeout(() => {
			fn.apply(this, args)
		}, delay)
	}
};

const debounceGetRepositoriess = debounce(getRepositoriess, 500)

searchField.addEventListener('input', () => {
	if (searchField.value[0] === ' ') {
		return
	}
	debounceGetRepositoriess(searchField.value.trim())
})