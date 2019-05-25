class StoreClass {

    createId() {
        const dataLS = this.checkStorage();
        let id;
        if (dataLS.length > 0) {
            id = (dataLS.length - 1) + 1;
        } else {
            id = 0;
        }
        return 'item-' + id;
    }


    checkStorage() {
        let items;
        if (localStorage.getItem('items') === null) items = [];
        else items = JSON.parse(localStorage.getItem('items'));
        return items;
    }

    storeTask(item) {
        const items = this.checkStorage();
        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
    }

    updateTask(id, item) {
        let items = this.checkStorage();

        items.forEach((storegeItem,index) => {
            if (storegeItem.id === id) {
                items[index] = item;
            }
        });
        console.log(items);

        localStorage.setItem('items', JSON.stringify(items));
    }


    deleteTask(id) {

        const items = this.checkStorage();
        items.forEach((item,index) => {
            if (item.id === id) {
                items.splice(index, 1);
            }
        });

        localStorage.setItem('items', JSON.stringify(items));
    }


    clearListFromStorage() {
        localStorage.clear();
    }
}

export const Store = new StoreClass();