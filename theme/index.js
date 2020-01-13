import blue from './blue';
import black from './black';

const themes = {
  blue,
  black
};

/**
 * Returns a style object.
 * @param {string} themeName themeName
 * @returns {object} A style object
 */
export default (themeName = 'blue') => {
  return themes[themeName];
};