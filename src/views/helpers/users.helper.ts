interface User {
    id: string;
    name: string;
    email: string;

}
export function listUsers (items: User[], options: any ) {
    const headers = Object.keys(items[0]);
    const headersAsHtml = headers.map(header => "<th>" + header + "</th>");
    const itemsAsHtml = items.map(item => "<tr>" + options.fn(item) + "</tr>");
    return `
        <thead>
            ${headersAsHtml.join("\n")}
            </thead>
        <tbody>
            ${itemsAsHtml.join("\n")}
        </tbody>
       `;
}