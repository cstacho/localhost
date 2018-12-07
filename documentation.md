
# PROJECT NAME

---

Name: Camille Stacho

Date: December 1, 2018  

Project Topic: Local Businesses

URL:

---

### 1. Data Format and Storage

Data point fields:
- `Field 1`:     name              `Type: String`
- `Field 2`:     address           `Type: String`
- `Field 3`:     storetype         `Type: String`
- `Field 4`:     pricerating       `Type: Number`
- `Field 5`:     items             `Type: [String]`

Schema:
```javascript
{

  name: {
      type: String,
      required: true
  },
  address: {
      type: String,
      required: true
  },
  storetype: {
      type: String,
      required: true
  },
  pricerating: {
      type: Number,
      required: true
  },
  items: [String]
}
```

### 2. Add New Data

HTML form route: `/business/add`

POST endpoint route: `/api/business`

Example Node.js POST request to endpoint:
```javascript
var request = require("request");

var options = {
    method: 'POST',
    url: 'http://localhost:3000/api/...',
    headers: {
      'content-type': 'application/x-www-form-urlencoded'
    },
    form: {
      'name': 'Bedazzled',
      'address': '4000 Baltimore Ave',
      'storetype': 'Jewelry Store',
      'pricerating' : '1',
      'items': ['Earrings', 'Rings']
    }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/api/business`

### 4. Search Data

Search Field: 'items'

### 5. Navigation Pages

Navigation Filters
1. all -> `  /  `
2. add store -> `  /business/add  `
3. by price -> `  /business/price  `
4. by location -> `  /business/closest  `
5. alphabetical order -> `  /business/alphabetical  `
