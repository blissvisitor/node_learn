//加密
//Hash
const crypto = require('crypto');
const hash = crypto.createHash('md5');
hash.update('Hello World');
hash.update('Hello Nodejs');
console.log(hash.digest('hex'));
//Hmac 加密有个key
const hmac = crypto.createHmac('sha256', 'secret-key');
hmac.update('Hello World!');
hmac.update('Hello Node');
console.log(hmac.digest('hex'));
//AES 加解密用同一个key
//加密
function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf-8', 'hex');
    crypted += cipher.final('hex');
    return crypted;

};
//解密
function aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;

};
var data = 'Hello! this is a secret message';
var key = 'password';
var encrypted = aesEncrypt(data, key);
var decrypted = aesDecrypt(encrypted, key);
console.log(data);
console.log(encrypted);
console.log(decrypted);
//Diffie-Hellman  DH算法是一种密钥交换协议，它可以让双方在不泄漏密钥的情况下协商出一个密钥来。DH算法基于数学原理，比如小明和小红想要协商一个密钥，可以这么做：
/*小明先选一个素数和一个底数，例如，素数p=23，底数g=5（底数可以任选），再选择一个秘密整数a=6，计算A=g^a mod p=8，然后大声告诉小红：p=23，g=5，A=8；

小红收到小明发来的p，g，A后，也选一个秘密整数b=15，然后计算B=g^b mod p=19，并大声告诉小明：B=19；

小明自己计算出s=B^a mod p=2，小红也自己计算出s=A^b mod p=2，因此，最终协商的密钥s为2。

在这个过程中，密钥2并不是小明告诉小红的，也不是小红告诉小明的，而是双方协商计算出来的。第三方只能知道p=23，g=5，A=8，B=19，由于不知道双方选的秘密整数a=6和b=15，因此无法计算出密钥2。*/
//小明的key
var ming = crypto.createDiffieHellman(512);
var ming_keys = ming.generateKeys();
var prime = ming.getPrime();
var generator = ming.getGenerator();
console.log('Prime:' + prime.toString('hex'));
console.log('Generator:' + generator.toString('hex'));
//小红的keys
var hong = crypto.createDiffieHellman(prime, generator);
var hong_keys = hong.generateKeys();
//exchange and generate
var ming_secret = ming.computeSecret(hong_keys);
var hong_secret = hong.computeSecret(ming_keys);

console.log(ming_secret.toString('hex'));
console.log(hong_secret.toString('hex'));