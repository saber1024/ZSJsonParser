import JsonDecoder from "./JsonDecoder.js";

const str = `
   {
       "name" : "jennie",
       "sex" : 1,
       "height": 165,
       "group" : "blackpink",
       "isPass": false,
       "data" :{
          "age" : 25,
          "lastLogin": "0805",
          "login_Device": {
             "first" : "iphone",
             "second" : "android"
          },
          "house": [
              {"first" : "LA"},
              {"second" : "seoul"},
          ]
       }
   }
`;

const decoder = new JsonDecoder(str);

const result = decoder.parse();

console.log(JSON.stringify(result, null, 2));
