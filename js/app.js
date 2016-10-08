// This is the event hub we'll use in every
// component to communicate between them.
var eventHub = new Vue();

var vm = new Vue({
    el: '#app',
    data: {
        categories: null,
        subCategories: null,
        editedCategory: null,
        edit: false
    },
    methods: {
        fetchData: function () {
            this.categories = Model.findAll('Category');
            this.subCategories = Model.findAll('SubCategory');
            console.log('fetchData')
        },
        deleteCategory: function () {
            Model.delete(event.target.dataset.id);
            this.fetchData();
        },
        showModal: function () {
            vm.edit = false;
            document.querySelector('dialog').showModal();
        }
    },
    created: function () {
        this.fetchData();
    }
});

