import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface ClassSkill {
  name: string;
  category: 'technical' | 'business' | 'soft';
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
  
  // Search functionality
  searchTerm: string = '';
  searchSuggestions: (string | Class)[] = [];
  activeSkillFilters: string[] = [];
  
  classes: Class[] = [];
  filteredClasses: Class[] = [];
  
  // Close dropdown when clicking outside
  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (this.isDropdownOpen && !(event.target as HTMLElement).closest('.class-filter-container')) {
      this.isDropdownOpen = false;
    }
  }
  
  ngOnInit(): void {
    this.initializeClasses();
    this.applyFilters();
  }
  
  toggleDropdown(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  
  toggleClass(cls: Class, event: Event): void {
    event.stopPropagation();
    
    // Close all other classes first
    this.filteredClasses.forEach(c => {
      if (c !== cls) {
        c.isExpanded = false;
      }
    });
    
    // Toggle this class
    cls.isExpanded = !cls.isExpanded;
  }
  
  // Search functionality
  onSearchInput(): void {
    if (this.searchTerm.trim().length > 0) {
      this.updateSearchSuggestions();
    } else {
      this.searchSuggestions = [];
    }
    
    // Always apply filters when search changes
    this.applyFilters();
  }
  
  updateSearchSuggestions(): void {
    const searchTerm = this.searchTerm.toLowerCase().trim();
    
    // Get all unique skills
    const allSkills = this.getAllSkills();
    
    // Filter skills that match the search term
    const matchingSkills = allSkills.filter(skill => 
      skill.toLowerCase().includes(searchTerm)
    ).slice(0, 5); // Limit to 5 skills
    
    // Filter classes that match by code or title
    const matchingClasses = this.classes.filter(cls =>
      cls.code.toLowerCase().includes(searchTerm) ||
      cls.title.toLowerCase().includes(searchTerm)
    ).slice(0, 5); // Limit to 5 classes
    
    // Combine results
    this.searchSuggestions = [...matchingSkills, ...matchingClasses];
  }
  
  getAllSkills(): string[] {
    // Extract all unique skills from all classes
    const skillsSet = new Set<string>();
    
    this.classes.forEach(cls => {
      cls.skills.forEach(skill => {
        skillsSet.add(skill.name);
      });
    });
    
    return Array.from(skillsSet).sort();
  }
  
  getSkillSuggestions(): string[] {
    return this.searchSuggestions.filter(item => typeof item === 'string') as string[];
  }
  
  getCourseSuggestions(): Class[] {
    return this.searchSuggestions.filter(item => typeof item !== 'string') as Class[];
  }
  
  clearSearch(event: Event): void {
    event.stopPropagation();
    this.searchTerm = '';
    this.searchSuggestions = [];
    this.applyFilters();
  }
  
  addSkillFilter(skill: string): void {
    if (!this.activeSkillFilters.includes(skill)) {
      this.activeSkillFilters.push(skill);
      this.searchTerm = ''; // Clear search term
      this.searchSuggestions = []; // Clear suggestions
      this.applyFilters();
    }
  }
  
  removeSkillFilter(skill: string): void {
    this.activeSkillFilters = this.activeSkillFilters.filter(s => s !== skill);
    this.applyFilters();
  }
  
  clearAllSkillFilters(): void {
    this.activeSkillFilters = [];
    this.applyFilters();
  }
  
  isSkillInFilters(skill: string): boolean {
    return this.activeSkillFilters.includes(skill);
  }
  
  isSkillHighlighted(skill: string): boolean {
    return this.activeSkillFilters.includes(skill) || 
           (this.searchTerm && skill.toLowerCase().includes(this.searchTerm.toLowerCase()));
  }
  
  isClassHighlighted(cls: Class): boolean {
    // Highlight if any of the class's skills match the active filters
    if (this.activeSkillFilters.length > 0) {
      return cls.skills.some(skill => this.activeSkillFilters.includes(skill.name));
    }
    return false;
  }
  
  selectCourse(course: Class): void {
    // Find and expand the selected course
    const courseInList = this.filteredClasses.find(c => c.code === course.code);
    if (courseInList) {
      // Close all other courses
      this.filteredClasses.forEach(c => {
        c.isExpanded = c.code === course.code;
      });
      
      // Clear search
      this.searchTerm = '';
      this.searchSuggestions = [];
    }
  }
  
  applyFilter(filter: string): void {
    this.selectedFilter = filter;
    this.applyFilters();
  }
  
  applyFilters(): void {
    // Start with all classes
    let result = [...this.classes];
    
    // Filter by category (technical/business/all)
    if (this.selectedFilter !== 'all') {
      result = result.filter(cls => cls.category === this.selectedFilter);
    }
    
    // Filter by skill filters
    if (this.activeSkillFilters.length > 0) {
      result = result.filter(cls => 
        cls.skills.some(skill => this.activeSkillFilters.includes(skill.name))
      );
    }
    
    // Filter by search term if present
    if (this.searchTerm.trim().length > 0) {
      const searchTerm = this.searchTerm.toLowerCase().trim();
      
      result = result.filter(cls => 
        // Match class code or title
        cls.code.toLowerCase().includes(searchTerm) ||
        cls.title.toLowerCase().includes(searchTerm) ||
        // Match skills
        cls.skills.some(skill => skill.name.toLowerCase().includes(searchTerm)) ||
        // Match department
        cls.department.toLowerCase().includes(searchTerm) ||
        // Match description
        cls.description.toLowerCase().includes(searchTerm)
      );
    }
    
    // Close all expanded classes when filter changes
    result.forEach(c => c.isExpanded = false);
    
    this.filteredClasses = result;
  }
  
  resetFilters(): void {
    this.selectedFilter = 'all';
    this.searchTerm = '';
    this.activeSkillFilters = [];
    this.searchSuggestions = [];
    this.applyFilters();
  }
  
  initializeClasses(): void {
    // Initialize the classes array with our course data
    this.filteredClasses = [...this.classes];
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
        code: 'BUSMHR 2292',
        title: 'Business Skills & Environment',
        department: 'BUSMHR',
        category: 'business',
        isExpanded: false,
        description: 'This course focused on developing essential professional skills for business environments, including communication, teamwork, and ethical decision-making. I practiced delivering presentations, writing business documents, and working in collaborative project teams.',
        skills: [
          {
            name: 'Professional Communication',
            category: 'soft',
            description: 'Developed effective business writing and presentation skills for various professional audiences.'
          },
          {
            name: 'Team Collaboration',
            category: 'soft',
            description: 'Worked effectively in diverse teams to achieve shared goals through coordinated effort.'
          },
          {
            name: 'Business Ethics',
            category: 'business',
            description: 'Applied ethical frameworks to analyze business situations and make principled decisions.'
          },
          {
            name: 'Time Management',
            category: 'soft',
            description: 'Prioritized tasks and managed competing deadlines to maximize productivity and project outcomes.'
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
      },
      {
        code: 'BUSOBA 2320',
        title: 'Business Statistics',
        department: 'BUSOBA',
        category: 'business',
        isExpanded: false,
        description: 'This course covered statistical methods for business decision-making, including descriptive statistics, probability distributions, hypothesis testing, and regression analysis. I learned to apply these techniques to real business data to draw meaningful conclusions and make data-driven recommendations.',
        skills: [
          {
            name: 'Statistical Analysis',
            category: 'technical',
            description: 'Applied statistical methods including hypothesis testing, regression analysis, and confidence intervals to business data.'
          },
          {
            name: 'Data Visualization',
            category: 'technical',
            description: 'Created effective visualizations to communicate statistical findings and data patterns to business audiences.'
          },
          {
            name: 'Quantitative Reasoning',
            category: 'business',
            description: 'Developed critical thinking skills to interpret statistical results in the context of business problems.'
          },
          {
            name: 'Data-Driven Decision Making',
            category: 'business',
            description: 'Used statistical evidence to support business decisions and evaluate potential outcomes.'
          }
        ]
      },
      {
        code: 'BUSOBA 3230',
        title: 'Introduction to Operations Management',
        department: 'BUSOBA',
        category: 'business',
        isExpanded: false,
        description: 'This course introduced me to the principles of designing, operating, and improving the processes that transform resources into goods and services. I learned techniques for process analysis, capacity planning, inventory management, and quality control in both manufacturing and service operations.',
        skills: [
          {
            name: 'Process Analysis',
            category: 'business',
            description: 'Mapped and analyzed business processes to identify bottlenecks and improvement opportunities.'
          },
          {
            name: 'Resource Planning',
            category: 'business',
            description: 'Developed capacity plans and resource allocation strategies to optimize operational efficiency.'
          },
          {
            name: 'Quality Management',
            category: 'business',
            description: 'Applied statistical quality control techniques and continuous improvement methodologies.'
          },
          {
            name: 'Operations Metrics',
            category: 'business',
            description: 'Established and monitored key performance indicators to measure operational effectiveness.'
          }
        ]
      },
      {
        code: 'BUSML 3380',
        title: 'Logistics Management',
        department: 'BUSML',
        category: 'business',
        isExpanded: false,
        description: 'This course focused on the management of physical flow of products, services, and information through the supply chain. I learned about transportation systems, inventory management, distribution strategies, and how technology enables modern logistics networks.',
        skills: [
          {
            name: 'Supply Chain Management',
            category: 'business',
            description: 'Analyzed end-to-end supply chain operations and coordinated multiple stakeholders across distribution networks.'
          },
          {
            name: 'Inventory Control',
            category: 'business',
            description: 'Applied inventory models to balance stock levels, service rates, and carrying costs.'
          },
          {
            name: 'Distribution Network Design',
            category: 'business',
            description: 'Optimized facility locations and transportation routes to minimize costs while meeting service level requirements.'
          },
          {
            name: 'Logistics Technology',
            category: 'technical',
            description: 'Utilized supply chain software and tracking systems to improve visibility and operational efficiency.'
          }
        ]
      },
      {
        code: 'BUSMHR 3200',
        title: 'Organizational Behavior & Human Resources',
        department: 'BUSMHR',
        category: 'business',
        isExpanded: false,
        description: 'This course explored individual and group behavior in organizations, including leadership styles, motivation techniques, and team management strategies. I gained insights into how organizational culture affects technology adoption and how to effectively manage technical teams.',
        skills: [
          {
            name: 'Team Leadership',
            category: 'soft',
            description: 'Developed skills to lead diverse teams through effective communication, motivation, and conflict resolution.'
          },
          {
            name: 'Organizational Analysis',
            category: 'business',
            description: 'Assessed organizational structures and cultures to identify factors influencing performance and change adoption.'
          },
          {
            name: 'Performance Management',
            category: 'business',
            description: 'Designed systems to evaluate, develop, and improve individual and team performance.'
          },
          {
            name: 'Change Management',
            category: 'soft',
            description: 'Applied strategies to facilitate organizational transitions and technology adoption with minimal resistance.'
          }
        ]
      },
      {
        code: 'BUSMHR 2500',
        title: 'Entrepreneurship',
        department: 'BUSMHR',
        category: 'business',
        isExpanded: false,
        description: 'This course introduced me to entrepreneurial thinking, opportunity recognition, business model development, and startup strategies. I learned how to evaluate business ideas, develop minimum viable products, and create pitches for potential investors in technology-driven ventures.',
        skills: [
          {
            name: 'Business Model Design',
            category: 'business',
            description: 'Created and refined business models to capture value from technological innovations and market opportunities.'
          },
          {
            name: 'Market Analysis',
            category: 'business',
            description: 'Researched target markets, analyzed competitors, and identified unmet customer needs that technology could address.'
          },
          {
            name: 'Lean Startup Methodology',
            category: 'business',
            description: 'Applied minimum viable product concepts and iterative development to validate business assumptions.'
          },
          {
            name: 'Pitch Development',
            category: 'soft',
            description: 'Created compelling presentations to communicate business value propositions to potential stakeholders.'
          }
        ]
      },
      {
        code: 'MATH 1131',
        title: 'Calculus for Business',
        department: 'MATH',
        category: 'technical',
        isExpanded: false,
        description: 'This course covered the application of differential and integral calculus to business and economics. I learned optimization techniques for resource allocation, marginal analysis for decision-making, and quantitative methods for modeling business scenarios.',
        skills: [
          {
            name: 'Optimization Techniques',
            category: 'technical',
            description: 'Applied calculus to find optimal solutions for business problems involving constraints and multiple variables.'
          },
          {
            name: 'Quantitative Modeling',
            category: 'technical',
            description: 'Developed mathematical models to represent business relationships and predict outcomes.'
          },
          {
            name: 'Marginal Analysis',
            category: 'business',
            description: 'Used calculus concepts to evaluate incremental changes in costs, revenues, and profits for business decisions.'
          },
          {
            name: 'Analytical Thinking',
            category: 'soft',
            description: 'Approached complex problems with systematic mathematical reasoning and solution frameworks.'
          }
        ]
      },
      {
        code: 'MATH 2366',
        title: 'Introduction to Discrete Mathematics',
        department: 'MATH',
        category: 'technical',
        isExpanded: false,
        description: 'This course introduced me to the mathematical foundations of computer science, including set theory, logic, graph theory, combinatorics, and algorithm analysis. These concepts formed the theoretical basis for data structures and algorithms courses.',
        skills: [
          {
            name: 'Logical Reasoning',
            category: 'technical',
            description: 'Applied formal logic to analyze and construct valid arguments and proofs.'
          },
          {
            name: 'Graph Theory',
            category: 'technical',
            description: 'Used graph models to represent and solve problems involving relationships and connections between entities.'
          },
          {
            name: 'Algorithm Analysis',
            category: 'technical',
            description: 'Evaluated the efficiency and correctness of algorithms using mathematical techniques.'
          },
          {
            name: 'Combinatorial Analysis',
            category: 'technical',
            description: 'Applied counting methods and combinatorial principles to solve complex computational problems.'
          }
        ]
      },
      {
        code: 'STAT 1430',
        title: 'Statistics for Business Sciences',
        department: 'STAT',
        category: 'business',
        isExpanded: false,
        description: 'This course covered statistical methods for business analysis, including descriptive statistics, probability theory, sampling distributions, confidence intervals, and hypothesis testing. I gained hands-on experience analyzing business data sets and interpreting results.',
        skills: [
          {
            name: 'Statistical Testing',
            category: 'technical',
            description: 'Designed and conducted hypothesis tests to evaluate business claims based on sample data.'
          },
          {
            name: 'Sampling Methods',
            category: 'technical',
            description: 'Applied appropriate sampling techniques to collect representative data for business studies.'
          },
          {
            name: 'Statistical Software',
            category: 'technical',
            description: 'Used statistical packages to analyze large datasets and interpret results for business contexts.'
          },
          {
            name: 'Inference & Estimation',
            category: 'business',
            description: 'Made valid inferences about populations based on sample data with specified confidence levels.'
          }
        
    ]
  }
];

// Initialize filteredClasses after classes array is populated
this.filteredClasses = [...this.classes];
}
}