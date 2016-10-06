var vm = new Vue({
    el: '#app',
    data: {
        categories: null,
        createCategory: {},
    },
    methods: {
        fetchData: function () {
            this.categories = Model.findAll();
            console.log('fetchData')
        },
        deleteParseObject: function () {
            Model.delete(event.target.dataset.id);
            this.fetchData();
        },
        createParseObject: function () {
            var data = {
                name: this.createCategory.name,
                categoryTitle: this.createCategory.categoryTitle
            };
            Model.create(data);
            this.closeModal();
            this.createCategory = {};
            this.fetchData();
        },
        updateParseObject: function () {
            var data = {name: this.name};
            Model.update(data);
            this.closeModal();
        },
        showModal: function () {
            document.querySelector('dialog').showModal();
        },
        closeModal: function () {
            document.querySelector('dialog').close();
        }
    },
    created: function () {
        this.fetchData()
    }
});

