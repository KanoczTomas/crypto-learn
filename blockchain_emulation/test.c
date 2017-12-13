#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <stdio.h>
#include <errno.h>
#include <inttypes.h>
#include <stdbool.h>
#include <ctype.h>

bool isValid(const char *s){
	int count = 0;	
	if(s[0] == '0' && s[1] == 'x') count = 2;

	for(; count < strlen(s); count++){
		if(s[count] >= '0' && s[count] <= '9');
		else if(tolower(s[count]) >= 'a' && tolower(s[count]) <= 'f');
		else return false;
	}
	return true;
}

void main(void){

	char * s = "0x00ff000000000000";
	char *endp;
	errno = 0;
	uint64_t var = strtoul(s, &endp,16);
	printf("%s is %" PRIu64 "\n", s, var);
	printf("%s is %d\n",s, isValid(s));
	printf("%s is %d\n","0xff00f", isValid("0xff00f"));
	printf("%s is %d\n","0uas21231", isValid("0uas21231"));
	printf("%s is %d\n","00ff0000000000", isValid("00ff0000000000"));
	printf("%s is %d\n","0x00ff0000000000g", isValid("0x00ff0000000000g"));

}
