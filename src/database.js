const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://peraza:admin123@cluster0-mgwd2.mongodb.net/gestorpassword?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(db => console.log('DB is conected'))
    .catch(err => console.error(err));