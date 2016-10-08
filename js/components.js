Vue.component('card', {
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
                        <tr>
                            <th>SubCategories</th>
                            <td>
                                <span v-if="category.subCategories" v-for="subCategory in category.subCategories">{{subCategory.name}}<br></span>
                            </td>
                        </tr>
                    </table>
                </div>
                <div class="mdl-card__actions">
                    <button class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" 
                            @click="showModal" 
                            :data-id="category.id"
                            >Edit</button>
                    <button class="mdl-button mdl-js-button mdl-js-ripple-effect" 
                            @click="deleteCategory" 
                            :data-id="category.id"
                            >Delete</button>
                </div>
            </div>`,
    props: ['category'],
    methods: {
        changeState: function () {
            vm.edit = true
        },
        deleteCategory: function () {
            vm.deleteCategory()
        },
        showModal: function () {
            this.changeState();
            document.querySelector('dialog').showModal();
            vm.editedCategory = this.category;
        }
    },
});

Vue.component('modale', {
    template: `<dialog class="mdl-dialog">
                <h4 v-if="edit" class="mdl-typography--display-1">Update a Category</h4>
                <h4 v-else class="mdl-typography--display-1">Create a Category</h4>
                <div class="mdl-dialog__content">
                    <form action="#">
                    <input v-if="edit" type="hidden" v-model="editedCategory.id">
                        <div class="mdl-textfield mdl-js-textfield">
                            <input v-if="edit" class="mdl-textfield__input"
                                   type="text" id="sample1"
                                   v-bind:name="name"
                                   v-model="editedCategory.name"
                                   @keyup.enter="updateCategory">
                               <input v-else class="mdl-textfield__input"
                                   type="text" id="sample1"
                                   v-bind:name="name"
                                   v-model="createdCategory.name"
                                   @keyup.enter="createCategory">
                            <label v-if="!edit" class="mdl-textfield__label" for="sample1">Name</label>
                        </div>
                        <div class="mdl-textfield mdl-js-textfield">
                             <input v-if="edit" class="mdl-textfield__input"
                                   type="text" id="sample2"
                                   v-bind:categoryTitle="categoryTitle"
                                   v-model="editedCategory.title"
                                   @keyup.enter="createCategory">
                            <input v-else class="mdl-textfield__input"
                                   type="text" id="sample2"
                                   v-bind:categoryTitle="categoryTitle"
                                   v-model="createdCategory.categoryTitle"
                                   @keyup.enter="createCategory">
                            <label v-if="!edit" class="mdl-textfield__label" for="sample2">Category Title</label>
                        </div>
                        <h4 class="mdl-typography--title">Sub Categories</h4>
                        <div class="mdl-textfield mdl-js-textfield">
                            <select v-model="selected" class="mdl-textfield__input" id="sample3" multiple>
                                <option v-for="(subCategory ,index) in subCategories" :data-id="index" :value="subCategory.id">{{subCategory.name}}</option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="mdl-dialog__actions">
                    <button v-if='edit' type="button" class="mdl-button" @click="updateCategory">Update</button>
                    <button v-else type="button" class="mdl-button" @click="createCategory">Create</button>
                    <button type="button" class="mdl-button close" @click="closeModal">Close</button>
                </div>
            </dialog>`,
    props: ['name', 'categoryTitle', 'subCategories', 'edit', 'editedCategory'],
    data: function () {
        return {
            createdCategory: {},
            selected: [],
        }
    },
    methods: {
        updateCategory: function () {
            this.editedCategory.subCategories = this.selected;
            Model.update( this.editedCategory);
            this.closeModal();
            vm.editedCategory = {};
            this.selected = [];
            vm.fetchData();
        },
        createCategory: function () {
            this.createdCategory.subCategories = this.selected;
            if (!this.createdCategory.subCategories) {
                return
            }
            Model.create(this.createdCategory);
            this.closeModal();
            this.createdCategory = {};
            this.selected = [];
            vm.fetchData();
        },
        closeModal: function () {
            document.querySelector('dialog').close();
            this.createCategory = {};
            this.selected = [];
        }
    }
});


