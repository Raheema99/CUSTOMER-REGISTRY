function displayForm(showElementClass) {
  // Get all elements that are part of your "form" sections
  const formSections = document.querySelectorAll(".new, .list, .edit, .delete");

  // Hide all form sections first
  formSections.forEach((section) => {
    section.style.display = "none";
  });

  // Then, show only the desired section
  const elementToShow = document.querySelector(`.${showElementClass}`);
  if (elementToShow) {
    elementToShow.style.display = "block";
  }
}

const createCustomer = (e) => {
  e.preventDefault();

  fetch("http://localhost:3000/add-customer", {
    method: "Post",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      name: document.querySelector("#create-form input[name=name]").value,
      address: document.querySelector("#create-form input[name=address]").value,
      company: document.querySelector("#create-form input[name=company]").value,
    }),
  })
    .then(() => alert("Customer added successfully"))
    .catch((err) => console.log(err));
};

document
  .getElementById("create-form")
  .addEventListener("submit", createCustomer);

// Get customers

const getCustomers = () => {
  const customerSection = document.getElementById("data");
  customerSection.innerHTML = "";
  fetch("http://localhost:3000/customers")
    .then((res) => res.json())
    .then((data) => {
      data?.map((customer) => {
        customerSection.innerHTML += `
       <div class="row">
					<h2 class="col-2">${customer.customer_id}</h2>
					<h2 class="col-4">${customer.name}</h2>
					<h2 class="col-3">${customer.address}</h2>
					<h2 class="col-3">${customer.company}</h2>
				</div>
				<hr>
       `;
      });
    })
    .catch((err) => console.log(err));
};

document.getElementById("list").addEventListener("click", getCustomers);

// Update
const updateCustomer = (e) => {
  e.preventDefault();
  fetch("http://localhost:3000/update", {
    method: "Put",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      newName: document.querySelector("#update-form input[name=updatedName]")
        .value,
      id: document.querySelector("#update-form input[name=id]").value,
    }),
  })
    .then(() => alert("Name updated successfully"))
    .catch((err) => console.log(err));
};
document
  .getElementById("update-form")
  .addEventListener("submit", updateCustomer);

// Delete

const deleteCustomer = (e) => {
  e.preventDefault();
  fetch("http://localhost:3000/delete", {
    method: "Delete",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      id: document.querySelector("#delete-form input[name=id]").value,
    }),
  })
    .then(() => alert("Customer deleted successfully!"))
    .catch((err) => console.log(err));
};

document
  .getElementById("delete-form")
  .addEventListener("submit", deleteCustomer);
