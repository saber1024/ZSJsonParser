import JsonDecoder from "./JsonDecoder.js";

const str = `
{
   "lat": "-37"
}
`;

const decoder = new JsonDecoder(str);

const result = decoder.parse();

console.log(JSON.stringify(result, null, 1));
