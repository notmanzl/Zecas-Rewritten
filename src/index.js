const ZecasClient = require('./structures/ZecasClient');
const config = require('../config.json');

const client = new ZecasClient(config);
client.start();