import { resolveDashName } from "./getIdentity";

export class DID {
    scheme: string;
    method: string;
    dataFn: Promise<any>;
    data?: string;

    private nameToggle: boolean = false;

    constructor (identifier: string) {
        this.scheme = "did";
        this.method = "dash";
        let regId = async function (): Promise<any> {
            return "";
        }
        this.dataFn = regId();

        if (identifier === "" || identifier === undefined) {
            return;
        } 
 
        const sections: string[] = identifier.split(":")
        if (sections.length !== 3) {
            throw("invalidDid");
        }
        if (`${sections[0]}` !== "did") {
            throw("invalidDid");
        }
        if (`${sections[1]}` !== "dash") {
            throw("methodNotSupported");
        }
        let innerData: string = sections[2]
        if (innerData.endsWith(".dash")) {
            this.dataFn = resolveDashName(innerData);
            this.nameToggle = true;
            return  
        }
        regId = async function (): Promise<any> {
            return sections[2];
        }
        this.dataFn = regId();

        return
    }

    async initialize() {
        let dt = await this.dataFn;
        
        if (this.nameToggle) {
            let dtBuffer:Buffer = dt.data.records.dashUniqueIdentityId;
            const dtHex = dtBuffer.toString();

            console.log(dtHex);
            this.data = dtHex;
            return
        }

        this.data = dt;
    }

    toString(): string {
        return `${this.scheme}:${this.method}:${this.data}`;
    }
}