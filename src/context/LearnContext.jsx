import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuth } from './AuthContext';

const LearnContext = createContext();

export const useLearn = () => useContext(LearnContext);

// Predefined Quiz bank matching the subjects
export const MCQ_BANK = {
  Python: [
    {
      question: "Which of the following is a mutable data type in Python?",
      options: ["List", "Tuple", "String", "Integer"],
      correct: 0
    },
    {
      question: "What is the correct syntax to output 'Hello World' in Python?",
      options: ["print('Hello World')", "echo('Hello World')", "printf('Hello World')", "System.out.print('Hello World')"],
      correct: 0
    },
    {
      question: "How do you start a comment block in Python?",
      options: ["//", "/*", "#", "<!--"],
      correct: 2
    },
    {
      question: "Which keyword is used to define a function in Python?",
      options: ["func", "def", "function", "define"],
      correct: 1
    },
    {
      question: "What does the 'len()' function do in Python?",
      options: ["Calculates the length of an object", "Increments a value", "Converts a string to lowercase", "Generates a list of numbers"],
      correct: 0
    }
  ],
  Java: [
    {
      question: "Which keyword is used to inherit a class in Java?",
      options: ["implements", "inherits", "extends", "exports"],
      correct: 2
    },
    {
      question: "What is the entry point method signature in every Java application?",
      options: ["public void main(String args[])", "public static void main(String[] args)", "static void main(String[] args)", "public static int main(String[] args)"],
      correct: 1
    },
    {
      question: "Which data type is used to create a variable that should store text in Java?",
      options: ["txt", "String", "string", "Char"],
      correct: 1
    },
    {
      question: "Which of these is NOT a primitive data type in Java?",
      options: ["int", "double", "boolean", "String"],
      correct: 3
    },
    {
      question: "How do you declare an array in Java?",
      options: ["int[] arr = new int[5]", "int arr = new int[5]", "int arr[] = int[5]", "array arr = new int[5]"],
      correct: 0
    }
  ],
  AI: [
    {
      question: "Who is known as the father of Artificial Intelligence?",
      options: ["Alan Turing", "John McCarthy", "Elon Musk", "Ada Lovelace"],
      correct: 1
    },
    {
      question: "Which field of AI focuses on enabling machines to understand and process human languages?",
      options: ["Computer Vision", "Reinforcement Learning", "Natural Language Processing (NLP)", "Expert Systems"],
      correct: 2
    },
    {
      question: "What does 'GPT' stand for in Generative AI?",
      options: ["General Purpose Transformer", "Generative Pre-trained Transformer", "Global Predictive Technology", "Graphical Program Transfer"],
      correct: 1
    },
    {
      question: "Which algorithm uses a reward and punishment system to train models?",
      options: ["Supervised Learning", "Unsupervised Learning", "Reinforcement Learning", "Deep Learning"],
      correct: 2
    },
    {
      question: "What is a neural network model trying to emulate?",
      options: ["The biological human brain", "A computer motherboard", "A database schema", "Internet web crawling routing"],
      correct: 0
    }
  ],
  DBMS: [
    {
      question: "What does DBMS stand for?",
      options: ["Data Binary Management System", "Database Management System", "Digital Backup Memory Service", "Document Base Mapping Structure"],
      correct: 1
    },
    {
      question: "Which SQL clause is used to filter records in a database query?",
      options: ["WHERE", "HAVING", "GROUP BY", "ORDER BY"],
      correct: 0
    },
    {
      question: "What type of key uniquely identifies a record in a database table?",
      options: ["Foreign Key", "Candidate Key", "Primary Key", "Secondary Key"],
      correct: 2
    },
    {
      question: "What does the 'ACID' property stand for in databases?",
      options: ["Atomicity, Consistency, Isolation, Durability", "Authentication, Encryption, Access, Control", "Accuracy, Complexity, Integrity, Design", "Allocation, Concurrency, Indexing, Delivery"],
      correct: 0
    },
    {
      question: "Which SQL command is used to remove a table's structure and all data from a database?",
      options: ["DELETE TABLE", "DROP TABLE", "REMOVE TABLE", "TRUNCATE TABLE"],
      correct: 1
    }
  ],
  "Data Structures": [
    {
      question: "Which data structure operates on a Last In First Out (LIFO) basis?",
      options: ["Queue", "Stack", "Linked List", "Tree"],
      correct: 1
    },
    {
      question: "What is the average time complexity of searching in a balanced Binary Search Tree (BST)?",
      options: ["O(1)", "O(n)", "O(log n)", "O(n log n)"],
      correct: 2
    },
    {
      question: "Which data structure uses pointers to connect nodes where each node contains data and a reference to the next node?",
      options: ["Array", "Stack", "Linked List", "Hash Table"],
      correct: 2
    },
    {
      question: "What data structure is typically used to implement recursion?",
      options: ["Stack", "Queue", "Heap", "Graph"],
      correct: 0
    },
    {
      question: "Which of the following is a non-linear data structure?",
      options: ["Array", "Linked List", "Queue", "Graph"],
      correct: 3
    }
  ]
};

