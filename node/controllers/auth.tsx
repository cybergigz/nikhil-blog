const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require('passport');
const LocalStrategy = require('passport-local');

var nodemailer = require('nodemailer');
var crypto = require('crypto');

const User = require("../models/user.tsx");
const countries = require("../models/country.tsx");
const states = require("../models/state.tsx");
const cities = require("../models/cities.tsx");

require('../services/passport.tsx');
const sgMail = require('@sendgrid/mail');
var generator = require('generate-password');

var fs = require('file-system');





async function generateToken() {
    const buffer = await new Promise((resolve, reject) => {
      crypto.randomBytes(256, function(ex, buffer) {
        if (ex) {
          reject("error generating token");
        }
        resolve(buffer);
      });
    });
    const token = crypto
      .createHash("sha1")
      .update(buffer)
      .digest("hex");

    return token;
}

exports.signup = (req, res, next) => {
    User.find({ 'email': req.body.email })
        .then(user => {
            if (user.length >= 1) {
                return res.status(200).json({
                    message: "Mailexists",
                    LoginData:[]

                });
            } else {
                var password = generator.generate({
                    length: 10,
                    numbers: true
                });
                const  username=req.body.firstName+' '+req.body.lastName;

                bcrypt.hash(password, 10, (err, hash) => {


                        const user = new User({
                            _id: new mongoose.Types.ObjectId(),
                            firstName: req.body.firstName,
                            lastName: req.body.lastName,
                            mobileNo: req.body.mobileNo,
                            email: req.body.email,
                            DOB: req.body.DOB,
                            SSN: req.body.SSN,
                            usCity : req.body.usCity,
                            address:{
                                country:req.body.address.country,
                                AddressLine1:req.body.address.AddressLine1,
                                AddressLine2:req.body.address.AddressLine2,
                                city:req.body.address.city,
                                state:req.body.address.state,
                                zipCode:req.body.address.zipCode
                            },
                            password:hash,
                            Active:false
                        });

                        user
                            .save()
                            .then(result => {
                                console.log("yes");
                                Verifiy_Email(req.body.email ,password,username);
                                console.log("yes2");
                                User.findOne({email: req.body.email}, function(err,obj) {
                                    var obje={
                                        _id: obj._id,
                                        firstName: obj.firstName,
                                        lastName: obj.lastName,
                                        mobileNo: obj.mobileNo,
                                        email: obj.email,
                                        DOB: obj.DOB,
                                        SSN: obj.SSN,
                                        usCity : obj.usCity,
                                        address:{
                                            country:obj.address.country,
                                            AddressLine1:obj.address.AddressLine1,
                                            AddressLine2:obj.address.AddressLine2,
                                            city:obj.address.city,
                                            state:obj.address.state,
                                            zipCode:obj.address.zipCode
                                        },
                                        Active:obj.Active
                                    }
                                    console.log("yes3");
                                    return res.status(201).json({
                                        message: "User created",
                                        LoginData:obje

                                    });
                                });

                            })
                            .catch(err => {
                                console.log(err);
                                return res.status(500).json({
                                    error: err
                                });
                            });
                  
                
			});
            }
        });
};

exports.login = (req, res, next) => {
	User.findOne({email: req.body.email}, function(err,obj) {



	if (obj!=null) {

        bcrypt.compare(req.body.password, obj.password, (err, result) => {
            var obje={
                _id: obj._id,
                firstName: obj.firstName,
                lastName: obj.lastName,
                mobileNo: obj.mobileNo,
                email: obj.email,
                DOB: obj.DOB,
                SSN: obj.SSN,
                usCity : obj.usCity,
                address:{
                    country:obj.address.country,
                    AddressLine1:obj.address.AddressLine1,
                    AddressLine2:obj.address.AddressLine2,
                    city:obj.address.city,
                    state:obj.address.state,
                    zipCode:obj.address.zipCode
                },
                Active:obj.Active
            };
            if (err) {
                return res.status(409).json({
                    message: "Auth failed",
                    LoginData:null
                });
            }
            if (result) {
                return res.status(200).json({
                    message: "success",
                    LoginData: obje,

                });
            }
        });
    }
	else
    {
        return res.status(200).json({
            message: "NotExist",
            LoginData:null

        });
    }
	
	
	});

          

      

};

