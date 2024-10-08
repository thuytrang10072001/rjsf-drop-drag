import * as Yup from 'yup';

const isEmptyObject = (obj) => {
    return Object.values(obj).every(value => value === '' || value === null || value === undefined);
};


const generateYupSchema = (config, type_link = null) => {
    const schema = {};
    Object.keys(config).forEach((key) => {
        const field = config[key];

        if (field.type === 'object' && field.properties && !field.required) {
            schema[key] = Yup.object().shape(generateYupSchema(field.properties));
        } else {
            let validator = Yup[field.type]();

            if (field.required) {
                validator = validator.required(field.required);
            }

            if (key === 'url' && type_link !== "1") {
                validator = Yup.mixed().notRequired();
            }

            if ((key === 'url_module' || key  === 'module') && type_link !== "0" ){
                validator = Yup.mixed().notRequired();
            }

            if(field.test){
                validator = validator.test('not-empty', field.test, (value) => {
                    return !isEmptyObject(value);
                })
            }

            if (field.min) {
                validator = validator.min(field.min.value, field.min.message);
            }
            schema[key] = validator;
    }
    });
    return schema;
};

export {generateYupSchema};