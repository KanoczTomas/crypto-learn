IDIR = ../include
ODIR = obj
CC = gcc
CFLAGS = -I$(IDIR)

_DEPS = uint256.h
DEPS = $(pathsubst %, $(IDIR)/%, $(_DEPS) )

_OBJ = uint256.o emulate.o
OBJ = $(pathsubst %, $(ODIR)/%, $(_OBJ))

$(ODIR)/%.o: %.c $(DEPS)
	$(CC) $(CFLAGS) $< -o $@ 

emulate: $(OBJ)
	$(CC) $(CFLAGS) -o $@ $^

	
	
