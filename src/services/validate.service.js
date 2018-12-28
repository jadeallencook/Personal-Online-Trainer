export default function validate(data, type) {
    if (!type) type = 'object';
    return (data && type && typeof(data) === type) ? true : false;
}