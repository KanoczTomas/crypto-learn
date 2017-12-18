#include <stdbool.h>
#include <stdint.h>
#include <stdio.h>

#define UINT256T_LENGTH 64

typedef struct uint256_t{
	uint32_t data[8];
} uint256_t;

void str_to_uint256_t(char* string, uint256_t* ptr, size_t str_len);
char* uint256_t_to_str(uint256_t* ptr);
bool validate_uint256_string(char* string, size_t str_len);



