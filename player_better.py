import random
from characters import char_to_romanji as all_chars

def run(usable_chars):
    correct = 1
    total = 1
    wrong = []
    unique = input("Unique?\n[y/n]: ") == "y"
    if unique:
        print("Running in unique mode...\n")
    unused_chars = usable_chars
    random.shuffle(unused_chars)

    def print_percentage():
        print(round((correct/total)*100))

    while True:
        if unique:
            if len(unused_chars) < 1:
                print("\033[HCongrats")
                print_percentage()
                return wrong
            char = unused_chars.pop()
        else:
            char = random.choice(usable_chars)
        shuffled = list(all_chars.values())
        random.shuffle(shuffled)
        choices = shuffled[:4]
        choices[random.randint(0,3)] = all_chars[char]
        print("\n")
        print_percentage()
        print("\n")
        print(char)
        print(" | ".join(choices))
        choice = input("[ ]\033[2D")
        print("\033[2J")
        if choice == "l":
            return wrong
        if choice.isdigit() and choices[(int(choice)-1)%len(all_chars)] == all_chars[char]:
            print("\033[1F[/]")
            correct += 1
        else:
            wrong.append(char)
            input(f"{char}: [{all_chars[char]}]\n\n")
        total += 1
    
    return wrong