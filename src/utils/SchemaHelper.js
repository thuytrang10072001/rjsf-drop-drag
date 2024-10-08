import * as Yup from 'yup';
import {generateYupSchema} from '../components/yup';

const SchemaHelper = {
    handleCheckboxChange: (event, setSelectedValues, setCheckSections) => {
        const {value, checked, id} = event.target;
        if (checked) {
            setSelectedValues(prevValues => [...prevValues, value]);
            SchemaHelper.updateCheckSec(id, true, setCheckSections);
        } else {
            setSelectedValues(prevValues => prevValues.filter(val => val !== value));
            SchemaHelper.updateCheckSec(id, false, setCheckSections);
        }
    },
    updateTotalAddSec: (key, setTotalAddSec, totalAddSec) => {
        setTotalAddSec((prev) => {
            return ({
                ...prev,
                [key]: totalAddSec[key] + 1
            })
        })
    },
    updateUiSchema: (section, id, setUiSchema) => {
        if(section.section_key == 'hero_banner'){
            setUiSchema(prevUiSchema => ({
                ...prevUiSchema,
                [id]: {
                    item: section.properties.item.ui_section
                }
            }));
        }else{
            setUiSchema(prevUiSchema => ({
                ...prevUiSchema,
                [id]: section.ui_section
            }));
        }
    },
    updateShowSec: (id, val, setShowSections) => {
        setShowSections(prev => ({
            ...prev,
            [id]: val
        }));
    },
    updateSchema: (id, definition, setSchema) => {
        setSchema(prevSchema => ({
            ...prevSchema,
            properties: {
                ...prevSchema.properties,
                [id]: {
                    $ref: definition
                }
            }
        }));
    },
    updateCheckSec: (key, val, setCheckSections) => {
        setCheckSections(prev => ({
            ...prev,
            [key]: val
        }))
    },
    updateValidateConfig: (key, validate_section, setValidationConfig, setValidationSchema) => {
        setValidationConfig((prev) => {
            setValidationSchema(Yup.object().shape(generateYupSchema({
                ...prev,
                [key]: validate_section
            })))
            return {
                ...prev,
                [key]: validate_section
            }
        })
    },
    addSection: (definition, section, id, setUiSchema, setShowSections, setSchema, setCheckSections, setValidationConfig, setValidationSchema) => {
        SchemaHelper.updateUiSchema(section, id, setUiSchema);
        SchemaHelper.updateShowSec(id, true, setShowSections);
        SchemaHelper.updateSchema(id, definition, setSchema);
        SchemaHelper.updateCheckSec(section.section_key, false, setCheckSections);
        if(section.validate_section){
            SchemaHelper.updateValidateConfig(id, section.validate_section, setValidationConfig, setValidationSchema);
        }
    }
}

export default SchemaHelper