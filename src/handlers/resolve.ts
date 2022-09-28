import { Request, Response } from 'express';
import { DID } from '../storage/did';
import { DIDDocument, DocumentMetadata, EcdsaSecp256k1VerificationKey2019, ResolutionMetadata, VerificationMethod } from '../storage/document';
import { getDashIdentity } from '../storage/getIdentity'


export async function Resolve(req: Request, res: Response) {

    let did: DID; 
    const identifier: string = req.params.identifier;
    try {
        did = new DID(identifier);
    } catch(err: unknown) {
        let resolution = new ResolutionMetadata()
        resolution.error = err;
        console.log(resolution)
        res.json({})
        return
    }

    await did.initialize();

    let doc: DIDDocument = new DIDDocument(identifier);
    doc.id = did.toString();

    let id: any;
    try {
        id = await getDashIdentity(did.data || "");
    } catch (err: unknown) {
        console.log(err)
        let resolution: ResolutionMetadata = new ResolutionMetadata();
        resolution.error = "notFound";
        res.json({});
        return;
    }
    if (id === undefined || id === null) {
        console.log("id not found")
        let resolution: ResolutionMetadata = new ResolutionMetadata();
        resolution.error = "notFound";
        res.json({});
        return;
    }

    const idData: Buffer = id['publicKeys'][0]['data']
    const hexPubKey:string = idData.toString("hex")

    const host: string = `${req.protocol}://${req.get("host")}${req.originalUrl}`

    const resolution = new ResolutionMetadata(host, did);
    const docMeta = new DocumentMetadata();

    let verif: VerificationMethod = new EcdsaSecp256k1VerificationKey2019(did.toString(), did.toString(), hexPubKey)
    doc.verificationMethod = verif;
    res.json(doc)
}
