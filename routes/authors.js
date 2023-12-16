import express from 'express';
import Author from '../models/author.js';
const router = express.Router();

// get all Author Route
router.get('/',async (req,res)=>{

    let searchOptions ={};
    if(req.query.name !== null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name,'i');
    }
    
    try {
        const authors = await Author.find(searchOptions);
        res.render('authors/index',{
            authors:authors,
            searchOptions:req.query
        })
    }catch(err){
        res.redirect('/');
    }

    //res.render('authors/index');
});

// new author route
router.get('/new',(req,res)=>{

    res.render('authors/new',{author: new Author()});
});

// create Author route
router.post('/',async (req,res)=>{
    const name  = req.body.name;
    

        const  author = new Author({
            name:name
        });
        try{
            const newAuthor = await author.save();
            res.render('authors')
        }catch(err){
            res.render('authors/new',{
                author:author,
                errorMessage:'Error Creating Author'
            })
        }


});


//module.exports = { router};
export default router;