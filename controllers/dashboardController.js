const {validationResult} =require('express-validator')

const Flash = require('../utils/Flash');
const Profile = require('../models/Profile')
const errorFormatter = require('../utils/validationErrorFormater')



exports.dashboardGetController = async (req,res,next) => {
    try{
        let profile = await Profile.findOne({
            user: req.user._id
        })
        if(profile) {
            return res.render('pages/dashboard/dashboard',
            {
                title: 'My Dashboard',
                flashMessage: Flash.getMessage(req)
            })
        }
        res.redirect('/dashboard/create-profile')
    } catch (e) {
        next(e)
    }
    
}

exports.createProfileGetController = async (req,res,next) => {
    try{
        let profile = await Profile.findOne({user: req.user._id});
        if(profile){
           return res.redirect('/dashboard/edit-profile')
        }
        res.render('pages/dashboard/create-profile',{title: "Create Your Profile",flashMessage : Flash.getMessage(req),error: {}})
    } catch(e) {
        next(e)
    }
}
exports.creaetProfilePostController = (req,res,next) => {
    let errors = validationResult(req).formatWith(errorFormatter)
    
    if(!errors.isEmpty()){
      
      return  res.render('pages/dashboard/create-profile',{title: "Create Your Profile",flashMessage : Flash.getMessage(req),error: errors.mapped()})
    }
    res.render('pages/dashboard/create-profile',{title: "Create Your Profile",flashMessage : Flash.getMessage(req),error: {}})
    
}
exports.editProfileGetController = (req,res,next) => {
    next()
}
exports.editProfilePostController = (req,res,next) => {
    next()
}