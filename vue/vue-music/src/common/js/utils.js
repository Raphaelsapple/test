export default {

   trim(str) {
    return str ? str.replace(/^\s*|\s*$/g, '') : '';
  }

  ,  trimEnd(str, chars) {

    if (str && chars === undefined) {
      return str.replace(/\s+$/, '');
    }

    if (!str || !chars) {
      return str;
    }

    return str.replace(new RegExp(`[${chars}]+$`), '');
  }

  ,  toLower(str) {
    return str ? str.toLowerCase() : '';
  }

  ,  toUpper(str) {
    return str ? str.toUpperCase() : '';
  }
  ,  isString(val) {
    return typeof val === 'string';
  }

  ,  isBoolean(val) {
    return val === true || val === false;
  }

  ,  is(val) {
    return typeof val === '';
  }

  ,  isObject(obj) {
    return obj !== null && typeof obj === 'object';
  }

  ,  isPlainObject(obj) {
    return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;
  }

  ,  isBlob(obj) {
    return typeof Blob !== 'undefined' && obj instanceof Blob;
  }

  ,  isFormData(obj) {
    return typeof FormData !== 'undefined' && obj instanceof FormData;
  }

}






