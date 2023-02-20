#!/usr/bin/env python3

import sys

def print_usage(binary_name):
	print("python ./" + binary_name + " todo")
	print("\tWhere todo")

if len(sys.argv) != 2:
	print_usage(sys.argv[0])
	sys.exit(1)

input = sys.argv[1]


input_len = len(input)

result = "0e" + '{:02x}'.format(input_len) + input.encode("utf-8").hex()

print(result)

sys.exit(0)