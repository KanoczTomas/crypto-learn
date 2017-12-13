#include <stdio.h>
#include <string.h>
#include <openssl/evp.h>

void main(void){
	EVP_MD_CTX *messageDigestContext;
	const EVP_MD *messageDigest = EVP_sha256();
	char mess1[] = "test message\n";
	char mess2[] = "text message 2\n";
	unsigned int messageDigestLength = 0;
	unsigned char hash[33];
	
	messageDigestContext = EVP_MD_CTX_create();
	EVP_DigestInit_ex(messageDigestContext, messageDigest, NULL);
	EVP_DigestUpdate(messageDigestContext, mess1, strlen(mess1));
	EVP_DigestFinal_ex(messageDigestContext, hash, &messageDigestLength);
	for(int count=0; count < messageDigestLength; count++){
		printf("%02x", hash[count]);
	}
	printf("\n");
	EVP_MD_CTX_destroy(messageDigestContext);
	EVP_cleanup();
}
