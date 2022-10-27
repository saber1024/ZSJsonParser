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
          ],
          "images": [
            "https://dummyjson.com/image/i/products/1/1.jpg",
            "https://dummyjson.com/image/i/products/1/2.jpg",
            "https://dummyjson.com/image/i/products/1/3.jpg",
            "https://dummyjson.com/image/i/products/1/4.jpg",
            "https://dummyjson.com/image/i/products/1/thumbnail.jpg"
          ],
          "numbers" : [
             3,
             4,
             5,
             6
          ]
       }
   }
`;

const decoder = new JsonDecoder(str);

const result = decoder.parse();

console.log(JSON.stringify(result["data"], null, 2));

// // console.log(JSON.stringify(result[data], null, 2));
