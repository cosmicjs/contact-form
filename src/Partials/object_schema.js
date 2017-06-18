export default {
  "slug": "contact-form",
  "title": "Contact Form",
  "content": "",
  "options": {
    "content_editor": 0
  },
  "metafields": [
    {
      "value": "",
      "key": "form_elements",
      "title": "Form Elements",
      "type": "parent",
      "children": [
        {
          "value": "",
          "key": "first_name",
          "title": "First Name",
          "type": "text",
          "children": null
        },
        {
          "value": "",
          "key": "last_name",
          "title": "Last Name",
          "type": "text",
          "children": null
        },
        {
          "value": "",
          "key": "company",
          "title": "Company",
          "type": "text",
          "children": null
        },
        {
          "value": "",
          "key": "email",
          "title": "Email",
          "type": "text",
          "children": null
        },
        {
          "options": [
            {
              "key": "Male",
              "value": "Male"
            },
            {
              "key": "Female",
              "value": "Female"
            }
          ],
          "value": "Male",
          "key": "gender",
          "title": "Gender",
          "type": "select-dropdown",
          "children": null
        }
      ]
    },
    {
      "value": "Send",
      "key": "submit_button_text",
      "title": "Submit Button Text",
      "type": "text",
      "children": null
    },
    {
      "value": "Message sent",
      "key": "success_message_title",
      "title": "Success Message Title",
      "type": "text",
      "children": null
    },
    {
      "value": "Thank you for sending your request.  We will be reaching out to you soon!",
      "key": "success_message_body",
      "title": "Success Message Body",
      "type": "text",
      "children": null
    },
    {
      "value": "rocket",
      "key": "success_message_icon",
      "title": "Success Message Icon",
      "type": "text",
      "children": null
    }
  ]
}