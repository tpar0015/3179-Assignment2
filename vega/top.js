

const top_50_figures = {
    'Muhammad': 0,
    'Genghis Khan': 1,
    'Leonardo Da Vinci': 2,
    'Isaac Newton': 3,
    'Ludwig van Beethoven': 4,
    'Alexander the Great': 5,
    'Aristotle': 6,
    'Napoleon Bonaparte': 7,
    'Julius Caesar': 8,
    'Wolfgang Amadeus Mozart': 9,
    'Plato': 10,
    'Jesus Christ': 11,
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
    'Mary': 37,
    'Immanuel Kant': 38,
    'Elizabeth II of the United Kingdom': 39,
    'Saint Peter': 40,
    'Dante': 41,
    'René Descartes': 42,
    'Thomas Jefferson': 43,
    'Joseph Stalin': 44,
    'Thomas Edison': 45,
    'Vladimir Lenin': 46,
    'Avicenna': 47,
    'Joan of Arc': 48,
    'Vasco da Gama': 49
}

var width = window.innerWidth;

let list_input = document.getElementById('top50_input');
var list_button = document.getElementById('top_50_go');

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var fig_list = [];

function get_figure() {
    var li = document.createElement('div');

    var input_value = list_input.value;
    var t = document.createTextNode(input_value);
    li.appendChild(t);
    li.className = "li_name";


    let val = list_input.value;
    if (val != '' && fig_list.indexOf(val) == -1) {
        let ind = top_50_figures[val];

        val_u = val.replaceAll(' ','_');
        function imageExists(image_url){

            var http = new XMLHttpRequest();

            http.open('HEAD', image_url, false);
            http.send();

            return http.status != 404;
        }
        desc_div = document.createElement('div');
        desc_div.setAttribute('class', 'figure_description');
        desc_div.setAttribute('id', 'desc_div_' + val);
        // Image
        var img = document.createElement('img');
        
        if (!imageExists('data\\top50images\\' + val_u + '.jpg')) {
            if (imageExists('data\\top50images\\' + val_u + '.png')) {
                img.setAttribute('src','data\\top50images\\' + val_u + '.png')
            } else {
                console.log("No image found");
            }
        } else {
            img.setAttribute('src', 'data\\top50images\\' + val_u + '.jpg')

        };

        img.setAttribute('class', 'figure_image');
        desc_div.appendChild(li);
        desc_div.appendChild(img);
        // Description
        description = document.createElement('div');
        description.innerHTML = top_descriptions[ind];
        desc_div.appendChild(description);

        document.getElementById('top50_description').appendChild(desc_div)


        var span = document.createElement("SPAN");
        var txt = document.createTextNode("\u00D7");
        span.className = "close";
        span.setAttribute('name', input_value);
        span.appendChild(txt);
        li.appendChild(span);

        for (i = 0; i < close.length; i++) {
            close[i].onclick = function () {
                var div = this.parentElement;
                name = div.innerText.slice(0,-1);
                console.log(name)
                // this parentElement inner text
                var div2 = document.getElementById('desc_div_' + name);
                
                div.style.display = "none";
                
                div2.style.display = 'none';

                fig_list.splice(fig_list.indexOf(name), 1);
                console.log(fig_list);
                view_pageviews(fig_list);
            }
        }
    fig_list.push(list_input.value);

    view_pageviews(fig_list);
    list_input.value = '';
    }
}
list_button.addEventListener('click', get_figure);


// Pageviews by selected top_50

const fig_input = vl.menu('text').name('top50_input')
const hover = vl.selectPoint('hover')
    .encodings('x')
    .on('mouseover')
    .toggle(false)
    .nearest(true);

const isHovered = hover.empty(false);

const line = vl.markLine().encode(
    vl.x().fieldT('date').timeUnit('yearmonth').title('Date'),
    vl.y().average('pageviews').title('Average Pageviews'),
    vl.color().fieldN('name').title('Name')
)

const base = line.transform(vl.filter(isHovered))

const label = {align: 'left', dx: 5, dy: -10, font: 'Open Sans', fontSize: '15'};
const label1 = {align: 'left', dx: 5, dy: 10, font: 'Open Sans', fontSize: '15'};




function view_pageviews (list) {
    if (list.length === 0) {
        document.getElementById('top50_pv').innerHTML = '';
        return;
    }
    vl.data('data/top50_pageviews.csv').transform(
    vl.filter(list.map(x => `datum.name === "${x}"`).join(" || ")))
.layer(
    line,
    vl.markRule({color: '#aaa'})
        .transform(vl.filter(isHovered))
        .encode(vl.x().fieldT('date')),
    line.markCircle()
        .params(hover,fig_input)
        .encode(vl.opacity().if(isHovered, vl.value(1)).value(0)),
        base.markText(label).encode(vl.text().fieldN('name')),
        base.markText(label1).encode(vl.text().average('pageviews'))
).width(width/3).height(600).background(null)
    .config({
        axis: {
        tickColor: "#FFF",
        labelColor: '#FFF',
        labelFont: 'Open Sans',
        titleColor: '#FFF',
        titleFontSize: 20,
        titleFont: 'Open Sans',
        titleFontWeight: 300,
        gridOpacity: 0.2
        },
        legend: {
            labelColor: '#FFF',
            labelFont: 'Open Sans',
            titleColor: '#FFF',
            titleFont: 'Open Sans',
            titleFontSize: '15',
            titleFontWeight: 300
        }
    })
     .render().then(viewElement => {
        document.getElementById('top50_pv').innerHTML = '';
        document.getElementById('top50_pv').appendChild(viewElement)
    })
};



