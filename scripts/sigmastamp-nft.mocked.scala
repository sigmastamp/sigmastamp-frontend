{
  val sigmaStampNftIssuanceOK = {
    val assetType = OUTPUTS(0).R7[Coll[Byte]].get
    val stampedDocHash = OUTPUTS(0).R8[Coll[Byte]].get
    val issued = OUTPUTS(0).tokens.getOrElse(0, (INPUTS(0).id, 0L))
    INPUTS(0).id == issued._1 && issued._2 == 1 &&
    OUTPUTS(0).value == 100000000L &&
    OUTPUTS(0).propositionBytes == PK(
      "3Ww7y6vi4NhFZ1ufsEF8vQNyGrvhNmeMmDWP9h3s4qSEFSMoGooV"
    ).propBytes &&
    OUTPUTS(1).value == 100000000L &&
    OUTPUTS(1).propositionBytes == PK(
      "3Ww7y6vi4NhFZ1ufsEF8vQNyGrvhNmeMmDWP9h3s4qSEFSMoGooV"
    ).propBytes &&
    assetType == fromBase64("Ad4=") &&
    stampedDocHash == fromBase64(
      "oW1XBcAxhm9cXdG6OeQ1OBk7RXGK9aUKEV4cjWfCCc0"
    ) &&
    OUTPUTS.size == 3
  }
  val returnFunds = {
    val total_without_fee =
      INPUTS.fold(0L, { (x: Long, b: Box) => x + b.value }) - 10000000L
    OUTPUTS(0).value >= total_without_fee &&
    OUTPUTS(0).propositionBytes == PK(
      "3Ww7y6vi4NhFZ1ufsEF8vQNyGrvhNmeMmDWP9h3s4qSEFSMoGooV"
    ).propBytes &&
    (PK(
      "3Ww7y6vi4NhFZ1ufsEF8vQNyGrvhNmeMmDWP9h3s4qSEFSMoGooV"
    ) || HEIGHT > 123) &&
    OUTPUTS.size == 2
  }
  sigmaProp(sigmaStampNftIssuanceOK || returnFunds)
}
