const characters = JSON.parse(
    '{"katakana": {"ワ": "wa", "ラ": "ra", "ヤ": "ya", "マ": "ma", "ハ": "ha", "ナ": "na", "タ": "ta", "サ": "sa", "カ": "ka", "ア": "a", "リ": "ri", "ミ": "mi", "ヒ": "hi", "ニ": "ni", "キ": "ki", "イ": "i", "ル": "ru", "ユ": "yu", "ム": "mu", "ヌ": "nu", "ス": "su", "ク": "ku", "ウ": "u", "レ": "re", "メ": "me", "ヘ": "he", "ネ": "ne", "テ": "te", "セ": "se", "ケ": "ke", "エ": "e", "ロ": "ro", "ヨ": "yo", "モ": "mo", "ホ": "ho", "ノ": "no", "ト": "to", "ソ": "so", "コ": "ko", "オ": "o", "ン": "n", "チ": "chi", "シ": "shi", "フ": "fu", "ツ": "tsu", "ヲ": "o"}, "hiragana": {"わ": "wa", "ら": "ra", "や": "ya", "ま": "ma", "は": "ha", "な": "na", "た": "ta", "さ": "sa", "か": "ka", "あ": "a", "ゐ": "wi", "り": "ri", "み": "mi", "ひ": "hi", "に": "ni", "き": "ki", "い": "i", "る": "ru", "ゆ": "yu", "む": "mu", "ぬ": "nu", "す": "su", "く": "ku", "う": "u", "ゑ": "we", "れ": "re", "め": "me", "へ": "he", "ね": "ne", "て": "te", "せ": "se", "け": "ke", "え": "e", "ろ": "ro", "よ": "yo", "も": "mo", "ほ": "ho", "の": "no", "と": "to", "そ": "so", "こ": "ko", "お": "o", "ん": "n", "ち": "chi", "し": "shi", "ふ": "fu", "つ": "tsu", "を": "o", "ワ": "wa", "ラ": "ra", "ヤ": "ya", "マ": "ma", "ハ": "ha", "ナ": "na", "タ": "ta", "サ": "sa", "カ": "ka", "ア": "a", "リ": "ri", "ミ": "mi", "ヒ": "hi", "ニ": "ni", "キ": "ki", "イ": "i", "ル": "ru", "ユ": "yu", "ム": "mu", "ヌ": "nu", "ス": "su", "ク": "ku", "ウ": "u", "レ": "re", "メ": "me", "ヘ": "he", "ネ": "ne", "テ": "te", "セ": "se", "ケ": "ke", "エ": "e", "ロ": "ro", "ヨ": "yo", "モ": "mo", "ホ": "ho", "ノ": "no", "ト": "to", "ソ": "so", "コ": "ko", "オ": "o", "ン": "n", "チ": "chi", "シ": "shi", "フ": "fu", "ツ": "tsu", "ヲ": "o"}, "all": {"ワ": "wa", "ラ": "ra", "ヤ": "ya", "マ": "ma", "ハ": "ha", "ナ": "na", "タ": "ta", "サ": "sa", "カ": "ka", "ア": "a", "リ": "ri", "ミ": "mi", "ヒ": "hi", "ニ": "ni", "キ": "ki", "イ": "i", "ル": "ru", "ユ": "yu", "ム": "mu", "ヌ": "nu", "ス": "su", "ク": "ku", "ウ": "u", "レ": "re", "メ": "me", "ヘ": "he", "ネ": "ne", "テ": "te", "セ": "se", "ケ": "ke", "エ": "e", "ロ": "ro", "ヨ": "yo", "モ": "mo", "ホ": "ho", "ノ": "no", "ト": "to", "ソ": "so", "コ": "ko", "オ": "o", "ン": "n", "チ": "chi", "シ": "shi", "フ": "fu", "ツ": "tsu", "ヲ": "o"}}'
);
var settings = {
    'no-bag': {
        name: 'Infinite questions',
        desc: 'if true, there will be no limit to questions and the results screen wont show.',
        value: false,
    },
    /*"wrong-skip": {
        "name": "Skip if wrong",
        "desc": "if true, the next question will show up immediately if you pick the wrong option.",
        "value": false
    },*/
    'num-choices': {
        name: 'Choices',
        desc: 'amount of choices',
        value: 4,
    },
};
const settings_template = {
    boolean:
        '<span id="{ID}" title="{DESC}"><span class="box-container"><span class="box"><input type="checkbox" {CHECKED}></span></span> <span>{NAME}</span></span><br>',
    number: '<span id="{ID}" title="{DESC}"><span><input type="number" value="{VALUE}"></span> <span>{NAME}</span></span><br>',
};

