import json

str_hiragana_table = """- わ ら や ま は な た さ か あ
- ゐ り - み ひ に - - き い
- - る ゆ む - ぬ - す く う
- ゑ れ - め へ ね て せ け え
- - ろ よ も ほ の と そ こ お"""

str_katakana_table = """- ワ ラ ヤ マ ハ ナ タ サ カ ア
- - リ - ミ ヒ ニ - - キ イ
- - ル ユ ム - ヌ - ス ク ウ
- - レ - メ ヘ ネ テ セ ケ エ
- - ロ ヨ モ ホ ノ ト ソ コ オ"""

str_hiragana_extras = """na ん n
ti ち chi
si し shi
hu ふ fu
tu つ tsu
wo を o"""

str_katakana_extras = """na ン n
ti チ chi
si シ shi
hu フ fu
tu ツ tsu
wo ヲ o"""

table_index = [
    ["n","w","r","y","m","h","n","t","s","k"," "],
    ["a","i","u","e","o"]
]

def convert(table,extra):
    char_to_romanji = {}
    for y,line in enumerate(table.split("\n")):
        for x,char in enumerate(line.split(" ")):
            if char != "-":
                char_to_romanji[char] = (table_index[0][x] + table_index[1][y]).replace(" ","")

    for i in extra.split("\n"):
        data = i.split(" ")
        char_to_romanji[data[1]] = data[2]
    return char_to_romanji


hiragana = convert(str_hiragana_table,str_hiragana_extras)
katakana = convert(str_katakana_table,str_katakana_extras)
char_to_romanji = katakana.copy()

for i in katakana.keys():
    hiragana[i] = katakana[i]

for i in hiragana.keys():
    char_to_romanji[i] = hiragana[i]

with open("chars.json","w+",encoding="eucjp") as f:
    f.write(json.dumps({
        "katakana": katakana,
        "hiragana": hiragana,
        "all": char_to_romanji,
    }))