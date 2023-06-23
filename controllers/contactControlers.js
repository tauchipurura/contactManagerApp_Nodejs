const asyncHandler = require('express-async-handler')
const Contact = require('../models/contactModel')

// @desc Get all contacts
// @rote Get/api/contacts
// @access public
const getContacts = asyncHandler(async(req,res) => {
        const contacts = await Contact.find({user_id: req.user.id})
        res.status(200).json(contacts)
    }
)

// @desc Get contact
// @rote Post/api/contacts
// @access private
const createContact = asyncHandler(async(req,res) => {
    console.log("the request body is:",req.body)
    const {name, email, phone} = req.body;
    if(!name || !email || !phone) {
        res.status(400);
        throw new Error(" All fields must be filled")
    }
    const contact = await  Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    })
    res.status(201).json(contact)
})

// @desc Get contact
// @rote Get/api/contacts
// @access private
const getContact = asyncHandler(async(req,res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact){
        res.status(404);
        throw new Error('Contact not found')
    }
    res.status(200).json(contact)
})

// @desc update contacts
// @rote put/api/contacts
// @access private
const updateContact = asyncHandler(async(req,res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error('Contact not found')
    }

    if(contact.user_id.toString() !== req.use.id){
        res.status(403);
        throw new Error("User dont have permison to update other user contacts")
    } 
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body, 
        {new: true}
    );
    res.status(200).json(updatedContact)
})


// @desc delete contacts
// @rote delete/api/contacts
// @access private
const deleteContact = asyncHandler(async(req,res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error('Contact not found')
    }
    if(contact.user_id.toString() !== req.use.id){
        res.status(403);
        throw new Error("User dont have permison to delete other user contacts")
    }
    await Contact.deleteOne({_id: req.params.id})
    res.status(200).json(contact)
    }
)



module.exports = { getContacts, createContact, getContact, updateContact, deleteContact}