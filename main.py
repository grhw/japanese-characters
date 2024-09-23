from characters import char_to_romanji as all_chars
import player

wrong = []
while True:
    usable = []
    if input("Use last wrong?\n[y/n]: ") == 'y':
        usable = wrong
    else:
        usable = list(all_chars.keys())
    print("\033[2J")
    wrong = player.run(usable)