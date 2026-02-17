const fsHusky = require('fs');
const exec = require('child_process').exec;

const currentProjectHooks = ['pre-commit', 'pre-push'];
const huskyExecutablesFolder = './.husky/_';

function checkIfHuskyExistsAndNotEmpty() {
  return new Promise(function (resolve) {
    fsHusky.readdir(huskyExecutablesFolder, function (err, files) {
      if (err) {
        console.log('Trying to activate Husky...');
        tryToActivateHusky(resolve);
      } else if (files.length === 0) {
        console.log('Trying to activate Husky...');
        tryToActivateHusky(resolve);
      } else {
        resolve(true);
      }
    });
  });
}

// function createHuskyFolder(resolve: (value: unknown) => void) {
//   fsHusky.mkdir('./.husky/_', function (err) {
//     if (err) {
//       console.error(
//         formatError(`Error creating Husky Folder: ${err.message}`),
//       );
//       resolve(false);
//     } else {
//       console.log('Husky Folder has been successfully created.');
//       resolve(false);
//     }
//   });
// }

function checkCustomHooks(hook) {
  return new Promise(function (resolve) {
    fsHusky.access(
      '.husky/' + hook,
      fsHusky.constants.F_OK,
      function (err) {
        if (err) {
          console.error(
            formatError(`Custom Hook '${hook}' not found!`),
          );
          resolve(false);
        } else {
          resolve(true);
        }
      },
    );
  });
}

function tryToActivateHusky(resolve: (value: unknown) => void) {
  exec('npx husky', function (error) {
    if (error) {
      console.error(
        formatError(`Error Activating Husky: ${error.message}`),
      );
      console.warn('You may need to execute `npm i && npx husky`.');
      resolve(false);
    } else {
      console.log('Husky Hooks has been succesfully activated.');
      resolve(true);
    }
  });
}

function formatError(message) {
  const red = '\x1b[31m'; // ANSI Code für Rot
  const reset = '\x1b[0m'; // Reset Farbe
  return `${red}${message}${reset}`;
}

Promise.all([
  checkIfHuskyExistsAndNotEmpty(),
  ...currentProjectHooks.map(checkCustomHooks),
]).then(function (results) {
  if (results.includes(false)) {
    console.error(
      formatError('---------------------------------------------'),
      formatError('\nERROR: Husky Hooks are not correctly set up!'),
      formatError('\nPLEASE CONTACT THE ARCHITECTURE TEAM!'),
      formatError('\nDO NOT COMMIT OR PUSH!'),
      formatError(
        '\n---------------------------------------------',
      ),
    );
  } else {
    console.log(
      '✔️  Custom Husky Hooks and Husky folder seem to be correctly set up.',
    );
  }
});
