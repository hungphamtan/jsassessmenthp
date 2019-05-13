/**
 *
 *
 * @export store function
 * @param {Array}
 * @returns {string}
 */
export function store(array) {
	if (!array) return '';
	const result = array.map(obj =>
    Object.entries(obj)
      .map(item => item.join('='))
      .join(';')
  );
  return result.join('\u000a');
}

/**
 *
 *
 * @export load function
 * @param {string} text
 * @returns {Array}
 */
export function load(text) {
	let result = [];
	if (!text) return result;
	
  const re = /(\w+)=([^;]*)/gi;
  result = text.split('\n').map(item => {
    let obj = {};
    let regexResult;
    while ((regexResult = re.exec(item)) !== null) {
      obj = Object.assign(obj, { [`${regexResult[1]}`]: regexResult[2] });
    }
    return obj;
  });
  return result;
}
module.exports = {
  store,
  load
};
