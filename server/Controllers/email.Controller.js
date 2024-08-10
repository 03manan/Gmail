import { Email } from "../Models/email.model.js";


//create email
export const createEmail = async (req,res) => {
    try {
       const userId = req.id;
       const {to, subject, message} = req.body;
       if(!to || !subject || !message) return res.status(400).json({message:"All fields are required!", success: false})
       
        const email = await Email.create({
            to,
            subject,
            message,
            userId
        });
        return res.status(201).json({
            email
        })
    } catch (error) {
        console.log(error);
    }
}

//delete email
export const deleteEmail = async (req,res) => {
    try {
        const emailId = req.params.id;  //uss email ki unique id
        if( !emailId ) return res.status(400).json({message:"Email Id is required."})

        const email = await Email.findByIdAndDelete(emailId)
        if (!email) return res.status(404).json({message:"Email is not found!"}) 
            
         return res.status(200).json({
            message : "Email deleted successfully."
         })  ; 
    } catch (error) {
        console.log(error)
    }
}

//fetch all emails 
export const getAllEmailsById = async ( req,res ) => {
    try {
        const userId = req.id;
        const emails = await Email.find({userId});

        return res.status(200).json({emails});
    } catch (error) {
        console.log(error)
    }
}