# <p style='color:blueviolet'>Description

This repository is dedicated to guiding beginners through the process of understanding and implementing SHA-256 (Secure Hash Algorithm 256-bit), a popular cryptographic hash function that produces a 256-bit (32-byte) hash value. This walkthrough aims to provide you with a clear, comprehensive, and easy-to-follow explanation of the SHA-256 algorithm.

## Notice

This SHA-256 walkthrough represents my personal exploration and understanding of the SHA-256 hash function. As such, while I've aimed to make it as accurate and comprehensive as possible, it is very much a product of my own learning journey.

Please be aware that, despite my best efforts, the walkthrough may contain inaccuracies, typos, or errors, both substantive and pedagogical. The sequencing and explanations reflect my own process of understanding, and may not be the most efficient or clear path for all learners.

I am sharing this in the hope that it will be of use to others embarking on a similar journey of understanding. However, I strongly encourage everyone to do their own research, corroborate the information provided, and use this as just one tool among many in their learning toolkit.

---

## <p style='color:mediumpurple'>Table of Contents</p>

1. [What is SHA-256?](#what-is-sha-256)
2. [Common Applications](#common-applications)
3. [How does SHA-256 work?](#how-does-sha-256-work)
4. [Code](#code)
5. [FAQs](##FAQs)
6. [Resources](#resources)

---



## <p style='color:mediumpurple'>What is SHA-256?
- SHA-256 is a cryptographic hash function.

- In the realm of computer science and cryptography, a hash function is a unique type of function used for mapping data of arbitrary size to a fixed-size output. 
- It's like generating a unique digital fingerprint for data of any size. 
- For example, the text "Hello, World!" when hashed with SHA-256, would produce a unique 64-character hexadecimal number. Even a small change, say "hello, World!" (with a lowercase 'h'), would produce a vastly different hash. 


## <p style='color:mediumpurple'>Common Applications

SHA-256 is a cryptographic hash function that's employed in a wide array of applications, from ensuring data integrity and security to providing the bedrock for complex protocols and systems. Its key usages are explored in depth below.

###  <p style='color:pink'>Cryptography

<u>**Digital Signatures:**</u>  
SHA-256 often works in conjunction with a public key algorithm, such as RSA or ECC, to create digital signatures. In this process, the original message is hashed using SHA-256, and this hash is then signed using a private key.

<u>**Password Hashing:**</u>  
SHA-256 is instrumental in safely storing user passwords. The user's original password is hashed and this hash value is stored. Whenever the user inputs their password, it's hashed again and compared to the stored hash value. This mechanism ensures that, even if the stored hash is somehow accessed, the original password cannot be easily recovered.

<u>**Message Integrity Checks:**</u>  
SHA-256 is a powerful tool for ensuring the integrity of a message during transit. By comparing the hash of the original message to the hash of the received message, any discrepancies or alterations can be detected promptly.

### <p style='color:pink'>Protocols

<u>**Secure Sockets Layer (SSL) and Transport Layer Security (TLS):**</u>   
These protocols, which facilitate secure communication over a computer network, utilize SHA-256 in the process of establishing an encrypted connection between a client and a server.

<u>**Internet Protocol Security (IPsec)**</u>  
IPsec, a protocol suite for securing Internet Protocol (IP) communications, employs SHA-256 to ensure data integrity and encrypt data.

<u>**Pretty Good Privacy (PGP)**</u>  
PGP, a data encryption and decryption program, employs SHA-256 for creating digital signatures and encrypting data.

### <p style='color:pink'>Blockchain & Other Projects

<u>**Bitcoin**</u>  
SHA-256 is central to Bitcoin mining and is employed in its Proof-of-Work (PoW) system. It's also used to generate Bitcoin addresses, thereby enhancing security and privacy.

<u>**Git**</u>  
Git, a distributed version control system for tracking changes in source code during software development, uses SHA-256 to uniquely identify specific versions.

<u>**ZFS**</u>  
ZFS, a file system and logical volume manager, utilizes SHA-256 for data integrity verification.

<u>**Certificate Authorities**</u>  
Certificate authorities, entities that issue digital certificates (like SSL certificates), employ SHA-256 to create a unique fingerprint for each certificate.

<u>**Digital Forensics**</u>  
In the field of digital forensics and incident response, SHA-256 is commonly used to ensure the integrity of evidence data.





## <p style='color:mediumpurple'>How does SHA-256 work?

- SHA-2 algorithms can be described in two stages: preprocessing and hash computation.   

- Preprocessing involves:
    1. padding a message.
    2. parsing the padded message into m-bit blocks.
    3. setting initialization values to be used in the hash computation.        

- The hash computation generates a message schedule from the padded message and uses that schedule, along with functions,
constants, and word operations to iteratively generate a series of hash values. The final hash
value generated by the hash computation is used to determine the message digest.

- For a detailed explanation, I highly recommend you to walk through this [Notion Page](https://smooth-writer-db1.notion.site/Understanding-SHA-256-Hash-Function-274efa15d9a546aa9cacde9c4d8eb953) that I prepared.

## <p style='color:mediumpurple'>Code

The SHA-256 source code of this repo was developed following the same architecture as in the paper [Secure Hash Algorithms](https://doi.org/10.6028/NIST.FIPS.180-4) as described by NIST.

The [utils file](src/utils.ts) contains both Preprocessing and Hash computation stages as functions organised into meaningful namespaces.

```npm install``` to install the dependencies.

```npm run hash any_text_you_want``` to log locally developed message digest compared to two other hashed generated from two different packages.

```npm test``` to run repo tests.


## <p style='color:mediumpurple'>FAQs

1. **Why is SHA-256 important in Bitcoin?**  
   SHA-256 is used in Bitcoin mining and the creation of Bitcoin addresses. It's part of Bitcoin's Proof of Work (PoW) system. The high level of security and resistance to attack provided by SHA-256 makes it suitable for use in a cryptocurrency like Bitcoin.

2. **How is SHA-256 used in digital signatures?**  
   In digital signatures, SHA-256 is used to create a unique hash of the message. This hash is then encrypted with a private key to create the digital signature. Anyone can verify the signature by decrypting it with the corresponding public key and comparing it with their own hash of the message.

5. **Can SHA-256 be reversed?**  
   SHA-256 is a one-way function. This means that it's computationally infeasible to generate the original input given only the hash output. While the function is not strictly irreversible, the time and resources required to reverse it are considered prohibitive.

6. **What is the likelihood of collisions in SHA-256?**   
   A collision occurs when two different inputs produce the same hash output. While theoretically possible, the chances of a collision happening with SHA-256 are extremely low. The probability is so low that it's often disregarded in practical terms.

7. **Are there any vulnerabilities in SHA-256?**  
   There are no known practical vulnerabilities in SHA-256. However, the security of hash functions can change with new discoveries and advances in technology.

8. **What's the difference between SHA-256 and SHA-3?**  
   Both SHA-256 and SHA-3 are members of the Secure Hash Algorithm family, but they use different mathematical operations and have different internal structures. SHA-3 is not intended to replace SHA-256; instead, it was developed as a backup in case a critical flaw is found in SHA-256. 

9. **What is the difference between SHA-256 and SHA-512?**  
   Both SHA-256 and SHA-512 are cryptographic hash functions from the same SHA-2 family. The main difference lies in their output size and the speed of computation. SHA-256 produces a 256-bit hash and is quicker on 32-bit platforms, while SHA-512 produces a 512-bit hash and is quicker on 64-bit platforms.

10. **How secure is SHA-256?**  
   SHA-256 is currently considered very secure. It's computationally infeasible to generate the original input given only the hash output. While quantum computers could theoretically break this security in the future. However, there is no practical quantum attacks exist against SHA-256.

11. **How does SHA-256 relate to blockchain technology?**  
   SHA-256 plays a crucial role in blockchain technology. In the context of cryptocurrencies like Bitcoin, SHA-256 is used in the process of mining new coins and for the creation of new addresses. Moreover, it ensures data integrity by producing a unique hash for each block, which helps maintain the secure linkage between them.

12. **Why is SHA-256 used in password storage?**  
   SHA-256 is often used in password storage because it's a one-way function. This means that even if someone obtains the hash, they can't easily determine the original password. However, because SHA-256 by itself isn't enough to prevent determined attackers, it's best used in conjunction with a salt (additional random data appended to passwords) and multiple hashing iterations.

13. **What is the speed of SHA-256?**  
   The speed of SHA-256 depends on the hardware performing the computation. For example, modern hardware and software can calculate billions of SHA-256 hashes per second. However, for security applications like password hashing, slower is often better. That's why many systems use a variant of SHA-256 (or another hash function) that's designed to be computationally intensive and slow.

14. **Can I use SHA-256 for SSL certificates?**  
   Yes, SHA-256 is commonly used in SSL certificates and is currently recommended for most applications. It is used to create a unique fingerprint of the certificate's details, ensuring its integrity and authenticity.


## <p style='color:mediumpurple'>Resources

### <p style='color:pink'>Books & Paper

- [Secure Hash Algorithms as described by NIST(Download Paper)](https://doi.org/10.6028/NIST.FIPS.180-4)

- Real-World Cryptography by David Wong - Manning Publications (2021)

- Understanding cryptography by Christof Paar and Jan Pelzl: a textbook for students and practitioners - Springer-Verlag Berlin Heidelberg (2009)

### <p style='color:pink'>Videos

- [SHA-256 | COMPLETE Step-By-Step Explanation (W/ Example)](https://www.youtube.com/watch?v=orIgy2MjqrA&list=PLPiYSYjDdBkmHYDxWHNg6N-CLkiG4-pt8&index=21&t=1s)

- [How Does SHA-256 Work?](https://www.youtube.com/watch?v=f9EbD6iY9zI&list=PLPiYSYjDdBkmHYDxWHNg6N-CLkiG4-pt8&index=23)

- [Mod 2 ^ 32 Addition explainded for SHA-2]( https://www.youtube.com/watch?v=aH4f5T1aGp4&list=PLPiYSYjDdBkmHYDxWHNg6N-CLkiG4-pt8&index=22&pp=gAQBiAQB
)

### <p style='color:pink'>Websites

- [What is a hash function?](https://www.educative.io/answers/what-is-a-hash-function)

- [What is the SHA-2 algorithm?](https://www.comparitech.com/blog/information-security/what-is-sha-2-algorithm/)

- [SHA-2 - Wikipedia](https://en.wikipedia.org/wiki/SHA-2)

- [Web-based interactive SHA-256 hash function](https://www.movable-type.co.uk/scripts/sha256.html)

- [Why are cube and square roots of primes used as SHA constants?](https://crypto.stackexchange.com/questions/41923/why-are-cube-and-square-roots-of-primes-used-as-sha-constants)

- [How were the arbitrary values used inside SHA-256 determined?](https://crypto.stackexchange.com/questions/74883/how-were-the-arbitrary-values-used-inside-sha-256-determined?noredirect=1&lq=1)

- [Significance of rotation constants in SHA-512?](https://crypto.stackexchange.com/questions/17620/significance-of-rotation-constants-in-sha-512?rq=1)

- [SHA-256 Round Equivalence](https://crypto.stackexchange.com/questions/9925/sha-256-round-equivalence?rq=1)




