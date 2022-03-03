import Mongoose from 'mongoose';

const verification = new Mongoose.Schema( {
  result: { type: Boolean},
  app_token: {type: Array},
  encrypt: {type: Array},
  policy_ver: {type: Array}
}, {
  versionKey: false,
});

const policySchema = new Mongoose.Schema( {
  result: {type: Boolean},
  policy: {type: Array},
  code: {type: Array},
  app_menu: {type: Array},
}, {
  versionKey: false
});

const termsSchema = new Mongoose.Schema( {
  signup_terms: {type: Object}
}, {
  versionKey: false
});


const policydb = Mongoose.model('Policy', policySchema, 'policy');
const Verification = Mongoose.model('Verification', verification);
const signupTerms = Mongoose.model('Terms', termsSchema, 'terms');

// export async function findByPhon(phonNumber) {
//   return User.findOne({phonNumber});
// }

export async function showPolicy() {
  return policydb.findOne();
}

export async function showverification(verification) {
  return new Verification(verification).save()
    .then((data) => {
      console.log(`Verification is required ${new Date()}`);
      return data;
    });
}

export async function showTerms() {
  return signupTerms.findOne();
}
