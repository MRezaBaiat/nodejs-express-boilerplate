const bcrypt = require('bcrypt');
const { hash, verify } = require('@authentication/secure-hash');

export default class PasswordHasherService {
  constructor () {
    // this.rounds = 12;//slows down brute force hacking
  }

  async hash (password) {
    // return await bcrypt.hash(password,this.rounds);
    return hash(password);
  }

  async check (password, hash) {
    // return await bcrypt.compare(password,hash);
    return verify(password, hash, () => {});
  }
};
