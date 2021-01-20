from random import random
import sys

r = random()
print(r)

if r > 0.9:
    sys.exit(0)
else:
    sys.exit(1)