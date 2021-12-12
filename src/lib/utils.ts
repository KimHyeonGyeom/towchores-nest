/**
 *  객체가 비어있는지 확인
 *  @param {object} value - 객체
 */
export const isEmpty = function (value: any) {
  if (
    value === '' ||
    value === null ||
    value === undefined ||
    (typeof value === 'object' && !Object.keys(value).length)
  ) {
    return true;
  } else {
    return false;
  }
};
