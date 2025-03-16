import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ClassSkill {
  name: string;
  category: 'technical' | 'business';
  description: string;
}

interface Class {
  code: string;
  title: string;
  department: string;
  category: 'technical' | 'business';
  isExpanded: boolean;
  description: string;
  skills: ClassSkill[];
}

@Component({
  selector: 'app-class-filter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './class-filter.component.html',
  styleUrls: ['./class-filter.component.css']
})
export class ClassFilterComponent implements OnInit {
  isDropdownOpen: boolean = false;
  selectedFilter: string = 'all';
  filters = [
    { label: 'All Classes', value: 'all' },
    { label: 'Technical', value: 'technical' },
    { label: 'Business', value: 'business' }
  ];
  
  classes: Class[] = [];
  filteredClasses: Class[] = [];
  
  ngOnInit(): void {
    this.initializeClasses();
    this.applyFilter('all');
  }
  
  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  
  toggleClass(cls: Class): void {
    cls.isExpanded = !cls.isExpanded;
  }
  
  applyFilter(filter: string): void {
    this.selectedFilter = filter;
    
    if (filter === 'all') {
      this.filteredClasses = [...this.classes];
    } else {
      this.filteredClasses = this.classes.filter(cls => cls.category === filter);
    }
  }
  
  initializeClasses(): void {
    this.classes = [
      {
        code: 'CSE 2111',
        title: 'Spreadsheets & Databases',
        department: 'CSE',
        category: 'technical',
        isExpanded: false,
        description: 'This course provided a comprehensive introduction to database design and management, with a focus on relational database concepts and SQL. I gained hands-on experience with database modeling, normalization, and query optimization. The course also covered advanced spreadsheet techniques for data analysis and visualization.',
        skills: [
          {
            name: 'SQL',
            category: 'technical',
            description: 'Developed proficiency in writing complex SQL queries, joins, and stored procedures for efficient data retrieval and manipulation.'
          },
          {
            name: 'Database Design',
            category: 'technical',
            description: 'Learned principles of relational database schema design, normalization techniques, and entity-relationship modeling.'
          },
          {
            name: 'Excel Advanced Functions',
            category: 'technical',
            description: 'Mastered pivot tables, VLOOKUP, and other advanced Excel functions for data analysis and reporting.'
          },
          {
            name: 'Data Modeling',
            category: 'business',
            description: 'Created logical and physical data models to represent business processes and information requirements.'
          }
        ]
      },
      {
        code: 'CSE 3241',
        title: 'Introduction to Database Systems',
        department: 'CSE',
        category: 'technical',
        isExpanded: false,
        description: 'This advanced database course built upon the foundations of database design and delved deeper into database management systems architecture, query optimization, and transaction processing. I worked on a semester-long project implementing a complete database solution for a real-world business scenario.',
        skills: [
          {
            name: 'Database Architecture',
            category: 'technical',
            description: 'Gained understanding of internal DBMS structures, indexing strategies, and query execution planning.'
          },
          {
            name: 'Transaction Management',
            category: 'technical',
            description: 'Learned ACID properties, concurrency control mechanisms, and recovery techniques for database transactions.'
          },
          {
            name: 'Data Normalization',
            category: 'technical',
            description: 'Applied normalization principles to optimize database schemas and reduce data redundancy.'
          },
          {
            name: 'Requirements Analysis',
            category: 'business',
            description: 'Translated business requirements into comprehensive database specifications and designs.'
          }
        ]
      },
      {
        code: 'CSE 1223',
        title: 'Programming in Java',
        department: 'CSE',
        category: 'technical',
        isExpanded: false,
        description: 'This foundational programming course introduced me to core programming concepts using Java. I learned object-oriented programming principles, data structures, and algorithm development while working on progressively challenging programming assignments and a final project that demonstrated these concepts in a practical application.',
        skills: [
          {
            name: 'Java',
            category: 'technical',
            description: 'Developed proficiency in Java syntax, object-oriented concepts, and standard libraries for application development.'
          },
          {
            name: 'OOP Concepts',
            category: 'technical',
            description: 'Mastered encapsulation, inheritance, polymorphism, and abstraction principles for building modular code.'
          },
          {
            name: 'Algorithm Development',
            category: 'technical',
            description: 'Created efficient algorithms for sorting, searching, and data processing tasks with optimal time complexity.'
          },
          {
            name: 'Problem Solving',
            category: 'business',
            description: 'Applied structured approaches to break down complex problems into manageable components with technical solutions.'
          }
        ]
      },
      {
        code: 'CSE 2123',
        title: 'Data Structures in Java',
        department: 'CSE',
        category: 'technical',
        isExpanded: false,
        description: 'This course built upon the foundation of Java programming by focusing on advanced data structures and algorithms. I implemented and analyzed various data structures including linked lists, stacks, queues, trees, and hash tables. The course emphasized algorithm efficiency and Big O analysis for time and space complexity.',
        skills: [
          {
            name: 'Data Structures',
            category: 'technical',
            description: 'Implemented and utilized complex data structures including trees, graphs, hash tables, and priority queues.'
          },
          {
            name: 'Algorithm Analysis',
            category: 'technical',
            description: 'Evaluated algorithmic efficiency using Big O notation for time and space complexity to optimize performance.'
          },
          {
            name: 'Software Design',
            category: 'technical',
            description: 'Applied design patterns and principles to create maintainable and extensible code architectures.'
          },
          {
            name: 'Technical Documentation',
            category: 'business',
            description: 'Created comprehensive documentation for data structures and algorithms to communicate technical concepts clearly.'
          }
        ]
      },
      {
        code: 'ACCTMIS 4630',
        title: 'Business Systems Application Development',
        department: 'ACCTMIS',
        category: 'technical',
        isExpanded: false,
        description: 'In this applied development course, I designed and built a complete business application that integrated front-end interfaces with back-end systems. The course emphasized software development lifecycle methodologies, requirements gathering, and user-centered design principles within the context of business information systems.',
        skills: [
          {
            name: 'Full-Stack Development',
            category: 'technical',
            description: 'Built integrated applications connecting user interfaces to back-end databases and business logic layers.'
          },
          {
            name: 'Web Technologies',
            category: 'technical',
            description: 'Used HTML, CSS, JavaScript, and modern frameworks to create interactive and responsive user interfaces.'
          },
          {
            name: 'Software Development Lifecycle',
            category: 'technical',
            description: 'Applied structured methodologies from requirements through deployment to ensure quality and maintainability.'
          },
          {
            name: 'Business Process Integration',
            category: 'business',
            description: 'Mapped technical solutions to business workflows and information needs for effective system design.'
          }
        ]
      },
      {
        code: 'CSE 2133',
        title: 'File Processing COBOL',
        department: 'CSE',
        category: 'technical',
        isExpanded: false,
        description: 'This course introduced me to COBOL programming for business applications with a focus on batch processing and file handling. I learned how legacy systems process large volumes of data and gained an appreciation for mainframe computing environments that remain critical in industries like finance and insurance.',
        skills: [
          {
            name: 'COBOL',
            category: 'technical',
            description: 'Developed proficiency in COBOL syntax and structure for building business applications and reports.'
          },
          {
            name: 'Legacy Systems',
            category: 'technical',
            description: 'Gained understanding of mainframe computing environments and their role in enterprise information systems.'
          },
          {
            name: 'Batch Processing',
            category: 'technical',
            description: 'Implemented efficient batch processing routines for handling large volumes of structured data records.'
          },
          {
            name: 'Enterprise Systems',
            category: 'business',
            description: 'Recognized how large-scale business systems operate and process critical financial and operational data.'
          }
        ]
      },
      {
        code: 'ACCTMIS 3620',
        title: 'Foundations of Information Systems',
        department: 'ACCTMIS',
        category: 'business',
        isExpanded: false,
        description: 'This course provided a comprehensive overview of information systems in organizational contexts. I learned how businesses leverage technology for competitive advantage, the components of enterprise information architectures, and IT governance frameworks. Case studies and projects helped connect technology concepts to business strategy and operations.',
        skills: [
          {
            name: 'IT Strategy',
            category: 'business',
            description: 'Developed ability to align information systems with business objectives and strategic initiatives.'
          },
          {
            name: 'System Architecture',
            category: 'technical',
            description: 'Gained understanding of enterprise system components and their relationships within complex architectures.'
          },
          {
            name: 'Process Optimization',
            category: 'business',
            description: 'Analyzed business workflows to identify improvement opportunities through better system integration.'
          },
          {
            name: 'IT Governance',
            category: 'business',
            description: 'Applied frameworks for technology management, risk assessment, and compliance within organizations.'
          }
        ]
      },
      {
        code: 'ACCTMIS 4670',
        title: 'IS Planning & Management',
        department: 'ACCTMIS',
        category: 'business',
        isExpanded: false,
        description: 'This course focused on the strategic planning and management of information systems resources in organizations. I learned methodologies for IT project portfolio management, investment evaluation, and resource allocation. The course emphasized the role of IT governance in ensuring technology initiatives deliver business value.',
        skills: [
          {
            name: 'IT Project Portfolio',
            category: 'business',
            description: 'Managed multiple technology initiatives based on strategic alignment, resource constraints, and ROI.'
          },
          {
            name: 'Technology Investment',
            category: 'business',
            description: 'Evaluated IT investments using financial metrics and qualitative factors to prioritize spending decisions.'
          },
          {
            name: 'Enterprise Architecture',
            category: 'technical',
            description: 'Developed roadmaps for technology evolution that support business capabilities and transformation goals.'
          },
          {
            name: 'Change Management',
            category: 'business',
            description: 'Applied strategies for managing organizational change during technology implementations and upgrades.'
          }
        ]
      },
      {
        code: 'BUSOBA 2321',
        title: 'Business Analytics',
        department: 'BUSOBA',
        category: 'business',
        isExpanded: false,
        description: 'This course introduced me to statistical methods and analytical techniques for business decision-making. I worked with various data sets to perform descriptive, predictive, and prescriptive analytics using specialized software tools. The course emphasized how analytics drives improvements in marketing, operations, finance, and other business functions.',
        skills: [
          {
            name: 'Data Analysis',
            category: 'technical',
            description: 'Applied statistical methods to extract meaningful insights from business data for decision support.'
          },
          {
            name: 'Business Intelligence',
            category: 'business',
            description: 'Created dashboards and visualizations to communicate key performance indicators and trends to stakeholders.'
          },
          {
            name: 'Predictive Modeling',
            category: 'technical',
            description: 'Developed forecasting models to anticipate future business outcomes based on historical patterns.'
          },
          {
            name: 'Decision Analysis',
            category: 'business',
            description: 'Used analytical techniques to evaluate alternatives and optimize business decisions under uncertainty.'
          }
        ]
      },
      {
        code: 'CSE 3232',
        title: 'Software Requirements Analysis',
        department: 'CSE',
        category: 'technical',
        isExpanded: false,
        description: 'This course taught me systematic approaches to gathering, documenting, and validating software requirements. I learned techniques for stakeholder interviews, use case modeling, and requirements specification. The course emphasized the critical role of requirements in project success and methods for managing requirements throughout the project lifecycle.',
        skills: [
          {
            name: 'Requirements Gathering',
            category: 'technical',
            description: 'Conducted structured interviews and workshops to elicit user needs and system requirements.'
          },
          {
            name: 'Use Case Modeling',
            category: 'technical',
            description: 'Created detailed use cases and user stories to document system functionality from user perspectives.'
          },
          {
            name: 'Specification Writing',
            category: 'technical',
            description: 'Developed clear, testable requirements specifications that serve as the foundation for development.'
          },
          {
            name: 'Business Analysis',
            category: 'business',
            description: 'Translated business needs into technical requirements while ensuring alignment with organizational goals.'
          }
        ]
      },
      {
        code: 'BUSMHR 4490',
        title: 'Strategic Management',
        department: 'BUSMHR',
        category: 'business',
        isExpanded: false,
        description: 'In this capstone business course, I integrated knowledge from previous courses to analyze complex business situations and formulate effective strategies. Through case studies and a competitive business simulation, I developed skills in strategic analysis, competitive positioning, and implementation planning. The course emphasized how technology decisions support broader business objectives.',
        skills: [
          {
            name: 'Strategic Analysis',
            category: 'business',
            description: 'Evaluated internal capabilities and external environments to identify strategic opportunities and threats.'
          },
          {
            name: 'Competitive Strategy',
            category: 'business',
            description: 'Formulated positioning strategies for sustainable competitive advantage in dynamic markets.'
          },
          {
            name: 'Business Planning',
            category: 'business',
            description: 'Developed comprehensive strategic plans with implementation roadmaps and performance metrics.'
          },
          {
            name: 'Technology Alignment',
            category: 'business',
            description: 'Ensured technology initiatives directly support key business strategies and value creation.'
          }
        ]
      },
      {
        code: 'BUSFIN 3220',
        title: 'Business Finance',
        department: 'BUSFIN',
        category: 'business',
        isExpanded: false,
        description: 'This course provided a foundation in financial management principles and techniques for technology investments. I learned methods for capital budgeting, risk assessment, and financial analysis. The course gave me valuable perspective on how businesses evaluate and fund technology initiatives using ROI, NPV, and other financial metrics.',
        skills: [
          {
            name: 'Capital Budgeting',
            category: 'business',
            description: 'Applied financial evaluation techniques to assess long-term technology investments and infrastructure projects.'
          },
          {
            name: 'Financial Analysis',
            category: 'business',
            description: 'Interpreted financial statements and reports to evaluate business performance and technology impacts.'
          },
          {
            name: 'Risk Assessment',
            category: 'business',
            description: 'Quantified and mitigated financial risks associated with technology projects and digital initiatives.'
          },
          {
            name: 'Cost-Benefit Analysis',
            category: 'business',
            description: 'Conducted thorough analyses of technology options considering both tangible and intangible factors.'
          }
        ]
      }
    ];
  }
}