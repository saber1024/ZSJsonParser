import Tokenizer from "./Tokenizer.js";

class JsonDecoder {
  constructor(string) {
    this._string = string;
    this._tokenizer = new Tokenizer(string);
    this._lookahead = null;
  }

  parse() {
    this._lookahead = this._tokenizer.getNextToken();
    return this.Program();
  }

  Program() {
    return this.StatementList();
  }

  StatementList(stop) {
    const statements = {};

    while (this._lookahead != null && this._lookahead.type !== stop) {
      const ele = this.Statement();
      if (ele !== null) {
        for (const [key, value] of Object.entries(ele)) {
          statements[key] = value;
        }
      }
    }

    return statements;
  }

  Statement() {
    switch (this._lookahead.type) {
      case "{":
        return this.decodeKeyValue();
      case "STRING":
        return this.Identifier();
      case "[":
        return this.arrayStatement();
      default:
        return null;
    }
  }

  arrayStatement() {
    this._eat("[");
    const objects = [];
    while (this._lookahead.type !== "]") {
      const object = this.decodeKeyValue();
      objects.push(object);
    }
    this._eat("]");
    return objects;
  }

  decodeKeyValue() {
    this._eat("{");
    const body = this._lookahead.type !== "}" ? this.StatementList("}") : {};
    this._eat("}");
    return body;
  }

  Identifier() {
    const name = this._eat("STRING").value;
    this._eat(":");
    let value;
    if (
      this._lookahead.type !== "{" &&
      this._lookahead.type !== "[" &&
      this._lookahead.type != "]"
    ) {
      value = this._eat(this._lookahead.type).value;
    } else if (this._lookahead.type === "[") {
      value = this.arrayStatement();
    } else {
      value = this.StatementList("}");
    }
    const kvpair = {};
    kvpair[name] = value;
    return kvpair;
  }

  _eat(type) {
    const token = this._lookahead;

    if (token === null) {
      throw new SyntaxError(`Unexpect end input, expected ${type}`);
    }

    if (token.type != type) {
      throw new SyntaxError(`Unexpected Token ${token.type}, expected ${type}`);
    }

    this._lookahead = this._tokenizer.getNextToken();

    return token;
  }
}

export default JsonDecoder;
