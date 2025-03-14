// src/app/services/education.service.ts

import { Injectable } from '@angular/core';
import { Course } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class EducationService {
  private courses: Course[] = [
    // CSE Courses
    {
      code: 'CSE 1223',
      title: 'Programming in Java',
      department: 'CSE',
      description: 'Introduction to computer programming in Java, covering fundamentals of problem-solving, algorithm design, and object-oriented programming concepts.',
      skills: [
        {
          name: 'Java Programming',
          roles: ['Software Developer', 'Backend Developer', 'Full-Stack Developer']
        },
        {
          name: 'Object-Oriented Programming',
          roles: ['Software Developer', 'Backend Developer']
        },
        {
          name: 'Problem Solving',
          roles: ['Software Developer', 'Data Analyst']
        }
      ]
    },
    {
      code: 'CSE 2111',
      title: 'Spreadsheets & Databases',
      department: 'CSE',
      description: 'Fundamentals of spreadsheet and database design, implementation, and usage for data storage, computation, and analysis in business applications.',
      skills: [
        {
          name: 'Database Management',
          roles: ['Database Developer', 'Data Analyst', 'Full-Stack Developer']
        },
        {
          name: 'Data Modeling',
          roles: ['Data Analyst', 'Database Developer']
        },
        {
          name: 'Excel Automation',
          roles: ['Data Analyst', 'Business Analyst']
        }
      ]
    },
    {
      code: 'CSE 2123',
      title: 'Data Structures in Java',
      department: 'CSE',
      description: 'Advanced programming concepts focusing on data structures, algorithms, and their efficient implementation in Java. Covers arrays, linked lists, stacks, queues, trees, and searching/sorting algorithms.',
      skills: [
        {
          name: 'Data Structures',
          roles: ['Software Developer', 'Backend Developer', 'Algorithm Specialist']
        },
        {
          name: 'Algorithm Design',
          roles: ['Software Developer', 'Backend Developer']
        },
        {
          name: 'Java Advanced Concepts',
          roles: ['Software Developer', 'Backend Developer']
        }
      ]
    },
    {
      code: 'CSE 2133',
      title: 'File Processing COBOL',
      department: 'CSE',
      description: 'Introduction to COBOL programming language with a focus on file processing for business applications, batch processing, and data manipulation techniques.',
      skills: [
        {
          name: 'Legacy Systems',
          roles: ['Mainframe Developer', 'Systems Analyst']
        },
        {
          name: 'Batch Processing',
          roles: ['Backend Developer', 'Mainframe Developer']
        },
        {
          name: 'File Handling',
          roles: ['Data Engineer', 'Backend Developer']
        }
      ]
    },
    {
      code: 'CSE 3232',
      title: 'Software Requirements Analysis',
      department: 'CSE',
      description: 'Techniques for eliciting, analyzing, specifying, and validating software requirements, including user stories, use cases, and functional specifications for software systems.',
      skills: [
        {
          name: 'Requirements Gathering',
          roles: ['Business Analyst', 'Product Manager', 'Software Developer']
        },
        {
          name: 'Technical Documentation',
          roles: ['Technical Writer', 'Business Analyst', 'Project Manager']
        },
        {
          name: 'User Story Creation',
          roles: ['Business Analyst', 'Scrum Master', 'Product Owner']
        }
      ]
    },
    {
      code: 'CSE 3241',
      title: 'Introduction to Database Systems',
      department: 'CSE',
      description: 'Comprehensive introduction to database management systems, covering relational database design, SQL, normalization techniques, and database application development.',
      skills: [
        {
          name: 'SQL',
          roles: ['Database Developer', 'Data Analyst', 'Backend Developer']
        },
        {
          name: 'Database Design',
          roles: ['Database Architect', 'Full-Stack Developer']
        },
        {
          name: 'Data Normalization',
          roles: ['Database Developer', 'Data Engineer']
        },
        {
          name: 'Entity-Relationship Modeling',
          roles: ['Database Architect', 'System Analyst']
        }
      ]
    },
    
    // ACCTMIS Courses
    {
      code: 'ACCTMIS 3620',
      title: 'Foundations of Information Systems',
      department: 'ACCTMIS',
      description: 'Overview of information systems in business environments, including IT infrastructure, enterprise systems, e-commerce, and the role of IS in gaining competitive advantage.',
      skills: [
        {
          name: 'System Architecture',
          roles: ['Solutions Architect', 'System Analyst', 'IT Consultant']
        },
        {
          name: 'Enterprise Systems',
          roles: ['Business Analyst', 'ERP Specialist', 'IT Consultant']
        },
        {
          name: 'Business Process Analysis',
          roles: ['Business Analyst', 'Process Improvement Specialist']
        }
      ]
    },
    {
      code: 'ACCTMIS 4630',
      title: 'Business Systems Application Development',
      department: 'ACCTMIS',
      description: 'Development of business applications using programming languages and tools, focusing on creating solutions that address specific business needs and integrate with existing systems.',
      skills: [
        {
          name: 'Business Application Development',
          roles: ['Business Application Developer', 'Software Developer']
        },
        {
          name: 'Systems Integration',
          roles: ['Integration Specialist', 'Solution Architect']
        },
        {
          name: 'Software Development Lifecycle',
          roles: ['Project Manager', 'Software Developer', 'DevOps Engineer']
        }
      ]
    },
    {
      code: 'ACCTMIS 4670',
      title: 'IS Planning & Management',
      department: 'ACCTMIS',
      description: 'Strategic planning and management of information systems, including IT governance, portfolio management, and aligning IT investments with business goals.',
      skills: [
        {
          name: 'IT Strategic Planning',
          roles: ['IT Manager', 'CIO', 'IT Director']
        },
        {
          name: 'IT Governance',
          roles: ['IT Manager', 'Compliance Officer', 'IT Consultant']
        },
        {
          name: 'Project Portfolio Management',
          roles: ['Portfolio Manager', 'Project Manager', 'IT Director']
        }
      ]
    },
    
    // BUSOBA Courses
    {
      code: 'BUSOBA 2320',
      title: 'Business Statistics',
      department: 'BUSOBA',
      description: 'Statistical methods for business decision-making, including descriptive statistics, probability distributions, hypothesis testing, and regression analysis.',
      skills: [
        {
          name: 'Statistical Analysis',
          roles: ['Data Analyst', 'Business Analyst', 'Data Scientist']
        },
        {
          name: 'Data-Driven Decision Making',
          roles: ['Project Manager', 'Business Analyst', 'Product Manager']
        },
        {
          name: 'Quantitative Analysis',
          roles: ['Data Analyst', 'Quantitative Analyst']
        }
      ]
    },
    {
      code: 'BUSOBA 2321',
      title: 'Business Analytics',
      department: 'BUSOBA',
      description: 'Application of statistical and quantitative methods to analyze business data and make informed business decisions using descriptive, predictive, and prescriptive analytics.',
      skills: [
        {
          name: 'Data Visualization',
          roles: ['Data Analyst', 'Business Intelligence Analyst']
        },
        {
          name: 'Business Intelligence',
          roles: ['BI Developer', 'Data Analyst', 'Business Analyst']
        },
        {
          name: 'Predictive Modeling',
          roles: ['Data Scientist', 'Predictive Analyst']
        }
      ]
    },
    {
      code: 'BUSOBA 3230',
      title: 'Introduction to Operations Management',
      department: 'BUSOBA',
      description: 'Principles of designing, operating, and improving the processes that transform resources into goods and services, focusing on efficiency and productivity.',
      skills: [
        {
          name: 'Process Optimization',
          roles: ['Process Engineer', 'Operations Analyst', 'DevOps Engineer']
        },
        {
          name: 'Quality Management',
          roles: ['Quality Assurance Specialist', 'Project Manager']
        },
        {
          name: 'Resource Planning',
          roles: ['Resource Manager', 'Project Manager', 'Operations Analyst']
        }
      ]
    },
    
    // BUSML Courses
    {
      code: 'BUSML 3380',
      title: 'Logistics Management',
      department: 'BUSML',
      description: 'Management of the physical flow of products, services, and information through the supply chain, including transportation, inventory, and distribution systems.',
      skills: [
        {
          name: 'Supply Chain Systems',
          roles: ['Supply Chain Analyst', 'Logistics Coordinator']
        },
        {
          name: 'Distribution Network Design',
          roles: ['Logistics Analyst', 'Supply Chain Manager']
        },
        {
          name: 'Data-Driven Logistics',
          roles: ['Logistics Analyst', 'Data Analyst']
        }
      ]
    },
    
    // MATH Courses
    {
      code: 'MATH 1130',
      title: 'College Algebra for Business',
      department: 'MATH',
      description: 'Algebraic concepts and techniques applied to business problems, including linear equations, exponential functions, logarithms, and financial mathematics.',
      skills: [
        {
          name: 'Mathematical Modeling',
          roles: ['Financial Analyst', 'Data Scientist', 'Quantitative Developer']
        },
        {
          name: 'Analytical Problem Solving',
          roles: ['Software Developer', 'Systems Analyst', 'Data Scientist']
        }
      ]
    },
    {
      code: 'MATH 1131',
      title: 'Calculus for Business',
      department: 'MATH',
      description: 'Applications of differential and integral calculus to business and economics, including optimization, elasticity, marginal analysis, and cost-benefit analysis.',
      skills: [
        {
          name: 'Optimization Techniques',
          roles: ['Algorithm Developer', 'Data Scientist', 'Operations Researcher']
        },
        {
          name: 'Quantitative Modeling',
          roles: ['Financial Analyst', 'Data Scientist', 'Quantitative Developer']
        },
        {
          name: 'Analytical Thinking',
          roles: ['Software Developer', 'Data Scientist']
        }
      ]
    },
    {
      code: 'MATH 2366',
      title: 'Introduction to Discrete Mathematics',
      department: 'MATH',
      description: 'Introduction to mathematical foundations of computer science, including set theory, logic, graph theory, combinatorics, and algorithm analysis.',
      skills: [
        {
          name: 'Logical Reasoning',
          roles: ['Software Developer', 'Algorithm Designer', 'Security Analyst']
        },
        {
          name: 'Algorithm Analysis',
          roles: ['Algorithm Engineer', 'Software Developer', 'Data Structure Specialist']
        },
        {
          name: 'Graph Theory',
          roles: ['Network Engineer', 'Algorithm Designer', 'Data Scientist']
        }
      ]
    },
    
    // STAT Courses
    {
      code: 'STAT 1430',
      title: 'Statistics for Business Sciences',
      department: 'STAT',
      description: 'Statistical methods for business analysis, including descriptive statistics, probability, sampling distributions, confidence intervals, and hypothesis testing.',
      skills: [
        {
          name: 'Statistical Testing',
          roles: ['Data Analyst', 'Research Analyst', 'Data Scientist']
        },
        {
          name: 'Data Analysis',
          roles: ['Data Analyst', 'Business Analyst', 'Market Researcher']
        },
        {
          name: 'Statistical Software',
          roles: ['Data Analyst', 'Research Analyst', 'Data Scientist']
        }
      ]
    },
    
    // BUSMHR Courses
    {
      code: 'BUSMHR 2292',
      title: 'Business Skills & Environment',
      department: 'BUSMHR',
      description: 'Development of professional skills in business environments, including communication, teamwork, and ethical decision-making within organizations.',
      skills: [
        {
          name: 'Professional Communication',
          roles: ['Project Manager', 'Team Lead', 'Business Analyst']
        },
        {
          name: 'Team Collaboration',
          roles: ['Scrum Master', 'Team Lead', 'Project Manager']
        },
        {
          name: 'Business Ethics',
          roles: ['Project Manager', 'IT Manager', 'Technical Lead']
        }
      ]
    },
    {
      code: 'BUSMHR 2500',
      title: 'Entrepreneurship',
      department: 'BUSMHR',
      description: 'Introduction to entrepreneurial thinking, opportunity recognition, business model development, and startup strategies in technology-driven environments.',
      skills: [
        {
          name: 'Innovative Thinking',
          roles: ['Product Manager', 'Startup Founder', 'Innovation Lead']
        },
        {
          name: 'Business Model Design',
          roles: ['Product Manager', 'Business Developer', 'Startup Founder']
        },
        {
          name: 'Market Analysis',
          roles: ['Product Manager', 'Market Analyst', 'Business Developer']
        }
      ]
    },
    {
      code: 'BUSMHR 3200',
      title: 'Organizational Behavior & Human Resources',
      department: 'BUSMHR',
      description: 'Exploration of individual and group behavior in organizations, leadership styles, motivation techniques, and effective team management strategies.',
      skills: [
        {
          name: 'Team Leadership',
          roles: ['Technical Lead', 'Engineering Manager', 'Scrum Master']
        },
        {
          name: 'Conflict Resolution',
          roles: ['Project Manager', 'Team Lead', 'Scrum Master']
        },
        {
          name: 'Performance Management',
          roles: ['Engineering Manager', 'Technical Lead', 'Project Manager']
        }
      ]
    },
    {
      code: 'BUSMHR 4490',
      title: 'Strategic Management',
      department: 'BUSMHR',
      description: 'Comprehensive analysis of strategic management principles, focusing on organizational strategy formulation, implementation, and evaluation in competitive environments.',
      skills: [
        {
          name: 'Strategic Planning',
          roles: ['Product Manager', 'IT Director', 'CTO']
        },
        {
          name: 'Competitive Analysis',
          roles: ['Product Manager', 'Business Analyst', 'Strategy Consultant']
        },
        {
          name: 'Business Strategy',
          roles: ['IT Director', 'CTO', 'Product Director']
        }
      ]
    },
    
    // BUSFIN Courses
    {
      code: 'BUSFIN 3220',
      title: 'Business Finance',
      department: 'BUSFIN',
      description: 'Financial management in business organizations, including capital budgeting, working capital management, and financing decisions for technology projects and infrastructure.',
      skills: [
        {
          name: 'Technology Investment Analysis',
          roles: ['IT Financial Analyst', 'Project Manager', 'IT Director']
        },
        {
          name: 'Budget Management',
          roles: ['Project Manager', 'IT Financial Analyst', 'Development Manager']
        },
        {
          name: 'Cost-Benefit Analysis',
          roles: ['Business Analyst', 'Project Manager', 'Product Manager']
        }
      ]
    }
  ];

  getAllCourses(): Course[] {
    return this.courses;
  }

  getCoursesByDepartment(department: string): Course[] {
    return this.courses.filter(course => course.department === department);
  }

  getCoursesBySkill(skill: string): Course[] {
    return this.courses.filter(course => 
      course.skills.some(s => s.name === skill)
    );
  }
}