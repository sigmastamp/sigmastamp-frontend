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

**What means if file was verified to be stamped by someone?**

It mean that a stamper (a man who performed [stamping](#stamping) process) know file contents at specific time shown at the verifying page or earlier. E.g. when there is data-time of stamping shown as (2023-02-22 12:34 UTC+0) it means that the stamper know file content at this time. Stamper could know the content of this file even years before stamping, so the stamping process itself introduce a time boundary for knowledge of file content to (beginning of universe; stamping date).

**What does NOT mean if file was verified to be stamped by someone?**

It does not mean that the stamper (a man who performed [stamping](#stamping) process) was the original author of the file, and also it does not reveal anything about the file authenticity (e.g. if file was photo it does not prevent somebody from "photo-shopping" objects to the photo etc.).

**What can be deducted from the fact, that the file was stamped by someone?**

It can be deduced, that the stamper having access to wallet with address shown as "Stamper address" know the hash of the examined file in the moment of stamping. Also, it can be deduced what would be the lowest falsifying cost estimination for somebody who wants to produce fake stamping, meaning he want to falsify that some stamping happened in the past which does not happen in reality. This cost calcuation is explained [here](#calculation-of-falsification-cost).

## Time limits
todo

## Present time proof
Imagine a situation when you are holding today's newspaper and you read its heading. Any time during today or even in the future, anybody will be able to tell the heading of today's newspaper, however one week ago, probably nobody would be able to do so, because nobody has a crystal ball and not having any "insider info" from the newspaper producer, its almost unpossible to be guess it.

Now imagine that the hash of the top of various blockchains (such as Bitcoin, Ethereum and Litecoin respectively) depend on the all of the past transactions (not only). Nobody will be able to guess those hashes for the next monday, because nobody is able to predict which transaction will be done on those chains (and there is also some other inherent randomness introduces but its too complicated for the sake of this explanation).

When you open content of the "Present time proof" page on SigmaStamp's website, an informations will be shown, which can be known only in the present moment and also in the future.

If you take photo of this informations, anybody looking at this photo will now that this photo was made either at the present moment or in some time in the future. This will introduce a time boundary for the creation of this photo to range (today; end of the universe).

**How can be this information used?**

In case you integrate this information into some file, for example you take a photo of apple together with this page shown for example on mobile phone screen, this will introduce a time boundary of (today; end of universe) for the creation of the photo, (BE AWARE that this is only true assuming that photo of apple wasn't taken earlier and the mobile phone screen was not "photoshopped" to this picture later on when the information shown on the mobile phone screen were available).

In our example, if you [stamp](#stamping) this photo after its creation via SigmaStamp, you will also introduce another time boundary of (beginning of universe; stamping date [today]). Those two time boundaries intersect at present time (+- some [interval](#time-limits)) meaning that the photo of apple was taken right know, which you will be able to later proof to anybody via SigmaStamp's [verifying](#verifying) feature. However, keep in mind all of this is true ONLY in case that we assume that nobody "photoshoped" information from "Present time proof" to the older photo of apple. In case of such "photoshopping" only fact that somebody does this falsification at the stamping time can be deduced.

This technique (if used correctly with some assumption - see text above) can be used for example to prove that some picture was made at specific time. This can be even used to prove that somebody was at some location at spefici time (he takes selfie at this location together with "present time proof" information and [stamp](#stamping) this photo).


## Calculation of falsification cost
When file is found to be stamped via SigmaStamp application, the costs of producing a false "proof" meaning "re-mining" the blockchain from the stamping block up to the present is calculated. This costs increase the more in the past the stamping event happened. Examination is done via calculating all of the work required to "re-mine" the blockchain in order to produce false "proof" while taking into calcuation most effective graphic card available for Ergo blockchain's [Proof of Work](#proof-of-work) mining in terms of electricity consumption. From this the total amount of electricity needed to falsify the proof is calculated from which the approximation of dolar cost of this falsifying process (based on the electricity cost) is examined.

## Everything is executed localy
Any file you drop into SigmaStamp's stamping or verifying area is NOT being send anywhere. It's is processed offline in the browser in order to calculate file [hash](#hash) which is later uploaded (during [stamping](#stamping) phase) to blockchain or a search for file hash in blockchain is performed (during [verifying](#verifying) phase).

# Examples of SigmaStamp usage
todo
