"""
A useful snippet for generating a secret key
this is the same process Django uses when starting a new project
"""
import random
print(''.join(random.SystemRandom().choice('abcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*(-_=+)') for i in range(50)), end='')
