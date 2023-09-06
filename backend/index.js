
// Import necessary packages and modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

var corOptions = {
  origin: 'https://localhost:8081'
}

//middleware
app.use(cors())
app.use(bodyParser.json())
app.use(express.json())
app.use(express.urlencoded({extended : true}))

//
const db = require('./models/index.js')
db.sequelize.sync();

db.sequelize.sync({force: false })
.then(() => {
  console.log('it is working');
}); 

// Import controllers
const billController = require('./controller/billController.js')
const serviceController = require('./controller/serviceProviderController.js')
const paymentController = require('./controller/paymentController');
const userController = require('./controller/userController.js');
const AgentContoller = require('./controller/agentController.js');
// Import routes

const billsRouter = require('./routes/billRoute.js');
const serviceProvidersRouter = require('./routes/serviceProviderRoute.js');
const paymentRouter = require('./routes/paymentRoute.js');
const usersRouter = require('./routes/userRoute.js');
const AgentsRouter = require('./routes/agentRoute.js');
const AdminRouter = require('./routes/adminRoute.js')

// Mount routes
app.use('/bills', billsRouter);
app.use('/serviceprovider', serviceProvidersRouter);
app.use('/payment', paymentRouter);
app.use('/Users', usersRouter);
app.use('/agent', AgentsRouter);
app.use('/api/admin', AdminRouter);
app.use ('/Images',express.static('./Images'))

//testing api
app.get('/',(req,res)=>{
  res.json({message: 'hello there'})
})
app.post('/',(req,res)=>{
  res.json({message: 'hello from post....'})
})

app.post('/create-payment-method', async (req, res) => {
  try {
  const { bankAccountNumber, bankAccountName } = req.body;
 // Create a PaymentMethod for the bank account using the local payment provider's API
 const paymentMethod = await callLocalPaymentProviderAPI({
  endpoint: 'create-payment-method',
  bankAccountNumber,
  bankAccountName,
});

// Verify the PaymentMethod using the local payment provider's API
const verification = await callLocalPaymentProviderAPI({
  endpoint: 'verify-payment-method',
  paymentMethodId: paymentMethod.id,
});
if (verification.status === 'succeeded') {
  // PaymentMethod verification succeeded
  res.json({ paymentMethodId: paymentMethod.id });
} else {
  // PaymentMethod verification failed
  res.status(400).json({ error: 'PaymentMethod verification failed.' });
}

} catch (error) {
console.error(error);
res.status(500).json({ error: 'An error occurred during payment method creation and verification.' });
}
});

app.post('/payment', async (req, res) => {
try {
const { amount, currency, paymentMethodId } = req.body;

// Process the payment using the local payment provider's API
const paymentResponse = await callLocalPaymentProviderAPI({
  endpoint: 'process-payment',
  amount,
  currency,
  paymentMethodId,
});

if (paymentResponse.status === 'succeeded') {
  // Payment succeeded
  res.json({ status: 'succeeded' });
} else {
  // Payment failed
  res.json({ status: 'failed' });
}
} catch (error) {
console.error(error);
res.status(500).json({ error: 'An error occurred during payment processing.' });
}
});

// Helper function to make API calls to the local payment provider
async function callLocalPaymentProviderAPI(options) {
// Replace "LOCAL_API" with the actual API endpoint provided by your local payment provider
const apiEndpoint = `LOCAL_API/${options.endpoint}`;

// Make the API call with the provided options
const response = await fetch(apiEndpoint, {
method: 'POST',
headers: {
'Content-Type': 'application/json',
},
body: JSON.stringify(options),
});

if (!response.ok) {
throw new Error('API request failed');
}

return response.json();
}


//Port
const PORT = process.env.PORT || 3001

// start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