var settings_html = '';
Object.keys(settings).forEach((id) => {
    let replacements = {
        id: id,
        checked: '',
    };
    Object.keys(settings[id]).forEach((key) => {
        replacements[key] = settings[id][key];
    });

    if (settings[id]['value'] === true) {
        replacements['checked'] = 'checked';
    }

    let final = settings_template[typeof settings[id]['value']];
    Object.keys(replacements).forEach((element) => {
        final = final.replaceAll(
            `{${element.toUpperCase()}}`,
            replacements[element]
        );
    });

    settings_html += final;
});

document.querySelector('settings').outerHTML = settings_html;

setTimeout(() => {
    Object.keys(settings).forEach((id) => {
        document
            .querySelector(`#${id} input`)
            .addEventListener('change', (e) => {
                if (typeof settings[id]['value'] !== 'boolean') {
                    settings[id]['value'] = e.target.value;
                } else {
                    settings[id]['value'] = e.target.checked;
                }
            });
    });
}, 1000);

var char = document.querySelector('.char');
var title = document.querySelector('.title');

function display_question(character, answers) {
    var ans = document.querySelector('.answers');
    char.classList.add('leave');
    ans.classList.add('leave');
    setTimeout(() => {
        char.innerHTML = character;
        ans.innerHTML = '';
        let i = 0;
        answers.forEach((answer) => {
            i++;
            ans.innerHTML += `<button id="a${i}">${answer}</button> `;
        });
        char.classList.remove('leave');
        ans.classList.remove('leave');
    }, 750);
}

const possibilities = Object.keys(characters['all']);
var used = [];
const default_stats = {
    wrong_answers: {
        name: 'wrong',
        desc: 'the amount of times you clicked a wrong answer',
        value: 0,
    },
    full_correct: {
        name: 'correct',
        desc: "questions you didn't click a wrong answer on",
        value: 0,
    },
    partial_correct: {
        name: 'partial correct',
        desc: 'correct answers that you had to use multiple attempts on',
        value: 0,
    },
    total: {
        name: 'total',
        desc: 'total',
        value: 0,
    },
};
var stats = JSON.parse(JSON.stringify(default_stats));

function random_unique(ar, k, dont_include = []) {
    var res = [];
    while (res.length < Math.min(k, ar.length - 1)) {
        let picked = ar[Math.floor(Math.random() * ar.length)];
        if (!res.includes(picked) && !dont_include.includes(picked)) {
            res.push(picked);
        }
    }
    return res;
}

var playing = true;
var currently_full_correct = true;

function end_game() {
    playing = false;
    display_question(
        `${Math.floor(
            (stats['full_correct']['value'] / stats['total']['value']) * 100
        )}%`,
        [
            `${stats['wrong_answers']['name']}: ${stats['wrong_answers']['value']}`,
            `${stats['full_correct']['name']}: ${stats['full_correct']['value']}`,
            `${stats['partial_correct']['name']}: ${stats['partial_correct']['value']}`,
        ]
    );
    title.innerHTML = 'Congrats! Accuracy:';
    stats = JSON.parse(JSON.stringify(default_stats));
    used = [];
}

function random_question() {
    title.innerHTML = `${used.length}/${possibilities.length}<br>Romanize this character:`;
    if (used.length >= possibilities.length) {
        return end_game();
    }
    const character = random_unique(possibilities, 1, used)[0];
    const answers = random_unique(
        Object.values(characters['all']),
        settings['num-choices']['value'],
        characters['all'][character]
    );
    answers[Math.floor(Math.random() * answers.length)] =
        characters['all'][character];

    if (!settings['no-bag']['value']) {
        used.push(character);
    }
    stats['total']['value'] += 1;
    display_question(character, answers);
    console.log(used);
}

random_question();
document.querySelector('.answers').addEventListener('click', (el) => {
    if (el.target.parentNode.classList.contains('answers')) {
        if (
            !playing ||
            el.target.innerHTML === characters['all'][char.innerHTML]
        ) {
            el.target.classList.add('correct');
            if (currently_full_correct) {
                stats['full_correct']['value'] += 1;
            } else {
                stats['partial_correct']['value'] += 1;
            }
            setTimeout(() => {
                currently_full_correct = true;
                random_question();
            }, 1000);
            playing = true;
        } else {
            stats['wrong_answers']['value'] += 1;
            el.target.classList.add('wrong');
            currently_full_correct = false;
        }
    }
});

document.querySelector('#settings').addEventListener('click', (el) => {
    if (el.target.id == 'settings') {
        el.target.classList.add('leave');
    }
});

document.querySelector('.bottom').addEventListener('click', (el) => {
    if (el.target.parentNode.classList.contains('bottom')) {
        const name = el.target.innerHTML;
        switch (name) {
            case 'help': {
            }
            case 'settings': {
                document.querySelector('#settings').classList.remove('leave');
            }
            case 'end early': {
                end_game();
            }
        }
    }
});
