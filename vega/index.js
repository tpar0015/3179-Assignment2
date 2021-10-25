
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

vl.register(vega, vegaLite, options);


