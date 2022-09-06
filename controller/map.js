import * as mapRepository from '../data/map.js';

export async function createNap(req, res) {
  const {
    address_name,
    region_1depth_name,
    region_2depth_name,
    region_3depth_name,
    region_4depth_name,
    call,
    x,
    y,
    created
  } = req.body;

  const userId = req.userId;
  try {
    var map_address = await mapRepository.save({
      address_name,
      region_1depth_name,
      region_2depth_name,
      region_3depth_name,
      region_4depth_name,
      call,
      x,
      y,
      created
    });
  } catch (error) {
    return res.status(400).json({"status" : "400"});
  }
  
  res.status(201).json({"status": "201", map_address});
}

export async function updateAddress(req, res, next) {
  const id = req.params.id;
  const obit = await mapRepository.findById(id);
  
  if(!obit) {
    return res.status(404).json({"status":"404"});
  }
  if(obit.userId !== req.userId && req.admin == false) {
    return res.status(403).json({"status": "403"});
  }

  const address = {
    address_name,
    region_1depth_name,
    region_2depth_name,
    region_3depth_name,
    region_4depth_name,
    call,
    x,
    y
  };
  const {created} = req.body;

  const updateAddress = await mapRepository.update(
    id,
    address,
    created,
  );
  res.status(200).json({"status": "200", updateAddress});
}

export async function removeAddress(req, res, next) {
  const id = req.params.id;
  const obit = await mapRepository.findById(id);
  if(!obit) {
    return res.status(404).json({"status":"404"});
  }
  if(obit.userId !== req.userId && req.admin == false) {
    return res.status(403).json({"status": "403"});
  }

  await mapRepository.remove(id);
  res.status(204).json(({"status":"204"}))
}

export async function getByname(req, res) {
  const value = req.query.name;
  const address_document = await ( value 
    ? mapRepository.findObituaryByname(value)
    : mapRepository.getAllObituary());
  
  res.status(200).json({"status": "200", address_document});
}

export async function getMyAddress(req, res) {
  const address_document = await mapRepository.findMyObituary(req.userId);

  res.status(200).json({"status": "200", address_document});
}