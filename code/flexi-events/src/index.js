import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
  </React.StrictMode>
);

//profile testing

// app.get('/profile', (req, res) => {
//   sqlConn.query(`SELECT * FROM flexi_user WHERE username = '${req.session.username}';`, function (err, qres_user, fields) {
//       if (err) {
//           throw err;
//       }
//       else {
//           sqlConn.query(`SELECT * FROM event e, participates p WHERE e.id_event = p.event_id AND user_id = ${req.session.id_flexi_user} ORDER BY e.begin_date;`, function (err, qres_event, fields) {
//               if (err) {
//                   throw err;
//               }
//               else {
//                   res.render('pages/profile', {
//                       user_data: qres_user,
//                       event_data: qres_event
//                   });
//               }
//           })
//       }
//   })
// });


// signup testing

// app.get('/signup', (req, res) => {
//   res.render('pages/signup')
// });

// app.post('/signup', urlParser,
//   body('username').isLength({ min: 1, max: 45 }).withMessage('Username can not be empty!'),
//   body('email').isEmail().withMessage('Must be email!'),
//   body('password').notEmpty().withMessage('Password cannot be empty!'),
//   body('confpassword').notEmpty().custom((pwrd, { req }) => pwrd === req.body.password).withMessage('Both passwords must match!')
//   , (req, res) => {
//       var errs = validationResult(req);
//       if (req.body.signin) {
//           res.redirect('/signin');
//       } else {
//           if (!errs.isEmpty()) {
//               res.render('./pages/error', {
//                   error: "Something went wrong with signing up! Check all fields are correct."
//               })

//           } else {
//               bcrypt.hash(req.body.password, 10, (err, hash) => {
//                   sqlConn.query(`INSERT INTO flexi_user (username, email, password)VALUES ('${req.body.username}', '${req.body.email}', '${hash}');`);
//               })
//               res.redirect('/signin')
//           }
//       }
//   });



// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
