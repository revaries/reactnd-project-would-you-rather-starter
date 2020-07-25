var Datastore = require('nedb');
var data = require("../../_DATA");

DB = {}

DB.questions = new Datastore({
    filename: "src/db/questions.db",
    autoload: true
});

DB.Users = new Datastore({
    filename: "src/db/users.db",
    autoload: true
});

(function verifyDatabase() {
    //Setup for Questions DB
    let Questions = DB.questions;
    
    Questions.count({}, (err, num) => {
        if (err) {
            console.log(err);
        };
        if (num == 0) {
            let questionsData = data.questions;
            Object.values(questionsData).forEach((eachValue) => {
                Questions.insert(eachValue);
            });
        }
    });

    //Setup for Users DB
    let Users = DB.Users;
    Users.count({}, (err, num) => {
        if (err) {
            console.log(err);
        };

        if (num == 0) {
            let usersData = data.users;
            Object.values(usersData).forEach((eachValue) => {
                Users.insert(eachValue);
            });
        }
    });
})();

DB.questions.loadDatabase();
DB.Users.loadDatabase();

module.exports = DB;