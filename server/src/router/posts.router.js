const router = require("express").Router();
const createError = require("http-errors");
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require("swagger-ui-express");


const data = [];

router

/**
 * @swagger
 * /
 *   post:
 *     description: Save HTML template to the DB
 *     responses:
 *       201:
 *         description: Post added successfully!. Retrieves all posts
 *       400:
 *         description: Invalid post added
 */
  .post("/", (req, res) => {

    if (!req.body || !Object.keys(req.body).length) {
      throw createError(400);
    }

    data.push(req.body);
    res.send({ data });
  })

  /**
 * @swagger
 * /
 *   get:
 *     description: GET HTML template of each post
 *     responses:
 *       200:
 *         description: Data object containing HTML template
 */
  .get("/", (req, res) => {
    res.send({ data });
  });

module.exports = router;
