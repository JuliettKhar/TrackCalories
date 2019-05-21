function checkStorage() {
	let items;
		if (localStorage.getItem('items') === null) items = [];
	 else items = JSON.parse(localStorage.getItem('items'));
		return tasks;
}

//Store in local storage
function storeTask(item) {
	const items = checkStorage();
	items.push(item);
	localStorage.setItem('items', JSON.stringify(items));
}