import { xHistogram } from '../x/xHistogram';

import { matrixMinMaxZ } from './matrixMinMaxZ';
/**
import { matrixMinMaxZ } from './matrixMinMaxZ';
import { xHistogram } from '../x/xHistogram';
 * Calculates an histogram of defined number of slots
 * @param {Array<Array<Number>>} [matrix] - matrix [rows][cols].
 * @param {number} [options.nbSlots=256] Number of slots
 * @param {number} [options.min=minValue] Minimum value to calculate used to calculate slot size
 * @param {number} [options.max=maxValue] Maximal value to calculate used to calculate slot size
 * @param {number} [options.logBaseX] We can first apply a log on x axi
 * @param {number} [options.logBaseY] We can apply a log on the resulting histogra
 * @param {number} [options.centerX=true] Center the X value. We will enlarge the first and
 * @return {DataXY} {x,y} of the histogram
 *
 */

export function matrixHistogram(matrix, options = {}) {
  const { logBaseY } = options;
  options = JSON.parse(JSON.stringify(options));
  delete options.logBaseY;
  if (matrix.length === 0 || matrix[0].length === 0) {
    throw new Error(
      'matrixHistogram: matrix should have at least one column and one row',
    );
  }

  if (options.min === undefined || options.max === undefined) {
    const minMax = matrixMinMaxZ(matrix);
    if (options.min === undefined) options.min = minMax.min;
    if (options.max === undefined) options.max = minMax.max;
  }

  let histogram = xHistogram(matrix[0], options);
  options.histogram = histogram;

  const nbRows = matrix.length;
  for (let row = 1; row < nbRows; row++) {
    xHistogram(matrix[row], options);
  }

  const y = histogram.y;
  if (logBaseY) {
    const logOfBase = Math.log10(logBaseY);
    for (let i = 0; i < y.length; i++) {
      y[i] = Math.log10(y[i]) / logOfBase;
    }
  }

  return histogram;
}
