const secUser = {
    title: 'User',
    description: 'Information Login',
    type: 'object',
    properties: {
      name: { type: 'string' },
      pass: { type: 'string' },
    },
    required: ["name", "pass"]
  }

const secInfo = {
    title: 'Info',  
    description: 'Information User',
    type: 'object',
    properties: {
      age: { type: 'number'},
      street_address: { type: 'string' },
      state: { type: 'string' },
    },
}

const schemaForm = {
  type: 'object',
  title: 'React Json Schema Form',
  definitions: {
    user: secUser,
    info: secInfo
  },
  properties: {
    user: {
      $ref: '#/definitions/user'
      // type: "array",
      // items:{
      //   $ref: '#/definitions/user'
      // }
    },
    info: {
      $ref: '#/definitions/info'
    },
  },
};

export {secInfo, secUser, schemaForm}