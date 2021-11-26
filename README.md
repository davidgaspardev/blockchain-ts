# Blockchain

Developing a simple **private blockchain** with Typescript.

___

## Public vs Private Blockchain

|                   | **Public Blockchain**  | **Private Blockchain**   |
|-------------------|------------------------|--------------------------|
| **Permissions**   | Permissionless         | Permissioned             |
| **Scability**     | More difficult         | Simpler                  |
| **Vulnerability** | Less vulnerable        | More vulnerable          |
| **Compliance**    | More difficult         | Simpler                  |

### Cross Chain Functionality
Allow a series of protocols that work in harmony to deliver decentralized applications.

## Block Data Model

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
