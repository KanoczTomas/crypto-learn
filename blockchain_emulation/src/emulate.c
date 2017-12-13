#include <stdio.h>
#include <string.h>
#include <uint256.h>

void main(int argc, char* argv[]){
	uint256_t t;
	char s[1000];
	strcpy(s, argv[1]);

	str_to_uint256_t(s, &t, strlen(s));
}
