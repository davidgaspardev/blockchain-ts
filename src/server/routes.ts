/**
 *          BlockchainController
 * 
 * This class expose the endpoints that the client applications will use to interact with the 
 * Blockchain dataset
 */
import { Express } from "express";
import Blockchain from "../core/blockchain";

export default class Routes {

    private readonly routes: Express;

    //The constructor receive the instance of the express.js app and the Blockchain class
    constructor(routes: Express) {
        this.routes = routes;

        this.getBlockByHeight = this.getBlockByHeight.bind(this);
        this.requestOwnership = this.requestOwnership.bind(this);
        this.submitStar = this.submitStar.bind(this);
        this.getBlockByHash = this.getBlockByHash.bind(this);
        this.getStarsByOwner = this.getStarsByOwner.bind(this);
    }

    /** ======================= ROUTES TO BLOCKCHAIN ======================= */

    private readonly blockchain = Blockchain.init();

    public initBlockchainRoutes() {
        // All the endpoints methods needs to be called in the constructor to initialize the route.
        const { getBlockByHeight, requestOwnership, submitStar, getBlockByHash, getStarsByOwner } = this;

        getBlockByHeight();
        requestOwnership();
        submitStar();
        getBlockByHash();
        getStarsByOwner();
    }

    // Enpoint to Get a Block by Height (GET Endpoint)
    private getBlockByHeight() {
        // Destructuring assignment
        const { routes, blockchain } = this;

        routes.get("/block/height/:height", async (req, res) => {
            if (req.params.height) {
                const height = parseInt(req.params.height);
                let block = await blockchain.getBlockByHeight(height);
                if (block) {
                    return res.status(200).json(block.toJson());
                } else {
                    return res.status(404).send("Block Not Found!");
                }
            } else {
                return res.status(404).send("Block Not Found! Review the Parameters!");
            }

        });
    }

    // Endpoint that allows user to request Ownership of a Wallet address (POST Endpoint)
    private requestOwnership() {
        // Destructuring assignment
        const { routes, blockchain } = this;

        routes.post("/requestValidation", async (req, res) => {
            if (req.body.address) {
                const address = req.body.address;
                const message = await blockchain.requestMessageOwnershipVerification(address);
                if (message) {
                    return res.status(200).json(message);
                } else {
                    return res.status(500).send("An error happened!");
                }
            } else {
                return res.status(500).send("Check the Body Parameter!");
            }
        });
    }

    // Endpoint that allow Submit a Star, yu need first to `requestOwnership` to have the message (POST endpoint)
    private submitStar() {
        // Destructuring assignment
        const { routes, blockchain } = this;

        routes.post("/submitstar", async (req, res) => {
            if (req.body.address && req.body.message && req.body.signature && req.body.star) {
                const address = req.body.address;
                const message = req.body.message;
                const signature = req.body.signature;
                const star = req.body.star;
                try {
                    console.log(blockchain.submitStar);
                    let block = await blockchain.submitStar(address, message, signature, star);
                    if (block) {
                        return res.status(200).json(block.toJson());
                    } else {
                        return res.status(500).send("An error happened!");
                    }
                } catch (error) {
                    return res.status(500).send((error as Error).message);
                }
            } else {
                return res.status(500).send("Check the Body Parameter!");
            }
        });
    }

    // This endpoint allows you to retrieve the block by hash (GET endpoint)
    private getBlockByHash() {
        // Destructuring assignment
        const { routes, blockchain } = this;

        routes.get("/block/hash/:hash", async (req, res) => {
            if (req.params.hash) {
                const hash = req.params.hash;
                let block = await blockchain.getBlockByHash(hash);
                if (block) {
                    return res.status(200).json(block.toJson());
                } else {
                    return res.status(404).send("Block Not Found!");
                }
            } else {
                return res.status(404).send("Block Not Found! Review the Parameters!");
            }

        });
    }

    // This endpoint allows you to request the list of Stars registered by an owner
    private getStarsByOwner() {
        // Destructuring assignment
        const { routes, blockchain } = this;

        routes.get("/blocks/:address", async (req, res) => {
            if (req.params.address) {
                const address = req.params.address;
                try {
                    let stars = await blockchain.getStarsByWalletAddress(address);
                    if (stars) {
                        stars = stars.map(star => {
                            (star as any)["owner"] = address;
                            return star;
                        })
                        return res.status(200).json(stars);
                    } else {
                        return res.status(404).send("Block Not Found!");
                    }
                } catch (error) {
                    return res.status(500).send(`An error happened: ${(error as Error).message}`);
                }
            } else {
                return res.status(500).send("Block Not Found! Review the Parameters!");
            }
        });
    }

}