// NOC 2021 Data - National Occupational Classification
// Source: Employment and Social Development Canada

export interface NOCCode {
    code: string;
    teer: 0 | 1 | 2 | 3 | 4 | 5;
    title: string;
    alternativeTitles: string[];
    description: string;
    examples: string[];
}

export const nocDatabase: NOCCode[] = [
    // TEER 0 - Management Occupations
    {
        code: "00010",
        teer: 0,
        title: "Legislators",
        alternativeTitles: ["Member of Parliament", "Senator", "MLA", "Councillor"],
        description: "Legislators participate in the activities of a federal, provincial, territorial or local government legislative body or executive council.",
        examples: ["Members of Parliament", "Senators", "Members of provincial legislatures", "Municipal councillors"]
    },
    {
        code: "10010",
        teer: 0,
        title: "Financial managers",
        alternativeTitles: ["Finance Director", "CFO", "Controller", "Treasury Manager"],
        description: "Financial managers plan, organize, direct, control and evaluate the operation of financial and accounting departments.",
        examples: ["Chief financial officer", "Controller", "Finance director", "Treasury manager"]
    },
    {
        code: "20010",
        teer: 0,
        title: "Engineering managers",
        alternativeTitles: ["Engineering Director", "VP Engineering", "Technical Director"],
        description: "Engineering managers plan, organize, direct, control and evaluate the activities of an engineering department.",
        examples: ["Engineering director", "Engineering manager", "Plant engineering manager"]
    },

    // TEER 1 - Professional Occupations
    {
        code: "21231",
        teer: 1,
        title: "Software engineers and designers",
        alternativeTitles: ["Software Developer", "Software Architect", "Application Developer", "Full Stack Developer", "Backend Developer", "Frontend Developer", "DevOps Engineer"],
        description: "Software engineers and designers research, design, evaluate, integrate, and maintain software applications, technical environments, operating systems, embedded software, information warehouses, and telecommunications software.",
        examples: ["Software engineer", "Software developer", "Software architect", "Application developer", "DevOps engineer", "Full-stack developer"]
    },
    {
        code: "21211",
        teer: 1,
        title: "Data scientists",
        alternativeTitles: ["Data Analyst", "Machine Learning Engineer", "AI Engineer", "Data Engineer", "ML Scientist"],
        description: "Data scientists identify, gather and analyze large volumes of structured and unstructured data to develop solutions to business problems and support evidence-based decision making.",
        examples: ["Data scientist", "Machine learning engineer", "AI specialist", "Data analyst", "Business intelligence analyst"]
    },
    {
        code: "21222",
        teer: 1,
        title: "Information systems specialists",
        alternativeTitles: ["IT Specialist", "Systems Analyst", "IT Consultant", "Business Analyst"],
        description: "Information systems specialists design, develop, and implement information systems business solutions.",
        examples: ["Business systems analyst", "Information systems analyst", "IT consultant", "Systems analyst"]
    },
    {
        code: "21221",
        teer: 1,
        title: "Database analysts and data administrators",
        alternativeTitles: ["DBA", "Database Developer", "Data Architect", "SQL Developer"],
        description: "Database analysts and data administrators design, develop and administer data management solutions.",
        examples: ["Database analyst", "Database administrator", "Data architect", "Database developer"]
    },
    {
        code: "21232",
        teer: 1,
        title: "Software developers and programmers",
        alternativeTitles: ["Programmer", "Coder", "Web Developer", "App Developer", "Java Developer", "Python Developer"],
        description: "Software developers and programmers write, modify, integrate, test and maintain computer code for software applications.",
        examples: ["Application programmer", "Computer programmer", "Software programmer", "Web developer"]
    },
    {
        code: "21233",
        teer: 1,
        title: "Web designers",
        alternativeTitles: ["UI Designer", "UX Designer", "Frontend Designer", "Web Developer"],
        description: "Web designers design and develop websites using a variety of software applications and tools.",
        examples: ["Web designer", "UI/UX designer", "Front-end developer", "Web developer"]
    },
    {
        code: "21234",
        teer: 1,
        title: "Web developers and programmers",
        alternativeTitles: ["Web Programmer", "Frontend Developer", "JavaScript Developer", "React Developer"],
        description: "Web developers and programmers write, modify, integrate and test code for web applications.",
        examples: ["Web programmer", "Front-end web developer", "Full-stack web developer"]
    },
    {
        code: "21311",
        teer: 1,
        title: "Computer engineers (except software engineers)",
        alternativeTitles: ["Hardware Engineer", "Systems Engineer", "Network Engineer", "Embedded Systems Engineer"],
        description: "Computer engineers research, plan, design, develop, modify, evaluate and integrate computer and telecommunications hardware.",
        examples: ["Computer engineer", "Hardware engineer", "Network engineer", "Systems designer"]
    },
    {
        code: "41301",
        teer: 1,
        title: "Economists and economic policy researchers",
        alternativeTitles: ["Economic Analyst", "Policy Analyst", "Research Economist"],
        description: "Economists and economic policy researchers conduct research, monitor data, analyze information and prepare reports.",
        examples: ["Economist", "Economic analyst", "Policy analyst", "Research economist"]
    },
    {
        code: "31100",
        teer: 1,
        title: "Specialists in clinical and laboratory medicine",
        alternativeTitles: ["Doctor", "Physician", "Specialist", "Surgeon"],
        description: "Specialists in clinical and laboratory medicine diagnose and treat diseases and physiological or psychiatric disorders.",
        examples: ["Cardiologist", "Dermatologist", "Psychiatrist", "Surgeon"]
    },
    {
        code: "31101",
        teer: 1,
        title: "Specialists in surgery",
        alternativeTitles: ["Surgeon", "Orthopedic Surgeon", "Cardiac Surgeon"],
        description: "Specialists in surgery perform and supervise surgical procedures.",
        examples: ["General surgeon", "Orthopedic surgeon", "Cardiac surgeon", "Neurosurgeon"]
    },
    {
        code: "31111",
        teer: 1,
        title: "General practitioners and family physicians",
        alternativeTitles: ["Family Doctor", "GP", "Primary Care Physician"],
        description: "General practitioners and family physicians diagnose and treat the diseases, physiological disorders and injuries of patients.",
        examples: ["Family physician", "General practitioner", "Primary care physician"]
    },
    {
        code: "41201",
        teer: 1,
        title: "Lawyers",
        alternativeTitles: ["Attorney", "Solicitor", "Barrister", "Legal Counsel"],
        description: "Lawyers advise clients on legal matters, represent clients before courts and administrative agencies.",
        examples: ["Lawyer", "Attorney", "Barrister", "Solicitor", "Legal counsel"]
    },
    {
        code: "11102",
        teer: 1,
        title: "Financial advisors",
        alternativeTitles: ["Financial Planner", "Investment Advisor", "Wealth Manager"],
        description: "Financial advisors develop personal financial plans for clients and provide financial advice.",
        examples: ["Financial advisor", "Financial planner", "Investment advisor", "Wealth manager"]
    },
    {
        code: "21110",
        teer: 1,
        title: "Biologists and related scientists",
        alternativeTitles: ["Biologist", "Research Scientist", "Microbiologist", "Biochemist"],
        description: "Biologists and related scientists conduct basic and applied research to extend knowledge of living organisms.",
        examples: ["Biologist", "Microbiologist", "Biochemist", "Geneticist"]
    },
    {
        code: "21300",
        teer: 1,
        title: "Civil engineers",
        alternativeTitles: ["Structural Engineer", "Transportation Engineer", "Environmental Engineer"],
        description: "Civil engineers plan, design and develop projects for the construction or repair of buildings, highways, bridges and other structures.",
        examples: ["Civil engineer", "Structural engineer", "Transportation engineer", "Municipal engineer"]
    },
    {
        code: "21301",
        teer: 1,
        title: "Mechanical engineers",
        alternativeTitles: ["Design Engineer", "HVAC Engineer", "Manufacturing Engineer"],
        description: "Mechanical engineers research, design and develop machinery and systems for heating, ventilation and air conditioning.",
        examples: ["Mechanical engineer", "Design engineer", "HVAC engineer", "Manufacturing engineer"]
    },
    {
        code: "21310",
        teer: 1,
        title: "Electrical and electronics engineers",
        alternativeTitles: ["Electronics Engineer", "Power Systems Engineer", "Control Engineer"],
        description: "Electrical and electronics engineers design, plan, research, evaluate and test electrical and electronic equipment.",
        examples: ["Electrical engineer", "Electronics engineer", "Power systems engineer"]
    },
    {
        code: "41100",
        teer: 1,
        title: "Judges",
        alternativeTitles: ["Justice", "Magistrate"],
        description: "Judges adjudicate civil and criminal cases and administer justice in courts of law.",
        examples: ["Judge", "Justice", "Magistrate"]
    },

    // TEER 2 - Technical/Skilled Trades
    {
        code: "22220",
        teer: 2,
        title: "Computer network and web technicians",
        alternativeTitles: ["Network Technician", "IT Support", "Help Desk", "Technical Support"],
        description: "Computer network technicians establish, operate, maintain and co-ordinate the use of local and wide area networks.",
        examples: ["Network technician", "Web technician", "IT support technician", "Help desk technician"]
    },
    {
        code: "22221",
        teer: 2,
        title: "User support technicians",
        alternativeTitles: ["IT Support Specialist", "Desktop Support", "Technical Support Analyst"],
        description: "User support technicians provide first-line technical support to computer users experiencing difficulties.",
        examples: ["Technical support analyst", "Help desk technician", "IT support specialist"]
    },
    {
        code: "22222",
        teer: 2,
        title: "Information systems testing technicians",
        alternativeTitles: ["QA Tester", "Software Tester", "Test Analyst", "QA Analyst"],
        description: "Information systems testing technicians execute test plans to evaluate the performance of software applications.",
        examples: ["QA analyst", "Software tester", "Test technician", "Quality assurance tester"]
    },
    {
        code: "32120",
        teer: 2,
        title: "Registered nurses and registered psychiatric nurses",
        alternativeTitles: ["RN", "Nurse", "Staff Nurse", "Clinical Nurse"],
        description: "Registered nurses and registered psychiatric nurses provide nursing care to patients.",
        examples: ["Registered nurse", "Operating room nurse", "Emergency room nurse", "Psychiatric nurse"]
    },
    {
        code: "22300",
        teer: 2,
        title: "Civil engineering technologists and technicians",
        alternativeTitles: ["Civil Technician", "Construction Technician", "Survey Technician"],
        description: "Civil engineering technologists and technicians provide technical support to civil engineers.",
        examples: ["Civil engineering technologist", "Construction technician", "Structural technician"]
    },
    {
        code: "22301",
        teer: 2,
        title: "Mechanical engineering technologists and technicians",
        alternativeTitles: ["Mechanical Technician", "HVAC Technician", "Maintenance Technician"],
        description: "Mechanical engineering technologists and technicians provide technical support to mechanical engineers.",
        examples: ["Mechanical engineering technologist", "HVAC technician", "Tool designer"]
    },
    {
        code: "22310",
        teer: 2,
        title: "Electrical and electronics engineering technologists and technicians",
        alternativeTitles: ["Electronics Technician", "Electrical Technician", "Control Technician"],
        description: "Electrical and electronics engineering technologists and technicians provide technical support.",
        examples: ["Electrical technologist", "Electronics technician", "Instrumentation technician"]
    },
    {
        code: "62020",
        teer: 2,
        title: "Retail and wholesale buyers",
        alternativeTitles: ["Buyer", "Purchasing Agent", "Procurement Specialist"],
        description: "Retail and wholesale buyers buy merchandise for resale by retail or wholesale establishments.",
        examples: ["Buyer", "Merchandise buyer", "Retail buyer", "Wholesale buyer"]
    },

    // TEER 3 - Intermediate Occupations
    {
        code: "33102",
        teer: 3,
        title: "Nurse aides, orderlies and patient service associates",
        alternativeTitles: ["Nursing Assistant", "Patient Care Aide", "Health Care Aide"],
        description: "Nurse aides, orderlies and patient service associates assist nurses, hospital staff and physicians.",
        examples: ["Nurse aide", "Orderly", "Patient care aide", "Health care aide"]
    },
    {
        code: "43100",
        teer: 3,
        title: "Elementary and secondary school teacher assistants",
        alternativeTitles: ["Teaching Assistant", "Educational Assistant", "Classroom Aide"],
        description: "Elementary and secondary school teacher assistants assist teachers and counsellors with teaching and non-instructional tasks.",
        examples: ["Teacher assistant", "Educational assistant", "Classroom aide"]
    },
    {
        code: "63200",
        teer: 3,
        title: "Cooks",
        alternativeTitles: ["Chef", "Line Cook", "Prep Cook", "Short Order Cook"],
        description: "Cooks prepare and cook a wide variety of foods.",
        examples: ["Cook", "Line cook", "Prep cook", "Short order cook"]
    },
    {
        code: "72010",
        teer: 3,
        title: "Contractors and supervisors, electrical trades",
        alternativeTitles: ["Electrical Supervisor", "Electrical Contractor", "Foreman"],
        description: "Contractors and supervisors of electrical trades supervise and co-ordinate the activities of workers.",
        examples: ["Electrical contractor", "Electrical supervisor", "Foreman"]
    },
    {
        code: "72020",
        teer: 3,
        title: "Contractors and supervisors, pipefitting trades",
        alternativeTitles: ["Plumbing Supervisor", "Pipefitting Contractor", "Foreman"],
        description: "Contractors and supervisors of pipefitting trades supervise and co-ordinate the activities of workers.",
        examples: ["Plumbing contractor", "Pipefitting supervisor", "Foreman"]
    },

    // TEER 4 - Entry Level / Semi-skilled
    {
        code: "64100",
        teer: 4,
        title: "Retail salespersons and visual merchandisers",
        alternativeTitles: ["Sales Associate", "Store Clerk", "Retail Clerk", "Sales Rep"],
        description: "Retail salespersons and visual merchandisers sell or rent merchandise in stores and other retail businesses.",
        examples: ["Sales associate", "Store clerk", "Retail salesperson", "Visual merchandiser"]
    },
    {
        code: "65200",
        teer: 4,
        title: "Food and beverage servers",
        alternativeTitles: ["Waiter", "Waitress", "Server", "Food Server"],
        description: "Food and beverage servers take orders and serve food and beverages in dining establishments.",
        examples: ["Waiter", "Waitress", "Food server", "Banquet server"]
    },
    {
        code: "65201",
        teer: 4,
        title: "Food counter attendants, kitchen helpers and related support occupations",
        alternativeTitles: ["Kitchen Helper", "Dishwasher", "Food Prep", "Counter Attendant"],
        description: "Food counter attendants and kitchen helpers prepare, heat and finish cooking simple food items.",
        examples: ["Food counter attendant", "Kitchen helper", "Dishwasher", "Food preparer"]
    },
    {
        code: "74100",
        teer: 4,
        title: "Home building and renovation managers",
        alternativeTitles: ["Construction Manager", "Renovation Manager", "Site Manager"],
        description: "Home building and renovation managers own and operate a home building or renovation company.",
        examples: ["Home builder manager", "Renovation manager", "Construction manager"]
    },
    {
        code: "75110",
        teer: 4,
        title: "Construction trades helpers and labourers",
        alternativeTitles: ["Construction Worker", "Labourer", "General Labour", "Helper"],
        description: "Construction trades helpers and labourers assist skilled tradespersons and perform general construction tasks.",
        examples: ["Construction labourer", "Construction helper", "Trades helper"]
    },

    // TEER 5 - Labour Occupations
    {
        code: "85100",
        teer: 5,
        title: "Livestock labourers",
        alternativeTitles: ["Farm Worker", "Ranch Hand", "Agricultural Worker"],
        description: "Livestock labourers do routine tasks in caring for livestock.",
        examples: ["Livestock labourer", "Farm labourer", "Ranch hand"]
    },
    {
        code: "85101",
        teer: 5,
        title: "Harvesting labourers",
        alternativeTitles: ["Farm Labourer", "Picker", "Harvester", "Agricultural Labourer"],
        description: "Harvesting labourers assist with harvesting, sorting and packing crops.",
        examples: ["Harvesting labourer", "Farm labourer", "Fruit picker"]
    },
    {
        code: "86100",
        teer: 5,
        title: "Landscaping and grounds maintenance labourers",
        alternativeTitles: ["Landscaper", "Groundskeeper", "Lawn Care Worker"],
        description: "Landscaping and grounds maintenance labourers perform routine landscaping and grounds maintenance work.",
        examples: ["Landscaping labourer", "Groundskeeper", "Lawn care worker"]
    },
    {
        code: "95100",
        teer: 5,
        title: "Labourers in food and beverage processing",
        alternativeTitles: ["Food Processing Worker", "Production Worker", "Factory Worker"],
        description: "Labourers in food and beverage processing perform routine tasks in food and beverage processing.",
        examples: ["Food processing labourer", "Meat packer", "Beverage processing worker"]
    }
];

// TEER Category descriptions
export const teerDescriptions: Record<number, { label: string; description: string; color: string }> = {
    0: {
        label: "TEER 0",
        description: "Management occupations",
        color: "bg-purple-500"
    },
    1: {
        label: "TEER 1",
        description: "Occupations requiring a university degree",
        color: "bg-blue-500"
    },
    2: {
        label: "TEER 2",
        description: "Occupations requiring a college diploma or apprenticeship (2+ years)",
        color: "bg-green-500"
    },
    3: {
        label: "TEER 3",
        description: "Occupations requiring a college diploma or apprenticeship (less than 2 years)",
        color: "bg-yellow-500"
    },
    4: {
        label: "TEER 4",
        description: "Occupations requiring a high school diploma",
        color: "bg-orange-500"
    },
    5: {
        label: "TEER 5",
        description: "Occupations requiring short-term work demonstration",
        color: "bg-red-500"
    }
};

export default nocDatabase;
