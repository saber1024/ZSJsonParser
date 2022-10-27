import JsonDecoder from "./JsonDecoder.js";

const str = `
   {   
      [
         {
            "userId": 1,
            "id": 1,
            "title": "quidem molestiae enim"
          },
          {
            "userId": 1,
            "id": 2,
            "title": "sunt qui excepturi placeat culpa"
          },
          {
            "userId": 1,
            "id": 3,
            "title": "omnis laborum odio"
          },
          {
            "userId": 1,
            "id": 4,
            "title": "non esse culpa molestiae omnis sed optio"
          },
          {
            "userId": 1,
            "id": 5,
            "title": "eaque aut omnis a"
          },
      ]
   }
`;

const decoder = new JsonDecoder(str);

const result = decoder.parse();

console.log(JSON.stringify(result, null, 1));
