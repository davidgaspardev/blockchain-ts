# Blockchain

Developing a simple **private blockchain** with Typescript.

## Installations

Pre requirements:
- [Node.js](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com) or [npm](https://www.npmjs.com)

First install dependencies/packages:
> Obs: in development I was using **yarn** as package manager.
```zsh
yarn
```
or with `npm`:
```
npm ci
```

And then just build the application that will run automatically.
```zsh
yarn build
```
or with `npm`:
```zsh
npm build
```
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
