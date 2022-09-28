const Dash = require('dash');

mnemonic = process.env.MNM

if (mnemonic === undefined || mnemonic === "") {
    console.error("Mnemonic cannot be null", 1);
    process.exit(1);
}

const clientOpts = {
  wallet: {
    mnemonic: mnemonic,
    unsafeOptions: {
      skipSynchronizationBeforeHeight: 803170, // only sync from early-2022
    },
  },
};
const client = new Dash.Client(clientOpts);

const registerName = async () => {
  const { platform } = client;

  const identity = await platform.identities.get("9NhV1FqsjRyQyNjTh4a3CWDC7sKgYBok6UmBjDdq3ENH");
  const nameRegistration = await platform.names.register(
    'plubinomukyfu.dash',
    { dashUniqueIdentityId: identity.getId() },
    identity,
  );

  return nameRegistration;
};

registerName()
  .then((d) => console.log('Name registered:\n', d.toJSON()))
  .catch((e) => console.error('Something went wrong:\n', e))
  .finally(() => client.disconnect());
