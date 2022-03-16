import * as appRepository from '../data/app.js';

// TODO
export async function callverification(req, res) {
  const name = req.headers["abcd-ef"];
  const result = true;
  const app_token = [
    {
      name,
    }
  ];
  const encrypt =[
    {
      key: "vkdNaleuTHenaOlL",
      iv: "zBN6M2DMdbAsLcSk",
    }
  ];
  const policy_ver = [
    {
      version: 20220127
    }
  ]
  const data = await appRepository.showverification( {
    result,
    app_token,
    encrypt,
    policy_ver
  })
  res.status(201).json(data);
}

export async function policyfun(req, res) {
  const policyData = await appRepository.showPolicy();
  res.status(200).json(policyData);
}

export async function signupTerms(req, res) {
  const singupTermsD = await appRepository.findAuthTerms();
  res.status(200).json(singupTermsD);
}