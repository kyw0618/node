import * as orderRepository from '../data/order.js';

export async function createOrder(req, res) {
  const {place, receiver, sender, word} = req.body;
  const order = await orderRepository.saveOrder({
    place,
    receiver,
    sender,
    word
  })

  res.status(201).json({"status": "201", order});

}

export async function searchOrder(req, res) {
  const value = req.query.value;
  const order = await orderRepository.findOrder(value);

  res.status(200).json({"status": "200", order});
}