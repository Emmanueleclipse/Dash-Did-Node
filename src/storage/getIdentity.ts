import { client } from '../storage/client';

export async function getDashIdentity(identity: string): Promise<any> {
  const res = await client.platform.identities.get(identity);
  return res
};


export async function resolveDashName(name: string): Promise<any> {
  const res = await client.platform.names.resolve(name);
  return res
}