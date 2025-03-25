//Para que TypeScript reconozca los módulos CSS y sus clases
declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}