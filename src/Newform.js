import React from "react";
import { ConversationalForm } from "conversational-form";
import jsPDF from "jspdf";
import moment from "moment";
import {
  MDBBtn,
  MDBModal,
  MDBModalDialog,
  MDBModalContent,
  MDBModalHeader,
  MDBModalTitle,
  MDBModalBody,
  MDBModalFooter,
} from "mdb-react-ui-kit";

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
      //   {
      //     tag: "input",
      //     type: "date",
      //     name: "dob",
      //     "cf-questions":
      //       "What is your date of birth? Please enter the date a ate in this format yyyy-mm-dd",
      //     pattern: "^\\d{4}-\\d{2}-\\d{2}$",
      //     "cf-error": "Please enter a valid date in the format yyyy-mm-dd",
      //     min: "1900-01-01",
      //     max: new Date().toISOString().split("T")[0],
      //   },
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
        tag: "cf-robot-message",
        "cf-questions":
          "Excellent! I have received all the required information, thank you.",
      },
      {
        tag: "input",
        type: "submit",
        name: "confirm",
        "cf-questions":
          "Excellent! I have received all the required information, thank you.",
      },
    ];
    this.state = {
      basicModal: false,
    };
    this.toggleShow = this.toggleShow.bind(this);

    this.submitCallback = this.submitCallback.bind(this);
  }

  componentDidMount() {
    this.cf = ConversationalForm.startTheConversation({
      options: {
        submitCallback: this.submitCallback,
        preventAutoFocus: true,
      },
      tags: this.formFields,
    });

    this.elem.appendChild(this.cf.el);
  }

  submitCallback() {
    var formDataSerialized = this.cf.getFormData(true);
    // Parse date string into desired format using Moment.js
    const dob = moment(formDataSerialized.dob, "YYYY-MM-DD").format(
      "MM/DD/YYYY"
    );
    // Add formatted date value to form data object
    formDataSerialized.dob = dob;

    // Open the modal
    this.toggleShow();

    // Display message to user
    this.cf.addRobotChatResponse(
      "Your form has been submitted and the data has been saved as a PDF file."
    );
  }

  toggleShow() {
    this.setState((prevState) => ({
      basicModal: !prevState.basicModal,
    }));
  }

  pdfGenerator = () => {
    const formDataSerialized = this.cf.getFormData(true);
    const doc = new jsPDF();
    doc.text(20, 20, "Form Data:");
    doc.text(20, 30, JSON.stringify(formDataSerialized, null, 2));
    doc.save("form-data.pdf");
  };

  render() {
    return (
      <>
        <div>
          <div ref={(ref) => (this.elem = ref)} />
        </div>
        <MDBModal
          show={this.state.basicModal}
          setShow={this.setBasicModal}
          tabIndex="-1"
        >
          <MDBModalDialog>
            <MDBModalContent>
              <MDBModalHeader>
                <MDBModalTitle>Confirmation</MDBModalTitle>
                <MDBBtn
                  className="btn-close"
                  color="none"
                  onClick={this.toggleShow}
                ></MDBBtn>
              </MDBModalHeader>
              <MDBModalBody>
                Your form has been submitted and the data has been saved as a
                PDF file.
              </MDBModalBody>

              <MDBModalFooter>
                <MDBBtn color="secondary" onClick={this.toggleShow}>
                  Close
                </MDBBtn>
                <MDBBtn onClick={this.pdfGenerator}>Save PDF File</MDBBtn>
              </MDBModalFooter>
            </MDBModalContent>
          </MDBModalDialog>
        </MDBModal>
      </>
    );
  }
}
