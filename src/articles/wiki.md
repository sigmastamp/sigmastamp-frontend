# SigmaStamp's Wiki
Purpose of this page is to explain various technical terms used across the SigmaStamp website and also to provide detailed [examples](#examples-of-sigmastamp-usage) of SigmaStamp usage.

## Hash
**Layman explanation**

Hash function is special function which takes any data (e.g. in case of SigmaStamp text file, photo file, PDF file, zip file, ...) and turns them into fixed-size output that looks like a bunch of random letters and numbers. It's has a special property, that given its output called also an "hash", its computationaly infeasible to find its input. Each input will ALWAYS results in same output. In case of SigmaStamp, file hash is calculated and only this hash is being [stamped](#stamping) by uploading it into blockchain. This means that only the file owner now its content, because it cannot be calculated from its hash. However, if somebody is given a file, its hash can be calculated and search for the hash can be performed on the blockchain.

**Technical explanation**

todo

## Proof of Work
todo

## Stamping
todo

## Verifying
During verifying phase, a [hash](#hash) of the examined file is calculated and then the Ergo blockchain is searched whether it contains this hash or not. In case a file with this hash was stamped via SigmaStamp application, it will be found and stamping results are shown - in case multiple people tried to stamp the same file, only the earliest stamping data will be shown, because we assumed that stamper who stamped it first is the original author of examined file.

## Calculation of falsification cost
When file is found to be stamped via SigmaStamp application, the costs of producing a false "proof" meaning "re-mining" the blockchain from the stamping block up to the present is calculated. This costs increase the more in the past the stamping event happened. Examination is done via calculating all of the work required to "re-mine" the blockchain in order to produce false "proof" while taking into calcuation most effective graphic card available for Ergo blockchain's [Proof of Work](#proof-of-work) mining in terms of electricity consumption. From this the total amount of electricity needed to falsify the proof is calculated from which the approximation of dolar cost of this falsifying process (based on the electricity cost) is examined.

## Everything is executed localy
Any file you drop into SigmaStamp's stamping or verifying area is NOT being send anywhere. It's is processed offline in the browser in order to calculate file [hash](#hash) which is later uploaded (during [stamping](#stamping) phase) to blockchain or a search for file hash in blockchain is performed (during [verifying](#verifying) phase).

# Examples of SigmaStamp usage
todo
