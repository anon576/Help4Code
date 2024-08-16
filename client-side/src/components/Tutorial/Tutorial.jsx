import React, { useEffect, useState, useRef } from "react";
import TutorialSideBar from "./TutorialSideBar";
import "./tutorial.css";
import CodeSnippte from "./CodeSnippte";

const Tutorial = () => {
  const [openSideBar, setOpenSideBar] = useState(true);

  const toggleSideBar = () => {
    setOpenSideBar(!openSideBar);
  };

  return (
    <div className="tutorial-main-page">
      <div className="sidebar">
        <TutorialSideBar
          toggleSideBar={toggleSideBar}
          openSideBar={openSideBar}
        />
      </div>

      <div
        className={`tutorial-main-container ${
          openSideBar ? "open-tutorial" : ""
        }`}
      >
        <h2 className="tutorial-main-heading">Project: Password Strength Checker 🔐💪</h2>
        <h5 className="tutorial-sub-heading">
          In this project, you will create a password strength checker program
          using the concepts you have learned so far, including variables, data
          types, operators, input functions, string manipulation, and
          conditional statements. Follow the instructions below to complete the
          project:
        </h5>
        <p className="tutorial-paragraph-content">
          1. Prompt the user to enter a password using the <code>input()</code>{" "}
          function. Store the password in a variable.
        </p>
        <p className="tutorial-paragraph-content">
          2. Check the length of the password using the <code>len()</code>{" "}
          function. If the length is less than 8 characters, display a message
          indicating that the password is weak.
        </p>
        <p className="tutorial-paragraph-content">
          3. Check if the password contains both uppercase and lowercase
          letters. Use the <code>isupper()</code> and <code>islower()</code>{" "}
          methods to determine if the password has at least one uppercase and
          one lowercase letter. If not, display a message indicating that the
          password is weak.
        </p>
        <p className="tutorial-paragraph-content">
          4. Check if the password contains at least one digit using the{" "}
          <code>isdigit()</code> method. If not, display a message indicating
          that the password is weak.
        </p>
        <p className="tutorial-paragraph-content">
          5. Check if the password contains at least one special character (such
          as @, #, $, etc.). Use a conditional statement and the <code>in</code>{" "}
          operator to check if any special character is present. If not, display
          a message indicating that the password is weak.
        </p>
        <p className="tutorial-paragraph-content">
          6. If the password passes all the checks, display a message indicating
          that the password is strong.
        </p>
        <h5 className="tutorial-sub-heading">Here's an example implementation of the project:</h5>
        <CodeSnippte
          NameOfClass={"python"}
          CodeContent={`# Step 1: Prompt the user to enter a password
password = input("Enter a password: ")

# Step 2: Check the length of the password
if len(password) < 8:
    print("Weak password. The password should have at least 8 characters.")
else:
    # Step 3: Check if the password contains both uppercase and lowercase letters 
    if not any(char.isupper() for char in password) or not any(char.islower() for char in password):
        print("Weak password. The password should have both uppercase and lowercase letters.")
    else:
        # Step 4: Check if the password contains at least one digit
        if not any(char.isdigit() for char in password):
            print("Weak password. The password should contain at least one digit.")
        else:
            # Step 5: Check if the password contains at least one special character
            special_characters = ['@', '#', '$', '%', '&']
            if not any(char in special_characters for char in password):
                print("Weak password. The password should contain at least one special character.")
            else:
                # Step 6: Password is strong
                print("Strong password. Good job!")`}
        />
        <p className="tutorial-paragraph-content">
          Feel free to modify and expand upon this project. You can add
          additional checks, improve the validation logic, or enhance the user
          experience. Experiment with different password inputs and observe the
          program's responses.
        </p>
        <p className="tutorial-paragraph-content">
          Once you've completed the project, run the program and test it with
          different passwords. Verify that the program correctly identifies weak
          and strong passwords based on the implemented checks.
        </p>
        <h4 className="tutorial-sub-heading">
          Enjoy the process of building your password strength checker and
          applying your Python skills to solve real-world challenges! 🔐💪💻
        </h4>
      </div>
    </div>
  );
};

export default Tutorial;