// Curated educational answers for the AI Assistant
export const AI_KNOWLEDGE_BASE = {
  ai: `### 🤖 Artificial Intelligence (AI) Explanation

**Artificial Intelligence** refers to the simulation of human intelligence in machines that are programmed to think, learn, and act like humans. The term may also be applied to any machine that exhibits traits associated with a human mind such as learning and problem-solving.

#### Key Subfields:
1. **Machine Learning (ML)**: Algorithms that learn from historical data.
2. **Deep Learning (DL)**: Neural networks modeled loosely after the human brain.
3. **Natural Language Processing (NLP)**: Interacting with computers using natural language.
4. **Computer Vision**: Allowing computers to interpret visual data from the world.

#### Real-World Applications:
* **Healthcare**: Diagnosing diseases from medical scans.
* **Autonomous Vehicles**: Self-driving cars navigating traffic.
* **E-Commerce**: Recommendation engines (like Netflix or Amazon).`,

  ml: `### 🧠 Machine Learning (ML) Explanation

**Machine Learning** is a branch of Artificial Intelligence (AI) and computer science which focuses on the use of data and algorithms to imitate the way that humans learn, gradually improving its accuracy over time.

#### Core Types of Machine Learning:
* **Supervised Learning**: Models are trained on labeled data (e.g., predicting house prices based on historical pricing).
* **Unsupervised Learning**: Models identify patterns in unlabeled data (e.g., customer segmentation by shopping behavior).
* **Reinforcement Learning**: Models learn through trial-and-error rewards and punishments (e.g., training a robot to walk or play chess).

#### Standard Algorithms:
1. **Linear Regression** (Regression)
2. **Decision Trees & Random Forests** (Classification/Regression)
3. **K-Means Clustering** (Unsupervised Grouping)
4. **Support Vector Machines (SVM)** (Classification)`,

  dbms: `### 🗄️ Database Management System (DBMS)

A **Database Management System (DBMS)** is system software for creating and managing databases. A DBMS makes it possible for end-users to create, read, update, and delete data in a database.

#### Key Database Models:
1. **Relational DBMS (RDBMS)**: Organizes data in tables (rows and columns). Uses SQL (Structured Query Language). Examples: PostgreSQL, MySQL, SQLite.
2. **NoSQL DBMS**: Non-relational databases for unstructured or semi-structured data. Examples: MongoDB (Document), Redis (Key-Value), Neo4j (Graph).

#### Crucial Concept: ACID Properties
To guarantee data integrity, transactions must follow ACID:
* **Atomicity**: All operations in a transaction succeed, or none do.
* **Consistency**: Transactions bring the database from one valid state to another.
* **Isolation**: Transactions run concurrently without interfering with each other.
* **Durability**: Completed transactions survive system crashes.`,

  python: `### 🐍 Python Programming Language

**Python** is a high-level, interpreted, general-purpose programming language. Its design philosophy emphasizes code readability with the use of significant indentation.

#### Why Python?
* **Easy to Learn**: Simple, clean syntax similar to plain English.
* **Rich Ecosystem**: Extensive libraries for AI, data science (Pandas, NumPy, TensorFlow), web development (Django, Flask), and scripting.
* **Dynamically Typed**: Variable types do not need explicit declaration.

#### Example Snippet:
\`\`\`python
# Simple function to greet and calculate square
def greet_and_square(name, number):
    print(f"Hello, {name}!")
    return number ** 2

result = greet_and_square("Alex", 5)
print("Square:", result) # Output: 25
\`\`\`
`,

  java: `### ☕ Java Programming Language

**Java** is a class-based, object-oriented programming language designed to have as few implementation dependencies as possible. It runs on the principle of **"Write Once, Run Anywhere" (WORA)** via the Java Virtual Machine (JVM).

#### Core OOP Concepts in Java:
1. **Encapsulation**: Hiding internal details of classes using private fields and public getters/setters.
2. **Inheritance**: Creating new classes based on existing ones using \`extends\`.
3. **Polymorphism**: Overloading or overriding methods to exhibit different behaviors.
4. **Abstraction**: Hiding complexity using interfaces and abstract classes.

#### Example Snippet:
\`\`\`java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, EduMentor AI!");
    }
}
\`\`\`
`,

  ds: `### 📊 Data Structures & Algorithms (DSA)

A **Data Structure** is a specialized format for organizing, processing, retrieving, and storing data. An **Algorithm** is a step-by-step procedure or set of rules to solve a specific problem.

#### Essential Data Structures:
* **Linear**: Arrays, Linked Lists, Stacks (LIFO), Queues (FIFO).
* **Non-Linear**: Trees (Binary Trees, BSTs, Heaps), Graphs (representing nodes and edges).
* **Hash Tables**: Key-value mappings offering average \(O(1)\) lookup time complexity.

#### Crucial Concepts:
* **Big O Notation**: Measures algorithmic efficiency in terms of Time and Space complexity (e.g., \(O(1)\), \(O(\\log n)\), \(O(n)\), \(O(n^2)\)).
`
};

