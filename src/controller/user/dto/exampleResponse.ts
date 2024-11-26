export const createUserValidationInputError = [
  {
      "key": "name",
      "value": [
          "must be between 2 and 50 characters",
          "must be string"
      ]
  },
  {
      "key": "email",
      "value": [
          "must be a valid email",
          "must be string"
      ]
  },
  {
      "key": "url_avatar",
      "value": [
          "must be string",
          "must be between 10 and 250 characters"
      ]
  },
  {
      "key": "password",
      "value": [
          "must be string",
          "must be between 6 and 25 characters"
      ]
  },
  {
      "key": "setting_id",
      "value": [
          "must not be shorter than 1",
          "must be an integer"
      ]
  }
]