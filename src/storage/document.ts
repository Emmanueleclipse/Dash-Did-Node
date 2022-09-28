import { DID } from "./did";

export class DIDDocument {
    context: string[];
    id: string;
    verificationMethod?: VerificationMethod | EcdsaSecp256k1VerificationKey2019
    constructor (id: string, verificationMethod?: VerificationMethod) {
        this.context = ["https://www.w3.org/ns/did/v1"];
        this.id = id;
        this.verificationMethod = verificationMethod;
    }
}

export class VerificationMethod {
    id: string;
    controller: string;
    type: string;
    publicKeyJwk?: any

    constructor (id: string, controller: string, type: string) {
        this.id = id;
        this.controller = controller;
        this.type = type;
    }
}

export class EcdsaSecp256k1VerificationKey2019 {
    id: string;
    controller: string;
    type: string;
    publicKeyHex: string;

    constructor (id: string, controller: string, pubkey: string) {
        this.id = id;
        this.controller = controller;
        this.type = "EcdsaSecp256k1VerificationKey2019";
        this.publicKeyHex = pubkey;
    }
}

export class publicKeyJwk {

}

export class ResolutionMetadata {
    contentType: string;
    driverUrl?: string;
    did?: {
        didString: string;
        methodSpecificId: string;
        method: string;
    }
    error?: string | unknown;
    
    constructor (driverUrl?: string, did?: DID, error?: string) {
        this.contentType = "application/did+json";
        this.driverUrl = driverUrl;
        if (did !== undefined) {
            this.did = {
                didString: did.toString(),
                methodSpecificId: did.data || "",
                method: did.method,
            }
        }
        this.error = error
    }
}


export class DocumentMetadata {
    network: string
    constructor (network?: string) {
        this.network = network || "mainnet" 
    }
}
