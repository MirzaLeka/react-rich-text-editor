const swaggerJsDoc = require('swagger-jsdoc');

const swaggerConfig = {
  swaggerDefinition: {
    info: {
      title: 'Posts API',
      description: 'Posts API info',
      servers: [`http://localhost:${process.env.PORT}`]
    }
  },
  apis: ['../router/*.js']
};

module.exports = swaggerJsDoc(swaggerConfig);
