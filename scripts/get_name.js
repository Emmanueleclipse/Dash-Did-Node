const Dash = require('dash');

const client = new Dash.Client();

const registerName = async () => {
  const { platform } = client;

  const nameRegistration = await platform.names.resolve(
    'plubinomukyfu.dash');

  return nameRegistration;
};

registerName()
  .then((d) => console.log('Name registered:\n', d.toJSON()))
  .catch((e) => console.error('Something went wrong:\n', e))
  .finally(() => client.disconnect());