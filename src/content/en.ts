import type { SiteCopy } from './types'

import poolImg from '@/assets/spaces/image-2.webp'
import fitnessImg from '@/assets/spaces/image-3.webp'
import basketballImg from '@/assets/spaces/image-4.webp'
import banquetImg from '@/assets/spaces/image-5.webp'
import libraryImg from '@/assets/spaces/image-6.webp'
import theatreImg from '@/assets/spaces/image-7.webp'
import conferenceImg from '@/assets/spaces/image-8.webp'
import nurseryImg from '@/assets/spaces/image-9.webp'
import seniorImg from '@/assets/spaces/image-10.webp'
import teachingImg from '@/assets/spaces/image-11.webp'
import officeImg from '@/assets/spaces/image-12.webp'

/** Prose is the organisation's own, from `Version-07:26 ACC Website Building.docx`.
 *  Wording may be tightened; factual claims may not be changed or added. */
export const en: SiteCopy = {
  locale: 'en',
  localeName: 'English',

  org: {
    name: 'Asian Community Center · Under 30',
    short: 'ACC-U30',
    mission: 'Building inclusive communities through culture, connection, and opportunity.',
    missionLead: 'Building inclusive communities through',
    missionAccent: 'culture, connection, and opportunity.',
    city: 'New York City',
    kind: 'Nonprofit',
    summary:
      'A nonprofit incubating ventures started by its members — and developing a community building in New York City for culture, education, wellness, business and public service, across generations.',
    statusRail: [
      'Four ventures operating',
      'One building in development',
      'Membership by nomination',
    ],
  },

  nav: [
    { label: 'Vision', to: '/vision', floor: '01' },
    { label: 'Ventures', to: '/ventures', floor: '02' },
    { label: 'The Building', to: '/building', floor: '03' },
    { label: 'Leadership', to: '/leadership', floor: '04' },
    { label: 'News & Events', to: '/news', floor: '05' },
    { label: 'Partners', to: '/partners', floor: '06' },
    { label: 'Membership', to: '/membership', floor: '07' },
    { label: 'Contact', to: '/contact', floor: '08' },
  ],

  directory: [
    { label: 'Vision', note: 'Seven pillars', floor: '01', to: '/vision' },
    { label: 'Ventures', note: 'Four, incubated', floor: '02', to: '/ventures' },
    { label: 'Encountra', note: 'Social platform', floor: '02·A', to: '/ventures/encountra', tenant: true },
    { label: 'Curtain Media', note: 'Documentary', floor: '02·B', to: '/ventures/curtain', tenant: true },
    { label: 'Application Advisory', note: 'Advisory', floor: '02·C', to: '/ventures/application-advisory', tenant: true },
    { label: 'Ring-ing', note: 'Career workspace', floor: '02·D', to: '/ventures/ring-ing', tenant: true },
    { label: 'The Building', note: 'Eleven spaces · planned', floor: '03', to: '/building' },
    { label: 'Leadership', note: 'Four founders', floor: '04', to: '/leadership' },
    { label: 'News & Events', note: 'Programmes held', floor: '05', to: '/news' },
    { label: 'Partners', note: 'Supporters', floor: '06', to: '/partners' },
    { label: 'Membership', note: 'By nomination', floor: '07', to: '/membership' },
    { label: 'Contact', note: 'Enquiries', floor: '08', to: '/contact' },
  ],

  actions: {
    partner: 'Partner with us',
    seeWork: 'See the four ventures',
    readProgramme: 'Read the programme',
    enquire: 'Send an enquiry',
    nominate: 'Express interest',
  },

  home: {
    directoryHeading: 'What is inside',
    directoryNote: 'Every section of this organisation, indexed.',
    claimHeading: 'Most networks convene people. We are putting up a building.',
    claimBody: [
      'ACC-U30 is a nonprofit that incubates ventures started by its members and is developing a community building in New York City — programmed for culture, education, wellness, business and public service across generations.',
      'Four ventures are operating today. The building is in development. What follows is the organisation, floor by floor.',
    ],
  },

  vision: {
    title: 'Vision',
    standfirst:
      'Seven pillars define who we are, how we lead, and what we are building — rooted in Asian heritage, oriented toward global contribution.',
    pillars: [
      {
        number: '01',
        title: 'Cultural Root',
        body: 'ACC is built on the depth of Asian and Chinese cultural heritage, shaped by values such as discipline, resilience, humility, and long-term thinking. We see cultural identity not as a limitation, but as a source of confidence, stability, and inner strength.',
      },
      {
        number: '02',
        title: 'Identity',
        body: 'We encourage young Asians to develop intellectual independence and self-possession. Our members do not define success through assimilation alone. Instead, we stand firmly within our own cultural foundations while engaging openly with the wider world.',
      },
      {
        number: '03',
        title: 'Leadership',
        body: 'ACC aims to cultivate young leaders who create real value through innovation, responsibility, and execution. We believe leadership is not performative influence, but the ability to build systems, support others, and turn ideas into lasting impact.',
      },
      {
        number: '04',
        title: 'Institution',
        body: 'ACC is building more than a social network. We are developing cross-field infrastructure that connects Asian talent across finance, technology, entrepreneurship, public affairs, media, education, and the arts. Our goal is to create an ecosystem where resources, people, and opportunities can move with structure and purpose.',
      },
      {
        number: '05',
        title: 'Civic Presence',
        body: 'We believe influence should be earned through contribution, competence, and ethical responsibility. We prepare members to participate in public service, policy, business, and civic life, ensuring that Asian perspectives are represented where important decisions are made.',
      },
      {
        number: '06',
        title: 'Bridge',
        body: 'ACC serves as a bridge between East and West. Through bicultural fluency, global education, and cross-community collaboration, our members help translate Asian cultural depth into modern global discourse without losing their own identity.',
      },
      {
        number: '07',
        title: 'Legacy',
        body: 'Our long-term vision is to build continuity beyond individual achievement. Every project, mentorship, partnership, and institution we create should leave stronger foundations for future generations. Our measure of success is not only personal recognition, but the depth of trust, influence, and community infrastructure we leave behind.',
      },
    ],
    closing:
      'Our measure of success is not only personal recognition, but the depth of trust, influence, and community infrastructure we leave behind.',
  },

  ventures: {
    title: 'Ventures',
    standfirst:
      'Four ventures started by members and incubated by ACC-U30. Each is described in its own terms — the sections below differ because the ventures do.',
    items: [
      {
        slug: 'encountra',
        name: 'Encountra',
        category: 'AI social platform',
        floor: '02·A',
        summary:
          'An AI-driven, privacy-first social platform building high-trust relationships within the international student community.',
        sections: [
          {
            label: 'About',
            body: [
              'Encountra is an AI-driven social platform designed to foster high-trust relationships within the international student community. We build a premium, privacy-first platform, helping the community increase high-quality match success rates and date efficiency to measurable and sustainable levels in unfamiliar and fast-paced environments.',
            ],
          },
          {
            label: 'Industry Overview',
            body: [
              'The dating and social networking market is shifting from exposure-based matching to trust-based relationship formation. While traditional platforms help users meet more people, they often fail to solve deeper problems such as unclear intention, privacy concerns, cultural mismatch, and low offline conversion.',
            ],
          },
          {
            label: 'Opportunity',
            body: [
              'Encountra focuses on this gap by building a more structured, AI-supported, and privacy-first relationship experience for international students. International students live in high-pressure, highly mobile environments where time cost, trust cost, and social risk are unusually high. This creates a strong demand for a platform that helps users meet fewer but better-matched people, understand each other faster, and move from online interaction to real-world connection more efficiently.',
              'Encountra enters through this focused community and can later expand into broader high-education, globally mobile user groups.',
            ],
          },
          {
            label: 'Impact & Goals',
            body: [
              'Encountra aims to make relationship formation more trusted, efficient, and meaningful. Through AI-powered matching, identity verification, privacy boundaries, and relationship guidance, we help users reduce low-quality interactions and build stronger real-world connections.',
              'In the long term, Encountra seeks to become a premium relationship infrastructure for international students and young global communities.',
            ],
          },
        ],
      },
      {
        slug: 'curtain',
        name: 'Curtain Media',
        category: 'Documentary media',
        floor: '02·B',
        summary:
          'A documentary and interview media project on the people, cultures, and communities that shape American regions. The first episode centres on Brooklyn.',
        sections: [
          {
            label: 'About',
            body: [
              'Curtain Media is a documentary and interview-based media project exploring the people, cultures, and communities that shape different regions of the United States. We produce refined documentary episodes, with each episode centered on a specific location or cultural theme.',
              'Our first documentary focuses on Brooklyn through its landmarks, food, art, entertainment, ethnic diversity, community activities, and local leaders. Future episodes may explore other American cities and themes such as regional cuisine, visual arts, immigration, music, and public life.',
            ],
          },
          {
            label: 'Industry Overview',
            body: [
              'Digital media is increasingly dominated by short-form travel and lifestyle content, which often lacks cultural depth and local context. Traditional documentaries provide stronger storytelling but are usually expensive, slow to produce, and less adaptable to digital platforms.',
              'Curtain Media combines documentary-quality research and storytelling with the pacing, accessibility, and distribution flexibility of modern digital media.',
            ],
          },
          {
            label: 'Content Structure',
            body: [
              'Each documentary combines host-led exploration, observational footage, historical context, community activities, and conversations with local residents and public figures.',
              'Rather than presenting locations as simple travel destinations, Curtain Media examines how people, institutions, traditions, and public spaces shape the identity of a community.',
            ],
          },
          {
            label: 'Interview Content',
            body: [
              'Alongside each documentary, Curtain Media produces medium- and long-form interviews with community leaders, artists, entrepreneurs, public officials, organizers, and cultural figures.',
              'Complete interviews can be released independently, while selected segments are incorporated into the documentary to strengthen its central narrative.',
            ],
          },
          {
            label: 'Content Distribution',
            body: [
              'Each production generates multiple connected formats, including a full documentary, edited interviews, medium-length thematic segments, and short-form social media clips.',
              'This integrated workflow allows Curtain Media to reach different audiences, maintain consistent distribution, and extend the value of every production.',
            ],
          },
          {
            label: 'Market Entry & Expansion',
            body: [
              'Curtain Media will initially focus on culturally distinctive communities in New York City and other major U.S. regions. Brooklyn serves as the first project because of its history, diversity, public culture, and internationally recognizable identity.',
              'The project can later expand through collaborations with cultural institutions, community organizations, universities, businesses, and public figures.',
            ],
          },
          {
            label: 'Impact & Goals',
            body: [
              'Curtain Media aims to make regional culture and community stories more visible, engaging, and accessible to domestic and international audiences.',
              'In the long term, we seek to build a recognizable documentary and interview platform that records the people, cultures, and social forces shaping contemporary America.',
            ],
          },
        ],
      },
      {
        slug: 'application-advisory',
        name: 'Application Advisory',
        category: 'Education advisory',
        floor: '02·C',
        summary:
          'Targeted, task-based guidance for undergraduate admissions, graduate pathways, and early professional career planning.',
        sections: [
          {
            label: 'About',
            body: [
              'This is a specialized consulting project designed to support students in college undergraduate admissions, graduate pathways, and early professional career planning. Instead of offering a generic one-size-fits-all service, we focus on targeted, task-based guidance across competition preparation, essay strategy, resource connection, application positioning, and short-term practical projects.',
            ],
          },
          {
            label: 'Industry Overview',
            body: [
              'The admissions consulting industry is already highly crowded, with many agencies offering full-package services for college, graduate school, and career applications. However, many students still need more flexible, specialized, and high-quality support for specific parts of their application journey. This creates a clear demand for advisory services that are more targeted, resource-driven, and execution-focused.',
            ],
          },
          {
            label: 'Main Services',
            body: [
              'We provide customized support in several key areas: college application strategy, essay brainstorming and revision, competition guidance, academic project development, consultant and mentor matching, and career exploration.',
              'For students interested in business, finance, consulting, or politics-related fields, we also offer industry insight, career pathway guidance, and access to experienced professionals across relevant networks.',
            ],
          },
          {
            label: 'Impact & Goals',
            body: [
              'Our goal is to make high-quality application and career advisory more precise, efficient, and accessible. Rather than requiring students to commit to expensive full-package programs, we provide targeted support for specific needs at different stages.',
              'Through professional mentorship, strong U.S.-based networks, and task-oriented consulting, we help students receive practical guidance with clearer value, stronger execution, and better long-term outcomes.',
            ],
          },
        ],
      },
      {
        slug: 'ring-ing',
        name: 'Ring-ing',
        category: 'Career workspace',
        floor: '02·D',
        summary:
          'An AI-native career development workspace connecting job search, profiling, outreach, interview preparation, and learning into one continuous workflow.',
        sections: [
          {
            label: 'About',
            body: [
              'Ring-Ing is an AI-native career development workspace designed to help students and young professionals navigate the full recruiting process within one integrated platform. Rather than providing isolated tools for job searching, resume revision, networking, interview preparation, and career planning, Ring-Ing horizontally connects these functions into a continuous and personalized workflow.',
              'The platform combines career intelligence, user profiling, AI-supported execution, structured learning, and long-term progress management. It is initially focused on finance, consulting, business, and related professional pathways, with the underlying architecture designed to expand into technology, law, media, education, public affairs, and other industries.',
            ],
          },
          {
            label: 'Industry Overview',
            body: [
              'The career services market remains highly fragmented. Students often need to move between job boards, school career centers, social platforms, alumni networks, interview preparation tools, online courses, and expensive private advisory agencies to complete a single recruiting process.',
              'Traditional platforms are usually designed around one function. Job boards distribute openings but provide limited strategic guidance. General AI tools can answer questions but do not continuously understand the user, track market changes, manage recruiting timelines, and connect recommendations with actual execution. Private career agencies may offer personalized support, but their services are frequently expensive, labor-intensive, and difficult to scale.',
              'Young professionals do not only need more information. They need a structured system that helps them understand what matters, identify suitable opportunities, organize their preparation, and take the next action at the right time.',
            ],
          },
          {
            label: 'Product Structure',
            body: [
              'Ring-Ing brings multiple career functions into one shared workspace. The platform is designed to support users across several connected areas: career and recruiting news, opportunity discovery, company and role research, personal career profiling, resume and LinkedIn optimization, cold outreach, networking strategy, application planning, interview preparation, technical learning, and offer-related decision support.',
              'Instead of treating these functions as separate tools, Ring-Ing connects them through a shared user profile, memory system, calendar, task workflow, and personalized dashboard. Information collected in one part of the platform can improve recommendations and execution across the rest of the user journey.',
              'The long-term product vision also includes AI-generated technical courses. Users will be able to select a professional topic and receive dynamically generated teaching materials, live presentation slides, and instruction delivered by an AI digital presenter. This transforms career education from a static content library into a responsive learning experience that can adapt to different industries, roles, and individual preparation needs.',
            ],
          },
          {
            label: 'Human Network & Industry Intelligence',
            body: [
              'Ring-Ing is not designed as a purely automated AI product. Its intelligence layer will be strengthened by experienced professionals, alumni, successful and unsuccessful recruiting cases, student organizations, and industry-specific advisors.',
              'Through ACC-U30’s broader network, the project can connect with professionals across finance, consulting, technology, entrepreneurship, public affairs, education, and media. These relationships can support product validation, career content development, institutional partnerships, user networking, and the long-term improvement of the platform’s recommendation quality.',
              'The combination of AI infrastructure and real human experience allows Ring-Ing to provide advice that is more practical, contextual, and closely connected to actual recruiting environments.',
            ],
          },
          {
            label: 'Market Entry & Expansion',
            body: [
              'Ring-Ing will initially focus on finance and broader business-related recruiting, where the current team, advisors, and partner network have the strongest experience and where international students face particularly high information and preparation barriers.',
              'The platform can later apply the same underlying methodology to technology recruiting, consulting, accounting and audit, legal careers, media, education, healthcare, public affairs, and other professional sectors. Although the content and industry knowledge will change, the core workflow remains consistent: understand the user, identify the right opportunities, develop the required capabilities, organize execution, and improve through continuous feedback.',
              'Through partnerships with universities, career centers, student organizations, professional communities, and industry leaders, Ring-Ing aims to build a scalable user network across the United States and eventually expand into broader global markets.',
            ],
          },
          {
            label: 'Impact & Goals',
            body: [
              'Ring-Ing aims to make high-quality career preparation more integrated, intelligent, and accessible.',
              'In the short term, the platform helps users reduce information overload, understand recruiting pathways, organize preparation, and improve the quality of their applications and professional outreach. By bringing career information, planning, learning, and execution into one environment, Ring-Ing allows users to move from fragmented preparation toward a clearer and more manageable process.',
              'In the long term, Ring-Ing seeks to become a global career intelligence infrastructure: a platform where students and professionals can continuously understand the market, develop relevant capabilities, connect with real opportunities, and manage their career growth across industries and stages of life.',
            ],
          },
        ],
      },
    ],
  },

  building: {
    title: 'The ACC Office Building',
    standfirst:
      'A physical hub for the Asian community in New York City, combining culture, education, wellness, business, and public service in one integrated space.',
    statusNotice:
      'The building is in development. Everything on this page describes an intended programme, not an existing place.',
    imageryNotice:
      'The images on this page are references for the intended programme. They are not photographs of the ACC building.',
    about: {
      label: 'About',
      body: [
        'The ACC Office Building in New York City is designed as a physical hub for the Asian community, combining culture, education, wellness, business, and public service in one integrated space. More than a conventional office building, it will serve as a real-world community infrastructure where members can learn, connect, work, gather, and grow across generations.',
      ],
    },
    overview: {
      label: 'Building Overview',
      body: [
        'The building will bring together professional services, cultural events, educational programs, wellness facilities, and community support functions. Through multi-purpose spaces such as offices, classrooms, event halls, sports facilities, and family-oriented service areas, the ACC Office Building aims to create a complete urban center for Asian students, professionals, families, seniors, and community partners.',
      ],
    },
    spacesHeading: 'The programme',
    spaces: [
      {
        name: 'Swimming Pool',
        body: 'The swimming pool provides a clean and structured wellness space for members of the community. It supports daily fitness, youth training, recreational activities, and health-oriented programming, helping the building serve not only as a professional center but also as a lifestyle and wellness hub.',
        image: poolImg,
        imageNote: 'Reference · lap pool',
      },
      {
        name: 'Fitness Center',
        body: 'The fitness center is designed for daily exercise, personal training, and community wellness programs. Equipped for both individual workouts and guided fitness activities, it encourages members to maintain physical health while staying connected to the broader ACC community.',
        image: fitnessImg,
        imageNote: 'Reference · training floor',
      },
      {
        name: 'Basketball Arena',
        body: 'The basketball arena creates a dynamic space for sports, youth activities, tournaments, and community recreation. It supports both casual play and organized events, giving younger members a place to build teamwork, discipline, and social connection through athletics.',
        image: basketballImg,
        imageNote: 'Reference · indoor court',
      },
      {
        name: 'Banquet Hall',
        body: 'The banquet hall serves as a formal gathering space for dinners, ceremonies, fundraising events, cultural celebrations, and community receptions. It is designed to host high-value social and professional occasions while strengthening ACC’s role as a center for Asian community engagement.',
        image: banquetImg,
        imageNote: 'Reference · banquet setting',
      },
      {
        name: 'Library',
        body: 'The library provides a quiet environment for reading, research, study, and cultural learning. It supports students, professionals, and lifelong learners by offering a focused intellectual space within the building’s broader community ecosystem.',
        image: libraryImg,
        imageNote: 'Reference · reading room',
      },
      {
        name: 'Grand Theatre',
        body: 'The grand theatre is designed for major cultural performances, public forums, speaker events, film screenings, and large-scale community programs. As one of the building’s most important public-facing spaces, it gives ACC the capacity to host influential cultural, educational, and civic events.',
        image: theatreImg,
        imageNote: 'Reference · auditorium',
      },
      {
        name: 'Conference Hall',
        body: 'The conference hall supports lectures, business meetings, policy discussions, workshops, and professional forums. It is built for structured communication and high-level exchange, making it suitable for ACC programs related to business, education, public affairs, and cross-community collaboration.',
        image: conferenceImg,
        imageNote: 'Reference · assembly room',
      },
      {
        name: 'Nursery',
        body: 'The nursery provides a safe, welcoming, and child-friendly space for families. It supports early childhood care, parent-child activities, and family-oriented community services, helping the ACC Office Building become accessible not only to individuals but also to young families.',
        image: nurseryImg,
        imageNote: 'Reference · early-years room',
      },
      {
        name: 'Senior Center',
        body: 'The senior center is dedicated to community care, social connection, and support for older Asian community members. It can host wellness programs, cultural activities, lectures, social gatherings, and intergenerational events, helping seniors remain active and connected.',
        image: seniorImg,
        imageNote: 'Reference · community gathering',
      },
      {
        name: 'Teaching Area',
        body: 'The teaching area is designed for classes, workshops, training programs, and educational seminars. It supports ACC’s role in academic development, career preparation, cultural education, and youth leadership training.',
        image: teachingImg,
        imageNote: 'Reference · lecture space',
      },
      {
        name: 'Office Area',
        body: 'The office area provides the operational foundation for ACC’s internal teams, partner organizations, consultants, and project leaders. It supports daily administration, program coordination, member services, and long-term organizational development.',
        image: officeImg,
        imageNote: 'Reference · workspace',
      },
    ],
  },

  leadership: {
    title: 'Leadership',
    standfirst: 'ACC-U30 was founded by four people and is run by them today.',
    pendingNote:
      'Biographies and portraits are being prepared and will be published here. We would rather leave this blank than fill it with a stand-in.',
    founders: [
      { name: 'Lincoln Zhu', role: 'Co-founder', bio: '', portrait: null },
      { name: 'Eric Zhang', role: 'Co-founder', bio: '', portrait: null },
      { name: 'Alex Zhu', role: 'Co-founder', bio: '', portrait: null },
      { name: 'Eric Yan', role: 'Co-founder', bio: '', portrait: null },
    ],
  },

  news: {
    title: 'News & Events',
    standfirst: 'Programmes, gatherings, and announcements from ACC-U30.',
    emptyHeading: 'Nothing published here yet',
    emptyBody:
      'ACC-U30 has held programmes and gatherings, and records of them will be published here as they are prepared. This page will not carry placeholder entries.',
  },

  partners: {
    title: 'Partners & Supporters',
    standfirst:
      'The institutions and individuals who support this work. Recognition here is a record of real contribution.',
    emptyHeading: 'Nothing published here yet',
    emptyBody:
      'ACC-U30 works with partners and supporters, and they will be named here once their consent to be listed has been confirmed. We do not list logos we have not been given permission to display.',
  },

  membership: {
    title: 'Membership',
    standfirst: 'ACC-U30 is a nominated membership. There is no open application.',
    body: [
      'Members are proposed by people already inside the organisation. We ask that anyone put forward is doing work someone else could point to — a company, a programme, a body of research, a service to a community.',
      'If you believe you should be part of this, the right first step is to tell us what you have built. If it fits, someone will take it forward.',
    ],
    criteriaHeading: 'What we look for',
    criteria: [
      'Under thirty at the time of nomination.',
      'Evidence of building something, rather than intention to build something.',
      'A willingness to contribute to other members’ work, not only to draw on it.',
      'Conduct that would survive being made public.',
    ],
    formNote:
      'Expressions of interest are read by the founders. We reply to the ones we take forward.',
  },

  contact: {
    title: 'Contact',
    standfirst: 'For partnership, press, and general enquiries.',
    generalHeading: 'General & partnership',
    generalBody:
      'For partnerships, sponsorship, institutional collaboration, and anything else — write to us and say plainly what you are proposing.',
    pressHeading: 'Press',
    pressBody:
      'For interviews, comment, and background on ACC-U30, its ventures, or the building.',
    addressHeading: 'Where we are',
    addressBody: 'New York City. A public address will be listed here once the office is confirmed.',
  },

  footer: {
    rights: 'Asian Community Center · Under 30',
    builtNote: 'New York City',
  },

  notFound: {
    title: 'Not on the board',
    body: 'There is no floor at that number. The directory below lists everything this organisation contains.',
    action: 'Back to the lobby',
  },
}