export const LearnProvider = ({ children }) => {
  const { user } = useAuth();
  const [activeTheme, setActiveTheme] = useState('dark');
  const [toast, setToast] = useState({ show: false, message: '', type: 'success' });
  const [stats, setStats] = useState({
    questionsAsked: 0,
    quizzesCompleted: 0,
    studySessions: 0,
    learningStreak: 1,
  });
  const [roadmaps, setRoadmaps] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [studySessionsList, setStudySessionsList] = useState([]);
  const [chatHistory, setChatHistory] = useState([]);

  // Load Theme
  useEffect(() => {
    const savedTheme = localStorage.getItem('edumentor_theme');
    if (savedTheme) {
      setActiveTheme(savedTheme);
      document.documentElement.classList.toggle('dark', savedTheme === 'dark');
    } else {
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Load User Data when user logs in/changes
  useEffect(() => {
    if (user) {
      const userKey = `edumentor_learn_data_${user.id}`;
      const savedData = localStorage.getItem(userKey);
      if (savedData) {
        try {
          const parsed = JSON.parse(savedData);
          setStats(parsed.stats || { questionsAsked: 0, quizzesCompleted: 0, studySessions: 0, learningStreak: 1 });
          setRoadmaps(parsed.roadmaps || []);
          setQuizzes(parsed.quizzes || []);
          setStudySessionsList(parsed.studySessionsList || []);
          setChatHistory(parsed.chatHistory || []);
        } catch (e) {
          console.error("Failed to load user learn data", e);
        }
      } else {
        // Initialize default empty stats for new user
        setStats({ questionsAsked: 0, quizzesCompleted: 0, studySessions: 0, learningStreak: 1 });
        setRoadmaps([]);
        setQuizzes([]);
        setStudySessionsList([]);
        setChatHistory([]);
      }
    }
  }, [user]);

  // Save User Data helper
  const saveUserData = (newStats, newRoadmaps, newQuizzes, newSessions, newChats) => {
    if (!user) return;
    const userKey = `edumentor_learn_data_${user.id}`;
    const payload = {
      stats: newStats || stats,
      roadmaps: newRoadmaps || roadmaps,
      quizzes: newQuizzes || quizzes,
      studySessionsList: newSessions || studySessionsList,
      chatHistory: newChats || chatHistory
    };
    localStorage.setItem(userKey, JSON.stringify(payload));
  };

  const toggleTheme = () => {
    const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
    setActiveTheme(nextTheme);
    localStorage.setItem('edumentor_theme', nextTheme);
    document.documentElement.classList.toggle('dark', nextTheme === 'dark');
  };

  const showToast = (message, type = 'success') => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast(t => ({ ...t, show: false }));
    }, 3500);
  };

  const incrementQuestions = () => {
    const updatedStats = { ...stats, questionsAsked: stats.questionsAsked + 1 };
    setStats(updatedStats);
    saveUserData(updatedStats, null, null, null, null);
  };

  const addQuizRecord = (topic, score, total = 5) => {
    const record = {
      id: Date.now().toString(),
      topic,
      score,
      total,
      date: new Date().toISOString()
    };
    const updatedQuizzes = [record, ...quizzes];
    const updatedStats = { 
      ...stats, 
      quizzesCompleted: stats.quizzesCompleted + 1,
      learningStreak: Math.max(stats.learningStreak, updateStreak())
    };
    setQuizzes(updatedQuizzes);
    setStats(updatedStats);
    saveUserData(updatedStats, null, updatedQuizzes, null, null);
    showToast(`Quiz completed! Score: ${score}/${total}`, 'success');
  };

  const addStudySession = (durationMinutes, subject) => {
    const session = {
      id: Date.now().toString(),
      subject,
      duration: durationMinutes,
      date: new Date().toISOString()
    };
    const updatedSessions = [session, ...studySessionsList];
    const updatedStats = { 
      ...stats, 
      studySessions: stats.studySessions + 1,
      learningStreak: Math.max(stats.learningStreak, updateStreak())
    };
    setStudySessionsList(updatedSessions);
    setStats(updatedStats);
    saveUserData(updatedStats, null, null, updatedSessions, null);
    showToast(`Logged study session of ${durationMinutes} mins in ${subject}!`, 'success');
  };

  // Automatically calculate streak
  const updateStreak = () => {
    // Simple mock calculation: check when the last activity occurred
    // If it was today or yesterday, maintain/increment streak. If further, reset to 1.
    return stats.learningStreak + (Math.random() > 0.7 ? 1 : 0); // safe mock incremental addition
  };

  const generateRoadmap = (topic) => {
    // Check if roadmap for this topic already exists
    const exists = roadmaps.find(r => r.topic.toLowerCase() === topic.toLowerCase());
    if (exists) {
      showToast(`Roadmap for ${topic} already exists!`, 'info');
      return exists;
    }

    // Default outlines
    const outlines = {
      Python: [
        { week: "Week 1", title: "Variables, Data Types, Input Output", topics: ["Syntax & Setup", "Variables & Types", "Basic Operators", "Console Input/Output"] },
        { week: "Week 2", title: "Functions, Loops, Lists", topics: ["Conditional Statements", "Loops (For/While)", "Functions & Scope", "List Data Structure"] },
        { week: "Week 3", title: "OOP Concepts", topics: ["Classes & Objects", "Attributes & Methods", "Inheritance", "Polymorphism"] },
        { week: "Week 4", title: "Projects and Practice", topics: ["File Handling", "Exception Handling", "API Integration Project", "HackerRank Challenges"] }
      ],
      Java: [
        { week: "Week 1", title: "Java Fundamentals & Syntax", topics: ["JVM Architecture", "Variables & Constants", "Control Flow Statements", "Arrays"] },
        { week: "Week 2", title: "OOP Foundations", topics: ["Class Design", "Constructors", "Encapsulation", "Inheritance & Polymorphism"] },
        { week: "Week 3", title: "Advanced OOP & Collections", topics: ["Interfaces & Abstract Classes", "Exception Handling", "Java Collections Framework", "Generics"] },
        { week: "Week 4", title: "Build & Test Projects", topics: ["Multithreading Basics", "File I/O", "JUnit Testing", "Build tools (Maven)"] }
      ],
      "Data Structures": [
        { week: "Week 1", title: "Linear Structures", topics: ["Array Operations", "Singular/Double Linked Lists", "Stack Implementation (LIFO)", "Queue Implementation (FIFO)"] },
        { week: "Week 2", title: "Sorting and Searching", topics: ["Bubble/Merge/Quick Sort", "Linear & Binary Search", "Recursion Principles", "Time Complexity Analysis"] },
        { week: "Week 3", title: "Trees & Hierarchical Models", topics: ["Binary Trees", "Binary Search Trees (BST)", "Tree Traversal (Pre/In/Post)", "Heap Data Structure"] },
        { week: "Week 4", title: "Advanced Graphs & Hash Tables", topics: ["Graph Representation", "BFS & DFS Algorithms", "Hashing & Collisions", "Practical Interview Prep"] }
      ],
      "Web Development": [
        { week: "Week 1", title: "HTML5 & CSS3 Essentials", topics: ["Semantic Markup", "Flexbox & CSS Grid", "Responsive Design Rules", "CSS Variables & Themes"] },
        { week: "Week 2", title: "Modern JavaScript", topics: ["ES6+ Syntax", "DOM Manipulation", "Asynchronous Fetch / Promises", "Web Storage (localStorage)"] },
        { week: "Week 3", title: "React Framework", topics: ["Components & Props", "React Hooks (useState, useEffect)", "State Management", "Routing Setup"] },
        { week: "Week 4", title: "Deployment & Portfolios", topics: ["Tailwind CSS Integration", "Version Control (Git/GitHub)", "Vercel / Netlify Deployment", "Building a Capstone App"] }
      ],
      "Machine Learning": [
        { week: "Week 1", title: "Mathematics & Data Foundations", topics: ["Linear Algebra Basics", "Statistics & Probability", "Data Cleaning with Pandas", "Data Visualizations"] },
        { week: "Week 2", title: "Supervised Learning Models", topics: ["Linear & Logistic Regression", "Decision Trees", "K-Nearest Neighbors", "Model Evaluation Metrics"] },
        { week: "Week 3", title: "Unsupervised & Deep Models", topics: ["K-Means Clustering", "Principal Component Analysis", "Neural Networks Intro", "TensorFlow/PyTorch Basics"] },
        { week: "Week 4", title: "MLOps & Deployments", topics: ["Feature Engineering", "Hyperparameter Tuning", "Model Saving with Joblib", "Building a Predictor API"] }
      ]
    };

    // Grab outline or build default
    const weeks = outlines[topic] || [
      { week: "Week 1", title: "Introduction & Setup", topics: ["Basic Terms", "Environment Setup", "First Programs"] },
      { week: "Week 2", title: "Core Architecture", topics: ["Core structures", "Data management", "Syntax rules"] },
      { week: "Week 3", title: "Advanced Utilities", topics: ["Libraries", "Modules", "Problem solving"] },
      { week: "Week 4", title: "Capstone Construction", topics: ["Project development", "Integration", "Deployment"] }
    ];

    const newRoadmap = {
      id: Date.now().toString(),
      topic,
      weeks: weeks.map(w => ({ ...w, completed: false })),
      createdAt: new Date().toISOString()
    };

    const updatedRoadmaps = [...roadmaps, newRoadmap];
    setRoadmaps(updatedRoadmaps);
    saveUserData(null, updatedRoadmaps, null, null, null);
    showToast(`Generated a custom roadmap for ${topic}!`, 'success');
    return newRoadmap;
  };

  const toggleMilestone = (roadmapId, weekIndex) => {
    const updatedRoadmaps = roadmaps.map(r => {
      if (r.id === roadmapId) {
        const updatedWeeks = r.weeks.map((w, idx) => {
          if (idx === weekIndex) {
            const nextState = !w.completed;
            showToast(nextState ? `Completed milestone: ${w.title}!` : `Milestone marked incomplete`, 'info');
            return { ...w, completed: nextState };
          }
          return w;
        });
        return { ...r, weeks: updatedWeeks };
      }
      return r;
    });

    setRoadmaps(updatedRoadmaps);
    // Also log study session as a result of checking a milestone
    const roadmap = roadmaps.find(r => r.id === roadmapId);
    if (roadmap) {
      const isCompleting = !roadmap.weeks[weekIndex].completed;
      if (isCompleting) {
        // Log a simulated study session
        addStudySession(30, roadmap.topic);
      }
    }

    saveUserData(null, updatedRoadmaps, null, null, null);
  };

  const saveChatHistory = (chats) => {
    setChatHistory(chats);
    saveUserData(null, null, null, null, chats);
  };

  const clearUserData = () => {
    if (!user) return;
    const userKey = `edumentor_learn_data_${user.id}`;
    localStorage.removeItem(userKey);
    setStats({ questionsAsked: 0, quizzesCompleted: 0, studySessions: 0, learningStreak: 1 });
    setRoadmaps([]);
    setQuizzes([]);
    setStudySessionsList([]);
    setChatHistory([]);
    showToast("All your learning profile data has been cleared.", "info");
  };

  return (
    <LearnContext.Provider value={{
      activeTheme,
      toggleTheme,
      toast,
      showToast,
      stats,
      roadmaps,
      quizzes,
      studySessionsList,
      chatHistory,
      incrementQuestions,
      addQuizRecord,
      addStudySession,
      generateRoadmap,
      toggleMilestone,
      saveChatHistory,
      clearUserData
    }}>
      {children}
    </LearnContext.Provider>
  );
};
