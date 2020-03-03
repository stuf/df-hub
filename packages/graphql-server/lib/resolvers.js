const R = require('ramda');
const L = require('partial.lenses');
const { df_world: legends } = require('../data/legends.json');

const paths = {
  sites: ['sites', 'site'],
  artifacts: ['artifacts', 'artifact'],
  historicalEras: ['historical_eras', 'historical_era'],
  historicalFigures: ['historical_figures', 'historical_figure'],
  historicalEvents: ['historical_events', 'historical_event'],
  musicalForms: ['musical_forms', 'musical_form'],
};

const transforms = {
  musicalForms: [
    'description',
    L.log(),
    L.seq(L.modifyOp(R.split('[B]')), [L.elems, L.modifyOp(R.trim)]),
  ],
};

const getPaged = (arg, path, data, tfn) => {
  const { page, pageSize } = arg;
  const offsetStart = (page - 1) * pageSize;
  const offsetEnd = offsetStart + pageSize;

  const items = L.get(
    [
      path,
      L.reread(R.unless(R.is(Array), R.of)),
      L.slice(offsetStart, offsetEnd),
    ],
    data,
  );

  return {
    items: !tfn ? items : L.transform([L.elems, tfn], items),
    count: items.length,
  };
};

module.exports = {
  Query: {
    site: (_, arg) => L.get([paths.sites, L.find(R.whereEq(arg))], legends),
    artifact: (_, arg) =>
      L.get([paths.artifacts, L.find(R.whereEq(arg))], legends),
    allSites: (_, arg) => getPaged(arg, paths.sites, legends),
    allArtifacts: (_, arg) => getPaged(arg, paths.artifacts, legends),
    allHistoricalEras: (_, arg) => getPaged(arg, paths.historicalEras, legends),
    allHistoricalFigures: (_, arg) =>
      getPaged(arg, paths.historicalFigures, legends),
    allHistoricalEvents: (_, arg) =>
      getPaged(arg, paths.historicalEvents, legends),
    allMusicalForms: (_, arg) =>
      getPaged(arg, paths.musicalForms, legends, transforms.musicalForms),
  },
};
