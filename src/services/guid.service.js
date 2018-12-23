export default function guid(prefix) {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return `${(prefix) ? prefix : ''}${s4()}${s4()}${s4()}${s4()}${s4()}`;
}