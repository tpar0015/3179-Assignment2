

const individual_pageviews = vl.markLine().data('data/')


const top_50_figures = {
    'Muhammad': 0,
    'Genghis Khan': 1,
    'Leonardo da Vinci': 2,
    'Isaac Newton': 3,
    'Ludwig van Beethoven': 4,
    'Alexander the Great': 5,
    'Aristotle': 6,
    'Napoleon': 7,
    'Julius Caesar': 8,
    'Wolfgang Amadeus Mozart': 9,
    'Plato': 10,
    'Jesus': 11,
    'Adolf Hitler': 12,
    'Galileo Galilei': 13,
    'Marco Polo': 14,
    'Socrates': 15,
    'Donald Trump': 16,
    'Johann Sebastian Bach': 17,
    'Albert Einstein': 18,
    'Michelangelo': 19,
    'William Shakespeare': 20,
    'Martin Luther': 21,
    'Christopher Columbus': 22,
    'Moses': 23,
    'Archimedes': 24,
    'Abraham': 25,
    'Sigmund Freud': 26,
    'Confucius': 27,
    'Vincent van Gogh': 28,
    'Nicolaus Copernicus': 29,
    'Ferdinand Magellan': 30,
    'Gautama Buddha': 31,
    'Che Guevara': 32,
    'Louis XIV of France': 33,
    'Augustus': 34,
    'Charles Darwin': 35,
    'Karl Marx': 36,
    'Mary, mother of Jesus': 37,
    'Immanuel Kant': 38,
    'Elizabeth II': 39,
    'Saint Peter': 40,
    'Dante Alighieri': 41,
    'René Descartes': 42,
    'Thomas Jefferson': 43,
    'Joseph Stalin': 44,
    'Thomas Edison': 45,
    'Vladimir Lenin': 46,
    'Avicenna': 47,
    'Joan of Arc': 48,
    'Vasco da Gama': 49
}


let list_input = document.getElementById('top50_input');
var list_button = document.getElementById('top_50_go');

function get_figure() {
    let val = list_input.value;
    let ind = top_50_figures[val];

    val = val.replace(' ','_');    
    document.getElementById('fig_img').src = 'data\\top50images\\' + val + '.jpg';
    document.getElementById('top50_description').innerHTML = top_descriptions[ind];
    return list_input.value;
}
list_button.addEventListener('click', get_figure);
