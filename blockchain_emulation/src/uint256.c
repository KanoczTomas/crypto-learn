#include <ctype.h>
#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <uint256.h>


bool validate_uint256_string(char* s, size_t str_len){
	size_t count = 0;	
	printf("str_len = %zu\n", str_len);

	if(s[0] == '0' && s[1] == 'x') count = 2;

	if(count == 0 && str_len != UINT256T_LENGTH) return false;
	else if(count == 2 && str_len != UINT256T_LENGTH+2) return false;

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
	}
	size_t count = 0;
	char* endptr = NULL;
	char* partial_string = NULL;
	
	while(1){
		strcpy(partial_string, (string+count*( UINT256T_LENGTH / 32), (size_t)UINT256T_LENGTH/32));	
		ptr->data[count++] = (uint32_t) strtol(partial_string, &endptr, 16);
		if(count == UINT256T_LENGTH/32) break;
	}
	
	puts("the original string is:");
	puts(string);
	puts("the hopefully working one is:");

	for(count = 0; count < UINT256T_LENGTH/32; count++){
		printf("%2.0X", ptr->data[count]);
	}
	printf("\n");
	
}
