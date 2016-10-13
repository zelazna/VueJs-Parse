//PROD
// Parse.initialize("CTl4HWw9MvRMRCrZ5AFN2uVXzlDMBZn5bqUNigxr", "5uCrSmtP74r7K40pgZ9zUWEaoSTWULsWySqElfEC");
//DEV
Parse.initialize("MaLmHsgijDL1BVx6RG1i4itQqUnG4F7vf5drrFLw", "7noHnN6gJhdhrr5IYKI7YrMcNI30d23ZG8AQtnhq");

Model = {

    findSubCategories: (IdsArray, SubCategoryTable) => {
        var subCategories = [];
        for (var i = 0; i < IdsArray.length; i++) {
            var SubCategory = Parse.Object.extend(SubCategoryTable);
            var query = new Parse.Query(SubCategory);
            query.get(IdsArray[i].id, {
                success: subs=> {
                    var subCategoriesObject = {};
                    subCategoriesObject.name = subs.get('name');
                    subCategoriesObject.id = subs.id;
                    subCategories.push(subCategoriesObject);
                }
            });
        }
        return subCategories;
    },

    findAll: (table)=> {
        var Category = Parse.Object.extend(table);
        var query = new Parse.Query(Category);
        var data = [];
        query.find({
            success: results=> {
                for (var i = 0; i < results.length; i++) {
                    var object = results[i];
                    var parseData = {};
                    parseData.id = object.id;
                    parseData.name = object.get('name');
                    if (table == 'Category') {
                        parseData.categoryTitle = object.get('categoryTitle');
                        parseData.subCategories = object.get('subCategories');
                        //@todo fix gender not always getted back
                        parseData.gender = object.get('gender').get('name');
                        if (parseData.subCategories) parseData.subCategories = Model.findSubCategories(parseData.subCategories, 'SubCategory');
                    }
                    data.push(parseData);
                }
            },
            error: error=> {
                console.log("Error: " + error.code + " " + error.message);
            }
        });
        return data;
    },

    createSubCategory: params => {
        var Category = Parse.Object.extend("SubCategory");
        var category = new Category();
        category.set("name", params);
        category.save(null, {
            success: category=> {
                console.log('New object created with objectId: ' + category.id);
            },
            error: (category, error) => {
                console.log('Failed to create new object, with error code: ' + error.message);
            }
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

        category.save(null, {
            success: category=> {
                console.log('New object created with objectId: ' + category.id);
            },
            error: (category, error) => {
                console.log('Failed to create new object, with error code: ' + error.message);
            }
        });
    },

    updateSubCategory: params=> {
        var query = new Parse.Query('SubCategory');
        query.get(params.id, {
            success: category=> {
                category.set('name', params.name);
                category.save();
            }, error: (obj, error) => {
                console.log('error ' + error.message)
            }
        });
    },

    update: params => {
        var query = new Parse.Query('Category');
        query.get(params.id, {
            success: category=> {
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
            }, error: (obj, error) => {
                console.log('error ' + error.message)
            }
        });
    },

    delete: (id, table) => {
        var query = new Parse.Query(table);
        query.get(id, {
            success: obj => {
                obj.destroy();
                console.log('object destoyed')
            },
            error: (obj, error)=> {
                console.log('error' + error.message)
            }
        });
    }
};