exports.logout = (req, res) => {
    req.logout();
    res.redirect('/');
};

function next(error) {
  console.log(error)
}

exports.GetCountry = (req, res, next) => {

    mongoose.model('countries').find(function (err,countries){
        return res.status(200).json({
            message: "success",
            data: countries
        });
    }) ;
    

};
exports.GetStates = (req, res, next) => {

    mongoose.model('states').find({CID:req.body.CID},function (err,states){
        if (states !=null)
        {
            return res.status(200).json({
                message: "success",
                count: states.length,
                data: states
            });
        }
        else
        {
            return res.status(200).json({
                message: "success",
                count: 0,
                data: []
            });
        }

    }) ;


};
exports.GetCitizesByCID = (req, res, next) => {
    mongoose.model('cities').find({CID:req.body.CID},function (err,cities){

            return res.status(200).json({
                message: "success",
                data: cities
            });

    }) ;


};

exports.GetCitizesBySID = (req, res, next) => {

    mongoose.model('cities').find({SID:req.body.SID},function (err,cities){

        return res.status(200).json({
            message: "success",
            data: cities
        });


    }) ;


};



exports.resetPassword = async (req, res, next) => {

    try {
        const existingUser = await User.findOne({'resetPasswordToken': req.params.token, resetPasswordExpires: {$gt: Date.now()}});

        if (existingUser) {

            if(req.body.newPassword === req.body.confirmPassword) {

                const userPassword = await bcrypt.hash(req.body.newPassword, 10);

                if (userPassword) {

                    existingUser.password = userPassword;
                    existingUser.name = 'test';
                    existingUser.resetPasswordToken = undefined;
                    existingUser.resetPasswordExpires = undefined;

                    const user = await existingUser.save();

                    if (user) {
                        const token = jwt.sign({ id: user._id }, 'top_secret', {
                            expiresIn: 246400
                        });

                        // return new token for auto sign in after password reset
                        return res.status(200).json({ auth: true, token: token });
                    } else {
                        return res.status(422).send({
                            message: "Unprocessable Entity",
                            status: 'Unprocessable'
                        });
                    }
                }

            } else {
                return res.status(422).send({
                    message: 'Passwords do not match',
                    status: ' not match'
                });
            }

        } else {
            return res.status(400).json({
                message: "Password reset token is invalid or has expired.",
                status: 'invalid'
            });
        }

    } catch (error) {

    }
}
function  Verifiy_Email(UserEmail,Password,userName) {

    var base64img='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQgAAAFXCAYAAABeLtDdAAAgAElEQVR4Xu19CXhURdb2ISsJgSQ';//shortened version
    var data=base64img.replace(/^data:image\/\w+;base64,/,"");



            sgMail.setApiKey('');
    const msg = {
        to: UserEmail,
        from: 'karammah5@gmail.com',
        subject: 'Welcome to USTX! Confirm your Email',
        text: 'USTX Support Team',
        html: '<!DOCTYPE html>\n' +
            '<html style="-webkit-text-size-adjust: none; -webkit-background-size: 100%; margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '\n' +
            '<head>\n' +
            '    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />\n' +
            '    <title>ustx</title>\n' +
            '    <style type="text/css">\n' +
            '        html {\n' +
            '            -webkit-text-size-adjust: none;\n' +
            '            -webkit-background-size: 100%;\n' +
            '        }\n' +
            '        \n' +
            '        body,\n' +
            '        td,\n' +
            '        th {\n' +
            '            font-family: Arial, Helvetica, sans-serif; color: #000000;\n' +
            '            \n' +
            '        }\n' +
            '        \n' +
            '        body {\n' +
            '            background-color: #eeeeee; margin-left: 0px;margin-top: 0px;  margin-right: 0px; margin-bottom: 0px;margin: 0px 0px 0px 0px !important;padding: 0px 0px 0px 0px !important;\n' +
            '           \n' +
            '            \n' +
            '          \n' +
            '           \n' +
            '            \n' +
            '            \n' +
            '        }\n' +
            '        \n' +
            '        html,\n' +
            '        h1,\n' +
            '        h2,\n' +
            '        h3,\n' +
            '        h4,\n' +
            '        h5,\n' +
            '        h6,\n' +
            '        p,\n' +
            '        ol,\n' +
            '        ul,\n' +
            '        li,\n' +
            '        fieldset,\n' +
            '        form,\n' +
            '        label,\n' +
            '        legend,\n' +
            '        tr,\n' +
            '        input,\n' +
            '        textarea,\n' +
            '        select,\n' +
            '        div {\n' +
            '            margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;\n' +
            '           \n' +
            '           \n' +
            '            \n' +
            '        }\n' +
            '        \n' +
            '        img {\n' +
            '            border: 0;\n' +
            '            margin: 0px;\n' +
            '            padding: 0px;\n' +
            '            display: block;\n' +
            '        }\n' +
            '        \n' +
            '        li {\n' +
            '            list-style: none;\n' +
            '        }\n' +
            '        \n' +
            '        a {\n' +
            '            outline: none;\n' +
            '        }\n' +
            '        \n' +
            '        p {\n' +
            '            margin: 0px 0px 0px 0px !important;\n' +
            '            padding: 10px 0px !important;\n' +
            '            margin-bottom: 0px !important;\n' +
            '            margin-top: 0px !important;\n' +
            '            display: block;\n' +
            '        }\n' +
            '        \n' +
            '        a:link,\n' +
            '        a:visited,\n' +
            '        a:active {\n' +
            '            color: #55c2d9;\n' +
            '            text-decoration: underline;\n' +
            '        }\n' +
            '        \n' +
            '        a:hover {\n' +
            '            text-decoration: underline;\n' +
            '        }\n' +
            '        \n' +
            '        body a:link,\n' +
            '        a:visited,\n' +
            '        a:active {\n' +
            '            color: #000;\n' +
            '        }\n' +
            '        \n' +
            '        .ExternalClass,\n' +
            '        .ExternalClass p,\n' +
            '        .ExternalClass span,\n' +
            '        .ExternalClass font,\n' +
            '        .ExternalClass td,\n' +
            '        .ExternalClass div {\n' +
            '            line-height: 150%!important;\n' +
            '        }\n' +
            '    </style>\n' +
            '</head>\n' +
            '\n' +
            '<body dir="ltr" style="background:#F5F5F5; font-family:Arial, Helvetica, sans-serif;width: 100%; color: #000000; background-color: #eeeeee; margin-left: 0px;margin-top: 0px;  margin-right: 0px; margin-bottom: 0px;margin: 0px 0px 0px 0px !important;padding: 0px 0px 0px 0px !important;">\n' +
            '    <table align="center" border="0" cellpadding="0" cellspacing="0" class="body" width="640" bgcolor="#F5F5F5">\n' +
            '        <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '            <td height="20" colspan="3"><img src="/assets/frontend/images/space.gif" width="20" height="1" style="display: block; width:20px; height: 1px; font-family: Arial, Helvetica, sans-serif; color: #000000;"></td>\n' +
            '        </tr>\n' +
            '          <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '            <td width="20"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="20" height="1" style="display: block; width:20px; height: 1px;"></td>\n' +
            '            <td width="600">\n' +
            '               \n' +
            '                <table align="center" border="0" cellpadding="0" cellspacing="0" class="body" width="600" bgcolor="#fff">\n' +
            '                    <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                        <td height="18"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="1" style="display: block; width: 1px; height: 1px;"></td>\n' +
            '                    </tr>\n' +
            '                    <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                        <td>\n' +
            '                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="body" width="100%" bgcolor="#fff">\n' +
            '                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '\n' +
            '                                    <td width="227"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="1" style="display: block; width: 1px; height: 1px;"></td>\n' +
            '                                    <td align="center">\n' +
            '                                        <a href="#"><img src="<?php echo site_url(\'/assets/frontend/images/logo.png\'); ?>" width="146" style="display: block; width: 146px; height: auto;"></a>\n' +
            '                                    </td>\n' +
            '                                    <td width="227"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="1" style="display: block; width: 1px; height: 1px;"></td>\n' +
            '                                </tr>\n' +
            '                            </table>\n' +
            '                        </td>\n' +
            '                    </tr>\n' +
            '                   \n' +
            '                      <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                        <td width="100%">\n' +
            '                           <table align="center" border="0" cellpadding="0" cellspacing="0" class="body" width="100%" bgcolor="#008D72">\n' +
            '                                      <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                        <td align="center" height="30px" width="132"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;"></td>\n' +
            '                                        <td align="center" height="30px" width="132"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;"></td>\n' +
            '                                        <td align="center" height="30px" width="132"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;"></td>\n' +
            '                                    </tr>  \n' +
            '                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                    <td align="center" height="30px" width="132"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;"></td>\n' +
            '                                                \n' +
            '                                    <td align="center" width="100%">' +
            '<img src="http://karammah123-001-site1.atempurl.com/assets/logowhite.png" class="img-responsive" /></td>\n' +
            '                                    <td align="center" height="30px" width="132"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;"></td>\n' +
            '                                                \n' +
            '                                </tr>\n' +
            '                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                    <td align="center" height="30px" width="132"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;"></td>\n' +
            '                                    <td align="center" height="30px" width="132"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;"></td>\n' +
            '                                    <td align="center" height="30px" width="132"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;"></td>\n' +
            '                                </tr> \n' +
            '             </table>\n' +
            '                        </td>\n' +
            '                    </tr>\n' +
            '                   \n' +
            '                      <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                        <td>\n' +
            '                            <table align="center" border="0" cellpadding="0" cellspacing="0" class="body" width="100%">\n' +
            '                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                    <td width="560">\n' +
            '                                        <table align="center" border="0" cellpadding="0" cellspacing="0" class="body" width="100%">\n' +
            '                                              <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                <td height="10"></td>\n' +
            '                                            </tr>\n' +
            '                                              <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                    <td>\n' +
            '                                                    <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                                                    </td>\n' +
            '                                                </tr>\n' +
            '                                              <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                <td style="border-bottom:1px solid #CBCBCB; padding: 10px 0">\n' +
            '                                                    <h4 style="text-transform:initial; font-size:21px; margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">Hello Dear  '+userName+', </h4>\n' +
            '                                                </td>\n' +
            '                                                </tr>\n' +
            '                                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                        <td>\n' +
            '                                                        <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                                                        </td>\n' +
            '                                                    </tr>\n' +
            '                                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                    <td>\n' +
            '                                                    <p style="font-size: 12px; margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">Welcome to our community. Now you\'re officially a valued member of our ustx family. We can\'t wait for you to start your ustx journey!</p>\n' +
            '\n' +
            '                                                    </td>\n' +
            '                                                </tr>\n' +
            '                                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                        <td>\n' +
            '                                                        <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                                                        </td>\n' +
            '                                                    </tr>\n' +
            '                                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                    <td>\n' +
            '                                                            <p style="font-size: 12px; margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">Welcome to ustx. You have registered with us and you are </p>\n' +
            '                                                    </td>\n' +
            '\n' +
            '                                                </tr>\n' +
            '                                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                        <td>\n' +
            '                                                        <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                                                        </td>\n' +
            '                                                    </tr>\n' +
            '                                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                    <td>\n' +
            '                                                    <p style="font-size: 12px; margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">Here is your '+UserEmail+' and '+Password+'. </p>\n' +
            '                                                    </td>\n' +
            '                                                </tr>\n' +
            '                                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                        <td>\n' +
            '                                                        <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                                                        </td>\n' +
            '                                                    </tr>\n' +
            '                                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                    <td>\n' +
            '                                                    <p style="font-size: 12px; margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">You have to first activate your account to login</p>\n' +
            '                                                    </td>\n' +
            '                                                </tr>\n' +
            '                                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                        <td>\n' +
            '                                                        <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                                                        </td>\n' +
            '                                                    </tr>\n' +
            '                                                     <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                       <td>\n' +
            '                                                            <table width="190" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#008D72">\n' +
            '                                                     \n' +
            '                                                                      <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                                        <td height="45" align="center" style="color:#000000; "><a href="{reset_link}" target="_blank" style=" font-size:18px; color:#ffffff; text-decoration:none;">Verify Email Address</a></td>\n' +
            '                                                                    </tr>\n' +
            '                                                                    \n' +
            '                                                                </table>\n' +
            '                                                       </td>\n' +
            '                                                   </tr> \n' +
            '                                                     <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                        <td>\n' +
            '                                                        <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                                                        </td>\n' +
            '                                                    </tr>\n' +
            '                                                     <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                       <td>\n' +
            '                                                             <p style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">Button not working? Copy and paste this link into your browser:</p>\n' +
            '                                                       </td>\n' +
            '                                                   </tr>\n' +
            '                                                     <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                        <td>\n' +
            '                                                        <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                                                        </td>\n' +
            '                                                    </tr>\n' +
            '                                                     <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                       <td>\n' +
            '                                                            <p style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;"> {reset_link}</p>\n' +
            '                                                       </td>\n' +
            '                                                   </tr>\n' +
            '                                                     <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                        <td>\n' +
            '                                                        <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                                                        </td>\n' +
            '                                                    </tr>\n' +
            '                                                     <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                       <td>\n' +
            '                                                    <p style="font-size: 12px;margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">You’re just a few steps away from experiencing the benefits of ustx. Request for Quote or Check your Bid Opportunities. Have a nice time enjoying ustx services!</p>\n' +
            '\n' +
            '                                                       </td>\n' +
            '                                                   </tr>\n' +
            '                                                     <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                          <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                                <td>\n' +
            '                                                                <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                                                                </td>\n' +
            '                                                            </tr>\n' +
            '                                                       <td>\n' +
            '                                                    <p style="font-size: 12px; margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">For any help and support, you can write us at <a href="mailto:support@ustx.com">support@ustx.com</a>. We look forward to see your posts on our website. </p>\n' +
            '\n' +
            '                                                       </td>\n' +
            '                                                   </tr>\n' +
            '                                                     <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                        <td>\n' +
            '                                                        <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                                                        </td>\n' +
            '                                                    </tr>\n' +
            '                                                   <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                     <td>\n' +
            '                                                    <p style="font-size: 12px; margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">Thank You,Your ustxTeamDelivering Opportunities</p>\n' +
            '\n' +
            '                                                     </td>\n' +
            '                                                 </tr>\n' +
            '                                                   \n' +
            '                                                </td>\n' +
            '                                            </tr>\n' +
            '                                            \n' +
            '                                              <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                    <td>\n' +
            '                                                    <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                                                    </td>\n' +
            '                                                </tr>\n' +
            '                                              <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                <td style="border-bottom:1px solid #CBCBCB; padding: 10px 0">\n' +
            '                                                    <h4 style="text-transform:initial; font-size:21px; color: #0F74BA; margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">Smiles Gauranteed!</h4>\n' +
            '                                                </td>\n' +
            '                                                </tr>\n' +
            '                                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                        <td>\n' +
            '                                                        <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                                                        </td>\n' +
            '                                                    </tr>\n' +
            '                                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                    <td>\n' +
            '                                                    <p style="font-size: 12px; margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">Our policy are simple and transparent. We promise you will love selling and purchasing at ustx. If you don\'t like something - anything - about your experience with ustx, contact us. We will make it right.</p>\n' +
            '\n' +
            '                                                    </td>\n' +
            '                                                </tr>\n' +
            '                                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                        <td>\n' +
            '                                                        <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                                                        </td>\n' +
            '                                                    </tr>\n' +
            '                                                      <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                        <td>\n' +
            '                                                                <table width="190" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#008D72">\n' +
            '                                                        \n' +
            '                                                                          <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                                            <td height="45" align="center" style="color:#000000; "><a href="<?=site_url(\'user/contact_us\')?>" target="_blank" style=" font-size:18px; color:#ffffff; text-decoration:none;">Contact Us</a></td>\n' +
            '                                                                        </tr>\n' +
            '                                                                     \n' +
            '                                                                    </table>\n' +
            '                                                        </td>\n' +
            '                                                    </tr>\n' +
            '                                                   \n' +
            '                                                \n' +
            '                                           \n' +
            '                                              <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                    <td>\n' +
            '                                                    <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                                                    </td>\n' +
            '                                                </tr>\n' +
            '                                              <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                <td style="border-bottom:1px solid #CBCBCB; padding: 10px 0">\n' +
            '                                                    <h4 style="text-transform:initial; font-size:21px; color: #0F74BA; margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">Emails. It\'s up to you.</h4>\n' +
            '                                                </td>\n' +
            '                                                </tr>\n' +
            '                                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                        <td>\n' +
            '                                                        <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                                                        </td>\n' +
            '                                                    </tr>\n' +
            '                                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                    <td>\n' +
            '                                                    <p style="font-size: 12px; margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">If you found our emails irrelevant to you, please click below to unsubscribe.</p>\n' +
            '\n' +
            '                                                    </td>\n' +
            '\n' +
            '                                                </tr>\n' +
            '                                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                        <td>\n' +
            '                                                        <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                                                        </td>\n' +
            '                                                    </tr>\n' +
            '                                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                    <td>\n' +
            '                                                            <table width="220" border="0" align="center" cellpadding="0" cellspacing="0" bgcolor="#008D72"">\n' +
            '                         \n' +
            '                                                                      <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                                       <td height="45" align="center" style="color:#000000;"><a href="<?=site_url(\'user/unsubscribe_newsletter\')?>" target="_blank" style=" font-size:18px; color:#ffffff; text-decoration:none;">Unsubscribe Now</a></td>\n' +
            '                                                                    </tr>\n' +
            '                                                                  \n' +
            '                                                                 </table>\n' +
            '                                                    </td>\n' +
            '                                                </tr>\n' +
            '                                                   \n' +
            '                                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                                        <td>\n' +
            '                                                        <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="30" style="display: block; width: 1px; height: 1px;">\n' +
            '                                                        </td>\n' +
            '                                                    </tr>\n' +
            '\n' +
            '                                    \n' +
            '                                </table>\n' +
            '                        </td>\n' +
            '                        <td width="20"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="20" height="1" style="display: block; width:20px; height: 1px;"></td>\n' +
            '                    </tr>\n' +
            '                    </table>\n' +
            '            </td>\n' +
            '            <td width="20"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="20" height="1" style="display: block; width:20px; height: 1px;"></td>\n' +
            '          \n' +
            '        </tr>\n' +
            '          <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '            <td>\n' +
            '                <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="#F5F5F5" style="background: #F5F5F5;">\n' +
            '                      <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                        <td width="50">\n' +
            '                            <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="1" style="display: block; width: 1px; height: 1px;">\n' +
            '                        </td>\n' +
            '                        <td width="460">\n' +
            '                            <table align="center" border="0" cellpadding="0" cellspacing="0" width="100%">\n' +
            '                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                    <td height="20"> <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="1" style="display: block; width: 1px; height: 1px;"></td>\n' +
            '                                </tr>\n' +
            '                                  <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '                                    <td height="20"> <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="1" style="display: block; width: 1px; height: 1px;"></td>\n' +
            '                                </tr>\n' +
            '                            </table>\n' +
            '                        </td>\n' +
            '                        <td width="20">\n' +
            '                            <img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="20" height="1" style="display: block; width:20px; height: 1px;">\n' +
            '                        </td>\n' +
            '                    </tr>\n' +
            '                </table>\n' +
            '            </td>\n' +
            '        </tr>\n' +
            '        </table>\n' +
            '        </td>\n' +
            '        <td width="20"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="20" height="30" style="display: block; width: 20px; height: 1px;"></td>\n' +
            '        </tr>\n' +
            '          <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '            <td height="30" colspan="3"><img src="<?php echo site_url(\'/assets/frontend/images/space.gif\'); ?>" width="1" height="1" style="display: block; width: 1px; height: 1px;"></td>\n' +
            '        </tr>\n' +
            '          <tr style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif;border-spacing: 0px;">\n' +
            '            <td colspan="3" style="font-size: 10px; color: #000000; text-align: center;">\n' +
            '                You received this email because you register on ustx.com with the email address {email_address}. We respect your privacy. If you believe this email has been sent you in error please safely <a href="<?=site_url(\'user/unsubscribe_newsletter\');?>">unsubscribe</a>\n' +
            '            </td>\n' +
            '        </tr>\n' +
            '    </table>\n' +
            '</body>\n' +
            '\n' +
            '</html>',
    };
    sgMail.send(msg)
        .then( function (response)
    {
console.log("emailSent");
    })
    .catch(function (err) {
        console.log(err);

    })
}
