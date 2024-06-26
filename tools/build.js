// More info on Webpack's Node API here: https://webpack.github.io/docs/node.js-api.html
// Allowing console calls below since this is a build file.
/* eslint-disable no-console */
import webpack from 'webpack';
import fs from 'fs';
import config from '../webpack/webpack.config.prod';
import { chalkError, chalkSuccess, chalkWarning, chalkProcessing } from './chalkConfig';

process.env.NODE_ENV = 'production'; // this assures React is built in prod mode and that the Babel dev config doesn't apply.

console.log(chalkProcessing('Generating minified bundle for production via Webpack. This will take a moment...'));

webpack(config).run((error, stats) => {
  if (error) { // so a fatal error occurred. Stop here.
    console.log(chalkError(error));
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors) {
    return jsonStats.errors.map(error => console.log(chalkError(error)));
  }

  if (jsonStats.hasWarnings) {
    console.log(chalkWarning('Webpack generated the following warnings: '));
    jsonStats.warnings.map(warning => console.log(chalkWarning(warning)));
  }

  console.log(`Webpack stats: ${stats}`);

  // if we got this far, the build succeeded.
  console.log(chalkSuccess('Your app is compiled in production mode in /dist. It\'s ready to roll!'));
  fs.copyFile('_redirects', './dist/_redirects', (err)=> {
    if (err) throw err;
    console.log('_redirects was copied to dist folder')
  });

  return 0;
});
