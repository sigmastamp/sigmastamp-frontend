# SigmaStamp's Wiki
Purpose of this page is to explain various technical terms used across the SigmaStamp website and also to provide detailed [examples](#examples-of-sigmastamp-usage) of SigmaStamp usage.

## Hash
**Layman explanation**

Hash function is special function which takes any data (e.g. in case of SigmaStamp text file, photo file, PDF file, zip file, ...) and turns them into fixed-size output that looks like a bunch of random letters and numbers. It's has a special property, that given its output called also an "hash", its computationaly infeasible to find its input. Each input will ALWAYS results in same output. In case of SigmaStamp, file hash is calculated and only this hash is being [stamped](#stamping) by uploading it into blockchain. This means that only the file owner now its content, because it cannot be calculated from its hash. However, if somebody is given a file, its hash can be calculated and search for the hash can be performed on the blockchain.

**Technical explanation**

todo

## Proof of Work
todo

## NFT Non Fungible Token
todo

## Stamping
During stamping phase, a [hash](#hash) of the file to be stamped is calculated and then this hash is inserted into the Ergo blockchain via special transaction creating a [NFT](#nft-non-fungible-token) which is send to the stamper address. The process of stamping is used to prove that the stamper know a hash of this file at the moment of stamping or even earlier, thus introducing a time boundary of (beginning of universe; stamping date) for the knowledge of file hash by the stamper.

## Verifying
During verifying phase, a [hash](#hash) of the examined file is calculated and then the Ergo blockchain is searched whether it contains this hash or not. In case a file with this hash was stamped via SigmaStamp application, it will be found and stamping results are shown - in case multiple people tried to stamp the same file, only the earliest stamping data will be shown, because we assumed that stamper who stamped it first is the original author of examined file.

**What means if file was verified to be stamped by someone?**

It mean that a stamper (a man who performed [stamping](#stamping) process) know file contents at specific time shown at the verifying page or earlier. E.g. when there is data-time of stamping shown as (2023-02-22 12:34 UTC+0) it means that the stamper know file content at this time. Stamper could know the content of this file even years before stamping, so the stamping process itself introduce a time boundary for knowledge of file content to (beginning of universe; stamping date).

**What does NOT mean if file was verified to be stamped by someone?**

It does not mean that the stamper (a man who performed [stamping](#stamping) process) was the original author of the file, and also it does not reveal anything about the file authenticity (e.g. if file was photo it does not prevent somebody from "photo-shopping" objects to the photo etc.).

**What can be deducted from the fact, that the file was stamped by someone?**

It can be deduced, that the stamper having access to wallet with address shown as "Stamper address" know the hash of the examined file in the moment of stamping. Also, it can be deduced what would be the lowest falsifying cost estimination for somebody who wants to produce fake stamping, meaning he want to falsify that some stamping happened in the past which does not happen in reality. This cost calcuation is explained [here](#calculation-of-falsification-cost).

## Time limits
In case of simple [stamping](#stamping) process, it means that the file submitted for stamping (meaning transaction was send from the wallet) will be stamped at time when block which will include this transaction will be mined. This means, that if you perfor a stamping process at 12:10, but there is a lot of transactions waiting to be included in the blockchain, your transaction can be included several blocks later meaning introduction of delay in amount of block times 120 seconds (average time to mine a block). In our example it can mean that our file can be stamped at 12:16 in case it was included approximately 3 blocks later (since the stamping).

In case of combined use-case where you use both ["present time proof"](#present-time-proof) and [stamping](#stamping) itself, it means that you are able to proof that e.g. the creation time of the picture you are trying to prove, is withing limit of time based on latest information (either one of the hashes of blockchains (BTC, ETH, LTC) headers, or the newspaper headline) from "present time proof", up to the stamping approval time (inclusion of stamping transaction in the Ergo blockchain).

## Present time proof
Imagine a situation when you are holding today's newspaper and you read its heading. Any time during today or even in the future, anybody will be able to tell the heading of today's newspaper, however one week ago, probably nobody would be able to do so, because nobody has a crystal ball and not having any "insider info" from the newspaper producer, its almost unpossible to be guess it.

Now imagine that the hash of the top of various blockchains (such as Bitcoin, Ethereum and Litecoin respectively) depend on the all of the past transactions (not only). Nobody will be able to guess those hashes for the next monday, because nobody is able to predict which transaction will be done on those chains (and there is also some other inherent randomness introduces but its too complicated for the sake of this explanation).

When you open content of the "Present time proof" page on SigmaStamp's website, an informations will be shown, which can be known only in the present moment and also in the future.

If you take photo of this informations, anybody looking at this photo will now that this photo was made either at the present moment or in some time in the future. This will introduce a time boundary for the creation of this photo to range (today; end of the universe).

**How can be this information used?**

In case you integrate this information into some file, for example you take a photo of apple together with this page shown for example on mobile phone screen, this will introduce a time boundary of (today; end of universe) for the creation of the photo, (BE AWARE that this is only true assuming that photo of apple wasn't taken earlier and the mobile phone screen was not "photoshopped" to this picture later on when the information shown on the mobile phone screen were available).

In our example, if you [stamp](#stamping) this photo after its creation via SigmaStamp, you will also introduce another time boundary of (beginning of universe; stamping date [today]). Those two time boundaries intersect at present time (+- some [interval](#time-limits)) meaning that the photo of apple was taken right know, which you will be able to later proof to anybody via SigmaStamp's [verifying](#verifying) feature. However, keep in mind all of this is true ONLY in case that we assume that nobody "photoshoped" information from "Present time proof" to the older photo of apple. In case of such "photoshopping" only fact that somebody does this falsification at the stamping time can be deduced.

This technique (if used correctly with some assumption - see text above) can be used for example to prove that some picture was made at specific time. This can be even used to prove that somebody was at some location at spefici time (he takes selfie at this location together with "present time proof" information and [stamp](#stamping) this photo).

## Solving present time proof assumptions
As was explained in the second part of [previous](#present-time-proof) section, combined usage of "present time proof" together with [stamping](#stamping) process can be used to provide really outstanding feature - ability to prove that some picture was taken at the specific moment which can be used to prove many things, including photo proof of state of house furniture, state of electricity meters, to proof that somebody was at some place at the specific moment in the past or that something was device was installed at specific time which can be required from device manufactured in order to obey warrancy rules.

However all of this process assumed that the photo which included informations from the [present time proof](#present-time-proof) section of SigmaStamp website which was later [stamped](#stamping) by the SigmaStamp application was genuine. However in reality it can be easy to "photoshop" such a photo, and insert informations from the "present time proof" into older made photo which degrade all of present to future time boundaries as explained in the previous section. This means that verifier has always need to really carefully check the examined photo and decide whether he trust that this picture is genuine or not. However a few things can be made in order to make the falsification process more hard.

One of such things is usage of concept widely used in reddit community, but also by some banks, where user is required to hand write something on a piece of paper and take of himself doing something (e.g. holding an ID next to his face in case of bank) while also holding crumpled piece of paper with hand writen text. It is assumed that falsifying such picture - "photoshopping" a piece of crumpled paper with hand written text into the hand of user is not an easy task and most of the attemps for such falsification which will be clear from the resulting picture after careful examination.

Same principle can be introduced to SigmaStamp "Present time proof" page, where QR code containing the information will be shown together with short (e.g. 10 characters long) checksum of those information. User will open a "present time proof" page, take screenshot of it, write down the short checksum to the piece of paper by hand, crumple it and take photo which's creation time he will want to later prove in a way that this crumpled piece of paper will be clearly visible in the photo. Then user will zip those two files - the photo itself, together with the screenshot of "present time proof" page, and then stamp this zip file SigmaStamp.

Anybody can then check the zip file via sigmastamp to verify one of the time boundaries. Then open the screenshot and check "present time proof" in order to verify the another time boundary, while also checking that the examined photo contain a piece of crumpled paper with a short checksum which is also shown on the screenshot. If the photo looks genuine - meaning that it seems that piece of paper was not "photoshopped" there and also that the thing on photo was not edited (e.g. state of furniture was not photoshopped in case of landlord taking a photo of his property before giving keys from this property to the tenants), it can be implied that the photo was really taken at the specific time resulting from the proof itself.

## Calculation of falsification cost
When file is found to be stamped via SigmaStamp application, the costs of producing a false "proof" meaning "re-mining" the blockchain from the stamping block up to the present is calculated. This costs increase the more in the past the stamping event happened. Examination is done via calculating all of the work required to "re-mine" the blockchain in order to produce false "proof" while taking into calcuation most effective graphic card available for Ergo blockchain's [Proof of Work](#proof-of-work) mining in terms of electricity consumption. From this the total amount of electricity needed to falsify the proof is calculated from which the approximation of dolar cost of this falsifying process (based on the electricity cost) is examined.

## Everything is executed localy
Any file you drop into SigmaStamp's stamping or verifying area is NOT being send anywhere. It's is processed offline in the browser in order to calculate file [hash](#hash) which is later uploaded (during [stamping](#stamping) phase) to blockchain or a search for file hash in blockchain is performed (during [verifying](#verifying) phase).

# Examples of SigmaStamp usage
todo
