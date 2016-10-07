var vm = new Vue({
    el: '#app',
    data: {
        categories: null,
        subCategories: null,
        edit: false
    },
    methods: {
        fetchData: function () {
            this.categories = Model.findAll('Category');
            this.subCategories = Model.findAll('SubCategory');
            console.log('fetchData')
        },
        deleteParseObject: function () {
            Model.delete(event.target.dataset.id);
            this.fetchData();
        },
        updateParseObject: function () {
            var data = {name: this.name};
            Model.update(data);
        },
        showModal: function () {
            vm.edit = false;
            document.querySelector('dialog').showModal();
        }
    },
    created: function () {
        this.fetchData()
    }
});
