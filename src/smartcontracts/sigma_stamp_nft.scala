{

    val sigmaStampNftIssuanceOK = {
        
        val assetType = OUTPUTS(0).R7[Coll[Byte]].get
        val stampedDocHash = OUTPUTS(0).R8[Coll[Byte]].get
        val issued = OUTPUTS(0).tokens.getOrElse(0, (INPUTS(0).id, 0L))

        INPUTS(0).id == issued._1 && issued._2 == 1 &&

        OUTPUTS(0).value == $ergsSendTogetherWithNFTL &&
        OUTPUTS(0).propositionBytes == PK("$userAddress").propBytes &&

        OUTPUTS(1).value == $ergsFeeForSigmaStampServiceL &&
        OUTPUTS(1).propositionBytes == PK("$sigmaStampProviderAddress").propBytes &&

        assetType == fromBase64($assetTypeValue) &&
        stampedDocHash == fromBase64($documentHash) &&
        
        OUTPUTS.size == 3

    }

    val returnFunds = {

        val total_without_fee = INPUTS.fold(0L, {(x:Long, b:Box) => x + b.value}) - $returnTransactionFeeL

        OUTPUTS(0).value >= total_without_fee &&
        OUTPUTS(0).propositionBytes == PK("$userAddress").propBytes &&

        (PK("$sigmaStampAssemblerNodeAddr") || HEIGHT > $refundHeightThreshold) &&
        
        OUTPUTS.size == 2

    }

    sigmaProp(sigmaStampNftIssuanceOK || returnFunds)

}