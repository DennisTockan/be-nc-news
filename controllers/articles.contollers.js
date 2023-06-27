const {selectArticleById} = require;
exports.getArticleById = (req, res, next) => {
const {} = req.params

}



/*
const { selectTreasures } = require("../models/treasures.models")

exports.getTreasures = (req, res, next) => {
    
    console.log(req.query, "<---- Query")
    const {sort_by, order, colour} = req.query
    selectTreasures(sort_by, order, colour).then((treasures)=>{
        res.status(200).send({ treasures })

}).catch((err)=>{
    console.log(err)
    next(err)
})

}

*/