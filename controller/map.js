import * as naverMap from '../data/map.js';

export async function mapfun(req, res) {
    const mapData = await naverMap.showMap();
    res.status(200).json(mapData);
  }