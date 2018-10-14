const Sequelize = require('sequelize');
const sequelize = require('./sequelize');


module.exports.User = require('./users')(sequelize, Sequelize);
module.exports.Friend = require('./friends')(sequelize, Sequelize);
module.exports.Identity = require('./identity')(sequelize, Sequelize);
module.exports.Media = require('./media')(sequelize, Sequelize);
module.exports.MediaComment = require('./media_comments')(sequelize, Sequelize);
module.exports.Notification = require('./notifications')(sequelize, Sequelize);
module.exports.Place = require('./places')(sequelize, Sequelize);
module.exports.Privacy = require('./privacy')(sequelize, Sequelize);
module.exports.Trip = require('./trips')(sequelize, Sequelize);
module.exports.Location = require('./location')(sequelize, Sequelize);


module.exports.sequelize = sequelize;