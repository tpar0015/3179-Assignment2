
// setup API options
const options = {
config: {
    // Vega-Lite default configuration
},
init: (view) => {
    // initialize tooltip handler
    view.tooltip(new vegaTooltip.Handler().call);
},
view: {
    // view constructor options
    // remove the loader if you don't want to default to vega-datasets!
    renderer: "canvas",
}
};

vl.register(vega,vegaLite,options);

const map = vl.markGeoshape({fill: '#808080', stroke: '#fff'})
    .data(vl.topojson('data/custom.topo.json').feature('custom.geo'))
    .width(1000)
    .height(600);

    // FieldQ for Quantitative, fieldN for nominal
const figures = vl.markCircle({tooltip: true})
    .data('data/database.csv')
    .encode(
        vl.longitude().fieldQ('longitude'),
        vl.latitude().fieldQ('latitude'),
        vl.color().fieldN('domain')
    );

vl.layer(map, figures).render().then(viewElement => {
    document.getElementById('view').appendChild(viewElement);
});


const search = document.getElementById('search');
const search_button = document.getElementById('search_button');


const csv_url = "../data/database.csv";

function findName(name) {
    return csv_data.filter(data => data.full_name === name);
}

let search_value = '';
search_button.addEventListener('click', event => {
     search_value = search.value;
     console.log(findName(search_value));
});
