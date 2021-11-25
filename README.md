# Blockchain

Developing a simple blockchain with Typescript.

## Block data model

Data structure model used in blocks categorized into two main parts: **header** and **body**.

### Header
| Property     | Value (*example*)             | Description                                  |
|--------------|-------------------------------|----------------------------------------------|
| version      | `1`                           | Blockchain version.                          |
| height       | `4`                           | Blockchain height or block index.            |
| timestamp    | `2021-11-25T18:10:34.121Z`    | When the block was created.                  |
| nonce        | `4657` (random)               | Number only used once to create a hash valid.|
| previousHash | `09af5c...` (sha256)          | Previous block hash (index - 1)              |
| hash         | `56dbc0...` (sha256)          | Block hash generated from all block data.    |
