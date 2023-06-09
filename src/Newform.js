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
import "conversational-form/dist/conversational-form.min.css";
import i18n from "./i18n";
import { withTranslation } from "react-i18next";

class MyForm extends React.Component {
  changeLanguage = (lng) => {
    this.props.i18n.changeLanguage(lng);
  };
  constructor(props) {
    super(props);
    const { t } = props; // access the t function using props
    this.formFields = [
      {
        tag: "cf-robot-message",
        "cf-questions": "Hello my Friend",
      },
      {
        tag: "input",
        type: "radio",
        name: "language",
        "cf-questions":
          "Please choose your desired language for the application:",
        "cf-label": "English",
        onClick: this.changeLanguage("en"),
        value: "English",
      },
      {
        tag: "input",
        type: "radio",
        name: "language",
        "cf-label": "Spanish",
        onClick: this.changeLanguage("es"),
        value: "Spanish",
      },
     
      {
        tag: "input",
        type: "radio",
        name: "signatureStatus",
        "cf-questions": "Will anybody else have signature right on the account?",
        "cf-label": "Yes",
        value: "yes",
        html: "Yes",
      },
      {
        tag: "input",
        type: "radio",
        name: "signatureStatus",
        "cf-label": "No",
        value: "no",
        html: "No",
      },
      // if user click "yes" then show this field
      {
        tag: "select",
        name: "signatoryRights",
        "cf-questions": "How many more people will have signatory rights on the account?",
        "cf-conditional-signatureStatus": "^yes$",
        children: [
          {
            tag: "option",
            value: "1",
            "cf-label": "1",
          },
          {
            tag: "option",
            value: "2",
            "cf-label": "2",
          },
          {
            tag: "option",
            value: "3",
            "cf-label": "3",
          },
          {
            tag: "option",
            value: "4",
            "cf-label": "4",
          },
          {
            tag: "option",
            value: "5",
            "cf-label": "5",
          },
        ],
      },
      // add a default value for "signatoryRights" when "signatureStatus" is "No"
      {
        tag: "input",
        type: "hidden",
        name: "signatoryRights",
        value: "1",
        "cf-conditional-signatureStatus": "^no$",
      },

      // {
      //   // tag group
      //   tag: "fieldset",
      //   type: "text",
      //   "cf-input-placeholder": "names of all signatories",
      //   "cf-questions": "Type the full names of all signatories and your relation with them.",
      //   children: [
      //     {
      //       tag: "input",
      //       type: "text",
      //       name: "names-of-all-signatories",
      //     },
      //     {
      //       tag: "input",
      //       type: "text",
      //       "cf-input-placeholder": "Relation with signatories",
      //       "cf-questions": "Your relation with signatories",
      //       name: "your-relation-with-signatories",
      //     },
      //   ],
      // },
      // if user click no show this field
      {
        tag: "cf-robot-message",
        "cf-questions": "Enter Your Personal Information",
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
          "What is your date of birth? Please enter it in the format yyyy-mm-dd.",
        value: "1999-01-01",
        pattern: "^\\d{4}-\\d{2}-\\d{2}$",
        title: "Please enter a valid date in the format yyyy-mm-dd",
        "cf-error": "Please enter a valid date in the format yyyy-mm-dd",
        onKeyPress: (event) => {
          if (!/[0-9\-]/.test(event.key)) {
            event.preventDefault();
          }
        },
        min: "1900-01-01",
        max: new Date().toISOString().split("T")[0],
      },
      {
        // tag group
        tag: "select",
        "cf-questions": "Nationality(ies):",
        children: [
          {
            tag: "option",
            name: "Nationality",
            "cf-label": "Afghan",
            value: "Afghan",
          },
          {
            tag: "option",
            name: "Nationality",
            "cf-label": "Albanian",
            value: "Albanian",
          },
          {
            tag: "option",
            name: "Nationality",
            "cf-label": "Algerian",
            value: "Algerian",
          },
          {
            tag: "option",
            name: "Nationality",
            "cf-label": "American",
            value: "American",
          },
          {
            tag: "option",
            name: "Nationality",
            "cf-label": "Andorran",
            value: "Andorran",
          },
          {
            tag: "option",
            name: "Nationality",
            "cf-label": "Angolan",
            value: "Angolan",
          },
          {
            tag: "option",
            name: "Nationality",
            "cf-label": "Antiguans",
            value: "Antiguans",
          },
          {
            tag: "option",
            name: "Nationality",
            "cf-label": "Argentinean",
            value: "Argentinean",
          },
          {
            tag: "option",
            name: "Nationality",
            "cf-label": "Armenian",
            value: "Armenian",
          },
          {
            tag: "option",
            name: "Nationality",
            "cf-label": "Australian",
            value: "Australian",
          },
          {
            tag: "option",
            name: "Nationality",
            "cf-label": "Austrian",
            value: "Austrian",
          },
          {
            tag: "option",
            name: "Nationality",
            "cf-label": "Azerbaijani",
            value: "Azerbaijani",
          },
          {
            tag: "option",
            name: "Nationality",
            "cf-label": "Bahamian",
            value: "Bahamian",
          },
          {
            tag: "option",
            name: "Nationality",
            "cf-label": "Bahraini",
            value: "Bahraini",
          },
          {
            tag: "option",
            name: "Nationality",
            "cf-label": "Bangladeshi",
            value: "Bangladeshi",
          },
          {
            tag: "option",
            name: "Nationality",
            "cf-label": "Barbadian",
            value: "Barbadian",
          },
          {
            tag: "option",
            name: "Nationality",
            "cf-label": "Barbudans",
            value: "Barbudans",
          },
          {
            tag: "option",
            name: "Nationality",
            "cf-label": "Batswana",
            value: "Batswana",
          },
          {
            tag: "option",
            name: "Nationality",
            "cf-label": "Belarusian",
            value: "Belarusian",
          },
          {
            tag: "option",
            name: "Nationality",
            "cf-label": "Belgian",
            value: "Belgian",
          },
        ],
      },
      {
        tag: "input",
        type: "text",
        name: "CityOfResidence",
        "cf-questions": "Country and city of residence:",
        value: "Dubai",
      },
      {
        tag: "select",
        "cf-questions": "What is your marital status?",
        children: [
          {
            tag: "option",
            name: "MaritalStatus",
            "cf-label": "single",
            value: "single",
          },
          {
            tag: "option",
            name: "MaritalStatus",
            "cf-label": "married",
            value: "married",
          },
          {
            tag: "option",
            name: "MaritalStatus",
            "cf-label": "divorced",
            value: "divorced",
          },
          {
            tag: "option",
            name: "MaritalStatus",
            "cf-label": "widow",
            value: "widow",
          },
        ],
      },
      {
        tag: "input",
        type: "email",
        name: "email",
        "cf-questions": "Enter your email address?",
        value: "example@gmail.com",
      },
      {
        tag: "input",
        type: "number",
        name: "phone",
        "cf-questions": "Enter your phone number?",
        min: "10",
        required: true,
      },
      {
        tag: "cf-robot-message",
        "cf-questions": "Enter Your Educational Background",
      },
      {
        tag: "input",
        type: "text",
        name: "study",
        "cf-questions": "Where did you study?",
      },
      {
        tag: "input",
        type: "text",
        name: "graduate",
        "cf-questions": "In which year did you graduate?",
      },
      {
        tag: "cf-robot-message",
        "cf-questions": "Enter Your Employment Information",
      },
      {
        tag: "input",
        type: "text",
        name: "employer",
        "cf-questions": "Name of actual Employer:",
      },
      {
        tag: "input",
        type: "text",
        name: "yourtitle:",
        "cf-questions": "Your title:",
      },
      {
        tag: "input",
        type: "text",
        name: "natureofbusiness",
        "cf-questions": "Nature of Business:",
      },
      {
        tag: "input",
        type: "text",
        name: "annual_income",
        "cf-questions": "Avg Annual Income:",
      },
      {
        tag: "select",
        "cf-questions": "Investment Objective:",
        children: [
          {
            tag: "option",
            name: "investmentObjective",
            "cf-label": "Safety",
            value: "Safety",
          },
          {
            tag: "option",
            name: "investmentObjective",
            "cf-label": "Income",
            value: "Income",
          },
          {
            tag: "option",
            name: "investmentObjective",
            "cf-label": "Capital Growth",
            value: "Capital Growth",
          },
          {
            tag: "option",
            name: "investmentObjective",
            "cf-label": "Retirement",
            value: "Retirement",
          },
        ],
      },

      // this field is submit the form-
      {
        tag: "input",
        type: "radio",
        name: "submit",
        "cf-questions":
          "Excellent! I have received all the required information, thank you.",
        "cf-label": "submit",
        value: "submit",
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
        userImage:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRaJuRqnBBee7eBC3cVVia3XEl95Lmqsli_kg&usqp=CAU",
        robotImage:
          "data:image/jpeg;base64,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",
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
    // this.cf.addRobotChatResponse(
    //   "Your form has been submitted and the data has been saved as a PDF file."
    // );
  }

  toggleShow() {
    this.setState((prevState) => ({
      basicModal: !prevState.basicModal,
    }));
  }

  pdfGenerator = () => {
    const formDataSerialized = this.cf.getFormData(true);
    const formData = new FormData();

    Object.entries(formDataSerialized).forEach(([key, value]) => {
      formData.append(key, value);
    });

    const doc = new jsPDF();

    // Add custom font
    doc.addFont("Helvetica", "Helvetica", "bold");

    // Set font style
    doc.setFont("Helvetica", "normal");
    // Set font style and formatting for KYC data heading
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0); // black color
    const kycDataHeading = "KYC Application Form Data";
    const kycDataHeadingWidth =
      (doc.getStringUnitWidth(kycDataHeading) * doc.internal.getFontSize()) /
      doc.internal.scaleFactor;
    const pageWidth = doc.internal.pageSize.width;
    const margin = (pageWidth - kycDataHeadingWidth) / 2;
    doc.text(margin, 20, kycDataHeading);

    // Set font style and formatting for form fields
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0); // black color
    doc.text(20, 40, "Personal information");
    doc.text(20, 50, "First Name: " + formData.get("firstname"));
    doc.text(20, 60, "Last Name: " + formData.get("lastname"));
    doc.text(20, 70, "Date of Birth: " + formData.get("dob"));
    doc.text(20, 80, "Nationality: " + formData.get("Nationality"));
    doc.text(20, 90, "City Of Residence: " + formData.get("CityOfResidence"));
    doc.text(20, 100, "Marital Status: " + formData.get("MaritalStatus"));
    doc.text(20, 110, "Email: " + formData.get("email"));
    doc.text(20, 120, "Phone Number: " + formData.get("phone"));
    doc.text(80, 40, "Other information");
    doc.text(80, 50, "Study: " + formData.get("study"));
    doc.text(80, 60, "Actual Employer: " + formData.get("employer"));
    doc.text(80, 70, "Avg Annual Income: " + formData.get("annual_income"));
    doc.text(80, 80,"Investment Objective: " + formData.get("investmentObjective")
    );
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
export default withTranslation()(MyForm);
