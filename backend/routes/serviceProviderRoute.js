// serviceproviderRouter.js

const express = require('express');
const serviceProvidersRouter = express.Router();
const serviceProviderController = require('../controller/serviceproviderController');

serviceProvidersRouter.post('/', serviceProviderController.upload, serviceProviderController.create);
serviceProvidersRouter.post('/login', serviceProviderController.login);
serviceProvidersRouter.get('/', serviceProviderController.findAll);
serviceProvidersRouter.get('/:id', serviceProviderController.findOne);
serviceProvidersRouter.put('/:id', serviceProviderController.update);
serviceProvidersRouter.delete('/:id', serviceProviderController.delete);

module.exports = serviceProvidersRouter;