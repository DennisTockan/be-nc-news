const {selectAllTopics} = require('../models/topics.models')

exports.getAllTopics = (req, res) => {
    console.log('hello controller')
    selectAllTopics();
}