const express = require("express");
const userRouter = express.Router();
const userDatastore = require("./user.dataStore");
const userManager = require("./user.manager");

userRouter.route("/").post(createNew);
userRouter.route("/:id").get(getUserById);
userRouter.route("/:id/posts").get(getPostsForUser);
userRouter.route("/:id/allFriends").get(getAllMyFreinds);
userRouter.route("/:id/allFriendsRequest").get(getAllFreindsRequest);
userRouter.route("/:username/:password").get(getByUserNameAndPassword);
userRouter.route("/send-request/:myId/:friendId").get(sendFriendRequest);
userRouter.route("/accept-request/:myId/:friendId").get(acceptFriendRequest);
userRouter.route("/cancel-request/:myId/:friendId").get(cancelFriendRequest);
userRouter.route("/delete-friend/:myId/:friendId").get(deleteFriendRequest);

function createNew(req, res) {
  const user = req.body;
  userDatastore.createNew(
    user,
    (data) => {
      res.status(200).json(data);
    },
    (error) => {
      res.status(500).json(error);
    }
  );
}

function getByUserNameAndPassword(request, response) {
  const userName = request.params.username;
  const password = request.params.password;

  userDatastore.findByUserNameAndPassword(
    userName,
    password,
    (data) => {
      response.status(200).json(data);
    },
    (error) => {
      response.status(500).json(error);
    }
  );
}

function getUserById(req, res) {
  const id = req.params.id;

  userManager.getUser(
    id,
    (data) => {
      res.status(200).json(data);
    },
    (error) => res.status(500).json(error)
  );
}
function getPostsForUser(req, res) {
  const id = req.params.id;
  const type = req.query.type;

  userManager.getPosts(
    id,
    type,
    (data) => {
      res.status(200).json(data);
    },
    (error) => res.status(500).json(error)
  );
}

function getAllMyFreinds(req, res) {
  const id = req.params.id;

  userDatastore.getAllMyFreinds(
    id,
    (data) => {
      res.status(200).json(data);
    },
    (error) => res.status(500).json(error)
  );
}
function getAllFreindsRequest(req, res) {
  const id = req.params.id;

  userDatastore.getAllFreindsRequest(
    id,
    (data) => {
      res.status(200).json(data);
    },
    (error) => res.status(500).json(error)
  );
}
function sendFriendRequest(req,res)
{
    const myId=req.params.myId;
    const friendId=req.params.friendId;
    
    userManager.sendRequest(
        myId,
        friendId,
        (data) => {
          res.status(200).json(data);
        },
        (error) => res.status(500).json(error)
      );
}
function acceptFriendRequest(req,res)
{
    const myId=req.params.myId;
    const friendId=req.params.friendId;
    
    userManager.acceptRequest(
        myId,
        friendId,
        (data) => {
          res.status(200).json(data);
        },
        (error) => res.status(500).json(error)
      );
}
function cancelFriendRequest(req,res)
{
    const myId=req.params.myId;
    const friendId=req.params.friendId;
    
    userManager.cancelRequest(
        myId,
        friendId,
        (data) => {
          res.status(200).json(data);
        },
        (error) => res.status(500).json(error)
      );
}
function deleteFriendRequest(req,res)
{
    const myId=req.params.myId;
    const friendId=req.params.friendId;
    
    userManager.deleteFriend(
        myId,
        friendId,
        (data) => {
          res.status(200).json(data);
        },
        (error) => res.status(500).json(error)
      );
}


module.exports = userRouter;
