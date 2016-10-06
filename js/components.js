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
