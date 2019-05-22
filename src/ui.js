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
		li.innerHTML = `<strong>${data.itemName}: </strong> <em>${data.itemCalories} Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;
	 this.itemList.insertAdjacentElement('beforeend', li);
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
		return id;
	}
	deleteItem() {
		Store.deleteTask(this.itemId);
        document.querySelector('#'+this.itemId).remove();
        this.itemId = null;
	}

}

export const ui = new UI();