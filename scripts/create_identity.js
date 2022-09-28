const Dash = require('dash');

mnemonic = process.env.MNM

if (mnemonic === undefined || mnemonic === "") {
    console.error("Mnemonic cannot be null", 1);
    process.exit(1);
}

const clientOpts = {
  network: 'testnet',
  wallet: {
    mnemonic: mnemonic,
    unsafeOptions: {
      skipSynchronizationBeforeHeight: 803170, // only sync from early-2022
    },
  },
};
const client = new Dash.Client(clientOpts);

const createIdentity = async () => {
  return client.platform.identities.register();
};

createIdentity()
  .then((d) => console.log('Identity:\n', d.toJSON()))
  .catch((e) => console.error('Something went wrong:\n', e))
  .finally(() => client.disconnect());