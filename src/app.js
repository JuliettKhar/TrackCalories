import {ui} from './ui';
import {Store} from './store';

let clearAll;
let addMeal;
let updateMeal;
let deleteMeal;
let backBtn;
let form;
let ul;

function findElements() {
    form = document.querySelector('form');
    addMeal = form.querySelector('.add-btn');
    clearAll = document.querySelector('.clear-btn');
    ul = document.querySelector('#item-list');
    updateMeal = document.querySelector('.update-btn');
    deleteMeal = document.querySelector('.delete-btn');
    backBtn = document.querySelector('.back-btn');
}


//Store in local storage


function getList() {
    const data = Store.checkStorage();
    data.forEach(elem => {
        const output = `
		<li class="collection-item" id="${elem.id}">
        <strong>${elem.itemName}: </strong> <em>${elem.itemCalories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      </li>
      `
        ul.innerHTML += output;
    });
}


function addItemToList(event) {
    const itemName = document.querySelector('#item-name').value;
    const itemCalories = document.querySelector('#item-calories').value;
    const id = Store.createId();
    const data = {
        itemName,
        itemCalories,
        id
    }

    if (itemName && itemCalories !== '') {
        ui.addItem(data);
        ui.clearFields();
        Store.storeTask(data);
    }
    event.preventDefault();
}

function clearList(event) {
    ui.clearAllList();
    Store.clearListFromStorage();
    event.preventDefault();
}

function showBtns() {
    addMeal.style.display = 'none';
    updateMeal.style.display = 'inline';
    deleteMeal.style.display = 'inline';
}

function hideBtns() {
    addMeal.style.display = 'inline';
    updateMeal.style.display = 'none';
    deleteMeal.style.display = 'none';
}

function changeItem(event) {
    const {target} = event;
    if (target.classList.contains('edit-item')) {
        const itemCaloriesValue = target.parentElement.previousElementSibling;
        const itemNameValue = target.parentElement.previousElementSibling.previousElementSibling;
        const itemId = target.parentElement.parentElement.id;
        const data = {
            itemNameValue,
            itemCaloriesValue,
            itemId,
        }
        showBtns();
        ui.fillForm(data);
    }
    event.preventDefault();
}

function updateList() {
    addItemToList(event);
    hideBtns();
}

function deleteListItem(event) {

    ui.deleteItem();
    hideBtns();
    event.preventDefault(event);
}

function backToList(event) {
    ui.clearFields();
    hideBtns();
    event.preventDefault(event);
}

function subscribe(event) {
    addMeal.addEventListener('click', addItemToList);
    clearAll.addEventListener('click', clearList);
    ul.addEventListener('click', changeItem);
    updateMeal.addEventListener('click', updateList);
    deleteMeal.addEventListener('click', deleteListItem);
    backBtn.addEventListener('click', backToList);
    document.addEventListener('DOMContentLoaded', getList);
}


export function init() {
    findElements();
    subscribe();
}
