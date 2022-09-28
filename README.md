# Dash DID Resolver

Resolver for dash identities to compatible with the DID specification and [universal resolver](https://dev.uniresolver.io/)

# Getting started
## Running

The resolver can be run using docker-compose

```bash
$ docker build -t dash_did_resolver .
$ docker run dash_did_resolver
```

or using docker-compose
```bash
$ docker-compose up 
```

## Query
To resolve an identity from the dash identity registry
```bash
$ curl http://localhost:8080/identifiers/did:dash:9NhV1FqsjRyQyNjTh4a3CWDC7sKgYBok6UmBjDdq3ENH
```

which resolves to

```
{
    "context": [
            "https://www.w3.org/ns/did/v1"
    ],
    "id": "did:dash:9NhV1FqsjRyQyNjTh4a3CWDC7sKgYBok6UmBjDdq3ENH",
    "verificationMethod": {
        "id": "did:dash:9NhV1FqsjRyQyNjTh4a3CWDC7sKgYBok6UmBjDdq3ENH",
        "controller": "did:dash:9NhV1FqsjRyQyNjTh4a3CWDC7sKgYBok6UmBjDdq3ENH",
        "type": "EcdsaSecp256k1VerificationKey2019",
        "publicKeyHex": "025dc344653b8363a919e235c3c7ef64c3e1049ab517e5fe613ce70d96be72ed8b"
    }
}

```
