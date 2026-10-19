window.TRACK = window.TRACK || { modules: [], exam: [] };
TRACK.modules.push({
 "id": "m1",
 "order": 1,
 "code": "Requirements",
 "title": "Design Methodology",
 "subtitle": "From business needs to defensible, documented design decisions",
 "outcomes": [
  "Separate business requirements, technical requirements, constraints and assumptions, and trace each to an owner",
  "Gather and validate requirements using people, data and documents",
  "Apply modularity, hierarchy, simplicity and scalability to compare options",
  "Score options with weighted decision matrices and sensitivity checks",
  "Write decision records and HLD/LLD documents, and read design scenarios systematically"
 ],
 "lessons": [
  {
   "id": "m1-l1",
   "title": "Requirements That Drive Design",
   "subtitle": "Separate what the business needs from how the network might deliver it",
   "minutes": 25,
   "objectives": [
    "Distinguish business requirements, technical requirements, constraints and assumptions",
    "Map stakeholders to the requirements they own and the risks they carry",
    "Translate vague business statements into measurable technical requirements",
    "Record requirements in a register that later decisions can trace back to"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Every design decision you will defend in the ZCDE Design Blueprint starts on the **Requirements sheet**. A design is not good or bad in the abstract; it is good or bad *for a given set of requirements and constraints*. Two architects can propose opposite topologies for the same building and both be right, because they were answering different requirements. The expert skill is not knowing the most technology — it is knowing which facts actually decide the design."
    },
    {
     "type": "framework",
     "title": "The five inputs on the Requirements sheet",
     "items": [
      {
       "label": "BR",
       "title": "Business requirement",
       "text": "What the organisation must achieve, in business language: open 40 branches in 18 months, pass a payment-card audit, cut the cost of connectivity by a fifth. Owned by executives and business units."
      },
      {
       "label": "TR",
       "title": "Technical requirement",
       "text": "A measurable property the network must have to satisfy a business requirement: 99.95% availability for the trading floor, under 150 ms one-way delay for voice, segmentation between cardholder and corporate systems."
      },
      {
       "label": "CON",
       "title": "Constraint",
       "text": "A fixed limit you must design within and cannot trade away: budget ceiling, a mandated vendor framework, an existing fibre plant, a regulator's data-residency rule, a change freeze, the skills of the operations team."
      },
      {
       "label": "ASM",
       "title": "Assumption",
       "text": "Something believed true but not yet verified: the carrier can deliver fibre to rural sites, traffic grows 30% a year, the cloud provider supports the required throughput. Every assumption is a risk until validated."
      },
      {
       "label": "RSK",
       "title": "Risk",
       "text": "An uncertain event that would hurt the outcome if it happened. Risks usually come from unvalidated assumptions, single points of failure, or dependencies on third parties."
      }
     ]
    },
    {
     "type": "compare",
     "title": "Business versus technical requirements",
     "columns": [
      {
       "title": "Business requirement",
       "items": [
        "Stated by sponsors and business owners",
        "Describes an outcome or a capability",
        "Often vague: \"the network must be reliable\"",
        "Changes when strategy changes",
        "Judges whether the project succeeded"
       ]
      },
      {
       "title": "Technical requirement",
       "items": [
        "Derived by the architect, agreed with owners",
        "Describes a measurable property",
        "Precise: \"no single failure isolates more than one floor\"",
        "Changes when the business requirement changes",
        "Judges whether the design is fit for purpose"
       ]
      }
     ]
    },
    {
     "type": "callout",
     "kind": "insight",
     "text": "A constraint removes options from the table; a preference only weights them. If the CIO says \"we would like to stay with our current switching vendor\", that is a preference you score in a decision matrix. If the procurement contract says \"all purchases must come from framework X until 2028\", that is a constraint and options outside it are not options at all. Misclassifying one as the other is one of the most common causes of a rejected design.",
     "title": "Constraints are not preferences"
    },
    {
     "type": "table",
     "title": "Translating business statements into technical requirements",
     "head": [
      "Business statement",
      "Clarifying question",
      "Technical requirement"
     ],
     "rows": [
      [
       "The tills must never stop",
       "What does a lost minute of trading cost, and how long can a till work offline?",
       "Each store keeps payment service through any single WAN or device failure; recovery within 30 seconds"
      ],
      [
       "We are moving to the cloud",
       "Which workloads, which regions, and what share of traffic by when?",
       "Provide private connectivity of 2 x 10 Gbps per region with diverse paths by Q3"
      ],
      [
       "Staff should work from anywhere",
       "Which applications, which devices, and which security posture is required?",
       "Identity-based access to internal applications without full-tunnel VPN for SaaS traffic"
      ],
      [
       "We must pass the audit",
       "Which standard, which scope, and which controls are network-relevant?",
       "Cardholder systems isolated in their own segment, with logged and filtered access only from named sources"
      ]
     ]
    },
    {
     "type": "steps",
     "title": "Identifying stakeholders and what they own",
     "items": [
      {
       "title": "List everyone affected",
       "text": "Sponsors, business-unit leads, application owners, security, operations, facilities, finance, procurement, regulators and — easily forgotten — the people who will run the network at 3 a.m."
      },
      {
       "title": "Record what each one decides",
       "text": "Who can approve a budget change, who owns the availability target, who can accept a residual risk. A requirement without an owner cannot be negotiated."
      },
      {
       "title": "Note influence and interest",
       "text": "High-influence stakeholders who are not interested are a hidden risk: they can block late. Engage them early with short, decision-focused briefings."
      },
      {
       "title": "Capture each stakeholder's success measure",
       "text": "Finance measures cost per site, operations measures mean time to repair, security measures audit findings. Your design must show progress on each measure that matters."
      }
     ]
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "\"We need SD-WAN\" or \"we need a stretched VLAN between data centres\" is a proposed solution, not a requirement. Ask *why* until you reach the underlying need — cheaper branch connectivity, or keeping a virtual machine's address when it moves — because a different solution may meet that need with less risk.",
     "title": "Requirements disguised as solutions"
    },
    {
     "type": "scenario",
     "title": "Classifying an input",
     "situation": "During a kickoff workshop the head of operations says: \"Our team of four has never run BGP in production and we cannot hire before next year.\" How should the architect record this?",
     "options": [
      {
       "text": "As a business requirement for staff training",
       "feedback": "Training may well be part of the answer, but the statement describes a limit the design must respect, not an outcome the business is asking the network to achieve.",
       "best": false
      },
      {
       "text": "As a constraint that limits which protocols and designs are realistic",
       "feedback": "Correct. Team size and skills cannot be traded away in the short term, so they limit which designs are realistic. The design can still include BGP, but only with a plan to manage that gap, such as a managed service or a phased introduction with training.",
       "best": true
      },
      {
       "text": "As an assumption to be validated later",
       "feedback": "Nothing about it is uncertain: the operations lead is stating a known fact about current capability. Recording it as an assumption would understate how firmly it limits the options.",
       "best": false
      },
      {
       "text": "As a preference to be weighted against cost and performance in the decision matrix",
       "feedback": "Skill gaps can be weighted as a criterion, but here the team has said it cannot operate the technology at all in the timeframe. That is a hard limit, so treating it as a soft preference would hide a real delivery risk.",
       "best": false
      }
     ]
    },
    {
     "type": "template",
     "title": "Requirements register",
     "purpose": "Capture every requirement, constraint and assumption with an owner and a way to verify it, so each later design decision can be traced back to the input that justified it.",
     "columns": [
      "ID",
      "Type (BR/TR/CON/ASM)",
      "Statement",
      "Owner",
      "Priority",
      "How verified",
      "Traces to decision"
     ],
     "example": [
      [
       "TR-07",
       "TR",
       "Trading-floor LAN survives any single device or link failure with under 1 s of disruption",
       "Head of trading technology",
       "Must",
       "Failure test in pre-production",
       "D-12 dual-homed access, D-15 BFD on uplinks"
      ],
      [
       "ASM-03",
       "ASM",
       "Carrier can deliver diverse fibre into the north site by June",
       "Network architect",
       "High",
       "Carrier survey and duct map",
       "D-04 dual WAN at north site"
      ]
     ],
     "rows": 8
    },
    {
     "type": "keypoints",
     "items": [
      "Every technical requirement is measurable and has an owner",
      "Constraints are listed separately and never weighted like preferences",
      "Assumptions carry a validation action and a date",
      "Non-functional needs — operability, manageability, growth — are captured, not only bandwidth and availability",
      "Conflicts between stakeholders are written down, not resolved silently by the architect"
     ],
     "title": "What separates an expert requirements analysis"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Business requirement",
       "def": "An outcome or capability the organisation needs, expressed in business terms and owned by a business stakeholder."
      },
      {
       "term": "Technical requirement",
       "def": "A measurable property of the network derived from a business requirement, such as an availability target or a delay budget."
      },
      {
       "term": "Constraint",
       "def": "A fixed limit on the design — budget, policy, regulation, existing assets, skills or time — that removes options rather than weighting them."
      },
      {
       "term": "Assumption",
       "def": "A statement treated as true for planning but not yet verified; each one is a potential risk until validated."
      },
      {
       "term": "Non-functional requirement",
       "def": "A requirement about how well the network operates — availability, manageability, security, scalability — rather than what it connects."
      },
      {
       "term": "Requirements traceability",
       "def": "The ability to link each design decision back to the requirement or constraint that justified it, and forward to how it is verified."
      },
      {
       "term": "Stakeholder",
       "def": "Any person or group affected by, or able to influence, the design and its outcome."
      },
      {
       "term": "Success measure",
       "def": "The metric a stakeholder uses to judge the project, such as cost per site, mean time to repair or audit findings."
      }
     ]
    },
    {
     "type": "reflection",
     "prompt": "Think of the last network change you worked on. Write down one requirement that was really a solution in disguise. What was the underlying need, and would a different design have met it more simply?"
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "A retail chain's finance director states that the project budget cannot exceed its approved amount under any circumstances. How should this be recorded?",
       "options": [
        "As a constraint that removes any option costing more than the approved amount",
        "As a business requirement to reduce the cost of connectivity across all stores",
        "As a weighted criterion in the decision matrix alongside performance and risk",
        "As an assumption about funding that must be validated with procurement later"
       ],
       "answer": 0,
       "explain": "A non-negotiable budget ceiling is a constraint: options above it are not viable at all. Weighting it would allow an expensive option to win on other criteria, and it is a known fact rather than an assumption."
      },
      {
       "q": "Which statement is a well-formed technical requirement?",
       "options": [
        "The network should always be fast and reliable enough for all of our users and sites",
        "Voice calls between any two sites must see under 150 ms one-way delay",
        "We need a modern software-defined WAN to replace the old circuits",
        "The business must reduce its carbon footprint across every region"
       ],
       "answer": 1,
       "explain": "Only the delay target is measurable and testable. The others are a vague quality, a solution in disguise, and a business goal with no network property attached."
      },
      {
       "q": "An architect assumes that a carrier can deliver diverse fibre to a rural site. What is the correct next step?",
       "options": [
        "Design the site as dual-homed because the carrier has always delivered on time before",
        "Remove the site from scope until the carrier formally commits to a delivery date",
        "Log it with an owner and a validation action, and treat it as a risk until confirmed",
        "Record it as a constraint because the carrier controls whether the fibre exists"
       ],
       "answer": 2,
       "explain": "Assumptions are acceptable for planning only if they are visible and validated. Designing as if it were fact hides the risk; removing the site or calling it a constraint misrepresents what is known."
      },
      {
       "q": "A stakeholder insists: \"We need a stretched VLAN between our two data centres.\" What should the architect do first?",
       "options": [
        "Accept it as a requirement because the stakeholder owns the application estate",
        "Reject it because stretching layer 2 between sites is considered poor practice",
        "Add it to the decision matrix as one weighted option among several designs",
        "Ask what outcome the stretched VLAN is meant to achieve"
       ],
       "answer": 3,
       "explain": "The request is a solution. Discovering the underlying need — for example address mobility for workload migration — lets the architect consider options that meet it with less shared failure risk, or confirm the stretch is truly needed."
      },
      {
       "q": "Why should the operations team be treated as a key stakeholder in design?",
       "options": [
        "They usually control the project budget and sign off on all hardware purchases",
        "They own the network after go-live, so their skills limit which designs succeed",
        "They are responsible for writing the business case and choosing the vendors",
        "They decide the availability targets that each business unit is allowed to request"
       ],
       "answer": 1,
       "explain": "A design the operations team cannot run safely will fail in production regardless of its elegance. Budget, business cases and availability targets usually sit with other stakeholders."
      }
     ]
    }
   ]
  },
  {
   "id": "m1-l2",
   "title": "Gathering and Validating Requirements",
   "subtitle": "Turn interviews, data and documents into a trustworthy baseline",
   "minutes": 25,
   "objectives": [
    "Plan a requirements-gathering approach that combines people, data and documents",
    "Baseline the current state with measured evidence rather than opinion",
    "Prioritise requirements and surface conflicts between stakeholders",
    "Validate requirements before committing to a design"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Requirements are gathered, not invented. The most expensive design failures come from requirements that were wrong from the start — a growth forecast nobody checked, a latency-sensitive application nobody mentioned, a regulatory scope that was misunderstood. Gathering is therefore a deliberate process with three sources: **people** (what they need), **data** (what the network actually does), and **documents** (what the organisation has committed to)."
    },
    {
     "type": "flow",
     "title": "Requirements-gathering pipeline",
     "items": [
      {
       "label": "Plan",
       "text": "Scope, stakeholders, sources and timebox"
      },
      {
       "label": "Elicit",
       "text": "Interviews, workshops, document review"
      },
      {
       "label": "Baseline",
       "text": "Measure traffic, inventory and incidents"
      },
      {
       "label": "Analyse",
       "text": "Classify, quantify and find conflicts"
      },
      {
       "label": "Prioritise",
       "text": "Agree what is essential versus desirable"
      },
      {
       "label": "Validate",
       "text": "Play back and obtain sign-off"
      }
     ]
    },
    {
     "type": "table",
     "title": "Elicitation techniques and when to use them",
     "head": [
      "Technique",
      "Best for",
      "Watch out for"
     ],
     "rows": [
      [
       "One-to-one interview",
       "Senior stakeholders, sensitive topics, hidden constraints",
       "Hearing one view only; confirm with data"
      ],
      [
       "Facilitated workshop",
       "Cross-team trade-offs and agreeing priorities",
       "Loudest voice dominates; use structured voting"
      ],
      [
       "Document review",
       "Contracts, policies, audit reports, previous designs",
       "Out-of-date documents presented as current"
      ],
      [
       "Traffic and flow analysis",
       "Real application mix, peaks, growth trends",
       "Short samples that miss month-end or seasonal peaks"
      ],
      [
       "Incident and change history",
       "Recurring failure modes and fragile areas",
       "Poor ticket hygiene hiding the real cause"
      ],
      [
       "Site survey",
       "Physical facts: cabling, power, cooling, ducts",
       "Assuming every site matches the standard template"
      ]
     ]
    },
    {
     "type": "steps",
     "title": "Baselining the current state",
     "items": [
      {
       "title": "Inventory",
       "text": "Devices, software levels, end-of-support dates, circuits and contract terms. You cannot plan a migration without knowing what exists."
      },
      {
       "title": "Topology and dependencies",
       "text": "Physical and logical topology, routing domains, shared services (DNS, DHCP, identity, time) and the applications that depend on them."
      },
      {
       "title": "Traffic",
       "text": "Utilisation at the 95th percentile and the peak, top talkers, application mix, directionality (north-south versus east-west) and growth over at least a full business cycle."
      },
      {
       "title": "Health and incidents",
       "text": "Error rates, outages and their root causes, change-failure rate. These reveal where the current design hurts the business."
      },
      {
       "title": "Operations",
       "text": "Tooling, monitoring coverage, automation maturity, team size and on-call model. These set realistic limits on new complexity."
      }
     ]
    },
    {
     "type": "callout",
     "kind": "pro",
     "text": "A 30% average utilisation can hide a link that saturates for twenty minutes every morning when backups overlap with log-ins. Size and prioritise from the 95th percentile and the observed peak over a representative period, and ask the business which periods matter most — month-end, exam week, a shipping season.",
     "title": "Measure peaks, not averages"
    },
    {
     "type": "framework",
     "title": "MoSCoW prioritisation",
     "items": [
      {
       "label": "M",
       "title": "Must have",
       "text": "Without it the solution fails its purpose or breaks a law or contract. Must-haves are few; if everything is a must, nothing is."
      },
      {
       "label": "S",
       "title": "Should have",
       "text": "Important and expected, but a workaround exists for a short time."
      },
      {
       "label": "C",
       "title": "Could have",
       "text": "Desirable if time and budget allow; first to be dropped under pressure."
      },
      {
       "label": "W",
       "title": "Won't have (this time)",
       "text": "Explicitly out of scope for this phase — recording it prevents silent scope creep."
      }
     ]
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "Security wants every flow inspected by a central firewall; the trading desk wants the lowest possible latency between two server racks. Both are legitimate. The architect's job is to make the conflict visible, describe the options and their consequences, and let the owners decide — not to resolve it quietly by favouring the requirement the architect personally prefers.",
     "title": "Conflicting requirements"
    },
    {
     "type": "scenario",
     "title": "Validating a growth assumption",
     "situation": "A logistics company's IT manager tells you WAN traffic \"roughly doubles every year\". Your 12-month interface data shows 18% annual growth at the 95th percentile, but the company plans to roll out video-based remote inspection next year. What is the best approach?",
     "options": [
      {
       "text": "Size for 100% annual growth because the IT manager knows the business best",
       "feedback": "Opinion should be tested against data. Doubling every year would overbuild the WAN substantially and spend budget that other requirements need.",
       "best": false
      },
      {
       "text": "Size from the 18% trend only, because historic data is the most reliable evidence",
       "feedback": "History ignores a planned change that could dominate demand. A requirement driver the business has already announced must be included.",
       "best": false
      },
      {
       "text": "Defer the sizing decision until the video service is live and can be measured",
       "feedback": "Waiting removes the evidence problem but leaves the design without a sizing basis. Circuits and hardware have lead times; a modelled, validated estimate is better than no estimate.",
       "best": false
      },
      {
       "text": "Use the measured trend plus a named uplift for video, confirmed with owners",
       "feedback": "Correct. Measured data anchors the baseline, while the known new service is modelled separately as a named driver. Playing the result back makes the assumption visible and agreed.",
       "best": true
      }
     ]
    },
    {
     "type": "checklist",
     "title": "Requirements validation checklist",
     "items": [
      "Every requirement has an owner who has confirmed it in writing",
      "Technical requirements are measurable and have a stated test",
      "Peaks and growth are based on data over a representative period",
      "Regulatory and contractual obligations have been checked against source documents",
      "Conflicts are recorded with the options and the decision owner",
      "Assumptions have validation actions and target dates",
      "Out-of-scope items are explicitly listed",
      "The requirements were played back to stakeholders and signed off"
     ]
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Elicitation",
       "def": "The structured activity of drawing out requirements from stakeholders, documents and data."
      },
      {
       "term": "Baseline",
       "def": "A measured snapshot of the current network — inventory, traffic, health and operations — used as the reference for design and comparison."
      },
      {
       "term": "95th percentile",
       "def": "The utilisation value exceeded only 5% of the time in a sample; a common basis for sizing that ignores brief spikes but captures sustained load."
      },
      {
       "term": "MoSCoW",
       "def": "A prioritisation scheme dividing requirements into Must, Should, Could and Won't-have-this-time."
      },
      {
       "term": "Playback",
       "def": "Presenting the analysed requirements back to stakeholders to confirm understanding before design begins."
      },
      {
       "term": "Scope creep",
       "def": "Uncontrolled growth of requirements after the baseline is agreed, usually because exclusions were never written down."
      },
      {
       "term": "Requirement owner",
       "def": "The stakeholder accountable for a requirement, who can confirm, change or trade it off."
      },
      {
       "term": "Representative period",
       "def": "A measurement window long enough to include the business cycles, such as month-end or seasonal peaks, that drive demand."
      }
     ]
    },
    {
     "type": "reflection",
     "prompt": "Which data source do you most often skip when gathering requirements — incident history, traffic peaks, contracts, or operations capability? What design mistake could that gap cause in your environment?"
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Why should WAN sizing use the 95th percentile and observed peaks rather than average utilisation?",
       "options": [
        "Averages hide sustained busy periods that cause congestion",
        "Averages always overstate demand and lead to oversized circuits",
        "Carriers bill only on peak usage, so averages are irrelevant to cost",
        "The 95th percentile is required by every service level agreement"
       ],
       "answer": 0,
       "explain": "Averages smooth out the busy periods that users actually feel. The 95th percentile captures sustained load while ignoring short spikes; it is a sizing convention, not a universal contract term."
      },
      {
       "q": "Two stakeholders give conflicting requirements: central inspection of all flows versus minimum latency between two racks. What should the architect do?",
       "options": [
        "Choose the security requirement because security always outranks performance",
        "Choose the latency requirement because it is more precisely measurable",
        "Document the conflict with options and consequences, and ask the owners to decide",
        "Design for both requirements in full and simply accept the extra cost without any discussion"
       ],
       "answer": 2,
       "explain": "Resolving conflicts belongs to the requirement owners, informed by the architect's analysis. Arbitrary precedence rules and silent cost increases both remove the business from a business decision."
      },
      {
       "q": "In MoSCoW prioritisation, why is the \"Won't have this time\" category valuable?",
       "options": [
        "It lists requirements that will be rejected permanently and never revisited",
        "It identifies items the architect can deliver later without approval",
        "It groups low-cost features that can be added if the budget allows",
        "It records exclusions explicitly, preventing silent scope creep"
       ],
       "answer": 3,
       "explain": "Writing down what is out of scope for this phase sets expectations and protects the baseline. The items may return in later phases, and \"could have\" is the category for optional extras."
      },
      {
       "q": "Which baseline activity is MOST likely to reveal realistic limits on how complex the new design can be?",
       "options": [
        "Assessing the operations team's tooling, skills and on-call model",
        "Collecting interface utilisation at five-minute intervals across the core",
        "Listing end-of-support dates for every switch and router in the estate",
        "Reviewing the physical cabling and duct routes at the largest sites"
       ],
       "answer": 0,
       "explain": "Complexity is limited by the people and tools that must run the network. Traffic, lifecycle and physical data are essential but address capacity, timing and physical feasibility instead."
      },
      {
       "q": "A requirement reads: \"The network must support future growth.\" What is the main problem with it?",
       "options": [
        "It is a constraint and should not appear in the requirements register",
        "It describes a solution rather than the business need behind it",
        "It is a risk and should be recorded in the risk log rather than here",
        "It cannot be tested, because it has no quantity, horizon or owner"
       ],
       "answer": 3,
       "explain": "Growth is a legitimate requirement, but it must be quantified — for example, double the access ports in five years without forklift replacement — to be designed and verified."
      }
     ]
    }
   ]
  },
  {
   "id": "m1-l3",
   "title": "Design Principles and Trade-off Analysis",
   "subtitle": "Use modularity, hierarchy and simplicity — and score options honestly",
   "minutes": 30,
   "objectives": [
    "Apply the core design principles and explain what each one buys",
    "Build and use a weighted decision matrix, including sensitivity checks",
    "Analyse options across cost, complexity and risk rather than features alone"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Design principles are not slogans; they are reusable answers to recurring problems. Modularity contains change, hierarchy contains state, simplicity contains operational risk, and planned scalability contains future cost. When a scenario gives you two technically valid options, these principles — weighed against the stated requirements — usually decide which is better."
    },
    {
     "type": "framework",
     "title": "Core design principles",
     "items": [
      {
       "label": "MOD",
       "title": "Modularity",
       "text": "Build the network from repeatable blocks — an access block, a branch type, a data-centre pod — so that a change or failure in one block is contained and new capacity is added by repeating a known pattern."
      },
      {
       "label": "HIER",
       "title": "Hierarchy",
       "text": "Give each layer a clear role and aggregate at boundaries. Hierarchy enables summarisation, predictable traffic paths and smaller failure and flooding domains."
      },
      {
       "label": "SIMP",
       "title": "Simplicity",
       "text": "Prefer the fewest features, protocols and exceptions that meet the requirements. Every feature is a dependency to configure, monitor, upgrade and troubleshoot."
      },
      {
       "label": "SCAL",
       "title": "Scalability",
       "text": "Know which resource limits growth — ports, routes, adjacencies, power, licences — and design so the next increment is linear, not a redesign."
      },
      {
       "label": "FD",
       "title": "Failure domains",
       "text": "Bound the impact of any single fault: one failed device, link or misconfiguration should affect as little as possible."
      },
      {
       "label": "OPS",
       "title": "Operability",
       "text": "Design for the people and tools that run the network: consistent naming, standard templates, telemetry, and a safe way to change things."
      }
     ]
    },
    {
     "type": "callout",
     "kind": "insight",
     "text": "A design with more moving parts can still meet every functional requirement and pass every test. Its cost appears later: longer troubleshooting, riskier upgrades, harder hiring, and unexpected interactions between features. In trade-off analysis, treat added complexity as a real cost that must be justified by a requirement, not as free capability.",
     "title": "Complexity has a cost even when it works"
    },
    {
     "type": "compare",
     "title": "Trade-off lenses",
     "columns": [
      {
       "title": "Cost",
       "items": [
        "Capital: hardware, licences, build",
        "Operating: circuits, support, power, staff time",
        "Exit: migration and contract penalties",
        "Opportunity: what else the money could fund"
       ]
      },
      {
       "title": "Complexity",
       "items": [
        "Number of protocols and features",
        "Exceptions to standard templates",
        "Skills required to operate",
        "Interdependencies between components"
       ]
      },
      {
       "title": "Risk",
       "items": [
        "Probability and impact of failure",
        "Delivery risk: lead times, untested technology",
        "Vendor and supplier dependency",
        "Security exposure and audit findings"
       ]
      }
     ]
    },
    {
     "type": "formula",
     "title": "Weighted decision matrix",
     "items": [
      {
       "name": "Weighted score",
       "expr": "S(option) = Σ (wᵢ × sᵢ)",
       "meaning": "Multiply each criterion's weight by the option's score on that criterion, then add them up. Weights should sum to 100% (or 1.0)."
      },
      {
       "name": "Example",
       "expr": "0.4 × 4 + 0.3 × 3 + 0.2 × 5 + 0.1 × 2 = 3.7",
       "meaning": "Criteria: meets availability (40%), cost (30%), operability (20%), time to deliver (10%), each scored 1–5."
      },
      {
       "name": "Sensitivity check",
       "expr": "Change each weight by ±10 points and re-rank",
       "meaning": "If a small, plausible change in weighting flips the winner, the decision is fragile — present both options and the deciding factor to the owners."
      }
     ]
    },
    {
     "type": "table",
     "title": "Worked decision matrix: branch WAN options for 80 sites",
     "head": [
      "Criterion (weight)",
      "Private MPLS only",
      "Dual internet with overlay",
      "MPLS plus internet overlay"
     ],
     "rows": [
      [
       "Meets availability target (35%)",
       "3",
       "4",
       "5"
      ],
      [
       "Total 5-year cost (30%)",
       "2",
       "5",
       "3"
      ],
      [
       "Operational fit for a team of six (20%)",
       "5",
       "3",
       "3"
      ],
      [
       "Time to deliver within 9 months (15%)",
       "4",
       "4",
       "3"
      ],
      [
       "Weighted total",
       "3.25",
       "4.10",
       "3.70"
      ]
     ]
    },
    {
     "type": "callout",
     "kind": "example",
     "text": "Dual internet with an overlay wins at 4.10, but its operability score is the weakest. Before recommending it, the architect should check sensitivity: if operability were weighted 30% and cost 20%, the totals become 3.55, 3.90 and 3.70 — the same winner, so the recommendation is reasonably robust. The matrix also shows *where* to mitigate: training and a managed overlay service would raise the weakest score.",
     "title": "Reading the matrix"
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "Scores and weights look objective but are judgements. Agree the criteria and weights with stakeholders *before* scoring options, keep any hard constraint out of the matrix (a failing option is excluded, not scored low), and record the evidence behind each score.",
     "title": "Matrices can launder bias"
    },
    {
     "type": "scenario",
     "title": "Simplicity versus capability",
     "situation": "A mid-sized manufacturer needs guest isolation and separation of production machinery from office users across a single-building campus with six access switches. One proposal uses a campus overlay fabric with a dedicated control plane; another uses VRF-lite on a collapsed core with firewall-controlled inter-VRF routing. The team has no fabric experience. Which recommendation best fits?",
     "options": [
      {
       "text": "VRF-lite on the collapsed core, with firewall policy between segments",
       "feedback": "Correct. It meets both segmentation requirements with well-understood technology, fits the size of the campus, and matches the team's skills. A fabric becomes attractive when scale, mobility or policy automation needs justify its complexity.",
       "best": true
      },
      {
       "text": "The overlay fabric, because it is the more modern and future-proof architecture",
       "feedback": "Being newer is not a requirement. For six switches in one building, the fabric adds a control plane, tooling and skills the requirements do not call for.",
       "best": false
      },
      {
       "text": "Separate physical switches for production, office and guest networks",
       "feedback": "This achieves isolation but triples hardware, cabling and power for a problem logical segmentation solves well. It also makes future changes harder.",
       "best": false
      },
      {
       "text": "A single flat VLAN with access-control lists on every access port",
       "feedback": "Port ACLs on a flat network are hard to maintain and audit, and broadcast and failure domains remain shared. It fails the operability test the team needs.",
       "best": false
      }
     ]
    },
    {
     "type": "template",
     "title": "Weighted decision matrix",
     "purpose": "Compare design options against agreed, weighted criteria. Exclude options that break a constraint before scoring.",
     "columns": [
      "Criterion",
      "Weight (%)",
      "Option A score (1-5)",
      "Option B score (1-5)",
      "Option C score (1-5)",
      "Evidence / rationale"
     ],
     "example": [
      [
       "Meets 99.95% availability",
       "35",
       "3",
       "4",
       "5",
       "Failure analysis; dual-path design for B and C"
      ],
      [
       "5-year total cost",
       "30",
       "2",
       "5",
       "3",
       "Carrier quotes Q1; support uplift included"
      ]
     ],
     "rows": 7
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Modularity",
       "def": "Building the network from repeatable, self-contained blocks so change and failure are contained and growth is predictable."
      },
      {
       "term": "Hierarchy",
       "def": "Assigning clear roles to layers and aggregating at their boundaries to control state, traffic paths and failure domains."
      },
      {
       "term": "Failure domain",
       "def": "The part of the network affected when a single component fails or is misconfigured."
      },
      {
       "term": "Weighted decision matrix",
       "def": "A table that scores options against criteria multiplied by agreed weights to support a transparent choice."
      },
      {
       "term": "Sensitivity analysis",
       "def": "Varying weights or scores to see whether the preferred option changes; a fragile result needs explicit discussion."
      },
      {
       "term": "Operability",
       "def": "How easily and safely a network can be monitored, changed and repaired by the team that runs it."
      },
      {
       "term": "Total cost of ownership",
       "def": "All costs over the life of a solution — capital, operating, support, staff and exit — not just the purchase price."
      },
      {
       "term": "Trade-off analysis",
       "def": "Comparing options by what each gains and gives up across cost, complexity and risk, rather than by features alone."
      }
     ]
    },
    {
     "type": "reflection",
     "prompt": "Pick a design you inherited that you consider too complex. Which principle was traded away, and what requirement — if any — justified that trade at the time?"
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "In a weighted decision matrix, how should an option that breaks a hard constraint be handled?",
       "options": [
        "Score it 1 on the cost criterion and let the totals decide",
        "Increase the weight of the constraint so the option loses",
        "Exclude it before scoring, since it is not a viable option",
        "Keep it in the matrix and add a footnote describing the breach"
       ],
       "answer": 2,
       "explain": "A constraint removes options rather than weighting them. Scoring a non-viable option risks it winning on other criteria and confuses the decision record."
      },
      {
       "q": "Criteria weights are 50% availability, 30% cost and 20% operability. Option X scores 4, 3 and 2. What is its weighted total?",
       "options": [
        "3.0",
        "3.3",
        "3.6",
        "2.9"
       ],
       "answer": 1,
       "explain": "0.5 × 4 + 0.3 × 3 + 0.2 × 2 = 2.0 + 0.9 + 0.4 = 3.3."
      },
      {
       "q": "A sensitivity check shows that moving 10 points of weight from cost to operability changes the winning option. What should the architect conclude?",
       "options": [
        "The original weighting was wrong and should be replaced by the new one",
        "The matrix is invalid and the decision should be made on experience alone",
        "The decision is fragile; present both options and the deciding factor",
        "The option with the higher cost score should be chosen to protect budget"
       ],
       "answer": 2,
       "explain": "A fragile result means the choice depends on how the business values cost versus operability. That is a stakeholder decision, so the architect makes it visible rather than picking a weighting."
      },
      {
       "q": "Which principle MOST directly enables route summarisation and smaller flooding domains?",
       "options": [
        "Simplicity",
        "Operability",
        "Modularity",
        "Hierarchy"
       ],
       "answer": 3,
       "explain": "Hierarchy creates aggregation boundaries where addressing and routing state can be summarised. Modularity helps by making blocks repeatable, but the aggregation point comes from the hierarchical role."
      },
      {
       "q": "Why should added complexity be counted as a cost in trade-off analysis even when the design meets every functional requirement?",
       "options": [
        "It raises the effort and risk of operating, upgrading and troubleshooting",
        "It always increases hardware cost because more devices are required",
        "It makes the design harder to document in the high-level design",
        "It causes the network to fail acceptance tests more often than simpler designs"
       ],
       "answer": 0,
       "explain": "Complexity is mainly an operational and risk cost that appears after go-live. It does not necessarily add hardware or fail tests, which is why it is easy to overlook."
      }
     ]
    }
   ]
  },
  {
   "id": "m1-l4",
   "title": "Design Decisions, Documents and Scenarios",
   "subtitle": "Write decisions others can audit and read scenarios like an examiner",
   "minutes": 30,
   "objectives": [
    "Write a design decision record that captures context, options and consequences",
    "Distinguish the content and audience of high-level and low-level design documents",
    "Read a design scenario systematically to find the facts that decide the answer"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "A design that cannot be explained cannot be defended, reviewed or safely changed. Experts therefore record **decisions**, not just diagrams. Each decision states the context, the options considered, the choice and its consequences — so that a reviewer, an auditor or the next architect understands not only *what* was built but *why*, and knows what would have to change for the decision to be revisited."
    },
    {
     "type": "framework",
     "title": "Anatomy of a design decision record",
     "items": [
      {
       "label": "ID",
       "title": "Identifier and title",
       "text": "A short, unique reference such as D-12 \"Routed access for office floors\" so documents and changes can cite it."
      },
      {
       "label": "CTX",
       "title": "Context and drivers",
       "text": "The requirements, constraints and assumptions that make this decision necessary, cited by register ID."
      },
      {
       "label": "OPT",
       "title": "Options considered",
       "text": "Two to four realistic options, each with a one-line summary — including \"do nothing\" where it is genuinely viable."
      },
      {
       "label": "DEC",
       "title": "Decision and rationale",
       "text": "The chosen option and the reasons it best satisfies the drivers, referring to the decision matrix where one was used."
      },
      {
       "label": "CON",
       "title": "Consequences",
       "text": "What becomes easier, what becomes harder, new risks, and follow-on decisions this one triggers."
      },
      {
       "label": "REV",
       "title": "Status and review trigger",
       "text": "Proposed, accepted or superseded, plus the condition that would reopen it — for example, if branch count exceeds 300."
      }
     ]
    },
    {
     "type": "compare",
     "title": "High-level versus low-level design",
     "columns": [
      {
       "title": "High-level design (HLD)",
       "items": [
        "Audience: sponsors, architects, security, operations leads",
        "Answers why and what: architecture, principles, major decisions",
        "Topology at block level, traffic flows, resilience model",
        "Technology choices with rationale and trade-offs",
        "Stable: changes only when requirements change"
       ]
      },
      {
       "title": "Low-level design (LLD)",
       "items": [
        "Audience: implementers and operations engineers",
        "Answers how: exact configuration standards and values",
        "Addressing tables, VLAN/VRF IDs, protocol timers, port maps",
        "Build, test and migration procedures",
        "Detailed: updated as the build progresses"
       ]
      }
     ]
    },
    {
     "type": "template",
     "title": "High-level design outline",
     "purpose": "A reusable skeleton for an HLD so that every design covers the same ground and reviewers know where to look.",
     "columns": [
      "Section",
      "Content",
      "Key questions answered",
      "Owner / reviewer"
     ],
     "example": [
      [
       "1. Context and scope",
       "Business drivers, in/out of scope, phases",
       "Why is this design needed and what does it cover?",
       "Lead architect / sponsor"
      ],
      [
       "4. Design decisions",
       "Decision records D-01 to D-n with matrices",
       "What did we choose, what did we reject and why?",
       "Lead architect / design authority"
      ]
     ],
     "rows": 8
    },
    {
     "type": "keypoints",
     "items": [
      "Context, scope and business drivers",
      "Requirements, constraints and assumptions (by reference to the register)",
      "Design principles applied",
      "Logical and physical architecture overview",
      "Key design decisions with options and rationale",
      "Resilience, security, management and operations model",
      "Migration approach, risks and open issues"
     ],
     "title": "Typical HLD sections"
    },
    {
     "type": "callout",
     "kind": "pro",
     "text": "Reviewers trust a decision record that admits its downsides. \"Routed access means VLANs cannot span floors; wireless roaming will rely on the controller tunnelling client traffic\" tells the next architect exactly what to watch. A record that lists only benefits invites the question of what was hidden.",
     "title": "Write the consequences honestly"
    },
    {
     "type": "steps",
     "title": "Reading a design scenario like an examiner",
     "items": [
      {
       "title": "Read the question first",
       "text": "Know whether you are asked for the BEST design, the FIRST action, the MOST important requirement, or the BIGGEST risk. The same facts support different answers to different questions."
      },
      {
       "title": "Mark the requirements and constraints",
       "text": "Highlight availability targets, budgets, timelines, skills, regulations and existing assets. Phrases such as \"must\", \"cannot\", \"limited staff\" and \"within six months\" are deciding facts."
      },
      {
       "title": "Spot the hidden priority",
       "text": "Scenarios often contain one requirement that outranks the others — regulatory isolation, a hard deadline, a tiny team. Identify it before comparing options."
      },
      {
       "title": "Eliminate options that break a constraint",
       "text": "An option that is technically excellent but exceeds the budget, needs skills the team lacks, or misses the deadline is wrong, however attractive."
      },
      {
       "title": "Choose the simplest option that meets everything",
       "text": "Between remaining options, prefer the one that meets all stated requirements with the least added complexity and risk — not the one with the most features."
      },
      {
       "title": "Check against the exact question",
       "text": "Re-read the question stem. If it asked what to do FIRST, a perfect final design may still be the wrong answer."
      }
     ]
    },
    {
     "type": "scenario",
     "title": "What to do first",
     "situation": "A hospital group asks you to redesign its WAN. In the first meeting the CIO says the new design must be live before the current carrier contract ends in five months, and also mentions that a new clinical imaging system will \"probably\" be deployed across all sites next year. What should you do FIRST?",
     "options": [
      {
       "text": "Start comparing carrier quotes immediately to protect the five-month deadline",
       "feedback": "The deadline matters, but quotes based on unknown demand may be wrong. A short validation of the biggest demand driver protects both the deadline and the design.",
       "best": false
      },
      {
       "text": "Design for today's traffic and treat the imaging system as a future phase",
       "feedback": "That defers a known, large driver and risks rework or contract changes soon after go-live. At minimum, the design and contract must accommodate it.",
       "best": false
      },
      {
       "text": "Confirm the imaging system's scope, timing and traffic profile",
       "feedback": "Correct. A large, uncertain demand driver discovered at the start must be pinned down before options are compared; designing without it risks a WAN that is obsolete within a year. The deadline makes early validation more urgent, not less.",
       "best": true
      },
      {
       "text": "Recommend extending the existing carrier contract to remove the time pressure",
       "feedback": "This may become an option, but proposing it before understanding requirements jumps to a solution and may cost more than necessary.",
       "best": false
      }
     ]
    },
    {
     "type": "case",
     "title": "National university network refresh",
     "context": "A national university has 42,000 students across a main campus, three regional campuses 80–300 km away, and a teaching hospital it shares with the health ministry. The campus network is 11 years old and flat at layer 2 in many buildings. Research groups transfer multi-terabyte datasets to international partners and complain that the central firewall throttles them. The security office failed an audit finding that student-residence traffic shares segments with administrative systems. The board has approved a fixed three-year capital budget, procurement must use a public tender, and the network team has nine engineers with strong routing skills but little automation experience. The research council expects a 10x increase in data transfers over five years.",
     "questions": [
      "Classify the key inputs into business requirements, technical requirements, constraints and assumptions.",
      "Which requirement is the hidden priority, and why?",
      "What design decisions would you expect to see recorded in the HLD, and which ones conflict?",
      "What should be validated before options are compared?"
     ],
     "answer": "**Classification.** Business requirements: support research collaboration, pass the security audit, refresh ageing infrastructure, serve the regional campuses and hospital. Technical requirements (to be quantified): segment residences from administrative systems; high-throughput research transfers that do not traverse a stateful bottleneck; availability targets per user group. Constraints: fixed three-year capital budget, public tender procurement and its timelines, a team strong in routing but weak in automation, shared governance of the hospital. Assumptions: 10x research growth, regional campus circuit availability, hospital ministry cooperation.\n**Hidden priority.** The audit finding is effectively a must-have with an external deadline; it drives segmentation design early and may need an interim fix before the full refresh.\n**Expected decisions and conflicts.** Campus model per site (collapsed core at regional campuses, full hierarchy at the main campus); L2/L3 boundary; segmentation method (VRF-based macro-segmentation is a natural fit for the team's routing skills); a research data path that bypasses the general-purpose firewall and is protected with filtering and monitoring instead; WAN design for regional sites. The research data path conflicts with the security office's preference for central inspection — record it, quantify the risk, and let the owners decide.\n**Validate first.** The research growth figure (data, not anecdote), the audit scope and deadline, the tender timeline against the budget years, the hospital's responsibilities and network boundary, and fibre or carrier options to regional campuses."
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Design decision record",
       "def": "A short, structured document capturing one design decision: context, options, choice, rationale, consequences and review trigger."
      },
      {
       "term": "High-level design (HLD)",
       "def": "A document describing the architecture, principles, major decisions and their rationale for sponsors, architects and operations leads."
      },
      {
       "term": "Low-level design (LLD)",
       "def": "A detailed document specifying configuration standards, values and procedures for those who build and operate the network."
      },
      {
       "term": "Design authority",
       "def": "The person or board that reviews and approves design decisions and their exceptions."
      },
      {
       "term": "Review trigger",
       "def": "A condition recorded with a decision that, if met, requires the decision to be revisited."
      },
      {
       "term": "Hidden priority",
       "def": "The requirement in a scenario that outranks the others — often regulatory, deadline-driven or skill-limited — and decides between otherwise valid options."
      },
      {
       "term": "Design exception",
       "def": "A documented, approved deviation from a standard design, recorded with its owner and justification."
      },
      {
       "term": "Superseded decision",
       "def": "A decision record replaced by a newer one; kept for history and linked to the decision that replaced it."
      }
     ]
    },
    {
     "type": "reflection",
     "prompt": "Write a one-paragraph decision record for a choice you made recently. Did you list the options you rejected and the consequences you accepted? What review trigger would you add now?"
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Which section of a design decision record tells a future architect when the decision should be reopened?",
       "options": [
        "Options considered",
        "Status and review trigger",
        "Context and drivers",
        "Decision, rationale and evidence"
       ],
       "answer": 1,
       "explain": "The review trigger states the condition — growth, a contract change, a new regulation — that would make the decision worth revisiting."
      },
      {
       "q": "Which content belongs in a low-level design rather than a high-level design?",
       "options": [
        "The rationale for choosing routed access over layer 2 access in each campus block",
        "Interface addressing tables, VRF identifiers and protocol timer values",
        "The resilience model and how failure domains are bounded",
        "The business drivers and the scope of each project phase"
       ],
       "answer": 1,
       "explain": "Exact values and build details are implementation information for the LLD. Rationale, resilience models and drivers are architectural and belong in the HLD."
      },
      {
       "q": "A scenario asks what the architect should do FIRST. One option is a complete, excellent target design. Why might it still be wrong?",
       "options": [
        "Complete designs are never accepted as answers in scenario-based assessments",
        "An excellent design always exceeds the budget given in a scenario",
        "The target design should be written by the operations team, not the architect",
        "The question asks for the first step, which is often to validate a key fact"
       ],
       "answer": 3,
       "explain": "Scenario questions test sequencing as well as knowledge. If a decisive requirement is uncertain, validating it comes before any design."
      },
      {
       "q": "Why should a decision record list its negative consequences?",
       "options": [
        "It builds trust and tells others which risks and limits to manage",
        "Auditors reject any design document that omits a risk section entirely",
        "It allows the architect to avoid responsibility if problems occur",
        "Negative consequences increase the weighted score of the chosen option"
       ],
       "answer": 0,
       "explain": "Honest consequences make the trade-off explicit and guide operations and future designers. The aim is transparency and safe change, not blame avoidance."
      },
      {
       "q": "When two remaining options both meet every stated requirement and constraint, which should usually be preferred?",
       "options": [
        "The one with the richest feature set for possible future needs",
        "The one using the most recent technology on the market",
        "The one that meets them with the least added complexity and risk",
        "The one that the largest number of stakeholders already know about"
       ],
       "answer": 2,
       "explain": "Unstated future needs and novelty are not requirements. Simplicity reduces operational risk, which is a real cost the business carries."
      }
     ]
    }
   ]
  }
 ]
});
TRACK.modules.push({
 "id": "m2",
 "order": 2,
 "code": "Campus",
 "title": "Campus & Data Centre Design",
 "subtitle": "Hierarchy, boundaries, fabrics and the arithmetic of scale",
 "outcomes": [
  "Choose between three-tier, collapsed-core, routed-access and fabric campus designs from requirements",
  "Place the L2/L3 boundary to balance mobility against failure-domain size",
  "Size spine-leaf fabrics using port counts and oversubscription ratios",
  "Design data centre interconnects that keep sites as separate failure domains"
 ],
 "lessons": [
  {
   "id": "m2-l1",
   "title": "Campus Hierarchy Models",
   "subtitle": "Three-tier, collapsed core and when each one earns its place",
   "minutes": 25,
   "objectives": [
    "Explain the role of the access, distribution and core layers",
    "Choose between a three-tier and a collapsed-core campus from requirements",
    "Calculate and judge access and distribution oversubscription"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "The **Campus sheet** of the ZCDE Design Blueprint begins with the shape of the network. Hierarchy is not tradition for its own sake: each layer exists to solve a specific problem. Access connects endpoints and enforces edge policy; distribution aggregates access blocks, hosts the layer 2/layer 3 boundary in many designs and summarises routes; the core moves traffic between distribution blocks quickly and does as little else as possible. The design question is how many of these layers a particular campus actually needs."
    },
    {
     "type": "layers",
     "title": "Three-tier campus roles",
     "items": [
      {
       "label": "Core",
       "parts": [
        "High-speed transport between blocks",
        "Minimal policy, minimal state",
        "Fast, predictable convergence",
        "No direct endpoint connections"
       ]
      },
      {
       "label": "Distribution",
       "parts": [
        "Aggregates access switches into a block",
        "Layer 2/3 boundary (in L2-access designs)",
        "Route summarisation and policy",
        "First-hop redundancy for endpoint subnets"
       ]
      },
      {
       "label": "Access",
       "parts": [
        "Endpoint and wireless access-point ports",
        "Power over Ethernet, port security, 802.1X",
        "QoS marking and trust boundary",
        "VLAN or segment assignment"
       ]
      }
     ]
    },
    {
     "type": "compare",
     "title": "Three-tier versus collapsed core",
     "columns": [
      {
       "title": "Three-tier",
       "items": [
        "Separate core joins many distribution blocks",
        "Scales to large, multi-building campuses",
        "Failure or change in one block stays local",
        "Core links grow linearly as blocks are added",
        "More devices, power, cost and management"
       ]
      },
      {
       "title": "Collapsed core (two-tier)",
       "items": [
        "Core and distribution combined in one pair",
        "Fits a single building or small campus",
        "Fewer devices and lower cost",
        "Simple to operate for small teams",
        "Becomes a scaling and change bottleneck as blocks grow"
       ]
      }
     ]
    },
    {
     "type": "callout",
     "kind": "insight",
     "text": "Without a core, every distribution pair must connect to every other pair to avoid hair-pinning traffic, and the number of inter-block links grows roughly with the square of the number of blocks. A dedicated core turns that mesh into a star: each new block needs only its uplinks to the core. When a campus reaches several distribution blocks, or buildings with separate fibre plants, the core usually pays for itself in simplicity.",
     "title": "Why a separate core appears"
    },
    {
     "type": "table",
     "title": "Choosing a campus model",
     "head": [
      "Situation",
      "Likely fit",
      "Deciding factors"
     ],
     "rows": [
      [
       "Single building, under ~10 access stacks",
       "Collapsed core",
       "Cost, small team, little east-west growth"
      ],
      [
       "Multiple buildings, 3+ distribution blocks",
       "Three-tier",
       "Fibre layout, change isolation, link count"
      ],
      [
       "Small branch office",
       "Single switch stack or access-only to a router",
       "Cost and remote manageability"
      ],
      [
       "Campus with plans to double in 3 years",
       "Collapsed core designed to add a core later",
       "Reserve core ports, address plan by block"
      ],
      [
       "Large campus with heavy segmentation needs",
       "Three-tier or fabric",
       "Policy scale and mobility (see next lesson)"
      ]
     ]
    },
    {
     "type": "formula",
     "title": "Campus oversubscription",
     "items": [
      {
       "name": "Oversubscription ratio",
       "expr": "OSR = total downstream capacity ÷ total upstream capacity",
       "meaning": "How much more traffic the edge could offer than its uplinks can carry if every port transmitted at full rate at the same time."
      },
      {
       "name": "Access example",
       "expr": "48 × 2.5 Gbps = 120 Gbps; 2 × 25 Gbps = 50 Gbps; OSR = 2.4:1",
       "meaning": "A multigigabit access switch serving Wi-Fi access points with two 25 Gbps uplinks."
      },
      {
       "name": "Distribution example",
       "expr": "8 access switches × 50 Gbps = 400 Gbps; 2 × 100 Gbps = 200 Gbps; OSR = 2:1",
       "meaning": "Uplink capacity from a distribution pair to the core, counting both uplinks as active (routed ECMP)."
      },
      {
       "name": "Usable capacity after failure",
       "expr": "Capacity(n−1) = (n − 1) ÷ n × total uplink capacity",
       "meaning": "With two uplinks, a single failure halves upstream capacity — check that the post-failure ratio still meets the requirement."
      }
     ]
    },
    {
     "type": "callout",
     "kind": "pro",
     "text": "Older guidelines quoted ratios such as 20:1 at access and 4:1 at distribution, from an era of light, bursty office traffic. Wi-Fi 6/7 access points, video and large file sync change the picture. Size from measured peaks and the applications in each block, check the ratio *after a single uplink failure*, and pick uplink speeds that keep the post-failure ratio acceptable.",
     "title": "Oversubscription is a decision, not a fixed ratio"
    },
    {
     "type": "scenario",
     "title": "A growing headquarters",
     "situation": "A company's headquarters is one 8-floor building with 14 access stacks and a collapsed core. The board has approved a second building on the same site within two years, and a third is likely later. The current core pair has no spare 100 Gbps ports. What is the best design direction for the refresh now under way?",
     "options": [
      {
       "text": "Add a core pair now and treat each building as a distribution block",
       "feedback": "Correct. Growth to multiple buildings is a stated plan, not speculation. A core turns each new building into a repeatable block, isolates change, and avoids a later disruptive re-architecture.",
       "best": true
      },
      {
       "text": "Keep the collapsed core and connect the new building's access stacks directly to it",
       "feedback": "This extends the collapsed core beyond its sweet spot, consumes ports that are already exhausted, and puts two buildings' access in one failure and change domain.",
       "best": false
      },
      {
       "text": "Build a full mesh of links between the two buildings' access stacks",
       "feedback": "Meshing access switches creates large layer 2 domains and complex failure behaviour, and it does not scale to a third building.",
       "best": false
      },
      {
       "text": "Defer any change until the second building is complete and then reassess",
       "feedback": "The refresh is the cheapest moment to introduce the core. Deferring guarantees a second disruptive change within two years.",
       "best": false
      }
     ]
    },
    {
     "type": "template",
     "title": "Campus block design sheet",
     "purpose": "Record the sizing and resilience decisions for each campus block so blocks stay consistent and capacity is planned.",
     "columns": [
      "Block",
      "Access stacks / 2.5G ports",
      "Uplinks per stack",
      "Access OSR (normal / n-1)",
      "Distribution uplinks to core",
      "L2/L3 boundary",
      "Notes"
     ],
     "example": [
      [
       "Building A floors 1-4",
       "8 stacks / 384 ports",
       "2 × 25G",
       "2.4:1 / 4.8:1",
       "2 × 100G per distribution switch",
       "Distribution",
       "Wi-Fi 7 APs on floors 2-3"
      ],
      [
       "Building B (new)",
       "6 stacks / 288 ports",
       "2 × 25G",
       "2.4:1 / 4.8:1",
       "2 × 100G per distribution switch",
       "Access (routed)",
       "Reserve 2 stack positions"
      ]
     ],
     "rows": 6
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Access layer",
       "def": "The campus layer that connects endpoints and wireless access points and applies edge policy such as authentication and QoS marking."
      },
      {
       "term": "Distribution layer",
       "def": "The layer that aggregates access switches into a block, often hosts the L2/L3 boundary and summarises routing information."
      },
      {
       "term": "Core layer",
       "def": "The high-speed transport layer that interconnects distribution blocks with minimal policy and state."
      },
      {
       "term": "Collapsed core",
       "def": "A two-tier design where core and distribution functions run on the same pair of switches."
      },
      {
       "term": "Campus block",
       "def": "A repeatable unit of access and distribution switches serving a building or zone."
      },
      {
       "term": "Oversubscription ratio",
       "def": "The ratio of total downstream port capacity to total upstream capacity at an aggregation point."
      },
      {
       "term": "Trust boundary",
       "def": "The point at which the network starts trusting QoS markings, usually the access port or the endpoint."
      },
      {
       "term": "Uplink",
       "def": "A link from a lower layer to a higher one, such as access to distribution, whose capacity sets the oversubscription ratio."
      }
     ]
    },
    {
     "type": "reflection",
     "prompt": "Count the distribution blocks in a campus you know. Would a collapsed core still serve it if the estate doubled? Where would the first bottleneck appear — ports, links, or change risk?"
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "What is the PRIMARY reason to add a dedicated core layer to a campus?",
       "options": [
        "To provide Power over Ethernet to high-density wireless areas",
        "To host the first-hop gateway for every endpoint subnet",
        "To apply detailed security policy to traffic between floors",
        "To avoid a growing mesh of links between distribution blocks"
       ],
       "answer": 3,
       "explain": "The core turns an n-squared mesh of distribution interconnections into a star and isolates blocks. It should carry minimal policy; gateways and PoE belong at lower layers."
      },
      {
       "q": "An access switch has 48 × 1 Gbps ports and 2 × 10 Gbps uplinks. What is its oversubscription ratio, and what does it become after one uplink fails?",
       "options": [
        "4.8:1 normally and 2.4:1 after the failure",
        "2.4:1 normally and 4.8:1 after the failure",
        "2.4:1 normally and 2.4:1 after the failure",
        "1.2:1 normally and 2.4:1 after the failure"
       ],
       "answer": 1,
       "explain": "48 Gbps ÷ 20 Gbps = 2.4:1. With one uplink left, 48 ÷ 10 = 4.8:1. Designs should check the post-failure ratio, not just the normal one."
      },
      {
       "q": "For which campus is a collapsed core MOST appropriate?",
       "options": [
        "A university with twelve buildings on separate fibre runs",
        "A hospital campus adding four new clinical wings, each with its own riser, over three years",
        "A single building with eight access stacks and a small operations team",
        "A campus with many distribution blocks and heavy east-west traffic"
       ],
       "answer": 2,
       "explain": "Collapsed core suits small, single-building sites where the cost and complexity of a separate core are not justified. The other cases have many blocks or planned growth that favour three tiers."
      },
      {
       "q": "Why should campus oversubscription be checked after a single uplink failure?",
       "options": [
        "Because users experience the reduced capacity during the failure",
        "Because oversubscription is only defined when an uplink is down",
        "Because failed uplinks increase the downstream port capacity",
        "Because most standards require a 1:1 ratio during failures"
       ],
       "answer": 0,
       "explain": "Resilience is not only about connectivity; the surviving capacity must still meet the requirement. With two uplinks, a failure halves upstream capacity and doubles the ratio."
      }
     ]
    }
   ]
  },
  {
   "id": "m2-l2",
   "title": "The L2/L3 Boundary and Campus Fabrics",
   "subtitle": "Where routing starts decides your failure domains, mobility and segmentation",
   "minutes": 30,
   "objectives": [
    "Compare layer 2 access, routed access and overlay fabric designs",
    "Explain the failure-domain and mobility consequences of each boundary choice",
    "Decide when a campus fabric's complexity is justified"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Where layer 2 ends and layer 3 begins is one of the most consequential campus decisions. It determines how far broadcasts and spanning-tree events travel, whether a VLAN can exist on more than one access switch, how fast the network recovers from a failure, and where segmentation policy can be enforced. There are three broad answers: route at distribution, route at access, or build an overlay fabric that routes everywhere but still offers layer 2 semantics where needed."
    },
    {
     "type": "compare",
     "title": "Three boundary choices",
     "columns": [
      {
       "title": "Layer 2 access, L3 at distribution",
       "items": [
        "VLANs can span access switches in a block",
        "Needs spanning tree and first-hop redundancy",
        "Simple access switches",
        "Larger failure domain; loops are possible",
        "Familiar to most teams"
       ]
      },
      {
       "title": "Routed access",
       "items": [
        "L3 point-to-point uplinks from every access switch",
        "No spanning tree on uplinks; ECMP to both distribution switches",
        "Fast, deterministic routed convergence",
        "Each VLAN confined to one access switch or stack",
        "More subnets and routing adjacencies to manage"
       ]
      },
      {
       "title": "Overlay fabric",
       "items": [
        "Routed underlay with an encapsulating overlay",
        "Anycast gateway on every edge switch",
        "Subnets can appear anywhere without spanning tree",
        "Built-in macro and micro segmentation",
        "Highest complexity; needs tooling and skills"
       ]
      }
     ]
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "A VLAN that spans many switches is a single broadcast and failure domain. A loop, a misbehaving endpoint or a spanning-tree recalculation anywhere in that domain affects everything in it. If the requirement behind a spanning VLAN is wireless roaming or a legacy application, look for a narrower answer — controller-based roaming, or a dedicated small segment — before stretching layer 2 across a block.",
     "title": "The cost of spanning VLANs"
    },
    {
     "type": "cli",
     "title": "Routed access uplinks and a local gateway",
     "device": "ACC-3F · IOS-style CLI",
     "lines": [
      "! Access switch: routed uplinks, local gateway for the floor subnet",
      "interface Ethernet1/49",
      " description Uplink to DIST-A",
      " no switchport",
      " ip address 10.10.0.1 255.255.255.254",
      " ip ospf network point-to-point",
      " ip ospf 1 area 10",
      "interface Ethernet1/50",
      " description Uplink to DIST-B",
      " no switchport",
      " ip address 10.10.0.3 255.255.255.254",
      " ip ospf network point-to-point",
      " ip ospf 1 area 10",
      "interface Vlan110",
      " description Floor 3 staff",
      " ip address 10.110.3.1 255.255.255.0",
      " ip ospf 1 area 10",
      "router ospf 1",
      " passive-interface default",
      " no passive-interface Ethernet1/49",
      " no passive-interface Ethernet1/50"
     ],
     "note": "Each uplink is a /31 point-to-point link, so there is no spanning tree and no first-hop redundancy protocol on the uplinks; both are used through equal-cost paths. The trade-off: VLAN 110 lives only on this switch."
    },
    {
     "type": "layers",
     "title": "Campus overlay fabric building blocks",
     "items": [
      {
       "label": "Policy",
       "parts": [
        "Identity-based group assignment",
        "Group-to-group access rules",
        "Central policy definition and automation"
       ]
      },
      {
       "label": "Overlay control plane",
       "parts": [
        "Endpoint location database or BGP EVPN",
        "Anycast gateway on every edge",
        "Virtual networks (VRFs) for macro-segmentation"
       ]
      },
      {
       "label": "Overlay data plane",
       "parts": [
        "VXLAN or similar encapsulation",
        "Group tag carried in the header",
        "Border nodes to the rest of the network"
       ]
      },
      {
       "label": "Underlay",
       "parts": [
        "Routed point-to-point links",
        "Link-state IGP for loopback reachability",
        "ECMP, BFD, jumbo MTU for encapsulation overhead"
       ]
      }
     ]
    },
    {
     "type": "table",
     "title": "When is a campus fabric justified?",
     "head": [
      "Requirement",
      "Without a fabric",
      "With a fabric"
     ],
     "rows": [
      [
       "Same subnet available anywhere on a large campus",
       "Large spanned VLANs or many subnets with re-addressing",
       "Native: anycast gateway and overlay"
      ],
      [
       "Consistent group-based policy at scale",
       "ACLs and firewall rules per subnet, hard to keep in sync",
       "Group tags with central policy"
      ],
      [
       "Many isolated tenants or departments",
       "VRF-lite configured hop by hop",
       "Virtual networks provisioned centrally"
      ],
      [
       "Small site, few segments, small team",
       "Simple routed or L2 access is enough",
       "Usually more complexity than value"
      ],
      [
       "Strong automation and telemetry practice",
       "Manual operation remains viable",
       "Fabric tooling can be fully exploited"
      ]
     ]
    },
    {
     "type": "callout",
     "kind": "insight",
     "text": "A fabric hides per-switch configuration behind a controller or automation, but adds an underlay, an overlay, a control plane, encapsulation MTU, border handoffs and a dependency on the management system. The design is sound when the requirements — mobility, policy scale, tenant count — are large enough that this concentrated complexity is cheaper than the scattered complexity it replaces.",
     "title": "Fabrics move complexity, they do not remove it"
    },
    {
     "type": "scenario",
     "title": "Choosing the boundary",
     "situation": "A hospital is refreshing a 6-floor clinical building. Requirements: sub-second recovery from any uplink failure, no spanning-tree loops in clinical areas, and wireless medical devices that must roam across all floors without changing IP address. Wireless is controller-based, with client traffic tunnelled to the controller. The team is experienced with OSPF but has no fabric experience. Which design best fits?",
     "options": [
      {
       "text": "Layer 2 access with VLANs spanning all six floors, protected by rapid spanning tree",
       "feedback": "This supports roaming, but the large layer 2 domain conflicts with the no-loop requirement and recovery depends on spanning tree.",
       "best": false
      },
      {
       "text": "A campus overlay fabric so wireless subnets can exist on every floor",
       "feedback": "A fabric meets the technical goals, but the controller already solves roaming. The added complexity and the skills gap are not justified by an unmet requirement.",
       "best": false
      },
      {
       "text": "Routed access with a separate wired VLAN per floor for the medical devices",
       "feedback": "Per-floor subnets would change device addresses as they roam, breaking the stated requirement.",
       "best": false
      },
      {
       "text": "Routed access with OSPF and BFD; roaming handled by the controller tunnels",
       "feedback": "Correct. Routed access gives fast, loop-free recovery. Because wireless clients are tunnelled to the controller, their addresses are anchored there and roaming does not depend on campus VLANs spanning floors.",
       "best": true
      }
     ]
    },
    {
     "type": "keypoints",
     "items": [
      "Route as close to the edge as the mobility requirement allows",
      "If a VLAN must span switches, keep that domain small and loop-protected",
      "Use routed links between layers wherever possible to gain ECMP and deterministic convergence",
      "Plan underlay MTU for any encapsulation before choosing a fabric",
      "Choose a fabric for policy scale and mobility at scale, not for novelty"
     ],
     "title": "Boundary design rules of thumb"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "L2/L3 boundary",
       "def": "The point where switched (layer 2) forwarding ends and routing begins, usually where the endpoint's default gateway lives."
      },
      {
       "term": "Routed access",
       "def": "A campus design in which access switches route, using layer 3 point-to-point uplinks instead of trunked VLANs."
      },
      {
       "term": "First-hop redundancy protocol",
       "def": "A protocol, such as VRRP, that lets two or more routers share a virtual gateway address for endpoints."
      },
      {
       "term": "Anycast gateway",
       "def": "The same gateway IP and MAC address configured on every edge switch so endpoints find their gateway locally wherever they connect."
      },
      {
       "term": "Underlay",
       "def": "The physical routed network that provides reachability between fabric nodes."
      },
      {
       "term": "Overlay",
       "def": "A logical network built on top of the underlay using encapsulation, such as VXLAN."
      },
      {
       "term": "Macro-segmentation",
       "def": "Separation of traffic into isolated routing domains, such as VRFs or virtual networks."
      },
      {
       "term": "Micro-segmentation",
       "def": "Policy between groups of endpoints within the same routing domain, often based on group tags or identity."
      },
      {
       "term": "VXLAN",
       "def": "A MAC-in-UDP encapsulation that carries layer 2 frames across a routed network, identifying segments with a 24-bit network identifier."
      }
     ]
    },
    {
     "type": "reflection",
     "prompt": "In your current campus, where is the L2/L3 boundary and why was it put there? Which requirement would have to change for you to move it?"
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "What is the main trade-off of routed access compared with layer 2 access?",
       "options": [
        "Uplink failures converge more slowly than with spanning tree",
        "A VLAN cannot span multiple access switches",
        "Only one uplink can forward traffic at a time",
        "Endpoint subnets must be routed by the core layer"
       ],
       "answer": 1,
       "explain": "Routed access confines each subnet to one access switch or stack. In return it gains ECMP across both uplinks and fast routed convergence without spanning tree."
      },
      {
       "q": "Why does a VXLAN-based fabric require attention to underlay MTU?",
       "options": [
        "Encapsulation adds header bytes, so full-size frames need a larger underlay MTU",
        "VXLAN only operates when every link uses an MTU of exactly 1500 bytes",
        "The overlay control plane negotiates MTU and fails on mismatches",
        "Anycast gateways must fragment every packet that exceeds the endpoint's configured MTU"
       ],
       "answer": 0,
       "explain": "VXLAN adds roughly 50 bytes of headers. Without a larger underlay MTU, full-size endpoint frames would be fragmented or dropped."
      },
      {
       "q": "Which requirement MOST strongly justifies a campus overlay fabric?",
       "options": [
        "Connecting a single floor of 200 users with a small operations team",
        "Providing a default gateway for users that survives the failure of one distribution switch",
        "Consistent group-based policy and subnet mobility across a very large campus",
        "Reducing the purchase price of access switches in a small office"
       ],
       "answer": 2,
       "explain": "Fabrics pay off where policy scale and mobility at scale are required. Gateway redundancy and small sites are solved more simply without one."
      },
      {
       "q": "Wireless clients are tunnelled to a central controller. How does this affect the L2/L3 boundary decision for wired access?",
       "options": [
        "Wired access must use layer 2 so the controller tunnels can terminate",
        "A campus overlay fabric becomes mandatory so that the controller's tunnels can be carried",
        "Every access switch must host the wireless client gateway locally",
        "Roaming no longer requires spanning campus VLANs, so routed access becomes viable"
       ],
       "answer": 3,
       "explain": "Tunnelling anchors client addresses at the controller, decoupling wireless mobility from the wired topology. The wired access layer can then be routed."
      },
      {
       "q": "What is the best description of a campus fabric's effect on complexity?",
       "options": [
        "It removes complexity because switches no longer need configuration",
        "It concentrates complexity into the control plane and tooling",
        "It adds complexity only during the initial deployment phase",
        "It eliminates the need for a routed underlay in the campus"
       ],
       "answer": 1,
       "explain": "The fabric automates and hides per-switch configuration but adds an underlay, overlay, control plane and management dependency. That trade only pays at sufficient scale."
      }
     ]
    }
   ]
  },
  {
   "id": "m2-l3",
   "title": "Data Centre Spine-Leaf Design",
   "subtitle": "Clos fabrics, east-west traffic and the arithmetic of scale",
   "minutes": 35,
   "objectives": [
    "Explain why spine-leaf replaced tree-based data centre designs",
    "Size a two-tier fabric: leaves, spines, ports and oversubscription",
    "Identify the scaling limit of a fabric and when a third stage is needed"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Modern applications talk to each other far more than to users: a single web request can trigger dozens of calls between services, databases and storage. This **east-west** traffic overwhelmed tree-shaped data centre designs built for **north-south** client-server flows, where traffic between racks climbed to an aggregation layer and was limited by spanning tree to a single active path. The spine-leaf (folded Clos) topology answers this with a simple rule: every leaf connects to every spine, and every leaf-to-leaf path is exactly two hops through any spine."
    },
    {
     "type": "compare",
     "title": "Traditional three-tier DC versus spine-leaf",
     "columns": [
      {
       "title": "Three-tier tree",
       "items": [
        "Access, aggregation and core layers",
        "Built for north-south client-server traffic",
        "Spanning tree blocks redundant paths",
        "Inconsistent latency between racks",
        "Scale-up: bigger aggregation boxes"
       ]
      },
      {
       "title": "Spine-leaf (Clos)",
       "items": [
        "Two tiers: leaves and spines",
        "Built for east-west service-to-service traffic",
        "All links active using routed ECMP",
        "Predictable, equal hop count between any two leaves",
        "Scale-out: add spines for bandwidth, leaves for ports"
       ]
      }
     ]
    },
    {
     "type": "layers",
     "title": "Spine-leaf fabric roles",
     "items": [
      {
       "label": "Border / edge",
       "parts": [
        "Border leaves to WAN, internet and DCI",
        "Firewalls and load balancers attached",
        "Route exchange with the rest of the enterprise"
       ]
      },
      {
       "label": "Spine",
       "parts": [
        "Interconnects all leaves",
        "Pure transport: no endpoints attached",
        "Often route reflector or route server for the overlay"
       ]
      },
      {
       "label": "Leaf",
       "parts": [
        "Server and storage connections",
        "Gateway for workloads (anycast)",
        "Overlay tunnel endpoints"
       ]
      },
      {
       "label": "Underlay protocols",
       "parts": [
        "eBGP or link-state IGP between leaf and spine",
        "ECMP across all spines",
        "BFD for fast failure detection"
       ]
      }
     ]
    },
    {
     "type": "formula",
     "title": "Fabric sizing arithmetic (two-tier, one link per leaf-spine pair)",
     "items": [
      {
       "name": "Maximum leaves",
       "expr": "Leaves(max) = ports per spine",
       "meaning": "Each leaf consumes one port on every spine, so the spine's port count caps the number of leaves."
      },
      {
       "name": "Maximum spines",
       "expr": "Spines(max) = uplink ports per leaf",
       "meaning": "Each spine consumes one uplink on every leaf."
      },
      {
       "name": "Leaf oversubscription",
       "expr": "OSR = (server ports × server speed) ÷ (uplinks × uplink speed)",
       "meaning": "Example: 48 × 25 Gbps = 1,200 Gbps down; 8 × 100 Gbps = 800 Gbps up; OSR = 1.5:1."
      },
      {
       "name": "Fabric server ports",
       "expr": "Ports = leaves × server ports per leaf",
       "meaning": "Example: 64-port spines and 48-port leaves give up to 64 × 48 = 3,072 server ports."
      },
      {
       "name": "Capacity lost per spine failure",
       "expr": "Loss = 1 ÷ number of spines",
       "meaning": "With 4 spines a spine failure removes 25% of fabric bandwidth; with 8 spines, 12.5%."
      }
     ]
    },
    {
     "type": "callout",
     "kind": "example",
     "text": "Requirement: 2,000 dual-attached servers at 25 Gbps, at most 3:1 oversubscription, tolerate one spine failure at no worse than 4:1. Each server uses one port on each of two leaves, so 4,000 server ports are needed. With 48-port server leaves that is 84 leaves (42 pairs). Each leaf with 4 × 100 Gbps uplinks gives 1,200 ÷ 400 = 3:1, and 4:1 after losing a spine — just inside the limit. With 6 uplinks the ratios become 2:1 and 2.4:1, buying headroom. Spines need at least 84 ports plus border leaves, so 128-port spines (or a third stage) are required.",
     "title": "Sizing a fabric"
    },
    {
     "type": "table",
     "title": "East-west versus north-south: design consequences",
     "head": [
      "Aspect",
      "East-west dominated",
      "North-south dominated"
     ],
     "rows": [
      [
       "Traffic path",
       "Leaf → spine → leaf inside the fabric",
       "Leaf → spine → border leaf → WAN or internet"
      ],
      [
       "Bottleneck to watch",
       "Leaf uplink oversubscription",
       "Border leaf and edge capacity"
      ],
      [
       "Security placement",
       "Distributed or micro-segmentation near workloads",
       "Perimeter firewalls at the border"
      ],
      [
       "Growth lever",
       "More spines (bandwidth) and leaves (ports)",
       "Border capacity and WAN/internet circuits"
      ]
     ]
    },
    {
     "type": "callout",
     "kind": "insight",
     "text": "A two-tier fabric stops growing when the spine runs out of ports. The answer is a three-stage (five-hop) design: multiple spine-leaf pods connected by a super-spine layer. It adds a hop and another oversubscription point between pods, so place workloads that talk heavily to each other in the same pod.",
     "title": "When two tiers are not enough"
    },
    {
     "type": "case",
     "title": "Stock exchange trading data centre",
     "context": "A regional stock exchange is rebuilding its primary trading data centre. The matching engines must process orders with consistent latency measured in microseconds. Member firms colocate their servers in the same hall and require demonstrably equal access to the matching engines. Market data is distributed by multicast and must survive the loss of any single network device without gaps. Back-office, surveillance, settlement and corporate systems also run in the building and generate heavy east-west traffic. Regulators require time-stamping of every order with traceable precision and full separation of trading and corporate networks. The architecture team proposes a single large EVPN-VXLAN fabric for everything.",
     "questions": [
      "Does a single overlay fabric meet the trading requirements? Why or why not?",
      "How should market-data resilience be designed?",
      "How would you meet the fairness requirement for colocated members?",
      "Where does a spine-leaf fabric belong in this design?"
     ],
     "answer": "**Single fabric.** It would serve back-office and corporate workloads well, but the trading path needs the fewest possible hops, no encapsulation or control-plane dependency in the order path, and strict separation. A dedicated, minimal trading network — few hops, low-latency switching, simple routing — is a better fit, physically separate from the corporate fabric.\n**Market-data resilience.** Use two independent distribution networks (an A feed and a B feed) carrying the same multicast data over separate devices and paths, so receivers can arbitrate between them and a single failure causes no gap. Fast failover inside one network cannot guarantee zero loss; duplication across independent paths can.\n**Fairness.** Give every member the same connection type, the same number of hops and equal cable lengths to the matching-engine network, and publish the method so it can be audited. Precise time synchronisation (for example PTP, IEEE 1588) supports traceable time-stamping.\n**Spine-leaf placement.** A spine-leaf (possibly EVPN-VXLAN) fabric is the right choice for back-office, surveillance analytics and corporate workloads where east-west scale and flexibility matter, connected to the trading environment only through controlled, inspected interfaces."
    },
    {
     "type": "scenario",
     "title": "Fabric oversubscription for an analytics cluster",
     "situation": "A bank is adding a 40-rack analytics cluster that shuffles large datasets between servers continuously. Each rack has 32 servers at 100 Gbps. Leaves have 32 × 100 Gbps server ports and up to 8 × 400 Gbps uplinks. Budget allows either 4 or 8 spines. Which option best fits the workload?",
     "options": [
      {
       "text": "4 spines with 4 × 400 Gbps uplinks per leaf, giving 2:1 oversubscription to save cost",
       "feedback": "2:1 is reasonable for general workloads, but a sustained shuffle will be uplink-bound and a spine failure would remove a quarter of capacity.",
       "best": false
      },
      {
       "text": "8 spines, 8 × 400 Gbps uplinks per leaf: 1:1, non-blocking",
       "feedback": "Correct. A continuous all-to-all shuffle is the case where non-blocking design is justified. Eight spines also limit the bandwidth lost on a spine failure to 12.5%.",
       "best": true
      },
      {
       "text": "4 spines with 8 × 400 Gbps uplinks, two links from each leaf to each spine",
       "feedback": "This achieves 1:1 but each spine failure removes 25% of capacity, and spine port count limits the fabric to half as many leaves.",
       "best": false
      },
      {
       "text": "Connect the cluster through the existing general-purpose fabric's border leaves",
       "feedback": "Border leaves are not designed for sustained east-west load, so the analytics traffic would congest them and the general-purpose services that share them.",
       "best": false
      }
     ]
    },
    {
     "type": "template",
     "title": "Data centre fabric sizing sheet",
     "purpose": "Size a spine-leaf fabric and record the assumptions so growth and failure behaviour are explicit.",
     "columns": [
      "Pod / tier",
      "Leaves (server / border)",
      "Server ports × speed",
      "Uplinks × speed per leaf",
      "OSR normal / one spine down",
      "Spines × ports",
      "Growth headroom"
     ],
     "example": [
      [
       "Pod 1 general compute",
       "40 / 2",
       "48 × 25G",
       "6 × 100G",
       "2:1 / 2.4:1",
       "6 × 64",
       "22 spine ports free"
      ],
      [
       "Pod 2 analytics",
       "40 / 0",
       "32 × 100G",
       "8 × 400G",
       "1:1 / 1.14:1",
       "8 × 64",
       "24 spine ports free"
      ]
     ],
     "rows": 6
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Spine-leaf",
       "def": "A two-tier folded Clos topology in which every leaf connects to every spine, giving equal-cost paths between any two leaves."
      },
      {
       "term": "Clos network",
       "def": "A multistage switching topology that builds large, non-blocking capacity from many smaller switches."
      },
      {
       "term": "East-west traffic",
       "def": "Traffic between servers, services or storage inside the data centre."
      },
      {
       "term": "North-south traffic",
       "def": "Traffic entering or leaving the data centre, to users, the WAN or the internet."
      },
      {
       "term": "ECMP",
       "def": "Equal-cost multipath: forwarding flows across several equal-cost routes at once, typically by hashing packet headers."
      },
      {
       "term": "Border leaf",
       "def": "A leaf that connects the fabric to external networks and services rather than to servers."
      },
      {
       "term": "Super-spine",
       "def": "An additional tier that interconnects multiple spine-leaf pods to scale beyond one spine's port count."
      },
      {
       "term": "Non-blocking",
       "def": "A design whose uplink capacity equals or exceeds downlink capacity (1:1), so any traffic pattern can be carried at full rate in theory."
      }
     ]
    },
    {
     "type": "reflection",
     "prompt": "For a data centre you know, estimate the leaf oversubscription and the bandwidth lost when one spine fails. Is that loss acceptable for its most demanding application?"
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "In a two-tier spine-leaf fabric with one link between each leaf and each spine, what limits the maximum number of leaves?",
       "options": [
        "The number of uplink ports on each leaf",
        "The number of server ports on each leaf",
        "The number of routing adjacencies per spine",
        "The number of ports on each spine"
       ],
       "answer": 3,
       "explain": "Each leaf uses one port on every spine, so spine port count caps leaf count. Leaf uplink count caps the number of spines."
      },
      {
       "q": "A leaf has 48 × 25 Gbps server ports and 6 × 100 Gbps uplinks. What is its oversubscription ratio?",
       "options": [
        "1.5:1",
        "3:1",
        "2:1",
        "4:1"
       ],
       "answer": 2,
       "explain": "Downstream is 48 × 25 = 1,200 Gbps; upstream is 6 × 100 = 600 Gbps; 1,200 ÷ 600 = 2:1."
      },
      {
       "q": "Why did spine-leaf replace tree-based designs in most data centres?",
       "options": [
        "East-west traffic needed many active, equal-length paths",
        "North-south traffic to users grew faster than server traffic",
        "Spanning tree could not run on high-speed data centre links",
        "Tree designs could not connect firewalls and load balancers"
       ],
       "answer": 0,
       "explain": "Service-to-service traffic needs high bisection bandwidth and predictable latency. Spine-leaf provides many active ECMP paths with an equal hop count."
      },
      {
       "q": "A fabric has 4 spines. Moving to 8 spines of the same speed, with leaf uplinks doubled to match, mainly improves what?",
       "options": [
        "The number of server-facing ports available on each individual leaf switch",
        "Fabric bandwidth and the share of capacity lost per spine failure",
        "The maximum number of leaves the fabric can connect",
        "The latency between two servers on the same leaf"
       ],
       "answer": 1,
       "explain": "More spines add bandwidth and reduce each spine's share of capacity from 25% to 12.5%. Leaf count is limited by spine ports, and same-leaf traffic never crosses a spine."
      },
      {
       "q": "When does a fabric need a super-spine tier?",
       "options": [
        "When the fabric needs more than two equal-cost paths",
        "When servers require 100 Gbps instead of 25 Gbps",
        "When the required leaves exceed the spine's port count",
        "When north-south traffic exceeds east-west traffic"
       ],
       "answer": 2,
       "explain": "A super-spine connects multiple pods once a single spine layer runs out of ports. It adds a hop and an oversubscription point between pods."
      }
     ]
    }
   ]
  },
  {
   "id": "m2-l4",
   "title": "Data Centre Interconnect and Choosing a Design",
   "subtitle": "Connect sites without merging their failure domains",
   "minutes": 30,
   "objectives": [
    "Compare data centre interconnect options and their failure-domain impact",
    "Calculate the latency cost of distance and judge synchronous replication limits",
    "Select a campus or data centre design from requirements using a structured comparison"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Organisations run more than one data centre for resilience, capacity or proximity. The interconnect between them (DCI) is where many designs quietly undermine their own goals: a second site built for resilience is linked to the first in a way that lets one failure — a broadcast storm, a control-plane bug, a split brain — take down both. The design principle is simple to state and hard to keep: **connect the sites, but keep them separate failure domains**."
    },
    {
     "type": "table",
     "title": "Data centre interconnect options",
     "head": [
      "Option",
      "What it provides",
      "Strengths",
      "Watch out for"
     ],
     "rows": [
      [
       "Layer 3 routed DCI",
       "IP routing between sites over WAN, MPLS or fibre",
       "Independent failure domains; simple; scales",
       "Applications must tolerate different subnets per site"
      ],
      [
       "Overlay multi-site (e.g. EVPN-VXLAN with border gateways)",
       "Selective layer 2 extension over a routed core",
       "Stretches only chosen segments; BUM control; local gateways",
       "Control-plane and operational complexity"
      ],
      [
       "Native layer 2 stretch (VLAN trunk, pseudowire)",
       "Same VLANs at both sites",
       "Simple to understand; supports any L2 application",
       "Shared broadcast and failure domain; loop and split-brain risk"
      ],
      [
       "Dark fibre / DWDM",
       "Physical capacity carrying any of the above",
       "Very high bandwidth; low latency; protocol-agnostic",
       "Cost, distance limits, need for diverse routes"
      ]
     ]
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "Extending a VLAN across sites joins their broadcast domains. A loop or storm at one site reaches the other; a failure of the inter-site link can leave both sites believing they own the same gateway or cluster resource (split brain); and traffic can trombone across the DCI when a workload moves but its gateway or storage does not. Stretch only what a validated requirement demands, and use an overlay that confines flooding and localises gateways.",
     "title": "Why stretched layer 2 is risky"
    },
    {
     "type": "formula",
     "title": "Distance and latency",
     "items": [
      {
       "name": "Propagation delay in fibre",
       "expr": "≈ 5 µs per km, one way",
       "meaning": "Light travels at roughly two-thirds of its vacuum speed in glass, about 200,000 km per second."
      },
      {
       "name": "Round-trip time from distance",
       "expr": "RTT ≈ 2 × route-km × 5 µs + equipment delay",
       "meaning": "A 100 km fibre route gives about 1 ms RTT from propagation alone; the real fibre route is usually longer than the straight line."
      },
      {
       "name": "Synchronous write penalty",
       "expr": "Write latency ≥ local write + RTT to the remote copy",
       "meaning": "Every synchronous write waits for the remote acknowledgement, so the application's write-latency tolerance sets the maximum distance."
      }
     ]
    },
    {
     "type": "callout",
     "kind": "pro",
     "text": "Synchronous replication and active-active clusters are limited by the latency the application tolerates, not by what the network can carry. Ask the storage and application owners for their write-latency budget, convert it to route kilometres, and compare that with the fibre route — not the map distance. If the second site is too far, the design is asynchronous replication with a stated recovery point objective.",
     "title": "Let the application set the distance"
    },
    {
     "type": "compare",
     "title": "Active-active versus active-standby data centres",
     "columns": [
      {
       "title": "Active-active",
       "items": [
        "Both sites serve production simultaneously",
        "Capacity in use, not idle",
        "Needs global load balancing or anycast for ingress",
        "Risk of tromboning and state-synchronisation issues",
        "Demanding on DCI latency and application design"
       ]
      },
      {
       "title": "Active-standby",
       "items": [
        "One site serves; the other is ready to take over",
        "Simpler routing: one preferred entry point",
        "Spare capacity sits idle until failover",
        "Failover must be tested regularly to be trusted",
        "Tolerates longer distances with asynchronous replication"
       ]
      }
     ]
    },
    {
     "type": "scenario",
     "title": "A request to stretch",
     "situation": "An insurer has two data centres 35 km apart on diverse fibre. The virtualisation team wants all 400 VLANs stretched so that any VM can move between sites. Investigation shows only 12 VLANs host clustered applications that genuinely need the same subnet at both sites; the rest are ordinary workloads restored from backup in a disaster. Which DCI design best fits?",
     "options": [
      {
       "text": "Stretch all 400 VLANs over the fibre so the virtualisation team has full flexibility",
       "feedback": "This turns two sites into one failure domain to satisfy a want rather than a requirement. A single loop or storm could affect both data centres.",
       "best": false
      },
      {
       "text": "Pure routed DCI and re-engineer the 12 clustered applications before migration",
       "feedback": "Routed-only is the cleanest network, but re-engineering 12 applications may not be feasible in the timeline; it ignores a validated requirement.",
       "best": false
      },
      {
       "text": "Routed DCI, plus an overlay stretching only the 12 segments with local gateways",
       "feedback": "Correct. It meets the validated need while keeping most of the estate in separate failure domains. Localised gateways limit tromboning, and flooding controls stop one site's storms reaching the other.",
       "best": true
      },
      {
       "text": "A layer 2 pseudowire per VLAN for the 12 clustered segments only",
       "feedback": "Scoping to 12 VLANs is right, but native pseudowires provide no flooding control or gateway localisation, keeping split-brain and tromboning risks.",
       "best": false
      }
     ]
    },
    {
     "type": "table",
     "title": "Choosing between designs: a structured comparison",
     "head": [
      "Question",
      "Points toward simpler design",
      "Points toward more advanced design"
     ],
     "rows": [
      [
       "How many blocks, pods or sites?",
       "One or two, little growth",
       "Many, or rapid repeatable growth"
      ],
      [
       "Does policy need to follow users or workloads?",
       "Policy by subnet is enough",
       "Group or identity policy at scale"
      ],
      [
       "Do applications need the same subnet in many places?",
       "No, or only a few",
       "Widespread, validated mobility needs"
      ],
      [
       "How mature are operations and automation?",
       "Manual, small team",
       "Automated pipelines and telemetry in place"
      ],
      [
       "What is the cost of a shared failure?",
       "Low; outages tolerable",
       "High; must keep domains separate"
      ]
     ]
    },
    {
     "type": "checklist",
     "title": "Campus and data centre design review checklist",
     "items": [
      "Campus model justified by block count, buildings and growth plan",
      "L2/L3 boundary chosen from mobility and failure-domain requirements",
      "Oversubscription stated for normal and single-failure conditions",
      "Fabric spine and leaf port counts allow the planned growth",
      "Underlay MTU accounts for any overlay encapsulation",
      "DCI keeps each site a separate failure domain unless a requirement says otherwise",
      "Any stretched segment is listed with its owner and justification",
      "Synchronous replication distance checked against the application's latency budget",
      "Border and north-south capacity sized separately from east-west"
     ]
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Data centre interconnect (DCI)",
       "def": "The network connecting two or more data centres for replication, workload mobility and resilience."
      },
      {
       "term": "Split brain",
       "def": "A failure in which two sites or cluster members each believe they own the same resource after losing contact with each other."
      },
      {
       "term": "Traffic tromboning",
       "def": "Inefficient traffic that crosses the DCI and back because a workload and its gateway, service or storage are at different sites."
      },
      {
       "term": "BUM traffic",
       "def": "Broadcast, unknown-unicast and multicast traffic that must be flooded in a layer 2 segment."
      },
      {
       "term": "Synchronous replication",
       "def": "Replication in which a write completes only after the remote copy acknowledges it, so distance adds directly to write latency."
      },
      {
       "term": "Recovery point objective (RPO)",
       "def": "The maximum acceptable amount of data loss, measured in time, after a failure."
      },
      {
       "term": "Active-active",
       "def": "A design in which multiple sites serve production traffic simultaneously."
      },
      {
       "term": "Active-standby",
       "def": "A design in which one site serves production while another is held ready to take over after failover."
      }
     ]
    },
    {
     "type": "reflection",
     "prompt": "If your organisation's two data centres lost their interconnect right now, what would each site believe about the other? Is there any resource both would try to own?"
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "What is the main design risk of stretching many VLANs between two data centres?",
       "options": [
        "Routing protocols cannot run over the interconnect once VLANs are stretched",
        "Stretched VLANs prevent the use of any dark fibre between sites",
        "Storage replication must switch from synchronous to asynchronous",
        "The sites become one failure domain for loops, storms and split brain"
       ],
       "answer": 3,
       "explain": "Layer 2 extension joins broadcast and failure domains, so a fault at one site can reach the other. Routing and replication can still work over a stretched design."
      },
      {
       "q": "Two data centres are connected by a 120 km fibre route. Approximately what round-trip time does propagation alone add?",
       "options": [
        "About 1.2 ms",
        "About 0.12 ms",
        "About 0.6 ms",
        "About 12 ms"
       ],
       "answer": 0,
       "explain": "At roughly 5 µs per km one way, 120 km is 0.6 ms one way and about 1.2 ms round trip, before equipment delay."
      },
      {
       "q": "Which factor should set the maximum distance for synchronous replication between sites?",
       "options": [
        "The maximum distance supported by the routing protocol",
        "The number of VLANs that need to be stretched",
        "The oversubscription ratio of the leaf uplinks",
        "The application's tolerance for added write latency"
       ],
       "answer": 3,
       "explain": "Each synchronous write waits at least one round trip, so the application's write-latency budget determines how far apart the copies can be."
      },
      {
       "q": "In an active-active data centre design, what problem do localised (anycast) gateways at each site help to prevent?",
       "options": [
        "Traffic crossing the interconnect to reach a gateway at the other site",
        "Duplicate IP addresses appearing between workloads hosted at the two different sites",
        "Loss of synchronous replication during a DCI failure",
        "The need for any ingress load balancing between sites"
       ],
       "answer": 0,
       "explain": "With a local gateway at each site, a moved workload routes out locally instead of tromboning across the DCI to a remote gateway."
      }
     ]
    }
   ]
  }
 ]
});
TRACK.modules.push({
 "id": "m3",
 "order": 3,
 "code": "WAN",
 "title": "WAN, Internet Edge & Provider Design",
 "subtitle": "Transports, overlays, edges and the routing that ties them to providers",
 "outcomes": [
  "Match WAN transports to site requirements using delay, bandwidth and diversity budgets",
  "Make SD-WAN topology, tiering, breakout and control-plane resilience decisions",
  "Design a layered internet edge, DMZ and upstream DDoS strategy",
  "Engineer BGP multihoming and provider connectivity without loops or accidental transit"
 ],
 "lessons": [
  {
   "id": "m3-l1",
   "title": "WAN Transport Options and Budgets",
   "subtitle": "Match each site to transports by SLA, latency, cost and diversity",
   "minutes": 30,
   "objectives": [
    "Compare private, public and wireless WAN transports on the attributes that matter for design",
    "Build delay and bandwidth budgets for latency-sensitive applications",
    "Explain why transport diversity must be physical, not just contractual"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "The **WAN sheet** of the ZCDE Design Blueprint starts with transport. Every transport is a bundle of trade-offs: guaranteed performance versus cost, speed of delivery versus control, reach versus latency. The expert does not pick one transport for the whole estate; they match each site class to a combination of transports whose weaknesses do not overlap, and then prove with a budget that the critical applications will work over the result."
    },
    {
     "type": "table",
     "title": "WAN transport characteristics",
     "head": [
      "Transport",
      "Performance assurance",
      "Typical latency profile",
      "Cost and delivery",
      "Best use"
     ],
     "rows": [
      [
       "Private MPLS L3VPN",
       "End-to-end SLA, QoS classes honoured",
       "Low and stable",
       "Higher cost; weeks to months to deliver",
       "Sites with strict real-time or regulatory needs"
      ],
      [
       "Carrier Ethernet / L2 service",
       "SLA; customer controls routing",
       "Low and stable in metro areas",
       "Moderate to high; limited reach",
       "Metro DC and campus interconnect"
      ],
      [
       "Dedicated internet access",
       "SLA to provider edge only",
       "Good but internet path varies",
       "Moderate; symmetric bandwidth",
       "Hubs, data centres, larger branches"
      ],
      [
       "Business broadband",
       "Best effort",
       "Variable; contention at peak",
       "Low cost; fast to deliver; often asymmetric",
       "Branch primary or secondary under an overlay"
      ],
      [
       "4G / 5G cellular",
       "Best effort (some slicing offers emerging)",
       "Variable; depends on signal and load",
       "Fast to deploy; data plans and coverage vary",
       "Backup, temporary and mobile sites"
      ],
      [
       "LEO satellite",
       "Best effort",
       "Typically tens of milliseconds",
       "Fast to deploy; needs clear sky view",
       "Remote sites, diverse backup"
      ],
      [
       "GEO satellite",
       "Varies by service",
       "Roughly 500–700 ms round trip",
       "Wide reach; limited bandwidth",
       "Very remote sites, last-resort backup"
      ]
     ]
    },
    {
     "type": "compare",
     "title": "Private versus public transport",
     "columns": [
      {
       "title": "Private (MPLS, carrier Ethernet)",
       "items": [
        "Performance and QoS guaranteed by contract",
        "Traffic does not cross the public internet",
        "Provider involved in routing (L3VPN)",
        "Long lead times and contract lock-in",
        "Higher cost per megabit"
       ]
      },
      {
       "title": "Public (internet, cellular, satellite)",
       "items": [
        "Best effort beyond the provider edge",
        "Requires encryption and an overlay for privacy and steering",
        "Customer controls the overlay end to end",
        "Quick to order and change",
        "Much lower cost per megabit"
       ]
      }
     ]
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "Two circuits from two carriers can still share a duct under the same street, the same building entry, or the same upstream exchange. Contractual diversity is not physical diversity. Ask for route maps, require separate building entries where the requirement justifies it, and combine wired with wireless transports to make a shared physical failure much less likely.",
     "title": "Diversity you cannot see"
    },
    {
     "type": "formula",
     "title": "WAN budget arithmetic",
     "items": [
      {
       "name": "One-way delay budget",
       "expr": "D = propagation + serialisation + queuing + processing (+ jitter buffer)",
       "meaning": "Add every component on the path and compare with the application's budget; a widely used planning target for interactive voice is no more than 150 ms one way."
      },
      {
       "name": "Serialisation delay",
       "expr": "t = frame size in bits ÷ link rate",
       "meaning": "A 1,500-byte frame takes 1.2 ms to clock onto a 10 Mbps link but 12 µs on 1 Gbps — significant only on slow links."
      },
      {
       "name": "Bandwidth-delay product",
       "expr": "BDP = bandwidth × RTT",
       "meaning": "The data in flight needed to fill a path: 1 Gbps × 80 ms = 80 Mbit (10 MB). A sender's window smaller than this cannot use the full link."
      },
      {
       "name": "Single-flow TCP ceiling",
       "expr": "Throughput ≤ window size ÷ RTT",
       "meaning": "A 64 KB window over 100 ms RTT limits one flow to about 5.2 Mbps regardless of circuit size."
      },
      {
       "name": "Voice call bandwidth",
       "expr": "(payload + 40 B IP/UDP/RTP) × 8 × packets per second",
       "meaning": "A 64 kbps codec with 20 ms packets: (160 + 40) × 8 × 50 = 80 kbps per direction at layer 3, before tunnel overhead."
      }
     ]
    },
    {
     "type": "callout",
     "kind": "example",
     "text": "A research group complains that copying data to a partner 9,000 km away crawls at under 10 Mbps on a new 1 Gbps circuit. The route RTT is about 110 ms. With a 64 KB window, one TCP flow is capped near 4.8 Mbps. The fix is not more bandwidth but window scaling, parallel streams or a transfer tool built for high-latency paths — a reminder that latency, not just capacity, limits throughput.",
     "title": "Why the link upgrade did not help"
    },
    {
     "type": "scenario",
     "title": "Choosing transports for remote sites",
     "situation": "A mining company has 25 remote sites with no fixed-line service, each running safety telemetry (small, latency-tolerant), voice calls and video safety briefings. Requirement: no single failure isolates a site; voice quality must be good. Which transport combination best fits?",
     "options": [
      {
       "text": "GEO satellite as primary because it has the widest coverage, with no secondary path",
       "feedback": "GEO round-trip delay makes interactive voice poor, and a single path breaks the no-isolation requirement.",
       "best": false
      },
      {
       "text": "LEO primary, 4G/5G where available, GEO as last resort for telemetry",
       "feedback": "Correct. LEO gives latency suitable for voice and video, cellular adds a physically different path where available, and GEO keeps telemetry flowing if both fail — its high delay is acceptable for that traffic but not for voice.",
       "best": true
      },
      {
       "text": "Two LEO terminals from the same provider for diversity",
       "feedback": "Two terminals from one provider share the same constellation, ground network and control plane, so they do not provide independent failure domains.",
       "best": false
      },
      {
       "text": "Private MPLS circuits to every site for guaranteed quality",
       "feedback": "There is no fixed-line service at these sites, so private circuits are not available — the option breaks a constraint.",
       "best": false
      }
     ]
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "MPLS L3VPN",
       "def": "A provider service that carries customer routes in a private routed network, keeping each customer's traffic separate and supporting QoS end to end."
      },
      {
       "term": "Dedicated internet access (DIA)",
       "def": "An internet circuit with guaranteed bandwidth and an SLA up to the provider edge."
      },
      {
       "term": "LEO satellite",
       "def": "Low-Earth-orbit satellite service with much lower latency than geostationary systems, typically tens of milliseconds."
      },
      {
       "term": "GEO satellite",
       "def": "Geostationary satellite service with wide coverage but long round-trip delay because of orbital distance."
      },
      {
       "term": "Serialisation delay",
       "def": "The time needed to place a frame's bits onto a link; it depends on frame size and link rate."
      },
      {
       "term": "Bandwidth-delay product",
       "def": "The amount of data in flight required to keep a path full: bandwidth multiplied by round-trip time."
      },
      {
       "term": "Physical diversity",
       "def": "Separation of circuits along their entire physical route — ducts, building entries and exchanges — not just different providers."
      },
      {
       "term": "Jitter",
       "def": "Variation in packet delay; real-time applications absorb it with a jitter buffer that adds delay."
      }
     ]
    },
    {
     "type": "reflection",
     "prompt": "For one of your critical applications, write its delay budget component by component. Which component dominates, and could a transport choice change it?"
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "A file transfer over a 500 Mbps link with 120 ms RTT achieves only about 4 Mbps per flow. What is the MOST likely cause?",
       "options": [
        "The link is oversubscribed by other traffic during busy hours",
        "Serialisation delay on the 500 Mbps link is excessive",
        "The TCP window is too small for the bandwidth-delay product",
        "The provider is shaping traffic below the contracted rate"
       ],
       "answer": 2,
       "explain": "A 64 KB window over 120 ms caps a flow near 4.4 Mbps. The BDP is 7.5 MB, so the window, not the circuit, limits throughput."
      },
      {
       "q": "Why are two circuits from two different carriers not automatically diverse?",
       "options": [
        "Carriers are required by regulation to route all circuits through one exchange",
        "They may share ducts, building entry points or upstream facilities",
        "Two carriers cannot both terminate at the same site router",
        "Diversity only exists when both circuits use the same technology"
       ],
       "answer": 1,
       "explain": "Physical diversity depends on the actual route. Different carriers often lease the same infrastructure for the last mile."
      },
      {
       "q": "What is the approximate serialisation delay of a 1,500-byte frame on a 2 Mbps link?",
       "options": [
        "6 ms",
        "0.6 ms",
        "60 ms",
        "1.2 ms"
       ],
       "answer": 0,
       "explain": "1,500 × 8 = 12,000 bits; 12,000 ÷ 2,000,000 = 0.006 s = 6 ms."
      },
      {
       "q": "Which transport is LEAST suitable as the primary path for interactive voice?",
       "options": [
        "LEO satellite",
        "Private MPLS L3VPN",
        "GEO satellite",
        "Dedicated internet access"
       ],
       "answer": 2,
       "explain": "GEO round-trip delay of roughly half a second or more makes conversation difficult. The others normally keep voice within its delay budget."
      },
      {
       "q": "What is the main reason to combine a wired transport with a cellular one at a branch?",
       "options": [
        "Cellular service always offers lower latency than wired broadband",
        "Their failure causes are largely independent, so one event rarely breaks both",
        "Cellular circuits include an end-to-end SLA that wired services lack",
        "Combining them removes the need for an overlay or encryption"
       ],
       "answer": 1,
       "explain": "Mixing physical media avoids shared failures such as a cut duct. Cellular is usually best effort and still needs encryption."
      }
     ]
    }
   ]
  },
  {
   "id": "m3-l2",
   "title": "SD-WAN and WAN Topology Design",
   "subtitle": "Overlay decisions: topology, site tiers, steering and failure behaviour",
   "minutes": 35,
   "objectives": [
    "Choose a WAN topology — hub-and-spoke, regional hubs, partial or full mesh — from traffic patterns",
    "Define site tiers that standardise transports and resilience",
    "Make SD-WAN design decisions on steering, internet breakout, segmentation and control-plane resilience"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "A software-defined WAN builds an encrypted overlay across any mix of transports and steers each application over the best path according to policy and measured performance. The technology is mature; the design decisions are where projects succeed or fail. Which sites talk to which? Where does internet traffic leave? What happens when the controller is unreachable? How many site types will you support? The answers come from requirements, not from the product's feature list."
    },
    {
     "type": "layers",
     "title": "SD-WAN architecture planes",
     "items": [
      {
       "label": "Management / orchestration",
       "parts": [
        "Templates and policy definition",
        "Zero-touch provisioning",
        "Monitoring and analytics"
       ]
      },
      {
       "label": "Control plane",
       "parts": [
        "Controllers distribute routes, keys and policy",
        "Topology and tunnel decisions",
        "Usually redundant and geographically spread"
       ]
      },
      {
       "label": "Data plane",
       "parts": [
        "Edge devices at sites, hubs and clouds",
        "Encrypted tunnels over each transport",
        "Per-application path selection and probing"
       ]
      },
      {
       "label": "Transport",
       "parts": [
        "MPLS, broadband, DIA, cellular, satellite",
        "Any IP connectivity",
        "Diversity chosen per site tier"
       ]
      }
     ]
    },
    {
     "type": "table",
     "title": "WAN topology options",
     "head": [
      "Topology",
      "Traffic pattern it suits",
      "Strengths",
      "Weaknesses"
     ],
     "rows": [
      [
       "Hub-and-spoke",
       "Branch to data centre",
       "Simple policy; central inspection",
       "Branch-to-branch hairpins through the hub"
      ],
      [
       "Regional hubs",
       "Large geographic spread",
       "Shorter paths; regional failure isolation",
       "More hubs to build and operate"
      ],
      [
       "Partial mesh / dynamic tunnels",
       "Some branch-to-branch (voice, video)",
       "Direct paths created on demand",
       "More state at edges; policy complexity"
      ],
      [
       "Full mesh",
       "Heavy any-to-any traffic, few sites",
       "Optimal paths everywhere",
       "Tunnel count grows with the square of sites"
      ]
     ]
    },
    {
     "type": "formula",
     "title": "Overlay scaling",
     "items": [
      {
       "name": "Full-mesh tunnel count",
       "expr": "Tunnels = n × (n − 1) ÷ 2 per transport pairing",
       "meaning": "200 sites in one transport give 19,900 tunnels; most of them would carry almost no traffic."
      },
      {
       "name": "Tunnels per edge",
       "expr": "Up to (n − 1) × t² with t transports and all cross-transport pairings",
       "meaning": "With 200 sites and 2 transports, each edge could hold 796 tunnels — check the platform's limit and restrict pairings."
      },
      {
       "name": "Hub tunnel load",
       "expr": "Tunnels at hub ≈ spokes × transports per spoke × hub transports",
       "meaning": "Hub sizing is driven by tunnel count and encrypted throughput, not just bandwidth."
      }
     ]
    },
    {
     "type": "table",
     "title": "Example site tiers",
     "head": [
      "Tier",
      "Sites",
      "Edge devices",
      "Transports",
      "Target"
     ],
     "rows": [
      [
       "Tier 1 — hub / data centre",
       "4",
       "2, separate power and rooms",
       "2 × DIA from different carriers + MPLS",
       "No single failure affects service"
      ],
      [
       "Tier 2 — large branch",
       "30",
       "2",
       "MPLS or DIA + broadband, diverse entry",
       "No single failure isolates the site"
      ],
      [
       "Tier 3 — standard branch",
       "120",
       "1",
       "Broadband + 4G/5G",
       "Survive any single transport failure"
      ],
      [
       "Tier 4 — micro site / kiosk",
       "60",
       "1 (cellular-integrated)",
       "4G/5G (+ broadband where available)",
       "Best effort; next-day hardware swap"
      ]
     ]
    },
    {
     "type": "callout",
     "kind": "pro",
     "text": "Four or five site tiers with fixed transport, device and policy templates make the WAN operable at scale. When a site does not fit, record a design exception with its owner and reason. A WAN with dozens of one-off sites loses most of the operational benefit of the overlay.",
     "title": "Standardise tiers, then defend every exception"
    },
    {
     "type": "compare",
     "title": "Internet traffic from branches",
     "columns": [
      {
       "title": "Backhaul to central hub",
       "items": [
        "Uses existing central inspection stack",
        "Consistent policy and logging",
        "Adds latency to SaaS and cloud",
        "Consumes hub and WAN bandwidth"
       ]
      },
      {
       "title": "Local breakout (direct internet access)",
       "items": [
        "Lowest latency to SaaS and cloud",
        "Offloads hubs and private WAN",
        "Needs security at the branch or in a cloud security service",
        "More enforcement points to govern"
       ]
      }
     ]
    },
    {
     "type": "callout",
     "kind": "insight",
     "text": "Most overlays keep forwarding on established tunnels for a period when controllers become unreachable, but cannot build new tunnels, re-key indefinitely or accept policy changes. Ask the vendor for the exact behaviour and timers, place controllers in at least two independent locations, and make sure a regional outage cannot isolate every site from every controller at once.",
     "title": "Control-plane failure is a design input"
    },
    {
     "type": "case",
     "title": "Regional bank WAN modernisation",
     "context": "A regional bank has 150 branches, two data centres 60 km apart, and a call centre. All branches use a single MPLS L3VPN whose contract ends in 14 months. Teller and core-banking applications run in the data centres; email and collaboration have moved to SaaS, and branch staff watch weekly video training. The regulator requires encryption of customer data over any network the bank does not control, documented resilience testing, and logging of all internet access. Thirty rural branches can only obtain 30 Mbps broadband, and some have weak cellular coverage. ATMs at each branch must keep working through any single failure. The network team has six engineers and limited weekend change windows.",
     "questions": [
      "Which topology and site tiers would you propose?",
      "Would you keep MPLS? Justify the decision for different branch classes.",
      "How will internet traffic leave branches while meeting the logging requirement?",
      "What migration risks must the design address?"
     ],
     "answer": "**Topology and tiers.** An SD-WAN overlay with both data centres as hubs (hub-and-spoke for core banking, with dynamic branch-to-branch tunnels only if voice requires it). Tier 1: data centres with dual DIA from different carriers plus any retained private circuits. Tier 2: large branches with two edges and two diverse transports. Tier 3: standard branches with one edge, broadband plus cellular. Rural exceptions: broadband plus LEO satellite where cellular is weak.\n**MPLS.** Keeping a reduced private service at the data centres and the largest branches can ease migration and offer predictable QoS, but the ATM and teller requirements can be met by two independent transports under an encrypted overlay. Present both options in a decision matrix weighted on cost, resilience and the team's capacity; do not keep MPLS by default.\n**Internet traffic.** Local breakout for approved SaaS through a cloud security service that logs all access centrally, with other internet traffic backhauled to the data-centre stack. Both paths must produce logs that meet the regulator's requirement.\n**Migration risks.** Encryption must be on before any public transport carries customer data; ATM paths must be tested for failover per branch; the 14-month contract end leaves little slack for 150 sites with limited windows — plan waves by tier, run MPLS and the overlay in parallel during migration, and negotiate a short MPLS extension as a contingency."
    },
    {
     "type": "scenario",
     "title": "Branch-to-branch voice",
     "situation": "A retailer's 400 stores connect to two hubs in a hub-and-spoke overlay. The business is introducing store-to-store video calls for remote expert support, peaking at 30 concurrent calls estate-wide. Which design change best fits?",
     "options": [
      {
       "text": "Convert the overlay to a permanent full mesh between all 400 stores",
       "feedback": "Full mesh creates almost 80,000 tunnels per transport for 30 concurrent calls; edge platforms may not support it and it adds no value for idle pairs.",
       "best": false
      },
      {
       "text": "Keep hub-and-spoke and upgrade hub bandwidth to carry the extra calls",
       "feedback": "Bandwidth is not the main issue — the hairpin adds delay to every call. Thirty calls are a small load for the hubs.",
       "best": false
      },
      {
       "text": "Route store-to-store calls over cellular so they bypass the hubs",
       "feedback": "Cellular is a backup transport here, and steering real-time traffic onto it by default adds variability and data cost.",
       "best": false
      },
      {
       "text": "On-demand dynamic tunnels between stores for real-time traffic",
       "feedback": "Correct. Calls get a direct path with lower delay, while tunnel state stays small because only a handful of store pairs are active at any time.",
       "best": true
      }
     ]
    },
    {
     "type": "template",
     "title": "WAN design sheet",
     "purpose": "Standardise each site tier and record its transports, resilience, breakout and exceptions.",
     "columns": [
      "Site tier",
      "Number of sites",
      "Edges",
      "Transports (primary / secondary)",
      "Internet breakout",
      "Resilience target",
      "Exceptions"
     ],
     "example": [
      [
       "Tier 3 standard branch",
       "120",
       "1",
       "Broadband 300M / 5G",
       "Local via cloud security service",
       "Survive any one transport failure",
       "8 rural sites use LEO instead of 5G"
      ]
     ],
     "rows": 6
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "SD-WAN",
       "def": "A software-defined overlay that builds encrypted tunnels across multiple transports and steers applications by policy and measured path quality."
      },
      {
       "term": "Overlay",
       "def": "A logical network of tunnels built on top of one or more underlying transports."
      },
      {
       "term": "Application-aware routing",
       "def": "Selecting a path per application based on measured loss, latency and jitter against policy thresholds."
      },
      {
       "term": "Local internet breakout",
       "def": "Sending internet-bound traffic directly from a branch rather than backhauling it to a central site."
      },
      {
       "term": "Dynamic tunnel",
       "def": "An overlay tunnel created on demand between two sites when traffic needs a direct path, and removed after it is idle."
      },
      {
       "term": "Site tier",
       "def": "A standard site design defining edge count, transports, resilience target and policy for a class of locations."
      },
      {
       "term": "Zero-touch provisioning",
       "def": "Automatic onboarding in which a new edge device obtains its configuration from the orchestrator when first connected."
      },
      {
       "term": "Hub site",
       "def": "A data centre or regional site where many spoke tunnels terminate and shared services or inspection are provided."
      }
     ]
    },
    {
     "type": "reflection",
     "prompt": "How many distinct site designs does your WAN really have today? Which of them could be merged into a tier, and which deserve to stay as documented exceptions?"
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "A WAN of 300 sites runs a single transport in a full mesh. How many tunnels does the overlay contain?",
       "options": [
        "90,000",
        "299",
        "89,700",
        "44,850"
       ],
       "answer": 3,
       "explain": "n(n − 1) ÷ 2 = 300 × 299 ÷ 2 = 44,850 tunnels. Each edge maintains 299 of them."
      },
      {
       "q": "What usually happens to an established SD-WAN data plane when all controllers become unreachable?",
       "options": [
        "All tunnels drop immediately and sites fall back to the underlay only",
        "Edges elect a new controller among themselves and then continue operating normally",
        "Traffic is forwarded unencrypted until a controller returns",
        "Existing tunnels keep forwarding for a period but new changes cannot be made"
       ],
       "answer": 3,
       "explain": "Typical overlays keep forwarding on current state for a limited time. Exact behaviour and timers vary, so they must be confirmed and designed for."
      },
      {
       "q": "Which requirement MOST favours local internet breakout over backhaul?",
       "options": [
        "Low latency to SaaS applications from widely spread branches",
        "A rule that all internet access must pass through one appliance",
        "A shortage of security skills to manage many enforcement points",
        "Branches whose only transport is a private MPLS service"
       ],
       "answer": 0,
       "explain": "Breakout shortens the path to SaaS. The other conditions favour backhaul or make breakout impossible."
      },
      {
       "q": "What is the main operational benefit of defining a small number of site tiers?",
       "options": [
        "Each site can be optimised individually for its exact traffic",
        "Tiers remove the need for any per-site documentation",
        "Standard templates make many sites predictable to deploy and support",
        "Tiers guarantee the lowest possible cost for every location"
       ],
       "answer": 2,
       "explain": "Standardisation is what makes a large WAN operable. Exceptions are allowed but should be documented and justified."
      },
      {
       "q": "A hub-and-spoke overlay is adding store-to-store video. What is the main drawback of keeping all traffic through the hubs?",
       "options": [
        "The hubs cannot encrypt traffic between two stores",
        "Each call hairpins through a hub, adding delay",
        "Stores lose their path to the data centres during calls",
        "Video traffic cannot be classified in a hub-and-spoke design"
       ],
       "answer": 1,
       "explain": "Hairpinning lengthens the path and adds latency for real-time media. Dynamic tunnels give a direct path when needed."
      }
     ]
    }
   ]
  },
  {
   "id": "m3-l3",
   "title": "Internet Edge and DMZ Design",
   "subtitle": "Resilient, secure entry points for users, services and partners",
   "minutes": 30,
   "objectives": [
    "Design a layered internet edge with defined roles for routing, DDoS protection and inspection",
    "Choose a DMZ pattern that fits the services and risk profile",
    "Plan DDoS mitigation that works when the access link itself is saturated"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "The internet edge carries three different jobs: letting users out, letting customers and partners in to published services, and protecting both from attack. Mixing those jobs on one undifferentiated stack makes it hard to scale, hard to secure and hard to change. A clear edge design separates them into layers, each with a defined responsibility and failure behaviour."
    },
    {
     "type": "layers",
     "title": "Layered internet edge",
     "items": [
      {
       "label": "Upstream protection",
       "parts": [
        "Provider or cloud DDoS scrubbing",
        "Remotely triggered blackholing via provider communities",
        "Diverse ISPs and points of presence"
       ]
      },
      {
       "label": "Edge routing",
       "parts": [
        "BGP with ISPs",
        "Inbound and outbound route filtering",
        "Anti-spoofing filters on ingress"
       ]
      },
      {
       "label": "Perimeter firewall",
       "parts": [
        "Stateful filtering between zones",
        "NAT where required",
        "High-availability pair or cluster"
       ]
      },
      {
       "label": "DMZ services",
       "parts": [
        "Reverse proxies and web application firewalls",
        "Public DNS, mail relays, partner gateways",
        "No direct path from internet to internal hosts"
       ]
      },
      {
       "label": "Internal and outbound control",
       "parts": [
        "Secure web gateway or cloud security service",
        "Internal firewalls and segmentation",
        "Logging and monitoring"
       ]
      }
     ]
    },
    {
     "type": "compare",
     "title": "DMZ patterns",
     "columns": [
      {
       "title": "Three-legged firewall",
       "items": [
        "One firewall pair with outside, DMZ and inside zones",
        "Lower cost and simpler to operate",
        "A firewall compromise or misconfiguration affects all zones",
        "Fits small and mid-sized estates"
       ]
      },
      {
       "title": "Back-to-back (dual-tier) firewalls",
       "items": [
        "DMZ between an outer and an inner firewall pair",
        "Defence in depth; inner pair protects internal networks",
        "Optionally different technologies at each tier",
        "More cost, rules and operational effort"
       ]
      },
      {
       "title": "Cloud-hosted front door",
       "items": [
        "Public services fronted by a cloud proxy, WAF and DDoS service",
        "Absorbs attacks far from your links",
        "Origin reachable only from the provider",
        "Dependence on the provider; data-handling review needed"
       ]
      }
     ]
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "A volumetric attack that fills your 10 Gbps access link has succeeded before traffic reaches any on-site device. Mitigation must happen upstream — in the ISP's network or a cloud scrubbing service — with traffic diverted by BGP or DNS. On-site devices still matter for application-layer attacks and for attacks small enough to fit through the link.",
     "title": "On-premises appliances cannot stop a full pipe"
    },
    {
     "type": "table",
     "title": "DDoS mitigation options",
     "head": [
      "Option",
      "How it works",
      "Strengths",
      "Limits"
     ],
     "rows": [
      [
       "Remotely triggered blackhole (RTBH)",
       "Signal a prefix to the ISP to drop all traffic to it",
       "Fast; protects the rest of the link",
       "Completes the attack for the targeted address"
      ],
      [
       "ISP scrubbing service",
       "ISP filters attack traffic in its network",
       "Large capacity close to the source",
       "Per-ISP; multi-ISP edges need coverage on all"
      ],
      [
       "Cloud scrubbing, on demand (BGP diversion)",
       "Advertise a more-specific prefix via the scrubbing provider, receive clean traffic over a tunnel",
       "Very large capacity; ISP-independent",
       "Diversion time; needs pre-staged routing and tunnels"
      ],
      [
       "Always-on cloud proxy",
       "Public services always reached through a cloud front door",
       "No diversion delay; also gives WAF and caching",
       "Only for proxied services (mainly web)"
      ]
     ]
    },
    {
     "type": "steps",
     "title": "Designing a resilient internet edge",
     "items": [
      {
       "title": "Classify flows",
       "text": "Separate user outbound, published inbound services, partner and B2B connections, and remote access. Each has different capacity and security needs."
      },
      {
       "title": "Choose provider diversity",
       "text": "Two ISPs with physically diverse paths, ideally into two edge sites, with provider-independent or portable addressing if inbound services must survive a provider failure."
      },
      {
       "title": "Pick the DMZ pattern",
       "text": "Match the pattern to the risk of the published services and the regulatory requirement for defence in depth."
      },
      {
       "title": "Plan DDoS response before you need it",
       "text": "Pre-stage scrubbing, blackhole communities and runbooks; test diversion at least annually."
      },
      {
       "title": "Size for the worst case",
       "text": "Size firewalls and links for single-failure conditions and peak inspection load, including TLS decryption cost if used."
      }
     ]
    },
    {
     "type": "scenario",
     "title": "Edge design for a port authority",
     "situation": "A port authority publishes a vessel-booking portal used by shipping agents worldwide and runs operational systems that must never be reachable from the internet. It has one data centre, two ISPs, a small security team, and a regulator that requires defence in depth for critical infrastructure. Last year a DDoS attack saturated its 5 Gbps link for six hours. Which edge design best fits?",
     "options": [
      {
       "text": "Always-on cloud front door, dual-tier DMZ for the origin, no inbound path to operations",
       "feedback": "Correct. The cloud front door absorbs volumetric attacks before they reach the links, the dual-tier DMZ provides the required defence in depth, and operational systems stay unreachable from outside.",
       "best": true
      },
      {
       "text": "Add a larger on-premises DDoS appliance and upgrade both links to 10 Gbps",
       "feedback": "Bigger links raise the bar slightly but attacks routinely exceed tens of gigabits. On-site mitigation cannot help once the pipes are full.",
       "best": false
      },
      {
       "text": "A single three-legged firewall with the portal and operational systems in separate DMZ legs",
       "feedback": "Operational systems should not sit in any internet-facing zone, and a single tier does not meet the defence-in-depth requirement.",
       "best": false
      },
      {
       "text": "Remotely triggered blackholing of the portal address whenever an attack starts",
       "feedback": "Blackholing protects the link but takes the portal offline — completing the attack for the service the business most needs.",
       "best": false
      }
     ]
    },
    {
     "type": "checklist",
     "title": "Internet edge design checklist",
     "items": [
      "Flows classified: outbound, inbound services, partners, remote access",
      "Two ISPs with verified physical diversity",
      "Addressing strategy supports inbound failover between providers",
      "Inbound and outbound BGP filtering defined",
      "Anti-spoofing filters on all external interfaces",
      "DMZ pattern chosen and justified against the risk profile",
      "No direct internet path to internal or operational systems",
      "DDoS mitigation pre-staged upstream and tested",
      "Firewall and link capacity sized for single-failure and peak inspection load",
      "Outbound access logged to meet regulatory needs"
     ]
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "DMZ",
       "def": "A network zone for services reachable from untrusted networks, separated by filtering from both the internet and internal networks."
      },
      {
       "term": "Three-legged firewall",
       "def": "A single firewall (or pair) with separate interfaces for outside, DMZ and inside zones."
      },
      {
       "term": "Back-to-back firewalls",
       "def": "A DMZ placed between an outer and an inner firewall tier for defence in depth."
      },
      {
       "term": "Volumetric DDoS",
       "def": "An attack that aims to exhaust link or network capacity with sheer traffic volume."
      },
      {
       "term": "Scrubbing",
       "def": "Filtering attack traffic out of a traffic stream in a provider or cloud network and forwarding the clean traffic."
      },
      {
       "term": "RTBH",
       "def": "Remotely triggered blackholing: signalling a provider, typically with a BGP community, to discard all traffic to a specific prefix."
      },
      {
       "term": "Anti-spoofing filter",
       "def": "A filter that drops packets whose source addresses could not legitimately arrive on that interface."
      },
      {
       "term": "Web application firewall",
       "def": "A filter that inspects traffic to published web applications for attacks such as injection and automated abuse."
      }
     ]
    },
    {
     "type": "reflection",
     "prompt": "If your main internet link were saturated by an attack right now, what is the first action, who takes it, and how long would it take? Is that written down anywhere?"
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Why can an on-premises DDoS appliance NOT stop a volumetric attack that saturates the access link?",
       "options": [
        "The appliance cannot inspect encrypted traffic at line rate",
        "Volumetric attacks always use spoofed IPv6 source addresses",
        "Appliances only work when traffic is first sent to a cloud proxy",
        "The congestion occurs upstream of the appliance, before traffic reaches it"
       ],
       "answer": 3,
       "explain": "Once the link is full, legitimate traffic is already being dropped upstream. Mitigation must happen in the provider or a scrubbing network."
      },
      {
       "q": "What is the main drawback of remotely triggered blackholing during an attack?",
       "options": [
        "All traffic to the targeted address is dropped, including legitimate users",
        "It requires replacing the existing edge routers with dedicated scrubbing hardware first",
        "It only works when the attacker uses a single source address",
        "It forces all outbound traffic onto the secondary ISP"
       ],
       "answer": 0,
       "explain": "RTBH protects the rest of the network by sacrificing the target. It is useful but makes the targeted service unavailable."
      },
      {
       "q": "When is a back-to-back (dual-tier) firewall DMZ MOST justified over a three-legged design?",
       "options": [
        "When the organisation has a very small security team to manage rules",
        "When regulation or risk demands defence in depth for internal networks",
        "When the only published service is a static marketing website",
        "When the cost of the edge must be kept as low as possible"
       ],
       "answer": 1,
       "explain": "Dual tiers add protection at the cost of more rules and devices. Small teams and low-risk services usually favour the simpler pattern."
      },
      {
       "q": "Which addressing approach best supports inbound services surviving the loss of one ISP?",
       "options": [
        "Separate provider-assigned blocks with no DNS changes",
        "Private addressing translated only at the primary ISP",
        "Provider-independent space advertised to both ISPs",
        "A single provider-assigned block advertised to that ISP only"
       ],
       "answer": 2,
       "explain": "Provider-independent space can be announced to both providers, so the same addresses stay reachable through either."
      }
     ]
    }
   ]
  },
  {
   "id": "m3-l4",
   "title": "BGP Multihoming and Provider Connectivity",
   "subtitle": "Control inbound and outbound paths, and design around provider routing models",
   "minutes": 35,
   "objectives": [
    "Select a multihoming model from availability and traffic requirements",
    "Choose the right inbound and outbound traffic-engineering tools and predict their effect",
    "Design PE-CE routing and dual-provider WANs without loops or accidental transit"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Multihoming is about two different directions. **Outbound** traffic engineering is easy because you control it: your routers choose the exit. **Inbound** traffic engineering is hard because other networks choose how to reach you; you can only influence their choice with the attributes and prefixes you advertise. Good designs set realistic expectations for inbound control and use the strongest tool that is acceptable to the internet community."
    },
    {
     "type": "table",
     "title": "Multihoming models",
     "head": [
      "Model",
      "Description",
      "Protects against",
      "Does not protect against"
     ],
     "rows": [
      [
       "Single-homed",
       "One link, one ISP",
       "Nothing beyond the ISP's own resilience",
       "Link, router or ISP failure"
      ],
      [
       "Dual-linked, one ISP",
       "Two links, one router or two, same provider",
       "Link and router failure",
       "Provider-wide outage or routing incident"
      ],
      [
       "Dual-homed, one ISP, two PoPs",
       "Two links to different provider points of presence",
       "Local and PoP failure",
       "Provider-wide outage"
      ],
      [
       "Multihomed, two ISPs",
       "Links to two independent providers, own AS and portable addressing",
       "Provider failure, most single failures",
       "Shared physical paths if diversity is not verified"
      ]
     ]
    },
    {
     "type": "framework",
     "title": "Inbound traffic-engineering tools",
     "items": [
      {
       "label": "MSP",
       "title": "More-specific prefixes",
       "text": "Advertise longer prefixes through the preferred path; longest match wins everywhere. Most effective, but adds routes to the global table and is limited by maximum accepted prefix length (commonly /24 for IPv4, /48 for IPv6)."
      },
      {
       "label": "COM",
       "title": "Provider communities",
       "text": "Many providers let customers set communities that change local preference or limit propagation inside their network — precise control where offered."
      },
      {
       "label": "PRP",
       "title": "AS-path prepending",
       "text": "Lengthen the AS path on the less-preferred link. Coarse and only a tie-breaker: networks that set local preference ignore it."
      },
      {
       "label": "MED",
       "title": "Multi-exit discriminator",
       "text": "Suggests an entry point to a single neighbouring AS with multiple links. Not compared across different providers by default."
      }
     ]
    },
    {
     "type": "callout",
     "kind": "insight",
     "text": "To choose your exit, set local preference on routes received from each provider. Taking a default route from both providers plus partial routes (the providers' own customers) is often enough: it gives sensible exits for well-connected destinations without the memory and churn of full internet tables on every edge router.",
     "title": "Outbound is local preference"
    },
    {
     "type": "cli",
     "title": "Dual-ISP edge: prefer ISP-A outbound, de-prefer ISP-B inbound",
     "device": "EDGE1 · IOS-style CLI",
     "lines": [
      "! Single router shown for clarity; production designs often use two",
      "router bgp 64500",
      " neighbor 192.0.2.1 remote-as 64501",
      " neighbor 192.0.2.1 description ISP-A primary",
      " neighbor 192.0.2.1 prefix-list OUR-PREFIXES out",
      " neighbor 192.0.2.1 route-map FROM-ISP-A in",
      " neighbor 198.51.100.1 remote-as 64502",
      " neighbor 198.51.100.1 description ISP-B secondary",
      " neighbor 198.51.100.1 prefix-list OUR-PREFIXES out",
      " neighbor 198.51.100.1 route-map TO-ISP-B out",
      " network 203.0.113.0 mask 255.255.255.0",
      "ip route 203.0.113.0 255.255.255.0 Null0",
      "ip prefix-list OUR-PREFIXES seq 10 permit 203.0.113.0/24",
      "route-map FROM-ISP-A permit 10",
      " set local-preference 200",
      "route-map TO-ISP-B permit 10",
      " set as-path prepend 64500 64500"
     ],
     "note": "The outbound prefix list is the most important line: advertising only your own prefixes is what prevents your network becoming transit between the two ISPs. Production inbound policies would also filter bogons and your own prefixes."
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "If an edge router re-advertises routes learned from ISP-A to ISP-B, your network can start carrying traffic between two providers — saturating your links and potentially disrupting parts of the internet. Always apply an explicit outbound filter that permits only your own prefixes, and use implementations that refuse to advertise external routes without a policy.",
     "title": "Accidental transit"
    },
    {
     "type": "compare",
     "title": "Provider WAN routing models",
     "columns": [
      {
       "title": "MPLS L3VPN (provider routes)",
       "items": [
        "CE peers with the provider PE (static, BGP or an IGP)",
        "Provider carries your routes between sites",
        "Simple for the customer; QoS end to end",
        "If every site reuses one private AS, the provider must override the AS path or sites must accept their own AS",
        "Path control limited to what the provider supports"
       ]
      },
      {
       "title": "Layer 2 service (customer routes)",
       "items": [
        "Provider delivers Ethernet; you run routing end to end",
        "Full control of IGP or BGP design",
        "Many sites on one multipoint segment form many adjacencies",
        "Provider is not involved in convergence",
        "You own all routing complexity"
       ]
      }
     ]
    },
    {
     "type": "scenario",
     "title": "Two MPLS providers",
     "situation": "A logistics company uses two MPLS L3VPN providers for resilience. Each of its 60 sites connects to both. After a provider maintenance event, traffic between two depots took a path in through provider A, across a third depot's LAN, and out through provider B, congesting that depot. What design change best addresses the root cause?",
     "options": [
      {
       "text": "Remove one provider and accept the reduced resilience to simplify routing",
       "feedback": "This removes the symptom by removing the resilience the business paid for; the routing design can be fixed instead.",
       "best": false
      },
      {
       "text": "Increase the bandwidth at the third depot so that it can carry the transit traffic comfortably",
       "feedback": "The depot should not be transit at all. Adding bandwidth hides a routing design error that can recur elsewhere.",
       "best": false
      },
      {
       "text": "Set provider preference, tag routes by provider and block re-advertisement between them",
       "feedback": "Correct. The problem is uncontrolled mutual redistribution between the two VPNs through customer sites. Preference plus tagging and filtering keeps transit between providers from happening through branch LANs.",
       "best": true
      },
      {
       "text": "Ask both providers to shorten their maintenance windows",
       "feedback": "Maintenance will still happen; the design must behave correctly whenever any path changes.",
       "best": false
      }
     ]
    },
    {
     "type": "steps",
     "title": "Designing a BGP multihomed edge",
     "items": [
      {
       "title": "Confirm the requirement",
       "text": "Is the goal resilience, load sharing, or control of specific flows? Each leads to different tools and expectations."
      },
      {
       "title": "Secure addressing and AS number",
       "text": "Provider-independent space and a public AS for true multi-provider designs; register route-origin authorisations so others can validate your announcements."
      },
      {
       "title": "Define outbound policy",
       "text": "Local preference per provider; default plus partial routes or full tables based on router capacity and need."
      },
      {
       "title": "Define inbound policy",
       "text": "Start with communities and prepending; use more-specifics only when necessary and within accepted prefix lengths."
      },
      {
       "title": "Filter both directions",
       "text": "Outbound: only your prefixes. Inbound: drop bogons, your own space, and overly specific routes; set maximum-prefix limits."
      },
      {
       "title": "Test failure and recovery",
       "text": "Verify convergence time, path symmetry for stateful devices, and behaviour when a provider withdraws routes."
      }
     ]
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Multihoming",
       "def": "Connecting a network to more than one provider or provider location for resilience or traffic control."
      },
      {
       "term": "Provider-independent addressing",
       "def": "Address space assigned directly to an organisation so it can be announced through any provider."
      },
      {
       "term": "Local preference",
       "def": "A BGP attribute, local to an AS, that sets the preferred exit; higher is preferred."
      },
      {
       "term": "AS-path prepending",
       "def": "Adding extra copies of your AS number to an advertisement to make a path look longer and less attractive."
      },
      {
       "term": "MED",
       "def": "Multi-exit discriminator: a BGP attribute suggesting the preferred entry among several links to the same neighbouring AS."
      },
      {
       "term": "BGP community",
       "def": "A tag attached to routes that providers and peers use to apply agreed policy, such as changing preference or blackholing."
      },
      {
       "term": "Transit",
       "def": "Carrying traffic between two other networks; an enterprise should not provide it between its providers."
      },
      {
       "term": "Route origin authorisation (ROA)",
       "def": "A signed record stating which AS may originate a prefix, used by others to validate route origins."
      },
      {
       "term": "PE-CE routing",
       "def": "The routing protocol or static routing between a customer edge router and the provider edge in a provider VPN."
      }
     ]
    },
    {
     "type": "reflection",
     "prompt": "Which direction of traffic does your organisation actually need to control at the internet edge — inbound, outbound or both? Which tool are you relying on, and how much control does it really give?"
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Which tool gives an enterprise direct control over which ISP it uses for outbound traffic?",
       "options": [
        "Prepending its AS number on advertisements to the backup ISP",
        "Sending a lower MED to the preferred ISP on every link",
        "Advertising more-specific prefixes through the preferred ISP",
        "Setting local preference on routes received from each ISP"
       ],
       "answer": 3,
       "explain": "Outbound path choice is made by your own routers, and local preference is the standard, AS-wide attribute for choosing an exit. The other tools influence inbound traffic."
      },
      {
       "q": "Why is AS-path prepending considered a weak inbound traffic-engineering tool?",
       "options": [
        "Prepending is filtered by most providers and never reaches the internet",
        "Prepending only works when both links connect to the same provider",
        "Remote networks often set local preference, which is compared before path length",
        "Prepending changes outbound traffic rather than inbound traffic"
       ],
       "answer": 2,
       "explain": "AS-path length is only considered after local preference and other attributes. Providers that prefer customer routes will ignore a longer path."
      },
      {
       "q": "What is the MOST important control to prevent an enterprise from becoming transit between two ISPs?",
       "options": [
        "A maximum-prefix limit on the sessions with both providers",
        "An outbound filter that advertises only the enterprise's own prefixes",
        "Taking only a default route from each of the providers",
        "Setting a higher local preference on the primary provider"
       ],
       "answer": 1,
       "explain": "Transit happens when routes from one provider are advertised to another. An explicit outbound prefix filter stops that regardless of what is received."
      },
      {
       "q": "All sites of an MPLS L3VPN customer use the same private AS. Routes from other sites are being rejected. Why?",
       "options": [
        "BGP loop prevention drops routes containing the site's own AS number",
        "Private AS numbers cannot be used on PE-CE sessions at all",
        "The provider is summarising routes before sending them to CE routers",
        "The CE routers require full internet tables to accept VPN routes"
       ],
       "answer": 0,
       "explain": "Seeing its own AS in the path, each site treats the route as a loop. Providers solve this with AS override, or customers allow their own AS in received paths."
      },
      {
       "q": "Which inbound tool is generally the MOST effective but adds routes to the global routing table?",
       "options": [
        "AS-path prepending",
        "Advertising more-specific prefixes",
        "Multi-exit discriminator",
        "Provider local-preference communities"
       ],
       "answer": 1,
       "explain": "Longest-prefix match beats any BGP attribute, so more-specifics always win — at the cost of extra routes, and only up to commonly accepted prefix lengths."
      }
     ]
    }
   ]
  }
 ]
});
TRACK.modules.push({
 "id": "m4",
 "order": 4,
 "code": "Routing",
 "title": "Routing Protocol Design",
 "subtitle": "IGP choice, hierarchy, summarisation, redistribution, BGP scale and convergence",
 "outcomes": [
  "Select an interior routing protocol from requirements and justify keeping or changing it",
  "Design OSPF areas and IS-IS levels that contain churn and support summarisation",
  "Design summarisation and redistribution that avoid black holes and loops",
  "Scale BGP with redundant route reflection and meet application convergence budgets"
 ],
 "lessons": [
  {
   "id": "m4-l1",
   "title": "Choosing an Interior Routing Protocol",
   "subtitle": "Select the IGP from requirements, not habit",
   "minutes": 25,
   "objectives": [
    "Compare OSPF, IS-IS, BGP-only and static designs against design criteria",
    "Identify the requirements that genuinely decide between link-state protocols",
    "Recognise when changing an existing IGP is — and is not — justified"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "The **Routing sheet** of the ZCDE Design Blueprint begins with the interior gateway protocol (IGP). For most enterprises the realistic choice is between two link-state protocols — OSPF and IS-IS — with BGP increasingly used as the only routing protocol in large data-centre fabrics, and static routing still right for small stub sites. Both link-state protocols are mature, fast and scalable; the decision is rarely about raw capability and usually about topology, address families, extensibility, operations and existing skills."
    },
    {
     "type": "table",
     "title": "IGP decision criteria",
     "head": [
      "Criterion",
      "OSPF",
      "IS-IS",
      "BGP-only fabric",
      "Static"
     ],
     "rows": [
      [
       "Hierarchy model",
       "Areas around a mandatory backbone area 0",
       "Two levels; L2 backbone, flexible boundaries on links",
       "None in the IGP sense; policy per session",
       "None"
      ],
      [
       "IPv6",
       "Separate OSPFv3 instance or address families",
       "Same instance carries IPv4 and IPv6",
       "Multiprotocol by design",
       "Manual per prefix"
      ],
      [
       "Extensibility",
       "LSA types, opaque LSAs",
       "TLV-based; easily extended",
       "Attributes and address families",
       "Not applicable"
      ],
      [
       "Transport",
       "Runs over IP",
       "Runs directly over layer 2, not IP",
       "Runs over TCP",
       "Not applicable"
      ],
      [
       "Typical home",
       "Enterprise campus, WAN and branches",
       "Service provider and large backbone networks",
       "Large data-centre Clos fabrics",
       "Small stub sites, edge defaults"
      ],
      [
       "Team familiarity (typical enterprise)",
       "High",
       "Lower",
       "Medium",
       "High"
      ]
     ]
    },
    {
     "type": "framework",
     "title": "What actually decides the IGP",
     "items": [
      {
       "label": "TOPO",
       "title": "Topology and hierarchy",
       "text": "Hub-and-spoke WANs and campus blocks map naturally to OSPF areas; large flat backbones often suit single-level IS-IS."
      },
      {
       "label": "AF",
       "title": "Address families",
       "text": "Running IPv4 and IPv6 in one IS-IS instance avoids operating two OSPF processes or depending on OSPFv3 address-family support."
      },
      {
       "label": "EXT",
       "title": "Extensions and services",
       "text": "Segment routing, traffic engineering and multi-topology are supported by both link-state protocols; check exact platform support across every vendor in the estate."
      },
      {
       "label": "OPS",
       "title": "Operations and skills",
       "text": "The protocol your team can troubleshoot at 3 a.m. is a requirement, not a preference — unless training and time are funded."
      },
      {
       "label": "INT",
       "title": "Interoperability",
       "text": "Standards-based protocols across all vendors in the estate; avoid single-vendor protocols where multi-vendor is required or likely."
      },
      {
       "label": "MIG",
       "title": "Migration cost",
       "text": "Replacing a working IGP touches every router; the benefit must outweigh the risk and effort."
      }
     ]
    },
    {
     "type": "callout",
     "kind": "insight",
     "text": "In large Clos fabrics, eBGP on every leaf-spine link — with spines sharing one AS and each leaf or leaf pair its own — gives simple, policy-rich routing with failure impact limited to the affected links. It suits fabrics with thousands of links and automated configuration. For a small fabric, a link-state IGP underlay with BGP only in the overlay is equally valid; choose by scale and automation maturity.",
     "title": "BGP as the only protocol in a data-centre fabric"
    },
    {
     "type": "compare",
     "title": "Link-state versus static at the edge",
     "columns": [
      {
       "title": "Dynamic IGP to small sites",
       "items": [
        "Automatic failover across multiple links",
        "No manual updates as prefixes change",
        "Adds adjacencies and flooding to the domain",
        "Needs hierarchy to stop branch churn spreading"
       ]
      },
      {
       "title": "Static routing at stub sites",
       "items": [
        "No routing protocol state to manage",
        "Predictable and secure",
        "Failover needs tracking (e.g. probes or BFD)",
        "Error-prone at scale without automation"
       ]
      }
     ]
    },
    {
     "type": "scenario",
     "title": "To migrate or not",
     "situation": "A manufacturing enterprise runs OSPF across 380 routers in a well-designed multi-area hierarchy. It is IPv4-only with no IPv6 plans in the next three years, uses two router vendors, and has a five-person team with deep OSPF experience. A consultant recommends migrating to IS-IS \"because large networks use it\". What should the architect recommend?",
     "options": [
      {
       "text": "Migrate to IS-IS to align with large service-provider networks",
       "feedback": "Alignment with other organisations is not a requirement. The migration carries real risk and training cost with no benefit identified.",
       "best": false
      },
      {
       "text": "Migrate to BGP everywhere because it scales furthest",
       "feedback": "BGP-only designs suit large data-centre fabrics; across a campus and WAN they add policy complexity the requirements do not call for.",
       "best": false
      },
      {
       "text": "Run IS-IS alongside OSPF permanently so the team can learn both protocols safely",
       "feedback": "Two IGPs doubles operational load and introduces redistribution risk without any requirement.",
       "best": false
      },
      {
       "text": "Stay on OSPF and record a review trigger for IPv6 or segment routing",
       "feedback": "Correct. No current requirement is unmet by OSPF, and migration would touch every router and the team's skills for no measurable gain. A review trigger keeps the decision honest if requirements change.",
       "best": true
      }
     ]
    },
    {
     "type": "keypoints",
     "items": [
      "Choose from requirements: topology, address families, extensions, skills and interoperability",
      "Prefer standards-based protocols in multi-vendor estates",
      "Do not change a working IGP without a requirement it cannot meet",
      "Keep one IGP per routing domain; avoid running two for convenience",
      "Use static routing where it is simpler and failover can be tracked"
     ],
     "title": "IGP selection principles"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "IGP",
       "def": "Interior gateway protocol: a routing protocol used within one administrative domain, such as OSPF or IS-IS."
      },
      {
       "term": "Link-state protocol",
       "def": "A protocol in which routers flood descriptions of their links so every router builds the same topology map and computes shortest paths."
      },
      {
       "term": "OSPF",
       "def": "Open Shortest Path First: an IP-based link-state IGP using areas around a backbone area 0."
      },
      {
       "term": "IS-IS",
       "def": "Intermediate System to Intermediate System: a link-state IGP that runs directly over layer 2 and uses two levels of hierarchy."
      },
      {
       "term": "TLV",
       "def": "Type-length-value encoding that lets a protocol carry new kinds of information without changing its structure."
      },
      {
       "term": "BGP-only fabric",
       "def": "A data-centre design using eBGP on every fabric link instead of an IGP."
      },
      {
       "term": "Stub site",
       "def": "A site with a single path or exit to the rest of the network, where a default or static route is sufficient."
      },
      {
       "term": "Routing domain",
       "def": "A set of routers running one routing protocol instance under a single administrative policy."
      }
     ]
    },
    {
     "type": "reflection",
     "prompt": "If you had to justify your network's current IGP to a design review tomorrow, which requirement would you cite? Is it a real requirement or a historical habit?"
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Which requirement MOST favours IS-IS over OSPF in a new backbone design?",
       "options": [
        "Carrying IPv4 and IPv6 in one instance with simple extensibility",
        "A hub-and-spoke WAN with many small stub branch areas attached to regional hubs",
        "A team that has deep experience only with OSPF",
        "A need for an IP-based protocol that every vendor supports"
       ],
       "answer": 0,
       "explain": "A single IS-IS instance carries both families and is easily extended with TLVs. The other factors point toward OSPF or are equal."
      },
      {
       "q": "A working OSPF network has no unmet requirements. When is migrating to another IGP justified?",
       "options": [
        "When larger organisations in the same industry use a different IGP",
        "When the routers are refreshed to a newer software release",
        "When a new requirement appears that the current IGP cannot meet well",
        "When the team wants to gain experience with another protocol"
       ],
       "answer": 2,
       "explain": "Migration touches every router and carries risk. It should be driven by an unmet requirement, which is what a review trigger in the decision record captures."
      },
      {
       "q": "Why is eBGP often chosen as the only routing protocol in very large data-centre fabrics?",
       "options": [
        "It always converges faster than any link-state IGP, in every topology and under every failure",
        "It removes the need for any equal-cost multipath forwarding",
        "It is the only protocol able to carry IPv6 in a Clos fabric",
        "It scales to many links with simple per-session policy and contained failure impact"
       ],
       "answer": 3,
       "explain": "BGP's per-session model, policy control and limited failure propagation suit automated fabrics with thousands of links. It is not inherently faster, and ECMP is still used."
      },
      {
       "q": "What is the main design drawback of static routing to many stub sites?",
       "options": [
        "It floods every topology change across the whole routing domain",
        "It cannot forward traffic for more than one prefix per site",
        "It requires a separate routing protocol for each address family",
        "It needs extra mechanisms for failover and becomes error-prone at scale"
       ],
       "answer": 3,
       "explain": "Static routes add no protocol state, but failover must be tracked and manual changes multiply with site count."
      }
     ]
    }
   ]
  },
  {
   "id": "m4-l2",
   "title": "OSPF Area and IS-IS Level Design",
   "subtitle": "Use hierarchy to contain flooding, state and failure",
   "minutes": 35,
   "objectives": [
    "Design OSPF areas and choose area types for each part of the network",
    "Design IS-IS level boundaries and route leaking for optimal exits",
    "Place area or level boundaries where addressing and topology aggregate"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Link-state protocols scale by dividing the network into flooding domains. Inside a domain every router knows the full topology; between domains only summarised reachability passes. The design questions are where to draw the boundaries, what to let through them, and how to avoid the classic traps: a partitioned backbone, a boundary that cannot summarise, or an exit that becomes suboptimal because detail was hidden."
    },
    {
     "type": "table",
     "title": "OSPF area types",
     "head": [
      "Area type",
      "Receives",
      "Allows local external routes?",
      "Typical use"
     ],
     "rows": [
      [
       "Backbone (area 0)",
       "Everything",
       "Yes",
       "Core interconnecting all other areas"
      ],
      [
       "Standard area",
       "Intra-area, inter-area and external routes",
       "Yes",
       "Large blocks needing full detail"
      ],
      [
       "Stub area",
       "Intra-area, inter-area and a default; no external routes",
       "No",
       "Blocks with one logical exit"
      ],
      [
       "Totally stubby area",
       "Intra-area routes and a default only",
       "No",
       "Branch or access areas with a single exit"
      ],
      [
       "Not-so-stubby area (NSSA)",
       "Intra-area and inter-area routes plus its own externals; default optional",
       "Yes, converted at the ABR",
       "A stub-like area that must inject local external routes"
      ]
     ]
    },
    {
     "type": "steps",
     "title": "Designing OSPF areas",
     "items": [
      {
       "title": "Start with the backbone",
       "text": "Area 0 should be contiguous, well connected and contain the core. Every other area attaches to it through area border routers (ABRs)."
      },
      {
       "title": "Align areas with address blocks",
       "text": "Assign each area a contiguous address block so its ABRs can summarise it with one or a few ranges."
      },
      {
       "title": "Choose ABR placement",
       "text": "Place ABRs at natural aggregation points — distribution switches or regional WAN hubs — with at least two per area for resilience."
      },
      {
       "title": "Minimise what crosses the boundary",
       "text": "Use stub or totally stubby areas wherever an area has a single logical exit, NSSA where a local external source exists."
      },
      {
       "title": "Bound churn",
       "text": "Put unstable parts of the network, such as WAN branches, in their own areas so their flaps do not trigger full SPF runs elsewhere."
      }
     ]
    },
    {
     "type": "cli",
     "title": "ABR for a totally stubby branch area with summarisation",
     "device": "ABR-21 · IOS-style CLI",
     "lines": [
      "! ABR between the backbone and branch area 20",
      "router ospf 1",
      " router-id 10.0.0.21",
      " area 20 stub no-summary",
      " area 20 range 10.20.0.0 255.255.0.0",
      " passive-interface default",
      " no passive-interface Ethernet1/1",
      " no passive-interface Ethernet1/2",
      "interface Ethernet1/1",
      " description To core (area 0)",
      " ip ospf 1 area 0",
      "interface Ethernet1/2",
      " description To branch aggregation (area 20)",
      " ip ospf 1 area 20"
     ],
     "note": "Branch routers in area 20 see only their own area plus a default; the backbone sees one /16 for the entire area. Every router in area 20 must also be configured as stub."
    },
    {
     "type": "compare",
     "title": "IS-IS levels",
     "columns": [
      {
       "title": "Level 1 (L1)",
       "items": [
        "Routing within an area",
        "L1 routers know only their area's topology",
        "Reach other areas via the nearest L1/L2 router (default from the attached bit)",
        "Like a totally stubby OSPF area by default"
       ]
      },
      {
       "title": "Level 2 (L2)",
       "items": [
        "The backbone between areas",
        "Must be contiguous across L2-capable routers",
        "Carries inter-area reachability",
        "Many networks run a single L2-only domain"
       ]
      }
     ]
    },
    {
     "type": "callout",
     "kind": "insight",
     "text": "An L1 area with two L1/L2 exits sends traffic to the nearest exit by default — not necessarily the best one for each destination. If the business needs optimal paths to specific destinations, leak those prefixes from L2 into L1. The same trade-off applies to OSPF totally stubby areas: less state, but a default route cannot express which exit is closer to a given destination.",
     "title": "Hidden detail can cost you the best exit"
    },
    {
     "type": "callout",
     "kind": "pro",
     "text": "Modern routers handle large single-area or single-level domains, and flat designs avoid summarisation side effects. Introduce hierarchy when you need to contain churn from unstable regions, limit failure propagation, reduce state on small devices, or meet a policy boundary — not because a textbook area-size figure was exceeded.",
     "title": "Flat is fine until it is not"
    },
    {
     "type": "scenario",
     "title": "A WAN that keeps flapping",
     "situation": "A national retailer runs a single OSPF area containing its core, two data centres and 600 branches connected by broadband overlays. Branch links flap several times a day, causing frequent SPF runs and CPU spikes on core routers. Each branch has two tunnels to two regional hubs. Which design best fixes this?",
     "options": [
      {
       "text": "Regional totally stubby areas with hub ABRs summarising to the backbone",
       "feedback": "Correct. Branch flaps stay inside regional areas, the core sees only stable summaries, and branches need only a default because every exit is via their hubs.",
       "best": true
      },
      {
       "text": "Increase SPF throttle timers on the core so it recalculates less often",
       "feedback": "Timers reduce CPU but slow convergence for real failures everywhere, while the root cause — branch churn in the core's flooding domain — remains.",
       "best": false
      },
      {
       "text": "Move each branch into its own area to isolate it completely",
       "feedback": "Six hundred areas attached to the backbone create ABR and summarisation sprawl; regional grouping achieves the isolation with far less state.",
       "best": false
      },
      {
       "text": "Replace OSPF on the branches with static default routes towards a single hub and no failover",
       "feedback": "Static defaults remove churn but lose automatic failover between the two hubs, breaking resilience.",
       "best": false
      }
     ]
    },
    {
     "type": "template",
     "title": "IGP design sheet",
     "purpose": "Record the protocol, hierarchy and boundary decisions for each routing domain so they stay consistent as the network grows.",
     "columns": [
      "Domain / area or level",
      "Address block(s)",
      "Area type / level",
      "Border routers",
      "Summaries advertised",
      "Externals allowed",
      "Growth limit / review trigger"
     ],
     "example": [
      [
       "Area 20 — north branches",
       "10.20.0.0/16",
       "Totally stubby",
       "HUB-N1, HUB-N2",
       "10.20.0.0/16 to area 0",
       "No",
       "Review at 250 branches or if local internet breakout needs routes"
      ],
      [
       "IS-IS L2 backbone",
       "10.0.0.0/20 (loopbacks, links)",
       "Level 2 only",
       "All core routers",
       "None (loopbacks kept specific)",
       "Default only",
       "Review if L1 areas are needed for regional churn"
      ]
     ],
     "rows": 6
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Area border router (ABR)",
       "def": "An OSPF router connecting the backbone to one or more other areas, where inter-area summarisation is configured."
      },
      {
       "term": "Backbone area",
       "def": "OSPF area 0, to which all other areas must connect and through which inter-area traffic passes."
      },
      {
       "term": "Stub area",
       "def": "An OSPF area that receives no external routes, using a default route to reach them."
      },
      {
       "term": "Totally stubby area",
       "def": "An OSPF area that receives only intra-area routes and a default route."
      },
      {
       "term": "NSSA",
       "def": "Not-so-stubby area: a stub-like OSPF area that may inject its own external routes, which the ABR translates for the rest of the domain."
      },
      {
       "term": "Attached bit",
       "def": "An IS-IS flag set by L1/L2 routers that tells L1 routers to use them as the default exit from the area."
      },
      {
       "term": "Route leaking",
       "def": "Advertising selected prefixes from the IS-IS level 2 backbone into a level 1 area so L1 routers choose better exits."
      },
      {
       "term": "Flooding domain",
       "def": "The set of routers that receive each other's link-state advertisements and share one topology database."
      }
     ]
    },
    {
     "type": "reflection",
     "prompt": "Where are the flooding-domain boundaries in your network today? Do they coincide with the address blocks, or does summarisation fight the topology?"
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "A branch area has a single logical exit through two ABRs, and no local external routes. Which OSPF area type MOST reduces its routing state?",
       "options": [
        "Totally stubby area",
        "Not-so-stubby area",
        "Standard area",
        "Stub area"
       ],
       "answer": 0,
       "explain": "Totally stubby areas receive only intra-area routes and a default, which is all a single-exit branch area needs."
      },
      {
       "q": "When should an OSPF area be configured as an NSSA rather than a stub area?",
       "options": [
        "When the area has more than one ABR connecting it to the backbone",
        "When the area must inject external routes from a local source",
        "When the area needs to receive all external routes from the backbone",
        "When the area contains the data-centre core and the internet edge"
       ],
       "answer": 1,
       "explain": "NSSA keeps stub behaviour for incoming externals while allowing local external routes, which the ABR translates for the rest of the domain."
      },
      {
       "q": "IS-IS L1 routers in an area with two L1/L2 exits send traffic for some destinations through the farther exit. What fixes this while keeping the hierarchy?",
       "options": [
        "Clear the attached bit on both L1/L2 routers in the area",
        "Configure every router in the area as level 2 only",
        "Leak the relevant prefixes from level 2 into level 1",
        "Summarise the area's prefixes more aggressively at level 2"
       ],
       "answer": 2,
       "explain": "Route leaking gives L1 routers specific reachability so they can pick the better exit for those destinations, without flattening the design."
      },
      {
       "q": "Why should OSPF areas be aligned with contiguous address blocks?",
       "options": [
        "So that every router in the area can share one router ID",
        "So ABRs can summarise each area into a few ranges",
        "So that inter-area traffic avoids the backbone entirely",
        "So that the area can be configured as an NSSA if needed"
       ],
       "answer": 1,
       "explain": "Summarisation depends on addressing. If an area's prefixes are scattered, the ABR must advertise many specific routes."
      },
      {
       "q": "What is the main reason to place unstable WAN branches in their own OSPF areas?",
       "options": [
        "To allow the branches to run a different routing protocol from the one used in the core",
        "To give each branch a path to the internet without the core",
        "To remove the need for ABRs at regional hub sites",
        "To keep their flaps from triggering SPF runs across the rest of the network"
       ],
       "answer": 3,
       "explain": "Area boundaries contain topology changes. With summarisation, the backbone sees stable summaries while the area absorbs local churn."
      }
     ]
    }
   ]
  },
  {
   "id": "m4-l3",
   "title": "Summarisation and Redistribution Design",
   "subtitle": "Hide detail deliberately and move routes between domains without loops",
   "minutes": 35,
   "objectives": [
    "Decide where and what to summarise, and what must never be summarised",
    "Explain the black-hole and suboptimal-routing side effects of summarisation",
    "Design redistribution with tagging and filtering that prevents loops"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Summarisation and redistribution are where routing designs most often go wrong — not because the mechanics are difficult, but because their side effects appear only under failure. A summary hides a failed subnet from the rest of the network, which is precisely its benefit and its risk. Redistribution between two protocols at two points creates a loop opportunity that may remain invisible for years until a link fails in the wrong place."
    },
    {
     "type": "compare",
     "title": "Summarisation trade-offs",
     "columns": [
      {
       "title": "Benefits",
       "items": [
        "Smaller routing tables and databases",
        "Topology changes hidden behind the summary",
        "Fewer SPF runs and updates elsewhere",
        "Clearer, more stable routing domains"
       ]
      },
      {
       "title": "Costs and risks",
       "items": [
        "Traffic can follow a suboptimal path",
        "Failed components may attract traffic into a black hole",
        "Requires a hierarchical address plan",
        "Can break services that need specific routes"
       ]
      }
     ]
    },
    {
     "type": "formula",
     "title": "Summary arithmetic",
     "items": [
      {
       "name": "Block size",
       "expr": "Addresses in a /p = 2^(32 − p)",
       "meaning": "A /16 summary covers 65,536 addresses; a /20 covers 4,096."
      },
      {
       "name": "Components covered",
       "expr": "Number of /q prefixes in a /p = 2^(q − p)",
       "meaning": "A /20 summary covers 16 contiguous /24s — only if they start on a /20 boundary."
      },
      {
       "name": "Summary boundary check",
       "expr": "Network address of block mod block size = 0",
       "meaning": "10.20.32.0/20 is valid (32 is a multiple of 16 in the third octet); 10.20.40.0/20 is not."
      }
     ]
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "Loopbacks used as BGP next hops, tunnel endpoints or label-switched-path endpoints often need to be known as specific /32 (or /128) routes. Summarising them can hide a failed router from protocols that depend on next-hop tracking, or break label-switched paths that require an exact match. Keep these addresses in a dedicated block and leave them unsummarised.",
     "title": "Never summarise what services need individually"
    },
    {
     "type": "callout",
     "kind": "insight",
     "text": "When a router advertises a summary it normally installs a matching route to a null interface. Packets for unused or failed parts of the summary are dropped locally instead of following a less-specific route — often a default — back towards the network and looping. The trade-off: during a partial failure, traffic for the failed component is discarded at the summarising router, so ensure redundant summarising routers each have full component reachability.",
     "title": "The discard route is a feature"
    },
    {
     "type": "flow",
     "title": "Safe redistribution design",
     "items": [
      {
       "label": "Avoid it if possible",
       "text": "Use a default, a summary or a single protocol instead"
      },
      {
       "label": "Minimise points",
       "text": "One point, or two with explicit control"
      },
      {
       "label": "Filter",
       "text": "Redistribute only the prefixes needed"
      },
      {
       "label": "Tag",
       "text": "Mark every redistributed route with its source domain"
      },
      {
       "label": "Block re-entry",
       "text": "Deny tagged routes from returning to their source"
      },
      {
       "label": "Set metrics and preference",
       "text": "Make the intended path win deterministically"
      }
     ]
    },
    {
     "type": "callout",
     "kind": "example",
     "text": "Domain A and domain B are joined by routers R1 and R2, both redistributing in both directions. A route from A enters B at R1; R2 learns it from B and, because the protocol in B has a better administrative preference on R2 than the original A route, R2 prefers the B-learned copy and redistributes it back into A. Traffic can now circle between the domains, or the route can persist after the original disappears. Tagging at R1 and denying that tag at R2 breaks the cycle.",
     "title": "How a two-point redistribution loop forms"
    },
    {
     "type": "cli",
     "title": "Tag on the way in, deny on the way back",
     "device": "R2 · IOS-style CLI",
     "lines": [
      "! Routes from OSPF into IS-IS are tagged 100; routes from IS-IS into OSPF are tagged 200",
      "route-map OSPF-TO-ISIS deny 10",
      " match tag 200",
      "route-map OSPF-TO-ISIS permit 20",
      " match ip address prefix-list PORT-OPS",
      " set tag 100",
      "route-map ISIS-TO-OSPF deny 10",
      " match tag 100",
      "route-map ISIS-TO-OSPF permit 20",
      " match ip address prefix-list CORPORATE",
      " set tag 200",
      "! Prefix lists PORT-OPS and CORPORATE are defined separately",
      "router isis CORE",
      " metric-style wide",
      " redistribute ospf 1 route-map OSPF-TO-ISIS",
      "router ospf 1",
      " redistribute isis CORE level-2 subnets route-map ISIS-TO-OSPF"
     ],
     "note": "The same policy is applied on both redistribution routers. A route that has already crossed in one direction carries a tag that stops it crossing back. IS-IS needs wide metrics to carry route tags."
    },
    {
     "type": "case",
     "title": "Port authority network merger",
     "context": "A port authority is merging its corporate network with the network of the terminal operations company it has acquired. Corporate runs IS-IS level 2 across 60 routers; terminal operations runs OSPF across 90 routers, including crane control and gate automation systems that must remain available during any single failure. The two networks will be joined at two sites — the main office and the container terminal — for resilience. Address space overlaps in two /24 ranges. The operations team insists that corporate routing problems must never affect crane control. The board wants a single network within 18 months.",
     "questions": [
      "Should the networks be merged into one IGP immediately? What are the risks?",
      "How would you design the interim interconnection?",
      "How do the overlapping ranges affect the design?",
      "What must be true before a full merger is attempted?"
     ],
     "answer": "**Immediate merger.** Unifying the IGPs at once would put crane control in the same flooding domain as corporate routing, conflicting with the operations requirement, and would require resolving overlaps first. A staged approach is lower risk.\n**Interim interconnection.** Mutual redistribution at both sites, filtered to the specific prefixes each side needs, with route tags blocking re-entry and metrics making one site preferred for each direction. Consider exchanging only summaries or a default toward operations, and placing the operational networks in their own VRF so corporate changes cannot reach them. A firewall at each interconnection enforces policy between the organisations.\n**Overlaps.** Overlapping ranges cannot be routed between the domains. Re-address the smaller side (preferably corporate, to avoid touching crane systems), or use NAT temporarily at the interconnect with a planned removal date.\n**Before full merger.** Overlaps removed; a target addressing plan with summarisable blocks; agreement on the final IGP (likely keeping operations as a separate area, level or VRF); tested failure scenarios at both interconnect sites; operations' sign-off that its availability requirement is protected."
    },
    {
     "type": "scenario",
     "title": "Two-point redistribution",
     "situation": "A company redistributes between OSPF and IS-IS at two routers for resilience. After a link failure, some prefixes oscillate and traceroutes show traffic looping between the two redistribution routers. What is the best design correction?",
     "options": [
      {
       "text": "Remove redistribution from one of the two routers so that only a single point remains",
       "feedback": "This removes the loop but also the resilience that was a requirement. Tagging keeps both points safely.",
       "best": false
      },
      {
       "text": "Tag routes at redistribution and deny the other domain's tag on the way back",
       "feedback": "Correct. Tagging prevents routes that originated in one domain from re-entering it via the other redistribution point — the root cause of the loop — while keeping both points for resilience.",
       "best": true
      },
      {
       "text": "Lower the administrative preference of OSPF on both routers",
       "feedback": "Changing preference can move the problem rather than remove it and makes behaviour depend on subtle per-router settings.",
       "best": false
      },
      {
       "text": "Increase the metric of all redistributed routes to the maximum value",
       "feedback": "High metrics influence path choice inside each domain but do not stop routes being fed back into their source domain.",
       "best": false
      }
     ]
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Route summarisation",
       "def": "Advertising one aggregate prefix in place of many more specific prefixes it contains."
      },
      {
       "term": "Discard route",
       "def": "A route to a null interface installed for a summary, so packets for unused parts of it are dropped rather than looping."
      },
      {
       "term": "Black hole",
       "def": "A condition in which traffic is attracted to a router that cannot deliver it, usually because a summary hides a failed component."
      },
      {
       "term": "Redistribution",
       "def": "Injecting routes learned from one routing protocol or source into another."
      },
      {
       "term": "Route tag",
       "def": "A value attached to a route, often at redistribution, used by policy to recognise its origin."
      },
      {
       "term": "Administrative preference",
       "def": "A router-local value (often called administrative distance) that ranks routes to the same prefix from different sources."
      },
      {
       "term": "Mutual redistribution",
       "def": "Redistributing in both directions between two routing domains."
      },
      {
       "term": "Address plan",
       "def": "A hierarchical allocation of address blocks to regions, sites and functions that makes summarisation possible."
      }
     ]
    },
    {
     "type": "reflection",
     "prompt": "Identify every redistribution point in a network you know. For each, could you prove that a route cannot re-enter the domain it came from? What would you add to make that provable?"
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Which addresses should normally be kept out of summaries?",
       "options": [
        "Loopbacks used as BGP next hops or tunnel endpoints",
        "User subnets on access switches in a campus block",
        "Point-to-point links between distribution and core",
        "Branch LAN subnets inside a totally stubby area"
       ],
       "answer": 0,
       "explain": "Services that track next hops or build paths to specific endpoints need the exact routes; summarising them can hide failures or break label-switched paths."
      },
      {
       "q": "What is the purpose of the discard (null) route installed with a summary?",
       "options": [
        "To advertise the summary to neighbours in other routing domains",
        "To send traffic for failed components to a backup router",
        "To drop traffic for unused parts of the summary instead of looping it",
        "To prevent the summary from being installed in the routing table"
       ],
       "answer": 2,
       "explain": "Without it, packets for non-existent components could follow a less specific route such as a default and loop."
      },
      {
       "q": "Is 10.20.40.0/21 a valid summary boundary?",
       "options": [
        "No, because 40 is not a multiple of 16",
        "No, because a /21 must start at a multiple of 32",
        "Yes, because 40 is a multiple of 8",
        "Yes, because any /21 can start at an even value"
       ],
       "answer": 2,
       "explain": "A /21 spans 8 values of the third octet (2,048 addresses), so it must start at a multiple of 8. 40 ÷ 8 = 5, so the boundary is valid."
      },
      {
       "q": "What is the PRIMARY loop-prevention technique for mutual redistribution at two points?",
       "options": [
        "Running both routing protocols with identical hello and dead timers on both redistribution routers",
        "Redistributing only the default route in both directions at each point",
        "Configuring a different router ID on each of the redistribution routers",
        "Tagging routes on redistribution and denying the other domain's tag on the way back"
       ],
       "answer": 3,
       "explain": "Tags record where a route came from so policy can stop it returning. Defaults alone may not meet reachability needs and timers do not affect loops."
      },
      {
       "q": "Why can a summary create a black hole during a partial failure?",
       "options": [
        "The summary is withdrawn whenever any component route fails",
        "Traffic for a failed component is still attracted by the summary",
        "Summaries are always advertised with an infinite metric",
        "The discard route forwards packets to the backbone area"
       ],
       "answer": 1,
       "explain": "The summary stays advertised while any component exists, so traffic for the failed part still arrives and is dropped by the discard route."
      }
     ]
    }
   ]
  },
  {
   "id": "m4-l4",
   "title": "BGP in the Enterprise, Route Reflection and Convergence",
   "subtitle": "Use BGP where it earns its place, scale it, and design for fast recovery",
   "minutes": 40,
   "objectives": [
    "Decide when an enterprise needs BGP internally and where it belongs",
    "Design redundant route reflection and avoid hidden-path problems",
    "Build a convergence budget and choose techniques to meet it",
    "Plan growth by identifying the resource that will run out first"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "BGP is the protocol of policy and scale. Inside an enterprise it earns its place where the IGP should not carry certain routes (internet tables, large external sets), where independent domains must exchange routes with policy, or where an overlay — an MPLS VPN, an EVPN fabric, an SD-WAN — needs a scalable control plane. Using BGP where an IGP would do adds a second protocol, a second set of failure modes and a policy language the team must master."
    },
    {
     "type": "table",
     "title": "When BGP belongs inside the enterprise",
     "head": [
      "Situation",
      "Why BGP",
      "Alternative if not justified"
     ],
     "rows": [
      [
       "Internet edge with multiple providers",
       "Policy control and full or partial tables",
       "Default routes with tracking"
      ],
      [
       "Large route sets the IGP should not carry",
       "Keeps the IGP small and fast",
       "Summarise or filter at the edge"
      ],
      [
       "Separate administrative domains (subsidiaries, partners)",
       "Policy and route control between AS boundaries",
       "Static routes or filtered redistribution"
      ],
      [
       "Overlay control planes (EVPN, L3VPN, some SD-WAN)",
       "Carries VPN, MAC and tenant routes at scale",
       "Not usually replaceable"
      ],
      [
       "Large data-centre fabric underlay",
       "Scale, simplicity, failure containment",
       "Link-state IGP for smaller fabrics"
      ]
     ]
    },
    {
     "type": "formula",
     "title": "iBGP scaling",
     "items": [
      {
       "name": "Full-mesh sessions",
       "expr": "Sessions = n × (n − 1) ÷ 2",
       "meaning": "40 iBGP routers need 780 sessions, 39 per router; every new router adds a session on every existing one."
      },
      {
       "name": "With route reflectors",
       "expr": "Sessions ≈ clients × RRs per client + RR mesh",
       "meaning": "40 clients with 2 RRs each need 80 client sessions plus one RR-to-RR session."
      },
      {
       "name": "BFD detection time",
       "expr": "Detection = transmit interval × multiplier",
       "meaning": "50 ms × 3 = 150 ms to declare a neighbour down, versus tens of seconds with default protocol hold timers."
      }
     ]
    },
    {
     "type": "table",
     "title": "Route reflection rules",
     "head": [
      "Route learned from",
      "Reflected to clients?",
      "Reflected to non-clients?",
      "Notes"
     ],
     "rows": [
      [
       "An eBGP peer",
       "Yes",
       "Yes",
       "Normal BGP behaviour"
      ],
      [
       "A client",
       "Yes (all except the sender)",
       "Yes",
       "This is what removes the full mesh"
      ],
      [
       "A non-client iBGP peer",
       "Yes",
       "No",
       "Non-clients still need a full mesh among themselves"
      ]
     ]
    },
    {
     "type": "steps",
     "title": "Designing route reflection",
     "items": [
      {
       "title": "Make it redundant",
       "text": "Every client peers with at least two reflectors in different failure domains (power, room, site)."
      },
      {
       "title": "Decide on placement",
       "text": "Reflectors do not change the next hop by default, so they need not be in the forwarding path. Off-path or virtual reflectors keep control-plane load away from busy forwarding routers — but they compute best paths from their own position."
      },
      {
       "title": "Choose cluster IDs deliberately",
       "text": "Shared cluster IDs on a reflector pair save memory; distinct IDs let each reflector accept the other's reflected routes, adding resilience at the cost of more paths stored."
      },
      {
       "title": "Preserve path diversity",
       "text": "A reflector advertises only its best path, hiding alternatives. Where fast failover or multipath matters, advertise additional paths (ADD-PATH) or use diverse next-hop designs."
      },
      {
       "title": "Consider hierarchy",
       "text": "Very large networks use regional reflectors that are clients of a top-level pair, keeping session counts and update fan-out bounded."
      }
     ]
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "If two exits exist for a prefix but the reflector sends clients only its single best path, clients have no backup: when that exit fails they must wait for the reflector to compute and send a new path. They also cannot load-share. Advertising more than one path, or ensuring each exit uses a distinguishable route, restores diversity — at the cost of more memory and updates.",
     "title": "The hidden-path problem"
    },
    {
     "type": "flow",
     "title": "Anatomy of convergence",
     "items": [
      {
       "label": "Detect",
       "text": "Loss of signal, BFD, protocol hellos"
      },
      {
       "label": "Propagate",
       "text": "Flood LSAs or send BGP updates"
      },
      {
       "label": "Compute",
       "text": "SPF or best-path recalculation"
      },
      {
       "label": "Install",
       "text": "Update RIB and program the FIB"
      },
      {
       "label": "Protect",
       "text": "Pre-installed backup paths switch locally"
      }
     ]
    },
    {
     "type": "formula",
     "title": "Convergence budget",
     "items": [
      {
       "name": "Total convergence",
       "expr": "T ≈ T(detect) + T(propagate) + T(compute) + T(install)",
       "meaning": "Estimate each component; the largest one is where design effort pays off."
      },
      {
       "name": "Loop-free alternate condition",
       "expr": "D(N,D) < D(N,S) + D(S,D)",
       "meaning": "Neighbour N is a loop-free backup for source S toward destination D if N's own shortest path to D does not come back through S. Backups that meet this can be pre-installed for local switchover in tens of milliseconds."
      },
      {
       "name": "FIB update for many prefixes",
       "expr": "T(install) grows with prefixes unless next hops are shared",
       "meaning": "Hierarchical FIB designs that point many prefixes at one shared next-hop object update in constant time when that next hop changes."
      }
     ]
    },
    {
     "type": "callout",
     "kind": "pro",
     "text": "\"Fast convergence\" is not a requirement. \"Voice calls survive any single link failure without dropping\" is. Translate application tolerance into a budget — for example under 1 s for voice, under 50 ms for some industrial or trading flows — and spend design effort only where the budget is tight: BFD for detection, fast reroute for protection, tuned throttles for computation.",
     "title": "Set convergence targets by application"
    },
    {
     "type": "scenario",
     "title": "Reflector placement",
     "situation": "A company runs iBGP across 120 routers in three regions to carry internet partial routes and VPN routes. Its two core routers act as route reflectors for all clients and are also the busiest forwarding devices; during a recent software upgrade, reflector CPU spikes delayed convergence. Several clients need fast failover between two internet exits. Which design best fits?",
     "options": [
      {
       "text": "Return to a full iBGP mesh among all 120 routers to remove reflectors",
       "feedback": "That needs 7,140 sessions and makes every router carry every path; it trades one scaling problem for a larger one.",
       "best": false
      },
      {
       "text": "Keep the two core reflectors but increase their BGP timers to reduce the CPU load during upgrades",
       "feedback": "Longer timers slow failure detection and convergence — the opposite of the stated requirement.",
       "best": false
      },
      {
       "text": "Dedicated off-path regional reflector pairs under a top-level pair, with ADD-PATH",
       "feedback": "Correct. Dedicated reflectors separate control-plane load from forwarding, regional hierarchy bounds fan-out, and advertising additional paths gives clients pre-known backups for the internet exits.",
       "best": true
      },
      {
       "text": "Add a single dedicated reflector to replace both core reflectors",
       "feedback": "This offloads the core but creates a single point of failure in the control plane.",
       "best": false
      }
     ]
    },
    {
     "type": "table",
     "title": "Growth planning: what runs out first?",
     "head": [
      "Resource",
      "Signal to watch",
      "Design response"
     ],
     "rows": [
      [
       "Routing table / FIB capacity",
       "Prefix count trend versus hardware limit",
       "Summarise, filter, default plus partial routes"
      ],
      [
       "Link-state database and SPF load",
       "SPF runs per hour, LSDB size, CPU",
       "Add areas or levels, contain churn"
      ],
      [
       "Adjacencies and sessions",
       "Neighbours per device, session count",
       "Route reflection, hierarchy, fewer meshed links"
      ],
      [
       "Control-plane CPU and memory",
       "Peaks during failures and upgrades",
       "Dedicated reflectors, staged upgrades"
      ],
      [
       "Operational capacity",
       "Change failure rate, time to troubleshoot",
       "Simplify, standardise, automate"
      ]
     ]
    },
    {
     "type": "checklist",
     "title": "Routing design review checklist",
     "items": [
      "IGP choice justified by requirements, with a review trigger",
      "Flooding-domain boundaries align with address blocks",
      "Summaries defined, with next-hop and endpoint loopbacks excluded",
      "Every redistribution point filtered and tagged against re-entry",
      "BGP used only where policy, scale or overlays require it",
      "Route reflectors redundant and placed in separate failure domains",
      "Path diversity preserved where fast failover or multipath is required",
      "Convergence budget stated per critical application and tested",
      "Growth thresholds defined for tables, sessions and control-plane load"
     ]
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "iBGP full mesh",
       "def": "The requirement that every iBGP speaker peer with every other, because routes learned via iBGP are not re-advertised to iBGP peers by default."
      },
      {
       "term": "Route reflector",
       "def": "An iBGP speaker allowed to re-advertise iBGP routes to its clients, removing the need for a full mesh."
      },
      {
       "term": "Cluster ID",
       "def": "An identifier used by route reflectors to detect and discard reflected routes that loop back to their cluster."
      },
      {
       "term": "ADD-PATH",
       "def": "A BGP capability allowing more than one path for the same prefix to be advertised to a peer."
      },
      {
       "term": "BFD",
       "def": "Bidirectional Forwarding Detection: a lightweight protocol that detects forwarding failures between neighbours in milliseconds."
      },
      {
       "term": "Fast reroute",
       "def": "Pre-computed backup paths installed in advance so a router can switch locally as soon as a failure is detected."
      },
      {
       "term": "Loop-free alternate (LFA)",
       "def": "A neighbour that can be used as a backup next hop because its shortest path to the destination does not loop back through the failing router."
      },
      {
       "term": "Convergence",
       "def": "The process by which all routers reach a consistent, correct forwarding state after a change."
      }
     ]
    },
    {
     "type": "reflection",
     "prompt": "Pick one critical application and write its convergence budget. Which component — detection, propagation, computation or installation — is your biggest unknown, and how would you measure it?"
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "How many iBGP sessions does a full mesh of 25 routers require?",
       "options": [
        "300",
        "600",
        "625",
        "250"
       ],
       "answer": 0,
       "explain": "n(n − 1) ÷ 2 = 25 × 24 ÷ 2 = 300 sessions."
      },
      {
       "q": "A route reflector receives a route from a non-client iBGP peer. To whom does it reflect it?",
       "options": [
        "To its clients and its other non-client peers",
        "To its non-client iBGP peers only",
        "To nobody, as iBGP routes are never reflected",
        "To its route-reflector clients only"
       ],
       "answer": 3,
       "explain": "Routes from non-clients are reflected to clients only; non-clients must still be fully meshed with each other."
      },
      {
       "q": "Why might route reflectors be deployed out of the forwarding path?",
       "options": [
        "They do not change next hops by default, so they need not forward traffic",
        "Reflectors in the forwarding path cannot run any IGP at all",
        "Off-path reflectors always choose the optimal exit for every one of their clients automatically",
        "Placing reflectors in the forwarding path disables ADD-PATH support"
       ],
       "answer": 0,
       "explain": "Because next hops are preserved, reflectors can be dedicated control-plane devices. Their best-path choice reflects their own position, which is a trade-off to manage."
      },
      {
       "q": "BFD is configured with a 100 ms interval and a multiplier of 3. What is the detection time?",
       "options": [
        "100 ms",
        "300 ms",
        "33 ms",
        "3 s"
       ],
       "answer": 1,
       "explain": "Detection time is interval × multiplier: 100 ms × 3 = 300 ms."
      },
      {
       "q": "Which technique MOST directly reduces convergence time after failure detection for a protected link?",
       "options": [
        "Increasing SPF throttle timers to batch more topology changes",
        "Advertising every prefix as a separate summary to all neighbours",
        "Pre-installing loop-free backup next hops for local switchover",
        "Moving route reflectors into the forwarding path of the core"
       ],
       "answer": 2,
       "explain": "Fast reroute switches to a pre-computed backup without waiting for propagation or computation. Longer throttles slow convergence."
      }
     ]
    }
   ]
  }
 ]
});
TRACK.exam.push([
 {
  "module": "m1",
  "q": "A logistics firm wants a new WAN. The sponsor states the budget is fixed, the operations lead says the team cannot support new protocols this year, and the CIO \"would prefer\" to keep the current router vendor. How should the architect treat these three inputs?",
  "options": [
   "Budget and team capability as constraints; vendor as a weighted preference",
   "All three as hard constraints that remove options from further consideration",
   "All three as weighted criteria in a single decision matrix",
   "Budget as a constraint; team capability and vendor as assumptions"
  ],
  "answer": 0,
  "explain": "A fixed budget and a team that cannot support new protocols are hard limits. \"Would prefer\" signals a preference that should be weighted, not used to exclude options. Treating everything as constraints over-restricts; treating everything as criteria lets a non-viable option win; skills are a known fact, not an assumption."
 },
 {
  "module": "m1",
  "q": "During discovery for a hospital network refresh, interface data shows 22% annual traffic growth, but the imaging department plans to move all scans to a cloud archive next year. What is the BEST basis for capacity planning?",
  "options": [
   "The measured 22% trend alone, because historic data is objective evidence",
   "Measured trend plus a separately modelled, validated imaging uplift",
   "A blanket doubling of capacity to absorb any unknown future change",
   "Waiting until the imaging move is live, then measuring the new demand"
  ],
  "answer": 1,
  "explain": "Data anchors the baseline, while a known future driver must be modelled explicitly and confirmed with its owner. Ignoring it, guessing a blanket figure, or waiting all leave the design without a defensible sizing basis."
 },
 {
  "module": "m1",
  "q": "A weighted decision matrix ranks option A first by 0.05 points. A sensitivity check shows that moving 10 points of weight from cost to operability makes option B the winner. What should the architect do?",
  "options": [
   "Recommend option A because it scored highest under the agreed weights",
   "Recommend option B because operability is usually underweighted",
   "Discard the matrix and select the option the team is most familiar with",
   "Present both, showing the choice hinges on cost versus operability"
  ],
  "answer": 3,
  "explain": "A fragile result means the decision hinges on a business judgement. The architect should make the dependency visible to the owners. Picking either option silently, or abandoning the analysis, hides the trade-off."
 },
 {
  "module": "m1",
  "q": "A stakeholder asks for \"a stretched VLAN between both data centres\" during requirements gathering. What should be recorded in the requirements register?",
  "options": [
   "A technical requirement for a stretched VLAN, owned by that stakeholder",
   "A constraint that layer 2 must be available at both data centres",
   "The confirmed underlying need, such as keeping addresses during migration",
   "Nothing yet, because proposed solutions are discussed only after the design work starts"
  ],
  "answer": 2,
  "explain": "A stretched VLAN is a proposed solution. The register should capture the confirmed need it serves, so the design can consider alternatives. Recording the solution as a requirement or constraint locks in risk; ignoring the request loses information."
 },
 {
  "module": "m1",
  "q": "A scenario describes a retailer with a nine-person network team, a mandated go-live in four months, and a security requirement for segmentation of payment systems. Which option should generally be eliminated FIRST when comparing designs?",
  "options": [
   "One that meets the segmentation requirement using familiar technology at moderate cost",
   "One that uses firewall policy between VRFs instead of an overlay fabric",
   "One needing skills and tooling the team cannot obtain within four months",
   "One that delivers payment segmentation first and other changes later"
  ],
  "answer": 2,
  "explain": "Options that break a constraint — here time and skills — are eliminated before scoring. The other options are viable approaches that would then be compared on their merits."
 },
 {
  "module": "m1",
  "q": "Which content BEST belongs in the high-level design rather than the low-level design?",
  "options": [
   "The VLAN-to-subnet table and default gateway addresses for every access switch in the campus",
   "OSPF hello and dead timer values for each link type in the campus",
   "The step-by-step cut-over procedure for migrating each floor",
   "The reasons routed access was chosen over layer 2 access and its consequences"
  ],
  "answer": 3,
  "explain": "The HLD records architecture and rationale for sponsors, architects and operations leads. Exact values and procedures are implementation detail for the LLD."
 },
 {
  "module": "m1",
  "q": "A university requires that research transfers avoid the central stateful firewall, while the security office requires all external traffic to be inspected. What is the architect's BEST action?",
  "options": [
   "Route research traffic through the firewall because security outranks research",
   "Document the conflict and options with risks; let the owners decide",
   "Bypass the firewall for research because the throughput need is quantified",
   "Buy a larger firewall so both requirements appear to be met without discussion"
  ],
  "answer": 1,
  "explain": "Conflicting requirements belong to their owners. The architect informs the decision with options such as a research path protected by filtering and monitoring. Arbitrary precedence or silently spending budget removes the business from a business decision."
 },
 {
  "module": "m1",
  "q": "A design decision record states: \"Chose a collapsed core for the headquarters; revisit if a second building is approved.\" What does the second clause provide?",
  "options": [
   "A review trigger that tells future designers when to reopen the decision",
   "A constraint that prevents the company from approving or building a second building",
   "An assumption that a second building will definitely never be approved",
   "A consequence describing the cost of the collapsed-core decision"
  ],
  "answer": 0,
  "explain": "The clause names the condition under which the decision should be revisited. It does not restrict the business, assert an assumption, or describe a cost."
 },
 {
  "module": "m2",
  "q": "A single-building office has 9 access stacks, a three-person team and no growth plans. A proposal adds a dedicated core pair above two distribution switches. Which design BEST fits?",
  "options": [
   "The proposed three-tier design so the campus is ready for any future growth",
   "A collapsed core, with the access stacks uplinked to one switch pair",
   "A full mesh of links between all access stacks with no aggregation layer",
   "An overlay campus fabric with distributed anycast gateways on every stack"
  ],
  "answer": 1,
  "explain": "With one building, few blocks and no growth, a collapsed core meets the needs at the lowest cost and complexity. A separate core, mesh or fabric adds devices or complexity without a requirement."
 },
 {
  "module": "m2",
  "q": "A clinical building needs sub-second recovery from uplink failures and no spanning-tree loops. Wireless clients are tunnelled to a central controller, and wired devices do not move between floors. Which access design BEST fits?",
  "options": [
   "Layer 2 access with VLANs spanning all floors and rapid spanning tree",
   "An overlay fabric so every subnet can appear on every floor",
   "Routed access with layer 3 uplinks, an IGP and BFD",
   "Layer 2 access with one large VLAN for all clinical devices"
  ],
  "answer": 2,
  "explain": "Routed access gives deterministic, loop-free recovery, and the controller already handles wireless mobility. Spanning VLANs conflict with the no-loop requirement, and a fabric adds complexity for a need that is already met."
 },
 {
  "module": "m2",
  "q": "A leaf has 48 × 25 Gbps server ports. The requirement is no worse than 3:1 oversubscription even after one spine fails. Which uplink design is the MINIMUM that meets it?",
  "options": [
   "4 × 100 Gbps uplinks to 4 spines",
   "3 × 100 Gbps uplinks to 3 spines",
   "8 × 50 Gbps uplinks to 8 spines",
   "5 × 100 Gbps uplinks to 5 spines"
  ],
  "answer": 3,
  "explain": "Downstream is 1,200 Gbps. With 5 × 100 Gbps, one spine failure leaves 400 Gbps, giving exactly 3:1. With 4 uplinks a failure leaves 300 Gbps (4:1); with 3, 200 Gbps (6:1); with 8 × 50 Gbps, 400 Gbps normally (3:1) but 350 Gbps after a failure (about 3.4:1)."
 },
 {
  "module": "m2",
  "q": "A two-tier spine-leaf fabric uses 64-port spines with one link to each leaf. The business needs 90 leaves within two years. What is the BEST design response?",
  "options": [
   "Plan a super-spine tier or higher-radix spines before leaf count reaches 64",
   "Connect the extra leaves to existing leaves using spare server ports",
   "Add more spines to the fabric, since the number of spines limits how many leaves can connect",
   "Use two links from each leaf to each spine to increase capacity"
  ],
  "answer": 0,
  "explain": "Spine port count caps leaf count in a two-tier fabric. More spines add bandwidth, not leaf capacity; daisy-chaining leaves breaks the Clos design; double links halve the possible leaf count."
 },
 {
  "module": "m2",
  "q": "Two data centres 40 km apart host 300 VLANs. Only 10 VLANs carry clustered applications that require the same subnet at both sites. Which DCI design BEST fits?",
  "options": [
   "Stretch all 300 VLANs so any workload can move between the sites",
   "Pure routed DCI, requiring all ten clustered applications to be redesigned before migration",
   "Native layer 2 trunks for the 10 VLANs with a single shared gateway",
   "Routed DCI plus an overlay extending only the 10 segments, with local gateways"
  ],
  "answer": 3,
  "explain": "This meets the validated need while keeping most of the estate in separate failure domains. Stretching everything merges the sites; routed-only ignores a real requirement; plain trunks with one gateway keep storm, split-brain and tromboning risks."
 },
 {
  "module": "m2",
  "q": "An application owner states that synchronous writes can tolerate at most 1 ms of added round-trip latency. The fibre route between candidate sites is 140 km. What is the BEST conclusion?",
  "options": [
   "The sites are too far apart for synchronous replication within the budget",
   "The sites are suitable, because 140 km adds only about 0.7 ms round trip",
   "The sites are suitable if the DCI uses dark fibre instead of a carrier",
   "The budget is irrelevant because synchronous replication is asynchronous at the network layer"
  ],
  "answer": 0,
  "explain": "At about 5 µs per km one way, 140 km is 0.7 ms one way and 1.4 ms round trip from propagation alone, exceeding the 1 ms budget. Dark fibre removes some equipment delay but not propagation."
 },
 {
  "module": "m2",
  "q": "A stock exchange must deliver market data with no gaps if any single network device fails. Which design BEST meets this requirement?",
  "options": [
   "One network with fast-reroute protection pre-computed on every multicast link and router",
   "Two independent distribution networks carrying duplicate A and B feeds",
   "One spine-leaf fabric with eight spines and BFD on all links",
   "One network with redundant supervisors in every switch chassis"
  ],
  "answer": 1,
  "explain": "Duplicating the feed over independent networks lets receivers arbitrate without any loss. Fast reroute and redundancy within one network shorten outages but cannot guarantee zero loss during failover."
 },
 {
  "module": "m2",
  "q": "A large campus needs consistent group-based policy for 30,000 users and devices that roam across 40 buildings. The team has strong automation skills. Which design direction BEST fits?",
  "options": [
   "A collapsed core in each building with per-building VLANs and ACLs",
   "Layer 2 access with VLANs spanning every building on the campus",
   "An overlay campus fabric with anycast gateways and group-based policy",
   "Routed access with per-subnet ACLs maintained manually on each switch"
  ],
  "answer": 2,
  "explain": "Policy scale and mobility across many buildings, plus the skills to operate it, justify a fabric. Spanning VLANs create huge failure domains, and subnet-based ACLs are hard to keep consistent at this scale."
 },
 {
  "module": "m3",
  "q": "A bank's 150 branches must keep ATM service through any single failure, and the regulator requires encryption over any network the bank does not control. Budget favours internet transports. Which branch design BEST fits standard branches?",
  "options": [
   "Two broadband circuits from different providers with no encryption",
   "An encrypted overlay over broadband plus cellular, with physical path diversity",
   "A single MPLS circuit with a cellular backup used only for ATMs",
   "Two broadband circuits from the same provider, both carried under an encrypted overlay"
  ],
  "answer": 1,
  "explain": "Two transports with independent failure causes meet the single-failure requirement, and the overlay provides encryption. Unencrypted public transport breaks the regulation; a single primary or same-provider pair leaves shared failure points."
 },
 {
  "module": "m3",
  "q": "A company with 250 sites in a hub-and-spoke overlay is adding branch-to-branch video for about 20 concurrent sessions. Which change BEST meets the need?",
  "options": [
   "Enable dynamic, on-demand tunnels between branches for real-time traffic",
   "Build a permanent full mesh of tunnels across all transports between all sites",
   "Upgrade both hubs to carry the additional video traffic through them",
   "Send branch-to-branch video over cellular so it avoids the hub entirely"
  ],
  "answer": 0,
  "explain": "Dynamic tunnels give direct low-latency paths only where needed. A full mesh creates tens of thousands of idle tunnels; hub upgrades do not remove hairpin delay; cellular-by-default adds variability and cost."
 },
 {
  "module": "m3",
  "q": "An e-commerce company's 10 Gbps internet links were saturated by a 60 Gbps attack. It has two ISPs and a public web storefront. Which mitigation design BEST fits?",
  "options": [
   "A larger on-premises DDoS appliance placed behind the edge routers",
   "Upgrading both internet links to 40 Gbps to absorb future attacks",
   "Upstream cloud scrubbing or an always-on proxy in front of the storefront",
   "Remotely triggered blackholing of the storefront's address with both ISPs during attacks"
  ],
  "answer": 2,
  "explain": "Volumetric attacks must be absorbed upstream, before they reach the links. On-site appliances cannot help once links are full, bigger links are still smaller than the attack, and blackholing takes the storefront offline."
 },
 {
  "module": "m3",
  "q": "A multihomed enterprise wants most inbound traffic to arrive via ISP-A, using ISP-B as backup. ISP-A and ISP-B both prefer customer routes with local preference. Which approach is MOST likely to achieve this?",
  "options": [
   "Prepend the enterprise AS several times on every advertisement sent to the backup ISP-B",
   "Send a higher MED to ISP-B than to ISP-A on all advertisements",
   "Set a higher local preference on routes received from ISP-A",
   "Use ISP-B's customer communities to lower its local preference for the routes"
  ],
  "answer": 3,
  "explain": "Provider communities change preference inside ISP-B, where prepending alone is overridden by its customer-route preference. MED is not compared across different ASes, and local preference on received routes affects only outbound traffic."
 },
 {
  "module": "m3",
  "q": "An enterprise edge router peers with two ISPs and redistributes all BGP-learned routes into BGP advertisements towards both. Which risk is MOST serious?",
  "options": [
   "Inbound traffic will always prefer the ISP with the shorter AS path",
   "The router will learn a default route from each ISP at once",
   "The ISPs will reject the enterprise's own prefixes as too specific",
   "The enterprise can become transit between the two ISPs"
  ],
  "answer": 3,
  "explain": "Re-advertising one provider's routes to the other invites transit traffic that can saturate the enterprise's links. An outbound filter permitting only the enterprise's own prefixes prevents it."
 },
 {
  "module": "m3",
  "q": "A mining site has no fixed-line service. Requirements: good voice quality and no single failure isolating the site. Cellular coverage is reliable. Which design BEST fits?",
  "options": [
   "GEO satellite primary with a second GEO terminal from the same provider",
   "Two LEO terminals from the same provider for full redundancy",
   "LEO satellite primary with 4G/5G as an independent secondary path",
   "4G/5G primary with no secondary because coverage is reliable"
  ],
  "answer": 2,
  "explain": "LEO latency suits voice and cellular is a physically different path. GEO delay hurts voice, same-provider terminals share failure domains, and a single path breaks the no-isolation requirement."
 },
 {
  "module": "m3",
  "q": "Branch users need low-latency SaaS access, and regulation requires all internet access to be logged centrally. The security team is small. Which design BEST fits?",
  "options": [
   "Local breakout through a cloud security service that logs centrally",
   "Backhaul all internet traffic to the data centre over the private WAN",
   "Local breakout with a separately managed firewall at every branch",
   "Local breakout without inspection, relying on the SaaS provider's controls"
  ],
  "answer": 0,
  "explain": "A cloud security service gives short SaaS paths, central logging and a single policy point suitable for a small team. Backhaul adds latency; per-branch firewalls multiply management; no inspection fails the logging requirement."
 },
 {
  "module": "m4",
  "q": "A national retailer runs one OSPF area covering its core and 600 flapping broadband branches, each dual-homed to one of four regional hubs. Core CPU spikes during SPF runs. Which design BEST fixes the root cause?",
  "options": [
   "Longer SPF throttle timers on all core routers to reduce recalculations",
   "Regional totally stubby areas with hub ABRs that summarise to the backbone",
   "A separate OSPF area for each of the 600 branches attached to area 0",
   "Static default routes on all branches, removing OSPF from the WAN edge"
  ],
  "answer": 1,
  "explain": "Regional areas contain branch churn and give the core stable summaries, while hubs provide the default exit. Longer timers slow all convergence; 600 areas create sprawl; static defaults lose dual-hub failover."
 },
 {
  "module": "m4",
  "q": "An OSPF network of 300 routers meets all current requirements. The team is expert in OSPF; a vendor recommends IS-IS. There are no IPv6 or segment-routing plans. What should the design record state?",
  "options": [
   "Migrate to IS-IS because it is preferred by large service providers",
   "Run IS-IS in parallel with OSPF to prepare for an eventual migration",
   "Keep OSPF, with a review trigger tied to new IPv6 or traffic-engineering needs",
   "Migrate to BGP everywhere because it is the most scalable protocol"
  ],
  "answer": 2,
  "explain": "No unmet requirement justifies the risk of migration. A review trigger ensures the decision is revisited if requirements change. Parallel IGPs and BGP-everywhere add complexity without benefit."
 },
 {
  "module": "m4",
  "q": "Two routing domains are joined at two routers with mutual redistribution for resilience. After failures, some routes loop between the domains. Which design change BEST prevents this while keeping both links?",
  "options": [
   "Tag routes at redistribution and deny the other domain's tag on the way back",
   "Remove redistribution from one router and accept the resulting single point of failure",
   "Set the maximum metric on every redistributed route in both directions",
   "Redistribute only connected routes between the two domains at both points"
  ],
  "answer": 0,
  "explain": "Tagging stops routes re-entering their source domain, the cause of the loop, while preserving both points. Removing one point loses resilience; metrics do not prevent feedback; connected-only breaks reachability."
 },
 {
  "module": "m4",
  "q": "Core routers advertise a summary for a region. When one regional subnet's only router fails, traffic for that subnet is dropped at the core. What explains this behaviour?",
  "options": [
   "The core withdraws the summary as soon as any component route fails",
   "The summary still attracts the traffic, and the discard route drops it",
   "The failed subnet is still being advertised as a specific route",
   "OSPF discards summaries whenever a single component is unreachable"
  ],
  "answer": 1,
  "explain": "The summary remains advertised while any component exists, so traffic for the failed subnet still arrives and the null route drops it — the intended trade-off that prevents loops."
 },
 {
  "module": "m4",
  "q": "An enterprise runs iBGP on 80 routers in a full mesh to carry partial internet and VPN routes. Adding routers is slow and error-prone. Which design BEST fits?",
  "options": [
   "A single route reflector, which halves the number of client sessions compared with using two",
   "Redistribution of all BGP routes into the IGP to remove iBGP altogether",
   "A confederation with one sub-AS per router to keep the full-mesh behaviour",
   "Two redundant route reflectors in separate failure domains, all routers as clients"
  ],
  "answer": 3,
  "explain": "Redundant reflectors remove the full-mesh burden without creating a single point of failure. A single reflector is fragile; redistributing large route sets into the IGP harms it; one sub-AS per router is unmanageable."
 },
 {
  "module": "m4",
  "q": "Clients of a route reflector have two internet exits, but after an exit fails they lose traffic for several seconds while the reflector sends a new path. What BEST addresses this?",
  "options": [
   "Move the reflector into the forwarding path of the core routers",
   "Advertise additional paths so clients already know a backup",
   "Increase the BGP keepalive and hold timers on all client sessions",
   "Replace the two internet exits with a single higher-capacity exit"
  ],
  "answer": 1,
  "explain": "The reflector hides the second path, so clients wait for a new one. Advertising multiple paths lets them switch immediately. Moving the reflector does not change what it advertises, longer timers slow detection, and one exit removes resilience."
 },
 {
  "module": "m4",
  "q": "An application requires recovery from any single link failure within 100 ms. Which combination BEST meets this convergence budget?",
  "options": [
   "Default protocol hello timers with an aggressive SPF throttle setting",
   "BFD for detection with a full SPF and FIB rebuild on every failure",
   "BFD for fast detection plus pre-computed loop-free backup paths",
   "Longer SPF throttle timers so that routers batch topology changes"
  ],
  "answer": 2,
  "explain": "Sub-second detection with locally pre-installed backups avoids waiting for propagation and computation. Default hellos detect in seconds; full recomputation may exceed the budget; longer throttles slow convergence."
 }
]);
