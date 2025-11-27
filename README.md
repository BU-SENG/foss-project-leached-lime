
---

# 🏫 Hostel Complaint Management System 

A **Hostel Complaint Management System** designed to streamline how students track and respond to issues within a hostel environment 
The system allows students to log complaints, track progress, and receive updates — while admins can efficiently manage, assign, and resolve them. Also allows admins see said complaints.

---

## 🚀 Features!

### 👨‍🎓 **For Students:**

* Submit complaints easily through an online form.
* View the status of each submitted complaints.
* Receive notifications when a complaint is resolved.
* Edit  or delete pending complaints.

### 🧑‍💼 **For Administrators:**

* View all complaints with filtering and sorting optionsv.
* Update the status of complaints (Pending, In  Progress, Resolved).
* Assign complaints to assigned staff.
* Manage student accounts and data.

---

## 🛠️ Tech Stack

| Layer           | Technology             |
| :-------------- | :--------------------  |
| Frontend        | React.js               |
| Backend         | Node.js / Express.js   |
| Database        | MySQL                  |
| Authentication  | JWT (JSON Web Tokens)  |
| Styling         | Tailwind CSS           |
| Version Control | Git & GitHub           |

---

## 🧩 System Architecture

```text
Frontend ( React )
      ↓
Backend API ( Express )
      ↓
Database ( MySQL )
```

---

## ⚙️ Installation Guide
Follow these steps to run the project locally :

### 1️⃣ Clone the repository

```bash
git clone https://github.com/BU-SENG/foss-project-leached-lime.git
cd foss-project-leached-lime
```

### 2️⃣ Install dependencies

For both frontend and backend:

```bash
# For backend
cd backend
npm install

# For frontend
cd ../frontend
npm install
```

### 3️⃣ Setup your database

* Create a MySQL database (e.g., `datbase.sqlite`).
* Import the SQL schema (if provided) or create necessary tables manually.
* Update your `.env` file with the following:

```env
DB_HOST=localhost
DB_USER=root
DB_PASS=yourpassword
DB_NAME=hostel_complaints_db
JWT_SECRET=your_jwt_secret
PORT=5000
(For Production Only)
```

### 4️⃣ Run the app

```bash
# Start backend = 
cd backend
npm start

# Start frontend
cd ../frontend
npm run dev
```

Then visit **[http://localhost:5173](http://localhost:5173)** in your browser.

---

## 📸Screenshots


| Admin Dashboard                        | 
<img width="1919" height="875" alt="image" src="https://github.com/user-attachments/assets/259738bd-879c-4601-bddd-c6d092f43754" />
| Student Dashboard                        |
<img width="1846" height="884" alt="image" src="https://github.com/user-attachments/assets/b5b08da4-e65c-47ed-94ad-0f70fca3f64e" />

---

## 🧠 Future Improvements

* Add email notifications for complaint updates .
* Add analytics dashboard for hostel administrators .
* Integrate staff assignment and reporting system .
* Mobile-friendly UI/UX improvements .

---

## 👨‍💻 Contributors

* **Ogor Daniel Nkemakolam Ebiye** – *Project coordinator*
* **Ogungbade Shalom** – *Lead Developer & Designer*
* **Okechukwu Chiemerie Victor** – *Requirement Engineer*
* **Okafor Kosisoichukwu** - *Second Requiremnt Engineer*
* **Obogho Ewomazino Karen**
* **Obiazikwor favour EKENEDILICHUKWU*UI/UX DESINGER*
---

## 📜 License

This project is licensed under the **MIT License** – see the [LICENSE](./LICENSE) file for details.

---

## 💬 Feedback

If you have any suggestions, feel free to open an issue or create a pull request.
⭐ Don’t forget to **star the repo** if you like it!!

---


