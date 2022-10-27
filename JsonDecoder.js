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

  //assemble all elements
  StatementList(stop) {
    const statements = {};
    while (this._lookahead != null && this._lookahead.type !== stop) {
      const ele = this.Statement();
      if (Array.isArray(ele)) {
        return ele;
      } else {
        if (ele !== null) {
          if (!this.isEmpty(ele)) {
            for (const [key, value] of Object.entries(ele)) {
              statements[key] = value;
            }
          } else {
            this._eat("}");
          }
        }
      }
    }
    return statements;
  }

  isEmpty(obj) {
    for (var prop in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, prop)) {
        return false;
      }
    }

    return JSON.stringify(obj) === JSON.stringify({});
  }

  //router for diffrent elements
  Statement() {
    switch (this._lookahead.type) {
      case "{":
        return this.decodeKeyValue();
      case "STRING":
        return this.Identifier();
      case "[":
        return this.arrayStatement();
      case "}":
        return {};
      default:
        return null;
    }
  }

  //different types of array
  /**
   *   [ { key : value}]  object array
   *   [ "www.google.com"] string array
   *   [1,2,3,4] number array
   *
   */
  arrayStatement() {
    this._eat("[");
    const objects = [];
    while (this._lookahead.type !== "]") {
      if (this._lookahead.type === "STRING") {
        // don't have object inside
        const object = this.pureStringStatement();
        objects.push(object);
      } else if (this._lookahead.type === "NUMBER") {
        //has Number inside
        let value = this._eat("NUMBER").value;
        if (/^[0-9]*\.[0-9]+/.exec(value) !== null) {
          value = parseFloat(value);
        } else if (
          /^([-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))?$/.exec(
            value
          ) != null
        ) {
          value = parseFloat(value);
        } else if (
          /^([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))?$/.exec(
            value
          ) != null
        ) {
          value = parseInt(value);
        } else {
          value = parseInt(value);
        }
        objects.push(value);
      } else {
        //have object inside
        const object = this.decodeKeyValue();
        objects.push(object);
      }
    }
    this._eat("]");
    return objects;
  }

  //only decode pure string
  pureStringStatement() {
    const name = this._eat("STRING").value;
    return name;
  }

  //decode object
  decodeKeyValue() {
    this._eat("{");
    const body = this._lookahead.type !== "}" ? this.StatementList("}") : {};
    this._eat("}");
    return body;
  }

  //decode key/value pair
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
      if (/^[0-9]*\.[0-9]+/.exec(value) !== null) {
        value = parseFloat(value);
      } else if (/^\d+/.exec(value) !== null) {
        value = parseInt(value);
      } else if (
        /^([-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))?$/.exec(
          value
        ) != null
      ) {
        value = parseFloat(value);
      } else if (
        /^([+-]?(?=\.\d|\d)(?:\d+)?(?:\.?\d*))(?:[eE]([+-]?\d+))?$/.exec(
          value
        ) != null
      ) {
        value = parseInt(value);
      }
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
