IDIR = ../include
ODIR = obj
TARGET = emulate

CC = gcc
CFLAGS = -g
INCLUDE = -I$(IDIR)

_DEPS = uint256.h
DEPS = $(patsubst %, $(IDIR)/%, $(_DEPS))

SOURCES = uint256.c emulate.c
_OBJECTS = $(patsubst %.c, %.o, $(SOURCES))
OBJECTS = $(patsubst %, $(ODIR)/%, $(_OBJECTS))

$(ODIR)/%.o: %.c  $(DEPS)
	$(CC) $(INCLUDE) $(CFLAGS) -c $< -o $@

$(TARGET): $(OBJECTS)
	$(CC) $(INCLUDE) $(CFLAGS) $^ -o ../$@


clean:
	-rm $(ODIR)/*.o ../$(TARGET)
	@echo clean done

.PHONY: clean
print:
	$(info $$OBJECTS is [$(OBJECTS)])echo done

.PHONY: print 
