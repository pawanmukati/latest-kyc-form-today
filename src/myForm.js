import React from 'react';
import { ConversationalForm } from 'conversational-form';
import jsPDF from 'jspdf';
import moment from "moment";


export default class MyForm extends React.Component {
  constructor(props) {
    super(props);
    this.formFields = [
      {
        tag: "cf-robot-message",
        "cf-questions": "Hello my friend",
      },
      {
        tag: "input",
        type: "radio",
        name: "language",
        "cf-questions":
          "Please choose your desired language for the application:",
        "cf-label": "English",
        value: "English",
      },
      {
        tag: "input",
        type: "radio",
        name: "language",
        "cf-label": "Spanish",
        value: "Spanish",
      },
      {
        tag: "input",
        type: "text",
        name: "firstname",
        "cf-questions": "What is your firstname?",
      },
      {
        tag: "input",
        type: "text",
        name: "lastname",
        "cf-questions": "What is your lastname?",
      },
      {
        tag: "input",
        type: "date",
        name: "dob",
        "cf-questions":
          "What is your date of birth? Please enter the date a ate in this format yyyy-mm-dd",
        pattern: "^\\d{4}-\\d{2}-\\d{2}$",
        "cf-error": "Please enter a valid date in the format yyyy-mm-dd",
        min: "1900-01-01",
        max: new Date().toISOString().split("T")[0],
      },
      {
        tag: "input",
        type: "number",
        name: "phone",
        "cf-questions": "What is your number?",
        min: "10",
      },
      {
        // tag group
        tag: "select",
        "cf-input-placeholder": "Tag group is injected",
        "cf-questions": "Choose an injected tag",
        class: "lastfilled",
        children: [
          {
            tag: "option",
            name: "checkboxes-buttons-1",
            "cf-label": "checkbox-x1",
            value: "a",
          },
          {
            tag: "option",
            name: "checkboxes-buttons-1",
            "cf-label": "checkbox-x2",
            value: "a",
          },
        ],
      },
      {
        tag: "input",
        type: "submit",
        name: "confirm",
        "cf-questions":
          "Excellent! I have received all the required information, thank you.",
      },
    ];
    
    this.submitCallback = this.submitCallback.bind(this);
  }


  componentDidMount() {
    this.cf = ConversationalForm.startTheConversation({
      options: {
        submitCallback: this.submitCallback,
        preventAutoFocus: true,
        // loadExternalStyleSheet: false
      },
      tags: this.formFields,
    });
    this.elem.appendChild(this.cf.el);
  }

  submitCallback() {
    var formDataSerialized = this.cf.getFormData(true);
    console.log("Formdata, obj:", formDataSerialized);
    this.cf.addRobotChatResponse(
      "You are done. Check the dev console for form data output."
    );
    // Parse date string into desired format using Moment.js
    const dob = moment(formDataSerialized.dob, "YYYY-MM-DD").format(
      "MM/DD/YYYY"
    );
    // Add formatted date value to form data object
    formDataSerialized.dob = dob;
    // Generate PDF from form data
    const doc = new jsPDF();
    doc.text(20, 20, "Form Data:");
    doc.text(20, 30, JSON.stringify(formDataSerialized, null, 2));
    doc.save("form-data.pdf");

    // Display message to user
    window.alert(
      "Your form has been submitted and the data has been saved as a PDF file."
    );
  }

  render() {
    return (
      <div>
        <div ref={(ref) => (this.elem = ref)} />
      </div>
    );
  }
}
