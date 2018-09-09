//Parse Key and Url
Parse.initialize("YOUR_APP_ID");
Parse.serverURL = 'http://YOUR_PARSE_SERVER:1337/parse'

Model = {

    findSubCategories: (IdsArray, SubCategoryTable) => {
        var subCategories = [];
        for (var i = 0; i < IdsArray.length; i++) {
            var SubCategory = Parse.Object.extend(SubCategoryTable);
            var query = new Parse.Query(SubCategory);
            query.get(IdsArray[i].id).then(subs=> {
                    var subCategoriesObject = {};
                    subCategoriesObject.name = subs.get('name');
                    subCategoriesObject.id = subs.id;
                    subCategories.push(subCategoriesObject);
                });
        }
        return subCategories;
    },

    findAll: (table)=> {
        var Category = Parse.Object.extend(table);
        var query = new Parse.Query(Category);
        var data = [];
        query.find().then( results=> {
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    var parseData = {};
                    parseData.id = object.id;
                    parseData.name = object.get('name');
                    if (table == 'Category') {
                        parseData.categoryTitle = object.get('categoryTitle');
                        parseData.subCategories = object.get('subCategories');
                        //@todo fix gender not always getted back
                        var gender = object.get('gender');
                        parseData.gender = gender? gender.get('name') : "";
                        if (parseData.subCategories) parseData.subCategories = Model.findSubCategories(parseData.subCategories, 'SubCategory');
                    }
                    data.push(parseData);
                }
            }).catch(error=> {
                console.log("Error: " + error.code + " " + error.message);
            });
        return data;
    },

    createSubCategory: params => {
        var Category = Parse.Object.extend("SubCategory");
        var category = new Category();
        category.set("name", params);
        category.save().then(category=> {
                console.log('New object created with objectId: ' + category.id);
            }).catch((category, error) => {
                console.log('Failed to create new object, with error code: ' + error.message);
            });
    },

    create: params=> {
        var Category = Parse.Object.extend("Category");
        var category = new Category();

        category.set("name", params.name);
        category.set("categoryTitle", params.categoryTitle);
        // category.set("defaultSizes", params.defaultSizes);
        // category.set("isFemale", params.isFemale);
        console.log(params.gender);
        category.set("gender", {
            "__type": "Pointer",
            "className": "Gender",
            "objectId": params.gender
        });
        var subCategoriesArray = [];
        for (var i in params.subCategories) {
            subCategoriesArray.push({
                "__type": "Pointer",
                "className": "SubCategory",
                "objectId": params.subCategories[i].id
            });
        }
        category.set("subCategories", subCategoriesArray);

        category.save().then(category=> {
                console.log('New object created with objectId: ' + category.id);
            }).catch((category, error) => {
                console.log('Failed to create new object, with error code: ' + error.message);
            });
    },

    updateSubCategory: params=> {
        var query = new Parse.Query('SubCategory');
        query.get(params.id).then(category=> {
                category.set('name', params.name);
                category.save();
            }).catch( (obj, error) => {
                console.log('error ' + error.message)
            });
    },

    update: params => {
        var query = new Parse.Query('Category');
        query.get(params.id).then(category=> {
                category.set('name', params.name);
                category.set("categoryTitle", params.categoryTitle);
                // category.set("defaultSizes", params.defaultSizes);
                // category.set("isFemale", params.isFemale);
                if (params.gender) {
                    category.set("gender", {
                        "__type": "Pointer",
                        "className": "Gender",
                        "objectId": params.gender
                    });
                }
                var subCategoriesArray = [];
                for (var i in params.subCategories) {
                    subCategoriesArray.push({
                        "__type": "Pointer",
                        "className": "SubCategory",
                        "objectId": params.subCategories[i].id
                    });
                }
                category.set("subCategories", subCategoriesArray);
                category.save();
            }).catch((obj, error) => {
                console.log('error ' + error.message)
            });
    },

    delete: (id, table) => {
        var query = new Parse.Query(table);
        query.get(id).then(obj => {
                obj.destroy();
                console.log('object destoyed')
            }).catch((obj, error)=> {
                console.log('error' + error.message)
            });
    }
};
