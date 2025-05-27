const details = {
  name: {
    first: "Darshan",
    last: "Wijayakumar",
  },
  dob: new Date("2001-07-27"),
  age: (() => {
    const currentDate = new Date();
    return currentDate.getFullYear() - details.dob.getFullYear();
  })(),
  nationality: "Sri Lankan",
  Languages: ["English", "Sinhala", "Tamil"],
  description:
    "I am currently pursuing a Bachelor of Software Engineering (Hons.) at the University of KIU. My studies focus on areas such as Artificial Intelligence, Data Structures, Web and Mobile Development, and Database Management. I have worked on both self-driven and group projects, gaining valuable experience in applying my skills to real-world problems.",
  email: "darshanwijayakumar0@gmail.com",
  phone: "+94 764 545 369",
  location: "N0:218/14, Mahawatta, Opatha, Kotugoda, Sri Lanka",
  social: {
    linkedIn: "https://www.linkedin.com/in/darshan-wijayakumar-93b08a308",
    github: "https://github.com/Wijayakumar-Darshan",
  },
  resume: "https://resume.com/wijayakumar-darshan",
  skills: ["JavaScript", "React", "Node.js", "MongoDB"],
};

export default details;
