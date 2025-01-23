export default function crudRepository(model) {
    return {
        create: async function (data) {
            const doc = await model.create(data);
            return doc;
        },
        getById: async function (id) {
            const doc = await model.findById(id);
            return doc;
        },
        getAll: async function () {
            const allDoc = await model.find();
            return allDoc;
        },
        delete: async function (id) {
            const response = await model.findByIdAndDelete(id);
            return response;
        },
        update: async function (id, data) {
            const newDoc = await model.model.findByIdAndUpdate(id, data, {
                new: true
            });
            return newDoc;
        }
    };
}
