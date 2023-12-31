export function toCamelCase(input: string): string {
  return input.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) {
      return "";
    } // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

export function toPascalCase(input: string): string {
  return input.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match, index) {
    if (+match === 0) {
      return "";
    } // or if (/\s+/.test(match)) for white spaces
    return match.toUpperCase();
  });
}

export function toSnakeCase(input: string): string {
  return input
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match) {
      return "_" + match.toLowerCase();
    })
    .replace(/^_/, "");
}

export function toPathCase(input: string): string {
  return input
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match) {
      return "/" + match.toLowerCase();
    })
    .replace(/^\//, "");
}

export function toParamCase(input: string): string {
  return input
    .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function (match) {
      return "-" + match.toLowerCase();
    })
    .replace(/^-/, "");
}
