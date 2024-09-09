import Form from '@rjsf/mui';
import validator from '@rjsf/validator-ajv8';

function GridArray(){
  const schema = {
      title: "Schema default properties",
      type: "object",
      properties: {
        valuesInFormData: {
          title: "Values in form data",
          $ref: "#/definitions/defaultsExample"
        },
        noValuesInFormData: {
          title: "No values in form data",
          $ref: "#/definitions/defaultsExample"
        }
      },
      definitions: {
        defaultsExample: {
          type: "object",
          properties: {
            scalar: {
              title: "Scalar",
              type: "string",
              default: "scalar default"
            },
            array: {
              title: "Array",
              type: "array",
              items: {
                type: "object",
                properties: {
                  nested: {
                    title: "Nested array",
                    type: "string",
                    default: "nested array default"
                  }
                }
              }
            },
            
          }
        }
      }
    }
  
  return (
      <Form schema={schema} validator={validator}/>
  );   
}

export default GridArray;