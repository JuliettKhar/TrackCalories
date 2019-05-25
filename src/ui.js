import {Store} from './store';
class UI {
	constructor() {
		this.itemId = null;
		this.itemName = document.querySelector('#item-name');
		this.itemCalories = document.querySelector('#item-calories');
		this.itemList = document.querySelector('#item-list');
	}

	addItem(data){
		const li = document.createElement('li');
		li.className = 'collection-item';
		li.id = `${data.id}`;
		li.innerHTML = `<strong class="listItemName"></strong>:  
						<em class="listItemCalories"></em> Calories
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;
	 this.itemList.insertAdjacentElement('beforeend', li);
	 this.fillItem(data.id, data);
	}

fillItem(elementId, data) {
	console.log('#'+elementId+' .listItemName');
	let listItemNameElement = document.querySelector('#'+elementId+' .listItemName');
	let listItemCaloriesElement = document.querySelector('#'+elementId+' .listItemCalories');
	listItemCaloriesElement.innerHTML = data.itemCalories;
	listItemNameElement.innerHTML = data.itemName;
}

	clearFields() {
		this.itemId = null;
		this.itemName.value = '';
		this.itemCalories.value = '';
	}
	clearAllList() {
		const currentItems = [].slice.call(this.itemList.querySelectorAll('li'));
		currentItems.forEach( item => item.remove())
	}
	fillForm(data) {
			this.itemId = data.itemId;
        console.log(this.itemId);
			this.itemName.value = data.itemNameValue.textContent;
			this.itemCalories.value = parseInt(data.itemCaloriesValue.textContent);

	}

	getId(data) {
		const id = data.itemId;
	}

	deleteItem() {
		const elem = document.getElementById(this.itemId);
		console.log(this.itemId, elem);
		Store.deleteTask(this.itemId);
		elem.remove();
	}

	updateListItem() {
		const item = {
'id': this.itemId,
    'itemName': document.querySelector('#item-name').value,
    'itemCalories': document.querySelector('#item-calories').value
		};
		this.fillItem(this.itemId, item);
		Store.updateTask(this.itemId, item);
	}

}

export const ui = new UI();