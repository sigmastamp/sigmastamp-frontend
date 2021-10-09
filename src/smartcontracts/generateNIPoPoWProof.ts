// TODO implement me
// -------------------------------------------------------------------------------
// NIPoPoW api requests
// -------------------------------------------------------------------------------
//
// Block header proof
//
// curl -X GET "http://ergo-full-node-ip:full-node-port[9052 - testnet, 9053 - mainnet]/nipopow/proof/6/6/504563f3b15b79d6918586bf5087e0fafa3108b73a5b81135d42d54d6082f97d" -H "accept: application/json"
//
// Transaction included in block proof
//
// curl -X GET "http://ergo-full-node-ip:full-node-port[9052 - testnet, 9053 - mainnet]/blocks/504563f3b15b79d6918586bf5087e0fafa3108b73a5b81135d42d54d6082f97d/proofFor/82b8aa0488ec15e4805fbf3a47d96bb109c29a814d1bf041f13b3f713d3d5675" -H "accept: application/json"
//
// Block data (extract it from there)
//
// curl -X GET "http://ergo-full-node-ip:full-node-port[9052 - testnet, 9053 - mainnet]/blocks/504563f3b15b79d6918586bf5087e0fafa3108b73a5b81135d42d54d6082f97d/transactions" -H "accept: application/json"
//
// -------------------------------------------------------------------------------
//
// Design some pretty export format
// Find news about the possibility of verification of existing proof - so far we would be able
// only to generate them but not to verify them, this should be solved in future
// we can also show how much hashrate has the potential attacker have to generate fake proof
//
export {}
