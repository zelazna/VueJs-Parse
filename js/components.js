Vue.component('card', {
    props: ['category'],
    methods: {
        updateParseObject: function (event) {
            vm.updateParseObject()
        },
        deleteParseObject: function (event) {
            vm.deleteParseObject()
        }
    },
    template: `<div class="mdl-cell mdl-cell--6-col mdl-card mdl-shadow--2dp">
                <div class="mdl-card__title">
                    <h2 class="mdl-card__title-text">Category #{{category.id}}</h2>
                </div>
                <div class="mdl-card__supporting-text">
                    <table class="category-details">
                        <tr>
                            <th>Name</th>
                            <td>{{category.name}}</td>
                        </tr>
                        <tr>
                            <th>Category title</th>
                            <td>{{category.title}}</td>
                        </tr>
                    </table>
                </div>
                <div class="mdl-card__actions">
                    <button class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" @click="updateParseObject" :data-id="category.id">Edit</button>
                    <button class="mdl-button mdl-js-button mdl-js-ripple-effect" @click="deleteParseObject" :data-id="category.id">Delete</button>
                </div>
            </div>`
});

Vue.component('modale', {
    props: ['name', 'categoryTitle'],
    data: function () {
        return {
            createCategory: {}
        }
    },
    methods: {
        createParseObject: function () {
            Model.create(this.createCategory);
            this.closeModal();
            this.createCategory = {};
            vm.fetchData();
        },
        closeModal: function () {
            document.querySelector('dialog').close();
        }
    },
    template: `<dialog class="mdl-dialog">
                <h4 class="mdl-typography--display-1">Create a Category</h4>
                <div class="mdl-dialog__content">
                    <form action="#">
                        <div class="mdl-textfield mdl-js-textfield">
                            <input class="mdl-textfield__input"
                                   type="text" id="sample1"
                                   v-bind:name="name"
                                   v-model="createCategory.name"
                                   @keyup.enter="createParseObject">
                            <label class="mdl-textfield__label" for="sample1">name</label>
                        </div>
                        <div class="mdl-textfield mdl-js-textfield">
                            <input class="mdl-textfield__input"
                                   type="text" id="sample2"
                                   v-bind:categoryTitle="categoryTitle"
                                   v-model="createCategory.categoryTitle"
                                   @keyup.enter="createParseObject">
                            <label class="mdl-textfield__label" for="sample2">categoryTitle</label>
                        </div>
                    </form>
                </div>
                <div class="mdl-dialog__actions">
                    <button type="button" class="mdl-button" @click="createParseObject">Create</button>
                    <button type="button" class="mdl-button close" @click="closeModal">Close</button>
                </div>
            </dialog>`
});
