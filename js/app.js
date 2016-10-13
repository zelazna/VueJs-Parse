var vm = new Vue({
    el: '#app',
    data: {
        categories: null,
        subCategories: null,
        editedCategory: null,
        edit: false,
        gender: null
    },
    methods: {
        fetchData: function () {
            this.categories = Model.findAll('Category');
            this.subCategories = Model.findAll('SubCategory');
            this.gender = Model.findAll('Gender')
        },
        deleteCategory: function (category) {
            Model.delete(event.target.dataset.id, 'Category');
            this.categories.splice(this.categories.indexOf(category), 1);
        },
        updateCategory: function (category) {
            Model.update(category);
            this.categories[this.categories.indexOf(category)] = category;
        },
        showModal: function () {
            this.edit = false;
            document.querySelector('dialog').showModal();
        }
    },
    created: function () {
        this.fetchData();
    }
});

