const searchField = document.querySelector('#search')





const getRepositiors = async (searchItem) => {
	return await fetch('https://api.github.com/search/repositories?q=${searchItem}', {
		headers: {
			'X-GitHub-Api-Version': '2022-11-28'
		}
	})
		.then(response => {
			if (response.ok) {
				response.json().then(repos => {
					autocomplete.textContent = ''
					const items = repos.items.slice(0, 5)
					if (items.length === 0) {
						autocomplete.textContent = '<p class="no-results">No results...</p>'
					} else {
						items.forEach(item => {
							const choice = document.createElement('p')
							choice.className = 'choice'
							choice.textContent = `${item.name}`
							choice.addEventListener('click', () => addCard(item))
							autocomplete.append(choice)
						})
					}
				})
			} else {
				autocomplete.innerHTML = '<p class="no-results">Try again...</p>'
			}
		})
}


