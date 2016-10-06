var vm = new Vue({
    el: '#app',
    data: {
        categories: null,
        subCategories: null
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
            this.closeModal();
        },
        showModal: function () {
            document.querySelector('dialog').showModal();
        }
    },
    created: function () {
        this.fetchData()
    }
});
