let staff = [];

let editIndex = -1;


// LOAD DATA

window.onload = function() {

  let saved = localStorage.getItem("staffData");

  if (saved) {
    staff = JSON.parse(saved);
  }

  showStaff();

};


// OPEN ADD FORM

function openAddForm() {

  editIndex = -1;

  document.getElementById("formTitle")
    .innerText = "Add Staff";

  clearForm();

  document.getElementById("modal")
    .style.display = "block";
}


// CLOSE FORM

function closeForm() {

  document.getElementById("modal")
    .style.display = "none";

}


// CLEAR FORM

function clearForm() {

  document.getElementById("staffId").value = "";

  document.getElementById("staffName").value = "";

  document.getElementById("staffDob").value = "";

  document.getElementById("staffPhoto").value = "";

  document.getElementById("dg").value = 0;

  document.getElementById("tv360").value = 0;

  document.getElementById("sim").value = 0;

  document.getElementById("gold").value = 0;

}


// SAVE STAFF

function saveStaff() {

  let id =
    document.getElementById("staffId").value;

  let name =
    document.getElementById("staffName").value;

  let dob =
    document.getElementById("staffDob").value;

  let dg =
    Number(document.getElementById("dg").value) || 0;

  let tv360 =
    Number(document.getElementById("tv360").value) || 0;

  let sim =
    Number(document.getElementById("sim").value) || 0;

  let gold =
    Number(document.getElementById("gold").value) || 0;


  if (!id || !name) {

    alert("សូមបញ្ចូល Staff ID និង Staff Name");

    return;
  }


  let file =
    document.getElementById("staffPhoto").files[0];


  if (file) {

    let reader = new FileReader();

    reader.onload = function(e) {

      saveData(
        id,
        name,
        dob,
        dg,
        tv360,
        sim,
        gold,
        e.target.result
      );

    };

    reader.readAsDataURL(file);

  } else {

    let oldPhoto = "";

    if (editIndex !== -1) {

      oldPhoto =
        staff[editIndex].photo || "";

    }

    saveData(
      id,
      name,
      dob,
      dg,
      tv360,
      sim,
      gold,
      oldPhoto
    );

  }

}


// SAVE DATA FUNCTION

function saveData(
  id,
  name,
  dob,
  dg,
  tv360,
  sim,
  gold,
  photo
) {

  let person = {

    id: id,

    name: name,

    dob: dob,

    photo: photo,

    dg: dg,

    tv360: tv360,

    sim: sim,

    gold: gold

  };


  if (editIndex === -1) {

    staff.push(person);

  } else {

    staff[editIndex] = person;

  }


  localStorage.setItem(
    "staffData",
    JSON.stringify(staff)
  );


  closeForm();

  showStaff();

}


// SHOW STAFF

function showStaff() {

  let list =
    document.getElementById("staffList");

  let search =
    document.getElementById("search")
      .value
      .toLowerCase();


  list.innerHTML = "";


  let filtered =
    staff.filter(person =>

      person.name
        .toLowerCase()
        .includes(search)

      ||

      person.id
        .toLowerCase()
        .includes(search)

    );


  filtered.forEach((person) => {

    let index =
      staff.indexOf(person);


    let total =

      Number(person.dg) +

      Number(person.tv360) +

      Number(person.sim) +

      Number(person.gold);


    let photo = person.photo

      ?

      person.photo

      :

      "https://via.placeholder.com/100";


    list.innerHTML += `

      <div class="staff-card">

        <div class="profile">

          <img src="${photo}">

          <div>

            <h2>
              ${person.name}
            </h2>

            <div>
              🆔 ${person.id}
            </div>

          </div>

        </div>


        <div class="info">

          🎂 DOB:
          ${person.dob || "-"}

        </div>


        <div class="sales">

          <div class="sale-box">

            📱 DG Super App

            <b>
              ${person.dg}
            </b>

          </div>


          <div class="sale-box">

            📺 TV360

            <b>
              ${person.tv360}
            </b>

          </div>


          <div class="sale-box">

            📞 SIM

            <b>
              ${person.sim}
            </b>

          </div>


          <div class="sale-box">

            🥇 Gold Account

            <b>
              ${person.gold}
            </b>

          </div>

        </div>


        <div class="total">

          TOTAL SALES:
          ${total}

        </div>


        <div class="actions">

          <button
            class="edit-btn"
            onclick="editStaff(${index})">

            ✏️ Edit

          </button>


          <button
            class="delete-btn"
            onclick="deleteStaff(${index})">

            🗑️ Delete

          </button>

        </div>

      </div>

    `;

  });


  updateDashboard();

}


// EDIT STAFF

function editStaff(index) {

  let person = staff[index];

  editIndex = index;


  document.getElementById("formTitle")
    .innerText = "Edit Staff";


  document.getElementById("staffId")
    .value = person.id;


  document.getElementById("staffName")
    .value = person.name;


  document.getElementById("staffDob")
    .value = person.dob;


  document.getElementById("dg")
    .value = person.dg;


  document.getElementById("tv360")
    .value = person.tv360;


  document.getElementById("sim")
    .value = person.sim;


  document.getElementById("gold")
    .value = person.gold;


  document.getElementById("modal")
    .style.display = "block";

}


// DELETE STAFF

function deleteStaff(index) {

  let person = staff[index];


  let confirmDelete = confirm(

    "តើអ្នកពិតជាចង់លុប " +

    person.name +

    " មែនទេ?"

  );


  if (!confirmDelete) {

    return;

  }


  staff.splice(index, 1);


  localStorage.setItem(

    "staffData",

    JSON.stringify(staff)

  );


  showStaff();

}


// DASHBOARD

function updateDashboard() {

  document.getElementById("totalStaff")
    .innerText = staff.length;


  let total = 0;


  staff.forEach(person => {

    total +=

      Number(person.dg) +

      Number(person.tv360) +

      Number(person.sim) +

      Number(person.gold);

  });


  document.getElementById("totalSales")
    .innerText = total;

}