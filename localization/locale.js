import korean from './resources/korean';
import english from './resources/english';

// import language json files from resources folder
const resources = {
  korean: { ...korean },
  english: { ...english }
};

// supported languages list.
export const languages = ['korean', 'english'];

/**
 * Create a function that to use for translation.
 * @param {string} lang A language that you want to translate
 * @returns {Function} A function that to translate, this function takes one parameter that to translate.
 */
export default (lang) => {
  const hasLanguage = languages.some(e => e === lang);
  if (!hasLanguage) {
    return null;
  }

  return (keyword) => {
    if (resources[lang][keyword]) {
      return resources[lang][keyword];
    }

    return null;
  }
};