const express = require("express");
const fs = require("fs");

const userData = require("./MOCK_DATA.json");
const app = express();

const port = 8000;

//---------------------------------------------------   MIDDLEWARE
app.use(express.urlencoded({ extended: false }));
// ------------------------------------------------  SERVER

app.get("/api/users", (req, res) => {
  res.setHeader("X-MyName", "Jahid"); //SSR
  // recommended  "X" for Custom Headers
  console.log(req.headers); //CSR
  res.json(userData);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const reqId = parseInt(req.params.id);
    const user = userData.find((user) => user.id === reqId);
    return res.json(user);
  })
  .patch((req, res) => {
    const userId = parseInt(req.params.id);
    const user = userData.find((user) => user.id === userId);

    const updatedFields = req.body;
    Object.assign(user, updatedFields); // Update the user object

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(userData), (err) => {
      return res.json({
        status: "User updated successfully",
        updatedUser: user,
      });
    });
  })
  .delete((req, res) => {
    const deleteId = parseInt(req.params.id);
    const userDeleted = userData.filter((user) => user.id !== deleteId);

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(userDeleted), (error) => {
      return res.json({ status: "Successfully", userDeleted });
    });
  });

app.post("/api/users/", (req, res) => {
  const upComingUser = req.body;
  userData.push({ id: userData.length + 1, ...upComingUser });
  fs.writeFile(
    "./MOCK_DATA.json",
    JSON.stringify(userData),
    (error, response) => {
      return res.json({ status: "Pending", id: userData.length });
    }
  );
});

//HTML Render SSR
app.get("/users", (req, res) => {
  const html = ` <ul style="color:red";>
    ${userData
      ?.map((user) => ` <li> ${user.id} : ${user.first_name} </li>`)
      .join("")}
  </ul>`;
  res.send(html);
});

app.listen(port, () =>
  console.log(`Server Running on :  ${port}  => http://localhost:8000/`)
);

/**BASIC Routes **/
// app.get("/api/users/:id", (req, res) => {
//   const reqId = parseInt(req.params.id);
//   const user = userData.find((user) => user.id === reqId);
//   return res.json(user);
// });

// app.post("/api/users/", (req, res) => {
//   return res.json({ status: "Pending" });
// });
// app.patch("/api/users/:id", (req, res) => {
//   return res.json({ status: "Pending Patch" });
// });
// app.delete("/api/users/:id", (req, res) => {
//   return res.json({ status: "Pending Patch" });
// });
