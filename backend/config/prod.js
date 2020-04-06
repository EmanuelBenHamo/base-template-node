const USER_NAME = '?'; // should be atals user name
const PASSWORD = '?'; // should be atlas password

module.exports = {
    // when mongoDB deployed on Atlas
    "dbURL": `mongodb+srv://${USER_NAME}:${PASSWORD}@[your specific mongo url on atlas...]`,
}