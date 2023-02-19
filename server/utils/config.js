const PORT = 3001;
const { MONGO_PASSWORD } = process.env;
const BD_ADRESS = `mongodb+srv://zoom:${MONGO_PASSWORD}@my-bikes.drzctdl.mongodb.net/?retryWrites=true&w=majority`;
const NODE_ENV = process.env;

//const CURRENT_BD_ADRESS = NODE_ENV === 'production' ? BD_ADRESS : 'mongodb://localhost:27017/moviesdb';

module.exports = {
  PORT,
  BD_ADRESS,
};
