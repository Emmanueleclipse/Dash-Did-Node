const Dash = require('dash');

mnemonic = process.env.MNM
offlineMode = false

if (mnemonic === undefined || mnemonic === "" ) {
    mnemonic = null;
    offlineMode = true;
}

const clientOpts = {
  network: 'testnet',
  wallet: {
    mnemonic: mnemonic, 
    offlineMode: offlineMode,  // this indicates we don't want to sync the chain
    // it can only be used when the mnemonic is set to 'null'
  },
};

const client = new Dash.Client(clientOpts);

const createWallet = async () => {
  const account = await client.getWalletAccount();

  const mnemonic = client.wallet.exportWallet();
  const address = account.getUnusedAddress();
  console.log('Mnemonic:', mnemonic);
  console.log('Unused address:', address.address);
};

createWallet()
  .catch((e) => console.error('Something went wrong:\n', e))
  .finally(() => client.disconnect());

// Handle wallet async errors
client.on('error', (error, context) => {
  console.error(`Client error: ${error.name}`);
  console.error(context);
});
