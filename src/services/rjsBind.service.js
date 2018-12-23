import * as _ from 'lodash';

export default function rjsBind(event) {
    const path = event.target.getAttribute('data-path'),
        paths = path.split('-'),
        value = event.target.value;
    let object = {};
    paths.reduce(([object, value], path, idx) => {
        object[path] = idx === paths.length - 1 ? value : {};
        return [object[path], value];
    }, [object, value]);
    object = _.merge(this.state, object);
    this.setState(() => object);
}