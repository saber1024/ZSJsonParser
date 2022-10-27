const tokens = [
  [/^\s+/, null],
  [/^\/\/.*/, null],
  [/^\/\*[\s\S]*?\*\//, null],
  [/^;/, ";"],
  [/^\{/, "{"],
  [/^\}/, "}"],
  [/^\,/, null],
  [/^\[/, "["],
  [/^\]/, "]"],
  [/^\:/, ":"],
  [/^[0-9]*\.[0-9]+/, "NUMBER"],

  [/^\w+/, "STRING"],
  [/^"[^"]*"/, "STRING"],
  [/^\d+/, "NUMBER"],
  [/^\btrue\b/, "true"],
  [/^\bfalse\b/, "false"],
  [/^\bnull\b/, "null"],
];

class Tokenizer {
  constructor(string) {
    this._string = string;
    this._cursor = 0;
  }

  isEof() {
    return this._cursor == this._string.length;
  }

  hasMoreTokens() {
    return this._cursor < this._string.length;
  }

  getNextToken() {
    if (!this.hasMoreTokens()) {
      return null;
    }

    let string = this._string.slice(this._cursor);
    if (string.startsWith("\n")) {
      this._cursor += 2;
      return this.getNextToken();
    }
    for (const [regex, tokenType] of tokens) {
      const result = this._match(regex, string);
      if (result === null) {
        continue;
      }

      if (tokenType === null) {
        return this.getNextToken();
      }

      return {
        type: tokenType,
        value: result.replace(/['"]+/g, ""),
      };
    }

    throw SyntaxError("UnSupport token type");
  }

  _match(regex, string) {
    const result = regex.exec(string);
    if (result === null) {
      return null;
    }
    this._cursor += result[0].length;

    return result[0];
  }
}

export default Tokenizer;
