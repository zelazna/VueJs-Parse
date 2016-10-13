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
                            <td>{{category.categoryTitle}}</td>
                        </tr>
                        <tr>
                            <th>SubCategories</th>
                            <td>
                                <span v-if="category.subCategories" v-for="subCategory in category.subCategories">{{subCategory.name}}<br></span>
                            </td>
                        </tr>
                        <tr>
                            <th>Gender</th>
                            <td>{{category.gender}}</td>
                        </tr>
                    </table>
                </div>
                <div class="mdl-card__actions">
                    <button class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" 
                            @click="showModal" 
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
            vm.deleteCategory(this.category);
            console.log(this.category);
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
                                   pattern="[A-Z,a-z,_]*"
                                   type="text" id="sample1"
                                   v-model="editedCategory.name"
                                   @keyup.enter="updateCategory">
                               <input v-else class="mdl-textfield__input"
                                   pattern="[A-Z,a-z,_]*"
                                   type="text" id="sample1"
                                   v-model="createdCategory.name"
                                   @keyup.enter="createCategory">
                            <label v-if="!edit" class="mdl-textfield__label" for="sample1">Name</label>
                        </div>
                        <div class="mdl-textfield mdl-js-textfield">
                             <input v-if="edit" class="mdl-textfield__input"
                                   pattern="[A-Z,a-z,_]*"
                                   type="text" id="sample2"
                                   v-model="editedCategory.categoryTitle"
                                   @keyup.enter="createCategory">
                            <input v-else class="mdl-textfield__input"
                                   pattern="[A-Z,a-z,_]*"
                                   type="text" id="sample2"
                                   v-model="createdCategory.categoryTitle"
                                   @keyup.enter="createCategory">
                            <label v-if="!edit" class="mdl-textfield__label" for="sample2">Category Title</label>
                        </div>
                        <h4 class="mdl-typography--title">SubCategories</h4>
                        <div class="mdl-textfield mdl-js-textfield">
                            <select v-model="multiSelect" class="mdl-textfield__input" id="sample3" multiple>
                                <option v-for="(subCategory ,index) in subCategories" :value="index">{{subCategory.name}}</option>
                            </select>
                        </div>
                         <h4 class="mdl-typography--title">Gender</h4>
                         <div class="mdl-textfield mdl-js-textfield">
                            <select v-model="selectedGender" class="mdl-textfield__input" id="sample3">
                                <option v-for="(gender ,index) in genders" :value="index">{{gender.name}}</option>
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
    props: ['subCategories', 'edit', 'editedCategory', 'genders'],
    data: function () {
        return {
            createdCategory: {},
            editedSubCategories: [],
            multiSelect: [],
            selectedGender: 0 || false
        }
    },
    methods: {
        updateCategory: function () {
            for (var i in this.multiSelect) {
                var tempObject = {};
                tempObject.name = this.subCategories[this.multiSelect[i]].name;
                tempObject.id = this.subCategories[this.multiSelect[i]].id;
                this.editedSubCategories.push(tempObject);
            }
            if (this.selectedGender)this.editedCategory.gender = this.genders[this.selectedGender].id;
            this.editedCategory.subCategories = this.editedSubCategories;
            vm.updateCategory(this.editedCategory);
            this.closeModal();
            vm.editedCategory = {};
            this.multiSelect = [];
        },
        createCategory: function () {
            this.createdCategory.gender = (!this.selectedGender) ? this.genders[0].id : this.genders[this.selectedGender].id;
            this.createdCategory.subCategories = [];
            for (var i in this.multiSelect) {
                var subCategory = {};
                var categoryIndex = this.multiSelect[i];
                subCategory.id = this.subCategories[categoryIndex].id;
                subCategory.name = this.subCategories[categoryIndex].name;
                this.createdCategory.subCategories.push(subCategory);
            }
            if (!this.createdCategory.subCategories) {
                console.log('smting missing');
                return
            }
            vm.categories.push(this.createdCategory);
            Model.create(this.createdCategory);
            this.closeModal();
            this.createdCategory = {};
            this.multiSelect = [];
        },
        closeModal: function () {
            document.querySelector('dialog').close();
        }
    }
});

Vue.component('subCategoriesList', {
    template: `<div class="mdl-list">
                <div class="mdl-list__item">
                    <span class="mdl-list__item-primary-content mdl-layout-title">SubCategories</span>
                    <span class="mdl-list__item-secondary-action">
                        <button @click="create=true" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">Create</button>
                    </span>
                </div>
                <div v-show="create" class="mdl-list__item">
                    <div class="mdl-textfield mdl-js-textfield">
                        <input v-model="newSubcategory.name" class="mdl-textfield__input" type="text" id="newSubCat" pattern="[A-Z,a-z, ]*">
                        <label class="mdl-textfield__label" for="newSubCat">New SubCategory</label>
                        <span class="mdl-textfield__error">Letters and spaces only</span>
                    </div>
                    <span class="mdl-list__item-secondary-action">
                        <button @click="createSubCategory" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect mdl-button--colored">OK</button>
                    </span>
                </div>
                <div v-for="( subCategory,index ) in subCategories" class="mdl-list__item">
                    <a @dblclick="editSubCategory(subCategory)" class="mdl-list__item-primary-content" target="_blank">{{subCategory.name}}</a>
                    <div class="mdl-textfield mdl-js-textfield">
                    <input class="edit mdl-textfield__input" type="text"
                        v-model="subCategory.name"
                        @blur="doneEdit(subCategory)"
                        @keyup.enter="doneEdit(subCategory)"
                        @keyup.esc="cancelEdit(subCategory)">
                    </div>
                    <span class="mdl-list__item-secondary-action">
                        <!--<button @click="edit=true" class="mdl-button mdl-js-button mdl-button&#45;&#45;raised mdl-js-ripple-effect">Edit</button>-->
                        <button :data-id="index" @click="deleteSubCategory" class="mdl-button mdl-js-button mdl-button--raised mdl-js-ripple-effect">Delete</button>
                    </span>
                </div>
            </div>`,
    props: ['subCategories'],
    data: function () {
        return {
            create: false,
            edit: false,
            newSubcategory: {},
            editedCategory: {}
        }
    },
    methods: {
        createSubCategory: function () {
            if (!this.newSubcategory.name) {
                return;
            }
            Model.createSubCategory(this.newSubcategory.name);
            this.subCategories.push(this.newSubcategory);
            this.newSubcategory = {};
            this.create = false;
        },
        cancelEdit: function (subCategory) {
            console.log(subCategory);
        },
        editSubCategory: function (subCategory) {
            console.log(subCategory);
        },
        doneEdit: function (subCategory) {
            Model.updateSubCategory(subCategory);
            console.log(subCategory);
        },
        deleteSubCategory: function (e) {
            var subCategoryIndex = e.target.dataset.id;
            if (this.subCategories[subCategoryIndex].id)Model.delete(this.subCategories[subCategoryIndex].id, 'SubCategory');
            this.subCategories.splice(subCategoryIndex, 1);
        },
    }
});


