const Message = require("../models/Message");
const createError = require("http-errors");
const jsonResponse = require("../libs/jsonResponse");

const createMessage = async (req, res, next) => {
  const { message, userId, product,userType } = req.body;
    let user 
    if(userType !== process.env.ADMIN){
        user = 'user'
    }    
  try {
    const newMessage = new Message({ message, userId, product, userType:user, admin:"", response:""});
    result = await newMessage.save();
    res.json(
      jsonResponse({
        statuscode: 201,
        message: "Message created successfully",
        result,
      })
    );
  } catch (err) {
    next(createError(500, "error in your message"));
  }
};

const getMessageById = async (req, res, next) => {
  const { productId } = req.params;

  try {
    const result = await Message.find({product:productId});

    if (result === null) {
      res.json(
        jsonResponse({ statuscode: 200, message: "Not found", comments: [] })
      );
    }
    let comments = result.map(item => item.product === productId)
    res.json(
      jsonResponse({ statuscode: 200, message: "Message found", result })
    );
  } catch (err) {
    next(createError(500, "error fetching message"));
  }
};

const updateMessage = async (req, res, next) => {
    const {messageId} = req.params;
    console.log(req.body.admin, process.env.ADMIN)
    try {
        if(req.body.admin !== process.env.ADMIN) return next(createError("you cannot update messages"))
      const result = await Message.findByIdAndUpdate(
        messageId,
        {admin:"super", response:req.body.response},
        {new:true}
      )
        
      res.json(
          jsonResponse({ statuscode: 200, message: "upgraded message", result })
      );
    } catch (err) {
      next(createError(500, "error trying to fetch the message ID is incorrect"));
    }
  };

module.exports = {
  createMessage,
  getMessageById,
  updateMessage
};
