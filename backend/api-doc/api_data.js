define({ "api": [
  {
    "type": "delete",
    "url": "/api/trucks/:id",
    "title": "Delete truck",
    "name": "DeleteTrucksId",
    "group": "Trucks",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "500 Internal Server Error": [
          {
            "group": "500 Internal Server Error",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The server encountered an internal error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/trucks.js",
    "groupTitle": "Trucks"
  },
  {
    "type": "patch",
    "url": "/api/trucks/:id/update",
    "title": "Update truck's info",
    "name": "PatchTrucksIdUpdate",
    "group": "Trucks",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "type",
            "description": "<p>Truck's type.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "500 Internal Server Error": [
          {
            "group": "500 Internal Server Error",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The server encountered an internal error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/trucks.js",
    "groupTitle": "Trucks"
  },
  {
    "type": "delete",
    "url": "/api/users",
    "title": "Delete user",
    "name": "DeleteUsers",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "500 Internal Server Error": [
          {
            "group": "500 Internal Server Error",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The server encountered an internal error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/auth.js",
    "groupTitle": "Users"
  },
  {
    "type": "get",
    "url": "/api/users/me",
    "title": "Get user's profile",
    "name": "GetUsersMe",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>User's id.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>User's username.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "role",
            "description": "<p>User's role.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "500 Internal Server Error": [
          {
            "group": "500 Internal Server Error",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The server encountered an internal error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/auth.js",
    "groupTitle": "Users"
  },
  {
    "type": "patch",
    "url": "/api/users/password",
    "title": "Change user's password",
    "name": "PatchUsersPassword",
    "group": "Users",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "status",
            "description": "<p>Operation status.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "500 Internal Server Error": [
          {
            "group": "500 Internal Server Error",
            "optional": false,
            "field": "InternalServerError",
            "description": "<p>The server encountered an internal error</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "routes/api/auth.js",
    "groupTitle": "Users"
  }
] });
