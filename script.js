const characters = JSON.parse(
    '{"katakana": {"\u30ef": "wa", "\u30e9": "ra", "\u30e4": "ya", "\u30de": "ma", "\u30cf": "ha", "\u30ca": "na", "\u30bf": "ta", "\u30b5": "sa", "\u30ab": "ka", "\u30a2": "a", "\u30ea": "ri", "\u30df": "mi", "\u30d2": "hi", "\u30cb": "ni", "\u30ad": "ki", "\u30a4": "i", "\u30eb": "ru", "\u30e6": "yu", "\u30e0": "mu", "\u30cc": "nu", "\u30b9": "su", "\u30af": "ku", "\u30a6": "u", "\u30ec": "re", "\u30e1": "me", "\u30d8": "he", "\u30cd": "ne", "\u30c6": "te", "\u30bb": "se", "\u30b1": "ke", "\u30a8": "e", "\u30ed": "ro", "\u30e8": "yo", "\u30e2": "mo", "\u30db": "ho", "\u30ce": "no", "\u30c8": "to", "\u30bd": "so", "\u30b3": "ko", "\u30aa": "o", "\u30f3": "n", "\u30c1": "chi", "\u30b7": "shi", "\u30d5": "fu", "\u30c4": "tsu", "\u30f2": "o"}, "hiragana": {"\u308f": "wa", "\u3089": "ra", "\u3084": "ya", "\u307e": "ma", "\u306f": "ha", "\u306a": "na", "\u305f": "ta", "\u3055": "sa", "\u304b": "ka", "\u3042": "a", "\u3090": "wi", "\u308a": "ri", "\u307f": "mi", "\u3072": "hi", "\u306b": "ni", "\u304d": "ki", "\u3044": "i", "\u308b": "ru", "\u3086": "yu", "\u3080": "mu", "\u306c": "nu", "\u3059": "su", "\u304f": "ku", "\u3046": "u", "\u3091": "we", "\u308c": "re", "\u3081": "me", "\u3078": "he", "\u306d": "ne", "\u3066": "te", "\u305b": "se", "\u3051": "ke", "\u3048": "e", "\u308d": "ro", "\u3088": "yo", "\u3082": "mo", "\u307b": "ho", "\u306e": "no", "\u3068": "to", "\u305d": "so", "\u3053": "ko", "\u304a": "o", "\u3093": "n", "\u3061": "chi", "\u3057": "shi", "\u3075": "fu", "\u3064": "tsu", "\u3092": "o", "\u30ef": "wa", "\u30e9": "ra", "\u30e4": "ya", "\u30de": "ma", "\u30cf": "ha", "\u30ca": "na", "\u30bf": "ta", "\u30b5": "sa", "\u30ab": "ka", "\u30a2": "a", "\u30ea": "ri", "\u30df": "mi", "\u30d2": "hi", "\u30cb": "ni", "\u30ad": "ki", "\u30a4": "i", "\u30eb": "ru", "\u30e6": "yu", "\u30e0": "mu", "\u30cc": "nu", "\u30b9": "su", "\u30af": "ku", "\u30a6": "u", "\u30ec": "re", "\u30e1": "me", "\u30d8": "he", "\u30cd": "ne", "\u30c6": "te", "\u30bb": "se", "\u30b1": "ke", "\u30a8": "e", "\u30ed": "ro", "\u30e8": "yo", "\u30e2": "mo", "\u30db": "ho", "\u30ce": "no", "\u30c8": "to", "\u30bd": "so", "\u30b3": "ko", "\u30aa": "o", "\u30f3": "n", "\u30c1": "chi", "\u30b7": "shi", "\u30d5": "fu", "\u30c4": "tsu", "\u30f2": "o"}, "all": {"\u30ef": "wa", "\u30e9": "ra", "\u30e4": "ya", "\u30de": "ma", "\u30cf": "ha", "\u30ca": "na", "\u30bf": "ta", "\u30b5": "sa", "\u30ab": "ka", "\u30a2": "a", "\u30ea": "ri", "\u30df": "mi", "\u30d2": "hi", "\u30cb": "ni", "\u30ad": "ki", "\u30a4": "i", "\u30eb": "ru", "\u30e6": "yu", "\u30e0": "mu", "\u30cc": "nu", "\u30b9": "su", "\u30af": "ku", "\u30a6": "u", "\u30ec": "re", "\u30e1": "me", "\u30d8": "he", "\u30cd": "ne", "\u30c6": "te", "\u30bb": "se", "\u30b1": "ke", "\u30a8": "e", "\u30ed": "ro", "\u30e8": "yo", "\u30e2": "mo", "\u30db": "ho", "\u30ce": "no", "\u30c8": "to", "\u30bd": "so", "\u30b3": "ko", "\u30aa": "o", "\u30f3": "n", "\u30c1": "chi", "\u30b7": "shi", "\u30d5": "fu", "\u30c4": "tsu", "\u30f2": "o"}}'
)
var settings = {
    "no-bag": {
        "name": "Infinite questions",
        "desc": "if true, there will be no limit to questions and the results screen wont show.",
        "value": false
    },
    /*"wrong-skip": {
        "name": "Skip if wrong",
        "desc": "if true, the next question will show up immediately if you pick the wrong option.",
        "value": false
    },*/
    "num-choices": {
        "name": "Choices",
        "desc": "amount of choices",
        "value": 4
    },
}
const settings_template = {
    "boolean": '<span id="{ID}" title="{DESC}"><span class="box-container"><span class="box"><input type="checkbox" {CHECKED}></span></span> <span>{NAME}</span></span><br>',
    "number": '<span id="{ID}" title="{DESC}"><span><input type="number" value="{VALUE}"></span> <span>{NAME}</span></span><br>',
}

