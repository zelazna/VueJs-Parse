//PROD
// Parse.initialize("CTl4HWw9MvRMRCrZ5AFN2uVXzlDMBZn5bqUNigxr", "5uCrSmtP74r7K40pgZ9zUWEaoSTWULsWySqElfEC");
//DEV
Parse.initialize("MaLmHsgijDL1BVx6RG1i4itQqUnG4F7vf5drrFLw", "7noHnN6gJhdhrr5IYKI7YrMcNI30d23ZG8AQtnhq");

Model = {

    findSubCategories: function (IdsArray) {
        var subCategories = [];
        for (var i = 0; i < IdsArray.length; i++) {
            var SubCategory = Parse.Object.extend("SubCategory");
            var query = new Parse.Query(SubCategory);
            query.get(IdsArray[i].id, {
                success: function (subs) {
                    var subCategoriesObject = {};
                    subCategoriesObject.name = subs.get('name');
                    subCategoriesObject.id = subs.id;
                    subCategories.push(subCategoriesObject);
                }
            });
        }
        return subCategories;
    },

    findAll: function () {
        var Category = Parse.Object.extend("Category");
        var query = new Parse.Query(Category);
        var data = [];
        query.find({
            success: function (results) {
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    var parseData = {};
                    parseData.id = object.id;
                    parseData.name = object.get('name');
                    parseData.title = object.get('categoryTitle');
                    parseData.subCategories = object.get('subCategories');
                    if(parseData.subCategories) parseData.subCategories = Model.findSubCategories(parseData.subCategories);
                    data.push(parseData);
                }
            },
            error: function (error) {
                console.log("Error: " + error.code + " " + error.message);
            }
        });
        return data;
    },

    create: function (params) {
        var Category = Parse.Object.extend("Category");
        var category = new Category();

        category.set("name", params.name);
        category.set("categoryTitle", params.categoryTitle);
        // category.set("defaultSizes", params.defaultSizes);
        // category.set("isFemale", params.isFemale);
        // category.set("gender", params.gender);
        // category.set("subCategories", params.subCategories);

        category.save(null, {
            success: function (category) {
                console.log('New object created with objectId: ' + category.id);
            },
            error: function (category, error) {
                console.log('Failed to create new object, with error code: ' + error.message);
            }
        });
    },

    update: function (id, params) {
        var query = new Parse.Query('Category');
        query.get(id, {
            success: function (category) {
                category.set('name', params.name);
                category.set("categoryTitle", params.categoryTitle);
                // category.set("defaultSizes", params.defaultSizes);
                // category.set("isFemale", params.isFemale);
                // category.set("gender", params.gender);
                // category.set("subCategories", params.subCategories);
                category.save();
            }, error: function (obj, error) {
                console.log('error' + error.message)
            }
        });
    },

    delete: function (id) {
        var query = new Parse.Query('Category');
        query.get(id, {
            success: function (obj) {
                obj.destroy();
            },
            error: function (obj, error) {
                console.log('error' + error.message)
            }
        });
    }
};
