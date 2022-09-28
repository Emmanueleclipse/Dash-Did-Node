const Dash = require('dash');

const client = new Dash.Client();

const retrieveIdentity = async () => {
  return client.platform.identities.get("9NhV1FqsjRyQyNjTh4a3CWDC7sKgYBok6UmBjDdq3ENH");
};

retrieveIdentity()
  .then((d) => console.log('Identity retrieved:\n', d.toJSON()))
  .catch((e) => console.error('Something went wrong:\n', e))
  .finally(() => client.disconnect());