var settings_html = ""
Object.keys(settings).forEach(id => {
    replacements = {
        "id": id,
        "checked": ""
    }
    Object.keys(settings[id]).forEach(key => {
        replacements[key] = settings[id][key]
    });

    if (settings[id]["value"] == true) {
        replacements["checked"] = "checked"
    }

    final = settings_template[typeof(settings[id]["value"])]
    Object.keys(replacements).forEach(element => {
        final = final.replaceAll(`{${element.toUpperCase()}}`,replacements[element])
    });

    settings_html += final
});

document.querySelector("settings").outerHTML = settings_html

setTimeout(() => {
    Object.keys(settings).forEach(id => {
        document.querySelector(`#${id} input`).addEventListener("change", (e)=>{
            if (typeof(settings[id]["value"]) != "boolean") {
                settings[id]["value"] = e.target.value
            } else {
                settings[id]["value"] = e.target.checked
            }
        })
    })
}, 1000);

var char = document.querySelector(".char")
var title = document.querySelector(".title")
function display_question(character,answers) {
    var ans = document.querySelector(".answers")
    char.classList.add("leave")
    ans.classList.add("leave")
    setTimeout(() => {
        char.innerHTML = character
        ans.innerHTML = ""
        let i = 0
        answers.forEach(answer => {
            i++
            ans.innerHTML += `<button id="a${i}">${answer}</button> `
        });
        char.classList.remove("leave")
        ans.classList.remove("leave")
    }, 750);
}

const possibilities = Object.keys(characters["all"])
var used = []
const default_stats = {
    "wrong_answers": {
        "name": "wrong",
        "desc": "the amount of times you clicked a wrong answer",
        "value": 0
    },
    "full_correct": {
        "name": "correct",
        "desc": "questions you didn't click a wrong answer on",
        "value": 0
    },
    "partial_correct": {
        "name": "partial correct",
        "desc": "correct answers that you had to use multiple attempts on",
        "value": 0
    }
}
var stats = default_stats
function random_unique(ar,k,dont_include=[]) {
    var res = []
    while (res.length < Math.min(k,ar.length-1)) {
        picked = ar[Math.floor(Math.random()*ar.length)]
        if (!res.includes(ar)&&!dont_include.includes(ar)) {
            res.push(picked)
        }
    }

    return res
}

var playing = true
var currently_full_correct = true

function end_game() {
    playing = false
    display_question(`${Math.floor((stats["full_correct"]["value"]/used.length)*100)}%`,[
        `${stats["wrong_answers"]["name"]}: ${stats["wrong_answers"]["value"]}`,
        `${stats["full_correct"]["name"]}: ${stats["full_correct"]["value"]}`,
        `${stats["partial_correct"]["name"]}: ${stats["partial_correct"]["value"]}`,
    ])
    title.innerHTML = "Congrats! Accuracy:"
    stats = default_stats
    used = []
}

function random_question() {
    title.innerHTML = `${used.length}/${possibilities.length}<br>Romanize this character:`
    if (used.length >= possibilities.length) {
        return end_game()
    }
    const character = random_unique(possibilities,1,used)
    const answers = random_unique(Object.values(characters["all"]),settings["num-choices"]["value"],characters["all"][character])
    answers[Math.floor(Math.random()*answers.length)] = characters["all"][character]
    
    if (!settings["no-bag"]["value"]) {
        used.push(character)
    }
    display_question(character,answers)
}

random_question()
document.querySelector(".answers").addEventListener("click",(el)=>{
    if (el.target.parentNode.classList.contains("answers")) {
        if ((!playing)||el.target.innerHTML==characters["all"][char.innerHTML]) {
            el.target.classList.add("correct")
            if (currently_full_correct) {
                stats["full_correct"]["value"] += 1
            } else {
                stats["partial_correct"]["value"] += 1
            }
            setTimeout(() => {
                currently_full_correct = true
                random_question()
            }, 1000);
        } else {
            stats["wrong_answers"]["value"] += 1
            el.target.classList.add("wrong")
        }
    }
})


document.querySelector("#settings").addEventListener("click",(el)=>{
    if (el.target.id == "settings") {
        el.target.classList.add("leave")
    }
})

document.querySelector(".bottom").addEventListener("click",(el)=>{
    if (el.target.parentNode.classList.contains("bottom")) {
        const name = el.target.innerHTML
        switch (name) {
            case "help": {
                
            }
            case "settings": {
                document.querySelector("#settings").classList.remove("leave")
            }
            case "end early": {
                end_game()
            }
        }
    }
})