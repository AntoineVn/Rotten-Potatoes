import React, { useState } from "react";
import ReactDOM from "react-dom";
import PropTypes from "prop-types";


async function editUser(user_id) {

  var raw = JSON.stringify({
    "role": "Admin"
  });
  const user = await fetch('http://localhost:5000/users/'+ user_id, {
    method: 'PATCH',
    header: {
      "Content-Type": "application/json",
      /* Authorization: "Bearer " + localStorage.access_token, */
    },
    body: raw
  });
  console.log( user_id +" a été changé par ", raw);
}

const Modal = ({ isShowing, hide, title, user }) =>
  isShowing
    ? ReactDOM.createPortal(
        <>
          <div className="modal-overlay">
            <div className="modal-wrapper">
              <div className="modal">
                <div className="modal-header">
                  <h4>{title}</h4>
                  <div>
                    <form onSubmit={editUser(user.id)}>
                      <div className="form-group">
                        Change the role of the user to Admin?   
                        <input type="submit" value="submit" />
                      </div>
                    </form>
                  </div>
                  <button
                    type="button"
                    className="modal-close-button"
                    onClick={hide}
                  >
                    <span>&times;</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <style jsx="true">{`
            .modal-overlay {
              position: fixed;
              top: 0;
              left: 0;
              width: 100vw;
              height: 100vh;
              z-index: 1040;
              background-color: rgba(0, 0, 0, 0.5);
            }

            .modal-wrapper {
              position: fixed;
              top: 0;
              left: 0;
              z-index: 1050;
              width: 100%;
              height: 100%;
              overflow-x: hidden;
              overflow-y: auto;
              outline: 0;
              display: flex;
              align-items: center;
            }

            .modal {
              z-index: 100;
              background: #fff;
              position: relative;
              margin: auto;
              border-radius: 5px;
              max-width: 500px;
              width: 80%;
              padding: 1rem;
            }

            .modal-header {
              display: flex;
              justify-content: space-between;
              align-items: center;
            }

            .modal-close-button {
              font-size: 1.4rem;
              font-weight: 700;
              color: #000;
              cursor: pointer;
              border: none;
              background: transparent;
            }

            label {
              color: #555;
            }
            .form-group {
              margin-top: 10px;
              color: #555;
            }
            
            button.modal-toggle,
            input[type="submit"] {
              background-color: turquoise;
              cursor: pointer;
              padding: 1rem 2rem;
              text-transform: uppercase;
              border: none;
            }
    
            input[type="text"],
            input[type="password"],
            input[type="email"] {
              box-sizing: border-box;
              width: 100%;
              padding: 0.5rem 0.7rem;
            }
          `}</style>
        </>,
        document.body
      )
    : null;

Modal.propTypes = {
  isShowing: PropTypes.bool.isRequired,
  hide: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
};

export default Modal;
