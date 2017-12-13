#include <uint256.h>
#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>


bool validate_uint256_string(char* s, size_t str_len){
	size_t count = 0;	
	printf("str_len = %zu\n", str_len);

	if(s[0] == '0' && s[1] == 'x') count = 2;

	if(count == 0 && str_len != 64) return false;
	else if(count == 2 && str_len != 66) return false;

	if(count ==2) printf("there is 0x at the beginning\n");

	for(; count < str_len; count++){
		if(s[count] >= '0' && s[count] <= '9') printf("%c is [0-9]\n", s[count]);
		else if(tolower(s[count]) >= 'a' && tolower(s[count]) <= 'f') printf("%c is [a-f]\n", s[count]);
		else return false;
	}
	return true;
}

void str_to_uint256_t(char* string, uint256_t* ptr, size_t str_len){
	if(!validate_uint256_string(string, str_len)){
		printf("Error: string %s is not valid hex format!\n", string);
		//exit(EXIT_FAILURE);
	}
	else printf("all is ok!\n");
}
