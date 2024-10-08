import * as Yup from 'yup';

const customValidate = (validationSchema) => (formData, errors, uiSchema) => {
    try {
        validationSchema.validateSync(formData, { abortEarly: false });
    } catch (yupError) {
        yupError.inner.forEach(err => {
            const pathParts = err.path.split('.');
            let currentErrorField = errors;

            pathParts.forEach((part, index) => {
                if (!currentErrorField[part]) {
                    currentErrorField[part] = {};
                }

                if (index === pathParts.length - 1) {
                    if (currentErrorField[part].addError) {
                        currentErrorField[part].addError(err.message);
                    } else {
                        currentErrorField[part] = { addError: (message) => { currentErrorField[part].__errors = message; }, __errors: [err.message] };
                    }
                }

                currentErrorField = currentErrorField[part];
            });
        });
    }
    return errors;
}

function ErrorListTemplate(props) {
    const { errors } = props;
    return (
        <>
        </>
    );
}

function transformErrors(errors, uiSchema) {
    return errors.map((error) => {
        if (error.name) {
            error.message = '';
        }
        return error;
    });
}


export {customValidate, ErrorListTemplate, transformErrors}