export default function datestamp() {
    let today = new Date();
    today = today.toLocaleDateString();
    today = today.replace(new RegExp('/', 'g'), '-');
    return today;
}