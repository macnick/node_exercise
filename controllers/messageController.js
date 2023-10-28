const newMessage = (req, res) => {
  // const newMessage = {
  //   id: messages.length + 1,
  //   from: req.body.from,
  //   text: req.body.text,
  //   timeSent: new Date().toLocaleString(),
  // };
  // messages.push(newMessage);
  res.status(201).json({
    message: 'Message was sent successfully!',
    newMessage,
  });
};

const updateMessage = (req, res) => {
  const id = req.params.id;
  const updatedMessage = {
    id,
    from: req.body.from,
    text: req.body.text,
    timeSent: new Date().toLocaleString(),
  };
  messages[id - 1] = updatedMessage;
  res.status(200).json({
    message: 'Message was updated successfully!',
    updatedMessage,
  });
};

const messagesBetweenUsers = (req, res) => {
  // const user1 = req.params.user1;
  // const user2 = req.params.user2;
  // const messagesBetweenUsers = messages.filter(
  //   (message) => message.from === user1 && message.to === user2
  // );
  res.status(200).json({
    // messagesBetweenUsers,
    message: 'Messages between users were retrieved successfully!',
  });
};

module.exports = {
  newMessage,
  updateMessage,
  messagesBetweenUsers,
};
