window.TRACK = window.TRACK || { modules: [], exam: [] };
TRACK.modules.push({
 "id": "m5",
 "order": 5,
 "code": "Resilience",
 "title": "High Availability & Resilience Design",
 "subtitle": "Failure domains, availability maths, convergence, safe change and disaster recovery",
 "outcomes": [
  "Identify failure domains and shared fate, and shrink blast radius to targets the business accepts",
  "Calculate availability for serial and parallel designs, including common-cause effects and MTTR",
  "Engineer convergence budgets and choose between fast reroute, graceful restart and non-stop routing",
  "Design maintenance and change processes that never reduce protection below target",
  "Translate RPO and RTO into replication, addressing and failover designs"
 ],
 "lessons": [
  {
   "id": "m5-l1",
   "title": "Failure Domains & Blast Radius",
   "subtitle": "Decide what is allowed to break together, and make everything else break apart",
   "minutes": 24,
   "objectives": [
    "Define failure domains and blast radius and locate them in an existing design",
    "Identify hidden shared fate across physical, logical, software and human dependencies",
    "Select containment techniques that limit blast radius at a cost the business accepts"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Every resilience conversation begins with one question: **what breaks together?** Redundancy only helps when the redundant parts fail independently. An expert designer therefore spends less time adding boxes and more time drawing boundaries — deciding which failures are allowed to spread, how far, and who notices when they do."
    },
    {
     "type": "callout",
     "kind": "definition",
     "text": "A **failure domain** is the set of components and services that are impaired by a single fault. The **blast radius** is the business-visible consequence of that fault: how many users, transactions, sites or safety functions are affected, and for how long. Good design keeps failure domains small and aligned with boundaries the business can tolerate.",
     "title": "Failure domain and blast radius"
    },
    {
     "type": "layers",
     "title": "The failure-domain hierarchy",
     "items": [
      {
       "label": "Region / metro",
       "parts": [
        "Natural disaster, regional power grid",
        "Shared carrier backbone",
        "Regional regulatory event"
       ]
      },
      {
       "label": "Site / data centre",
       "parts": [
        "Utility feed and generators",
        "Building entry points for fibre",
        "Site-wide control or management cluster"
       ]
      },
      {
       "label": "Hall / pod / power zone",
       "parts": [
        "UPS string or PDU",
        "Fabric pod and its spines",
        "Cooling zone"
       ]
      },
      {
       "label": "Device",
       "parts": [
        "Chassis, backplane, route processor",
        "Operating system image and its bugs"
       ]
      },
      {
       "label": "Component",
       "parts": [
        "Optic, line card, power supply",
        "A single process such as a routing daemon"
       ]
      }
     ]
    },
    {
     "type": "framework",
     "title": "Six sources of shared fate",
     "items": [
      {
       "label": "SF1",
       "title": "Physical",
       "text": "Two 'diverse' circuits in the same duct, two power feeds from the same substation, two racks under the same sprinkler zone."
      },
      {
       "label": "SF2",
       "title": "Logical",
       "text": "One Layer 2 broadcast domain, one spanning-tree instance, one routing flooding domain or one overlay control plane spanning everything."
      },
      {
       "label": "SF3",
       "title": "Control and management",
       "text": "A single controller cluster, orchestrator, identity store, DNS or NTP service that every site depends on to function or to recover."
      },
      {
       "label": "SF4",
       "title": "Software",
       "text": "Both members of a pair running the same image: one bug, one malformed update or one time-handling defect hits both at once."
      },
      {
       "label": "SF5",
       "title": "Operational",
       "text": "The same change pushed to every device by the same pipeline in the same minute, or the same engineer working on both halves of a pair."
      },
      {
       "label": "SF6",
       "title": "Provider",
       "text": "Two carriers that share a last-mile segment, an exchange building or an upstream wholesale provider."
      }
     ]
    },
    {
     "type": "text",
     "text": "Layer 2 is the classic oversized failure domain. A loop, a broadcast storm or a flapping MAC address can consume every link and every control plane in the VLAN, wherever it is stretched. Routed boundaries stop that propagation, and summarisation at area or level borders stops routing instability from flooding beyond its origin. In the control plane, separate route-reflector clusters or regional instances keep a software fault in one region from reaching the next."
    },
    {
     "type": "table",
     "title": "Containment techniques — decision matrix",
     "head": [
      "Technique",
      "What it contains",
      "Trade-off",
      "Use when"
     ],
     "rows": [
      [
       "Routed access / Layer 3 boundary",
       "Loops, storms, MAC instability",
       "Less VLAN mobility; needs L3-aware applications",
       "Campus and DC edges where stretched VLANs are not essential"
      ],
      [
       "Summarisation at area/level borders",
       "Routing churn and SPF load",
       "Possible sub-optimal paths; black-hole risk without careful design",
       "Large link-state domains, hub sites"
      ],
      [
       "Cell or pod architecture",
       "Any fault inside one cell",
       "Duplicated infrastructure; cross-cell traffic needs explicit design",
       "Large platforms, multi-tenant services, retail estates"
      ],
      [
       "Separate control-plane instances",
       "Control-plane bugs, bad policy pushes",
       "More systems to operate and keep consistent",
       "Multi-region networks, SD-WAN and fabric controllers"
      ],
      [
       "Staggered software versions",
       "Common-mode software defects",
       "Wider test matrix; feature parity must be managed",
       "Critical pairs where a shared bug is the dominant risk"
      ],
      [
       "Protective limits (max-prefix, storm control, control-plane policing)",
       "Overload from a neighbour or a flood",
       "Limits must be tuned; wrong values cause self-inflicted outages",
       "Every external peering and every access edge"
      ]
     ]
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "A pair of firewalls in a cluster synchronises configuration and state, so a bad rule or a state-table bug reaches both members within seconds. A cluster protects against **hardware** failure, not against **software or human** failure. For the latter you need a second, independently managed failure domain.",
     "title": "Redundancy that shares fate is decoration"
    },
    {
     "type": "steps",
     "title": "Mapping failure domains in a design review",
     "items": [
      {
       "title": "List dependencies",
       "text": "For each critical service, list every dependency: power, fibre paths, carriers, controllers, DNS, NTP, identity, certificates, licensing servers."
      },
      {
       "title": "Group shared fate",
       "text": "Mark components that would fail together under one physical, logical, software or human fault."
      },
      {
       "title": "Find single shared dependencies",
       "text": "Any dependency that appears under every redundant path is a single point of failure, even if every box is paired."
      },
      {
       "title": "Size the blast radius",
       "text": "Express each fault in business terms: users, revenue per hour, safety functions, regulatory exposure."
      },
      {
       "title": "Decide",
       "text": "For each fault choose: contain (shrink the domain), duplicate (independent second domain) or accept (documented, with an owner)."
      },
      {
       "title": "Record",
       "text": "Write the decision and its rationale into the design document and risk register so it survives staff turnover."
      }
     ]
    },
    {
     "type": "callout",
     "kind": "example",
     "text": "A retailer with 900 stores splits its estate into nine cells of about 100 stores, each with its own controller pair, policy instance and change wave. A bad policy push now affects at most one cell — roughly 11% of stores — and the rollout process promotes changes cell by cell. The cost is nine sets of management infrastructure; the benefit is that no single action can close every store at once.",
     "title": "Cells in a retail estate"
    },
    {
     "type": "scenario",
     "title": "Stretched VLAN, shared disaster",
     "situation": "A data centre stretches a server VLAN across two halls so that virtual machines can move freely. A cabling error in Hall A creates a loop; the resulting storm saturates the inter-hall links and both halls lose service for 40 minutes. The CIO asks for a design change that prevents a repeat without stopping VM mobility for the few applications that genuinely need it.",
     "options": [
      {
       "text": "Tune spanning-tree timers and add BPDU guard everywhere, keeping the stretched VLAN as it is.",
       "feedback": "Useful hygiene, but the VLAN is still one failure domain across both halls; the next storm from a different cause will still take both down.",
       "best": false
      },
      {
       "text": "Make each hall its own routed failure domain; carry Layer 2 only where proven necessary over an overlay with storm control and ARP suppression, and move other workloads to Layer 3 mobility.",
       "feedback": "Best. It shrinks the default failure domain to one hall, keeps a controlled exception for applications that need adjacency, and gives the business a path to retire the exception.",
       "best": true
      },
      {
       "text": "Double the inter-hall link capacity so that a storm cannot saturate it.",
       "feedback": "A storm consumes whatever capacity exists, and the control planes in both halls still suffer. Capacity does not create isolation.",
       "best": false
      },
      {
       "text": "Consolidate into a single hall to remove the inter-hall links entirely.",
       "feedback": "This removes the symptom but also removes physical diversity, increasing the blast radius of power, cooling or fire events.",
       "best": false
      }
     ]
    },
    {
     "type": "callout",
     "kind": "insight",
     "text": "Executives rarely care that a pod has four spines. They care that a single fault can stop at most 10% of branches, or at most one of three payment channels. State blast-radius targets in those terms in the requirements, and test designs against them.",
     "title": "Blast radius is a business metric"
    },
    {
     "type": "checklist",
     "title": "Failure-domain review checklist",
     "items": [
      "Every critical service has a dependency map that includes DNS, NTP, identity and certificates",
      "Diverse circuits have been verified for physical path diversity, not just different carriers",
      "No Layer 2 domain spans more than one site or power zone without a documented exception",
      "Controller and management clusters are scoped so one failure cannot affect the whole estate",
      "Paired devices have a strategy against common-mode software defects",
      "Changes are rolled out in waves aligned with failure domains",
      "Blast-radius targets are stated in business terms and traced to design decisions"
     ]
    },
    {
     "type": "reflection",
     "prompt": "Pick one service you support today. Which single fault — physical, logical, software or human — would hurt it most, and is that dependency visible in your current design documents?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Failure domain",
       "def": "The set of components and services impaired by a single fault."
      },
      {
       "term": "Blast radius",
       "def": "The business-visible scope of a failure: users, sites, transactions or functions affected and for how long."
      },
      {
       "term": "Shared fate",
       "def": "A condition in which supposedly independent components fail together because of a common dependency."
      },
      {
       "term": "Shared risk link group (SRLG)",
       "def": "A set of links that share a physical resource, such as a duct or fibre, and therefore fail together."
      },
      {
       "term": "Cell architecture",
       "def": "A design that partitions a service into independent, self-contained units so a fault affects only one unit."
      },
      {
       "term": "Common-mode failure",
       "def": "A single cause, such as a software defect or a bad change, that defeats all redundant members at once."
      },
      {
       "term": "Control-plane policing",
       "def": "Rate-limiting traffic destined to a device's control plane so floods cannot exhaust its CPU."
      },
      {
       "term": "Containment",
       "def": "Design choices that stop a fault from propagating beyond its origin, such as routed boundaries or summarisation."
      }
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Two WAN circuits from different carriers both fail when road works cut a single duct outside the building. What design concept was missed?",
       "options": [
        "Insufficient bandwidth on the secondary circuit for the full failover load",
        "Routing protocol timers too slow to detect the loss of either of the links",
        "An active/standby model that should have been an active/active one instead",
        "Shared fate: both circuits sat in one shared risk link group"
       ],
       "answer": 3,
       "explain": "Different carriers do not guarantee physical diversity. Both circuits shared one duct, so they were one failure domain. Bandwidth, timers and redundancy mode do not help when both paths are cut together."
      },
      {
       "q": "Why is a firewall cluster that synchronises configuration not sufficient protection against a bad rule change?",
       "options": [
        "A bad change replicates to every member, so the cluster shares one failure domain",
        "Clusters always fail over too slowly for any stateful sessions to survive the event",
        "The standby member does not process traffic and so cannot detect the bad rule",
        "Configuration synchronisation is disabled by default during every maintenance window"
       ],
       "answer": 0,
       "explain": "Synchronisation is the point of a cluster, which is why a bad rule reaches every member. Hardware redundancy does not protect against common-mode configuration or software faults."
      },
      {
       "q": "A designer proposes nine regional cells, each with its own controller pair and change wave, for a 900-store estate. What is the main benefit?",
       "options": [
        "Overall capital cost falls because each cell uses smaller and cheaper controllers",
        "No single fault or change can affect more than about one ninth of stores",
        "Troubleshooting gets simpler because every cell shares one consolidated policy",
        "Bandwidth to the data centre drops because each cell caches its own applications"
       ],
       "answer": 1,
       "explain": "Cells cap the blast radius. They usually cost more, not less, and they deliberately avoid a single shared policy instance."
      },
      {
       "q": "Which technique contains routing instability within one part of a large link-state network?",
       "options": [
        "Raising hello and dead timers on all core links",
        "Extending the backbone area across all remote sites",
        "Summarisation at area or level borders",
        "Mutual redistribution between BGP and the IGP"
       ],
       "answer": 2,
       "explain": "Summarisation hides topology changes inside an area from the rest of the domain. Slower timers delay detection, a larger backbone enlarges the flooding domain, and mutual redistribution adds risk."
      },
      {
       "q": "How should blast-radius targets be expressed in design requirements?",
       "options": [
        "In device terms, such as the number of redundant chassis installed per site",
        "In business terms, such as the maximum share of branches or transactions affected",
        "In protocol terms, such as the number of routing areas used in the design",
        "In supplier terms, such as the support contract level and response time for each platform"
       ],
       "answer": 1,
       "explain": "Business stakeholders accept or reject risk in business terms. Device counts and protocol structure are means, not targets."
      }
     ]
    }
   ]
  },
  {
   "id": "m5-l2",
   "title": "Redundancy Models & Availability Mathematics",
   "subtitle": "Turn 'it must never go down' into numbers you can design, cost and defend",
   "minutes": 30,
   "objectives": [
    "Compare N+1, 2N and active/active versus active/standby redundancy models",
    "Calculate serial, parallel and MTBF/MTTR-based availability and convert it to downtime",
    "Explain why common-cause failures and failover coverage cap real-world availability"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Availability requirements arrive as adjectives — 'always on', 'mission critical' — and an expert's first job is to turn them into numbers. Numbers let you compare designs, price them, and show a sponsor exactly what an extra nine costs. They also expose where effort is wasted: doubling a component that is already reliable while a single unprotected dependency dominates the result."
    },
    {
     "type": "compare",
     "title": "Redundancy models",
     "columns": [
      {
       "title": "N+1",
       "items": [
        "N units carry peak load; one spare absorbs a single failure",
        "Cost-efficient for pools of identical units (power supplies, cluster nodes, links in a bundle)",
        "During maintenance of one unit you are at N — a further failure becomes an outage"
       ]
      },
      {
       "title": "2N",
       "items": [
        "Two complete, independent systems, each able to carry the full load",
        "Highest isolation: separate power, paths and often management",
        "Roughly double the cost; each half runs at 50% or less in normal operation"
       ]
      },
      {
       "title": "N+2 / 2N+1",
       "items": [
        "Tolerates a failure while another unit is in maintenance",
        "Used for services where maintenance must never reduce protection",
        "Cost justified only where the price of downtime is very high"
       ]
      }
     ]
    },
    {
     "type": "compare",
     "title": "Active/active versus active/standby",
     "columns": [
      {
       "title": "Active/active",
       "items": [
        "Both members carry traffic; capacity is used every day",
        "Failover is partial — only the failed share moves",
        "Each member must stay under about 50% load, or loss of one overloads the other",
        "State sharing and asymmetric paths need careful design"
       ]
      },
      {
       "title": "Active/standby",
       "items": [
        "One member carries all traffic; the other waits",
        "Simple, predictable state handling and symmetric paths",
        "The standby can hide latent faults until the day it is needed",
        "Failover moves 100% of traffic at once"
       ]
      }
     ]
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "Active/active pairs are often sized correctly on day one and silently grow past 50% each. The first failure then becomes an overload outage. Track **pair utilisation against the survivable ceiling**, not individual link utilisation.",
     "title": "The 50% rule nobody monitors"
    },
    {
     "type": "formula",
     "title": "Availability formulas",
     "items": [
      {
       "name": "Steady-state availability",
       "expr": "A = MTBF ÷ (MTBF + MTTR)",
       "meaning": "The fraction of time a component is working. MTBF is mean time between failures, MTTR is mean time to restore."
      },
      {
       "name": "Serial chain",
       "expr": "A_total = A1 × A2 × … × An",
       "meaning": "Every component must work. The chain is always less available than its weakest link."
      },
      {
       "name": "Parallel (independent)",
       "expr": "A_total = 1 − (1 − A1) × (1 − A2) × …",
       "meaning": "At least one path must work. Assumes independent failures and perfect, instant failover."
      },
      {
       "name": "Common-cause adjustment (simplified beta-factor model)",
       "expr": "U_pair ≈ β × U + ((1 − β) × U)²",
       "meaning": "U = 1 − A for one member; β is the fraction of failures that hit both members together. The first term usually dominates."
      },
      {
       "name": "Annual downtime",
       "expr": "Downtime = (1 − A) × 525,600 minutes",
       "meaning": "Converts availability into minutes per year that a sponsor can understand."
      },
      {
       "name": "Survivable utilisation",
       "expr": "Max load per unit = (n − f) ÷ n",
       "meaning": "With n units sharing load and f tolerated failures, each unit must stay below this share of its capacity."
      }
     ]
    },
    {
     "type": "table",
     "title": "The nines in minutes",
     "head": [
      "Availability",
      "Downtime per year",
      "Downtime per 30-day month",
      "Typical meaning"
     ],
     "rows": [
      [
       "99.9%",
       "≈ 8.8 hours",
       "≈ 43 minutes",
       "Good single-site enterprise service"
      ],
      [
       "99.95%",
       "≈ 4.4 hours",
       "≈ 22 minutes",
       "Redundant single site, disciplined operations"
      ],
      [
       "99.99%",
       "≈ 53 minutes",
       "≈ 4.3 minutes",
       "Redundant paths and sites, automated failover"
      ],
      [
       "99.999%",
       "≈ 5.3 minutes",
       "≈ 26 seconds",
       "Carrier-grade; needs independent domains and very fast recovery"
      ]
     ]
    },
    {
     "type": "steps",
     "title": "Worked example — a branch-to-data-centre path",
     "items": [
      {
       "title": "Serial baseline",
       "text": "Router 99.99%, firewall 99.95%, single WAN circuit 99.9%. A = 0.9999 × 0.9995 × 0.999 ≈ 0.9984, about **99.84%**, or roughly 14 hours of downtime a year. The WAN circuit dominates."
      },
      {
       "title": "Add a second circuit (naïve)",
       "text": "Two circuits in parallel: 1 − (0.001 × 0.001) = 0.999999. The chain becomes 0.9999 × 0.9995 × 0.999999 ≈ **99.94%**. The bottleneck has moved to the firewall."
      },
      {
       "title": "Apply common cause",
       "text": "If 10% of circuit failures are shared (same duct, same exchange), U_pair ≈ 0.1 × 0.001 + (0.9 × 0.001)² ≈ 0.0001, so the pair is about **99.99%**, not 99.9999%. Shared fate erased two nines."
      },
      {
       "title": "Fix the real bottleneck",
       "text": "Pair the firewalls and routers as well, and verify circuit diversity to push β down. The result is now limited by common-cause factors and failover behaviour, which is exactly where design attention should go."
      }
     ]
    },
    {
     "type": "callout",
     "kind": "example",
     "text": "A switch with an MTBF of 200,000 hours and a four-hour on-site spare MTTR gives A = 200,000 ÷ 200,004 ≈ **99.998%**. The same switch with a 48-hour courier replacement gives 200,000 ÷ 200,048 ≈ **99.976%** — about twelve times the downtime. Spares strategy, remote hands and automation are availability design, not just operations.",
     "title": "MTTR is a design variable"
    },
    {
     "type": "callout",
     "kind": "pro",
     "text": "The parallel formula assumes every failure is detected and every failover succeeds. In practice a share of failures are 'grey' — packet loss, a hung process, a link that stays up but drops traffic. Quote a **coverage factor** (the proportion of failures that are detected and recovered automatically) and invest in detection, because an undetected failure behaves like a serial component.",
     "title": "Failover coverage"
    },
    {
     "type": "scenario",
     "title": "Where should the next dollar go?",
     "situation": "A trading firm's order path runs through dual internet-edge routers (each 99.99%), a single firewall cluster (99.95%, both members in one rack on one PDU pair) and dual diverse carriers (each 99.9%, diversity verified). The target is 99.99%. The budget allows one improvement this year.",
     "options": [
      {
       "text": "Split the firewall members across independent racks and power, and test failover under load.",
       "feedback": "Best. The firewall cluster is the serial bottleneck and its members share a rack and power — a common-cause failure domain. Separating them raises the chain closest to the target.",
       "best": true
      },
      {
       "text": "Add a third carrier to the edge.",
       "feedback": "The carriers are already parallel and verified diverse; a third adds little. The serial firewall cluster still caps the chain at about 99.95%.",
       "best": false
      },
      {
       "text": "Replace the edge routers with higher-MTBF models.",
       "feedback": "The routers are already redundant; their combined contribution to downtime is tiny compared with the firewall cluster.",
       "best": false
      },
      {
       "text": "Negotiate a stricter service credit with the firewall support provider.",
       "feedback": "Credits compensate after the outage; they do not change availability.",
       "best": false
      }
     ]
    },
    {
     "type": "template",
     "title": "Availability calculator sheet",
     "purpose": "Model each element of a service path, its arrangement and its common-cause exposure, then convert the result into annual downtime for the sponsor.",
     "columns": [
      "Element",
      "Availability (A)",
      "Arrangement",
      "Common-cause β",
      "Effective A",
      "Downtime/yr",
      "Notes / evidence"
     ],
     "example": [
      [
       "WAN circuits (2 carriers)",
       "99.9% each",
       "Parallel",
       "0.10",
       "≈ 99.99%",
       "≈ 53 min",
       "Diversity verified to building entry; shared exchange remains"
      ],
      [
       "Firewall cluster",
       "99.95%",
       "Serial in chain",
       "n/a (single domain)",
       "99.95%",
       "≈ 4.4 h",
       "Members share rack and PDU — action item"
      ]
     ],
     "rows": 8
    },
    {
     "type": "reflection",
     "prompt": "Which service you support has an availability target that has never been converted into minutes per year? What would the number tell the sponsor that the adjective does not?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "MTBF",
       "def": "Mean time between failures: the average operating time between failures of a repairable component."
      },
      {
       "term": "MTTR",
       "def": "Mean time to restore: the average time from failure to restored service, including detection, travel, repair and verification."
      },
      {
       "term": "N+1",
       "def": "A redundancy model with one spare unit beyond what peak load requires."
      },
      {
       "term": "2N",
       "def": "A redundancy model with two complete, independent systems, each able to carry the full load."
      },
      {
       "term": "Active/active",
       "def": "A redundancy model in which all members carry traffic in normal operation."
      },
      {
       "term": "Active/standby",
       "def": "A redundancy model in which one member carries traffic and another waits to take over."
      },
      {
       "term": "Beta factor (β)",
       "def": "The fraction of a component's failures that are common-cause and affect redundant members simultaneously."
      },
      {
       "term": "Coverage factor",
       "def": "The proportion of failures that are detected and recovered automatically by the redundancy mechanism."
      },
      {
       "term": "Survivable ceiling",
       "def": "The maximum utilisation per member that still lets the survivors carry the load after the tolerated failures."
      }
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Three components with availabilities of 99.99%, 99.95% and 99.9% are in series. What is the approximate end-to-end availability?",
       "options": [
        "About 99.84%",
        "About 99.90%",
        "About 99.95%",
        "About 99.99%"
       ],
       "answer": 0,
       "explain": "Serial availability multiplies: 0.9999 × 0.9995 × 0.999 ≈ 0.9984. A serial chain is always below its weakest member, never at it or above."
      },
      {
       "q": "A component has an MTBF of 50,000 hours. Reducing its MTTR from 24 hours to 4 hours mainly changes what?",
       "options": [
        "The failure rate falls, so outages happen far less often",
        "Nothing, because availability depends only on the MTBF",
        "Annual downtime falls by roughly a factor of six",
        "The component no longer needs any redundant partner"
       ],
       "answer": 2,
       "explain": "A = MTBF ÷ (MTBF + MTTR). Failures are just as frequent, but each one is about six times shorter, so annual downtime drops roughly sixfold."
      },
      {
       "q": "Two load-sharing firewalls each run at 65% of capacity. What is the design problem?",
       "options": [
        "Active/active pairs must always become active/standby above 50% load",
        "Utilisation above 60% stops stateful synchronisation from working",
        "Load sharing makes a pair less available than a single firewall",
        "Neither can absorb the other's load, so one failure causes overload"
       ],
       "answer": 3,
       "explain": "With two members and one tolerated failure, the survivable ceiling is (2 − 1) ÷ 2 = 50%. At 65% each, the survivor would need 130% capacity."
      },
      {
       "q": "Why does a parallel pair rarely reach the availability the independent formula predicts?",
       "options": [
        "The formula ignores bandwidth differences between the two members",
        "Parallel members run at half capacity and so fail much more often",
        "Common-cause failures and imperfect failure detection dominate",
        "The members share one MTTR, which cancels the benefit of the pair"
       ],
       "answer": 2,
       "explain": "The independent formula assumes no shared fate and perfect coverage. A small β or a few undetected grey failures quickly become the dominant term."
      },
      {
       "q": "A service is at 99.99%. How much downtime per year does that allow?",
       "options": [
        "Roughly 5 minutes",
        "Roughly 53 minutes",
        "Roughly 8.8 hours",
        "Roughly 4.4 hours"
       ],
       "answer": 1,
       "explain": "(1 − 0.9999) × 525,600 ≈ 52.6 minutes. Five minutes corresponds to 99.999%, 4.4 hours to 99.95% and 8.8 hours to 99.9%."
      }
     ]
    }
   ]
  },
  {
   "id": "m5-l3",
   "title": "Convergence Budgets & Fast Recovery",
   "subtitle": "Engineer recovery time component by component instead of hoping the protocol is fast enough",
   "minutes": 28,
   "objectives": [
    "Decompose convergence into detection, propagation, computation and FIB update",
    "Choose between fast detection, precomputed backups and prefix-independent convergence",
    "Weigh graceful restart and non-stop routing against fast reroute in a given topology"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Applications define recovery requirements in their own language: a voice call tolerates a few hundred milliseconds of loss, a storage replication session may time out after a few seconds, a payment authorisation has an end-to-end timeout. The designer's job is to translate that into a **convergence budget** and allocate it across the stages of recovery, exactly as a project manager allocates money."
    },
    {
     "type": "flow",
     "title": "The stages of convergence",
     "items": [
      {
       "label": "Detect",
       "text": "Notice the failure: loss of light, protocol timers, BFD"
      },
      {
       "label": "Propagate",
       "text": "Tell the rest of the domain: LSA/LSP flooding, BGP updates"
      },
      {
       "label": "Compute",
       "text": "Run SPF or best-path selection, including throttling delays"
      },
      {
       "label": "Update FIB",
       "text": "Program new forwarding entries into hardware"
      },
      {
       "label": "Recover",
       "text": "Traffic flows on the new path; transport and applications resume"
      }
     ]
    },
    {
     "type": "formula",
     "title": "Convergence budget",
     "items": [
      {
       "name": "Total convergence time",
       "expr": "T = T_detect + T_propagate + T_compute + T_FIB",
       "meaning": "Each term can be engineered separately; the largest term is usually where to invest."
      },
      {
       "name": "BFD detection time",
       "expr": "T_detect ≈ negotiated interval × multiplier",
       "meaning": "For 50 ms × 3, detection takes about 150 ms; for 300 ms × 3, about 900 ms."
      },
      {
       "name": "FIB update (prefix-dependent)",
       "expr": "T_FIB ≈ affected prefixes × per-prefix programming time",
       "meaning": "Grows with table size. Prefix-independent designs update a shared next-hop object instead, making this term roughly constant."
      }
     ]
    },
    {
     "type": "table",
     "title": "Detection options",
     "head": [
      "Mechanism",
      "Typical speed",
      "When it works",
      "Watch out for"
     ],
     "rows": [
      [
       "Loss of signal on a direct fibre",
       "Milliseconds",
       "Point-to-point links with no intermediate device",
       "Does not work through carrier transponders or media converters that keep the link up"
      ],
      [
       "Routing protocol hellos",
       "Seconds to tens of seconds",
       "Everywhere, as a backstop",
       "Too slow on its own for most real-time traffic"
      ],
      [
       "BFD",
       "Tens to hundreds of milliseconds",
       "Through Layer 2 services, carrier Ethernet, multi-hop paths",
       "CPU load at scale; aggressive timers on a busy or virtual platform cause false positives"
      ],
      [
       "Ethernet OAM / link fault signalling",
       "Sub-second",
       "Carrier Ethernet services that support it",
       "Requires provider support and correct configuration on both ends"
      ]
     ]
    },
    {
     "type": "cli",
     "title": "Fast detection and SPF throttling",
     "device": "R1 · IOS-style CLI",
     "lines": [
      "interface TenGigabitEthernet0/0/1",
      " bfd interval 50 min_rx 50 multiplier 3",
      " ip ospf bfd",
      "!",
      "router ospf 10",
      " timers throttle spf 50 200 5000",
      " timers throttle lsa 50 200 5000",
      " timers lsa arrival 50"
     ],
     "note": "BFD detects a failure in about 150 ms. The throttle timers react quickly to the first event (50 ms) but back off towards 5 s if the network keeps changing, which protects the control plane during instability."
    },
    {
     "type": "compare",
     "title": "Precomputed protection versus reactive convergence",
     "columns": [
      {
       "title": "Reactive convergence",
       "items": [
        "Recompute after the failure is detected",
        "Recovery time is the full budget: detect + propagate + compute + FIB",
        "Simple, nothing extra to configure or verify",
        "Typically hundreds of milliseconds to seconds"
       ]
      },
      {
       "title": "Fast reroute (LFA, remote LFA, TI-LFA)",
       "items": [
        "A backup next hop is computed and installed in advance",
        "On local detection, traffic switches immediately; the network converges behind it",
        "TI-LFA can provide full coverage in most topologies using segment routing",
        "Typically tens of milliseconds after detection"
       ]
      },
      {
       "title": "Prefix-independent convergence",
       "items": [
        "Many prefixes share one next-hop object in the FIB",
        "One pointer change moves all affected prefixes at once",
        "Essential for edge routers carrying large BGP tables",
        "Requires a precomputed backup path (for example a second BGP path)"
       ]
      }
     ]
    },
    {
     "type": "callout",
     "kind": "insight",
     "text": "While routers converge at slightly different moments, packets can loop briefly between a router that has updated and one that has not. On busy links this causes measurable loss even after the protected failure itself is handled. Ordered FIB updates and segment-routing-based micro-loop avoidance are design options where the loss budget is tight.",
     "title": "Micro-loops"
    },
    {
     "type": "compare",
     "title": "Graceful restart versus non-stop routing",
     "columns": [
      {
       "title": "Graceful restart (GR) with non-stop forwarding",
       "items": [
        "Forwarding continues on the old FIB while the control plane restarts",
        "Neighbours act as helpers and keep routes during the restart",
        "Risk: if the topology changes during the restart, traffic follows stale state and may be black-holed",
        "Interacts with fast detection: BFD must be able to survive a control-plane restart, or it tears the session down"
       ]
      },
      {
       "title": "Non-stop routing (NSR)",
       "items": [
        "A standby route processor keeps protocol sessions synchronised",
        "Neighbours do not notice the switchover; no helper needed",
        "Costs memory and CPU, and the synchronisation itself adds complexity",
        "Suits single-homed critical nodes such as provider edges"
       ]
      }
     ]
    },
    {
     "type": "callout",
     "kind": "pro",
     "text": "Where the topology offers **redundant paths**, it is usually better to detect the failure fast and reroute around the failed node than to keep forwarding through it on stale state. Where a node is a **single point of attachment** — a single-homed customer edge, a lone aggregation router — preserving forwarding with NSR or GR is often the better trade-off. Decide per role, not per network.",
     "title": "The design rule of thumb"
    },
    {
     "type": "scenario",
     "title": "A voice service with a 300 ms budget",
     "situation": "A regional network carries real-time voice between two contact centres. The application tolerates up to 300 ms of loss before calls drop. Links between core sites are carrier Ethernet services that stay up even when the far end fails. Current convergence relies on routing hellos and takes about 4 seconds.",
     "options": [
      {
       "text": "Enable graceful restart on all core routers so forwarding continues during failures.",
       "feedback": "Graceful restart helps only for control-plane restarts on the node itself. It does nothing for a far-end failure behind a carrier service and may prolong black-holing.",
       "best": false
      },
      {
       "text": "Tune routing hellos to one second and dead intervals to three seconds.",
       "feedback": "Better than today but still about 3 seconds — ten times the budget — and adds control-plane load.",
       "best": false
      },
      {
       "text": "Deploy BFD at about 50 ms × 3 on the carrier links, with precomputed loop-free alternates and modest SPF throttling.",
       "feedback": "Best. BFD detects failures that the carrier hides in about 150 ms, and a precomputed backup switches traffic immediately, keeping total loss inside the 300 ms budget.",
       "best": true
      },
      {
       "text": "Replace the carrier Ethernet services with dark fibre to get loss-of-signal detection.",
       "feedback": "It would improve detection, but at very high cost and long lead time; BFD solves the detection problem on the existing services.",
       "best": false
      }
     ]
    },
    {
     "type": "checklist",
     "title": "Convergence design checklist",
     "items": [
      "Recovery-time requirements are captured per application class, in milliseconds",
      "Each link type has a detection mechanism appropriate to whether loss of signal is visible",
      "BFD timers have been validated against platform scale and virtual-machine scheduling jitter",
      "Precomputed backup coverage has been measured, not assumed, for every protected link",
      "Edge routers with large tables use prefix-independent convergence",
      "Graceful restart and non-stop routing choices are made per node role",
      "Convergence has been tested under load, including micro-loop behaviour"
     ]
    },
    {
     "type": "reflection",
     "prompt": "For your most time-sensitive application, write down the convergence budget and estimate each of the four terms in your current network. Which term dominates?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Convergence",
       "def": "The process by which a network restores consistent forwarding after a topology change."
      },
      {
       "term": "BFD",
       "def": "Bidirectional Forwarding Detection: a lightweight hello protocol that detects path failures in milliseconds, independent of the routing protocol."
      },
      {
       "term": "SPF throttling",
       "def": "Timers that delay and back off shortest-path computations to balance fast reaction against stability."
      },
      {
       "term": "LFA",
       "def": "Loop-free alternate: a precomputed backup next hop that will not loop traffic back through the failed element."
      },
      {
       "term": "TI-LFA",
       "def": "Topology-independent loop-free alternate: a segment-routing technique that provides precomputed backup paths along the post-convergence path."
      },
      {
       "term": "Prefix-independent convergence",
       "def": "A FIB structure in which many prefixes share a next-hop object, so one update reroutes them all."
      },
      {
       "term": "Graceful restart",
       "def": "A mechanism in which neighbours keep forwarding through a restarting router while its control plane recovers."
      },
      {
       "term": "Non-stop routing",
       "def": "A mechanism in which a standby route processor keeps routing sessions alive so neighbours never see a restart."
      },
      {
       "term": "Micro-loop",
       "def": "A transient forwarding loop caused by routers updating their FIBs at slightly different times."
      }
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Core links run over a carrier Layer 2 service that keeps the local port up when the far end fails. Which detection approach fits best?",
       "options": [
        "BFD on the routed adjacency across the service",
        "Loss-of-signal detection on the local router port",
        "Longer routing dead intervals for added stability",
        "Graceful restart on the routers at both of the ends"
       ],
       "answer": 0,
       "explain": "The port stays up, so loss of signal never triggers. BFD tests the forwarding path end to end and detects the failure in milliseconds."
      },
      {
       "q": "An internet edge router carries a full routing table. Failover to a second upstream takes many seconds because every prefix must be reprogrammed. What addresses this?",
       "options": [
        "More aggressive BFD timers on both of the upstream sessions",
        "SPF throttle timers configured with a shorter initial wait",
        "Graceful restart helper mode enabled on both upstream peers",
        "Prefix-independent convergence with a precomputed backup path"
       ],
       "answer": 3,
       "explain": "The delay is in the FIB update term. Sharing a next-hop object lets one change move every affected prefix; faster detection or SPF tuning does not shrink FIB programming time."
      },
      {
       "q": "When is graceful restart most likely to be the better choice than fast detection and reroute?",
       "options": [
        "On a core router with three diverse paths to every destination",
        "On any link that already has a loop-free alternate installed",
        "On nodes whose topology is likely to change during a restart",
        "On a single-homed node where no alternative path exists"
       ],
       "answer": 3,
       "explain": "With no alternative path, preserving forwarding is the only way to avoid an outage during a control-plane restart. With redundant paths, rerouting around the node is usually safer."
      },
      {
       "q": "BFD is configured at 300 ms with a multiplier of 3. What is the approximate detection time?",
       "options": [
        "About 100 ms",
        "About 900 ms",
        "About 300 ms",
        "About 3 seconds"
       ],
       "answer": 1,
       "explain": "Detection time is the interval multiplied by the multiplier: 300 ms × 3 = 900 ms."
      },
      {
       "q": "What causes micro-loops during convergence?",
       "options": [
        "BFD sessions flapping because their timers are too aggressive",
        "Summarisation hiding the failed link from all remote areas",
        "Routers updating forwarding tables at slightly different times",
        "Graceful restart helpers holding stale routes for too long"
       ],
       "answer": 2,
       "explain": "Micro-loops are transient and arise from unsynchronised FIB updates between neighbours. Ordered updates or segment-routing avoidance techniques mitigate them."
      }
     ]
    }
   ]
  },
  {
   "id": "m5-l4",
   "title": "Maintenance & Change Design",
   "subtitle": "Most outages are self-inflicted — design the network so that change is routine and safe",
   "minutes": 24,
   "objectives": [
    "Design for maintenance so that planned work never reduces protection below target",
    "Use drain, cost-out and graceful shutdown techniques to remove traffic before work",
    "Structure change waves, canaries and verification to limit the blast radius of change"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Post-incident reviews across the industry keep finding the same pattern: a large share of major outages start with a planned change. Hardware is now reliable; people, pipelines and software updates are less so. A resilient design therefore treats **change as a failure mode** and gives operators safe, boring ways to take things out of service and put them back."
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "With N+1, taking one unit out for maintenance leaves zero spare. A failure elsewhere in that window is an outage. Either keep maintenance windows short and low-risk, design critical services for N+2, or schedule work so that the paired domain is never touched at the same time.",
     "title": "N+1 becomes N during maintenance"
    },
    {
     "type": "framework",
     "title": "Design-for-maintenance principles",
     "items": [
      {
       "label": "DM1",
       "title": "Drain before touch",
       "text": "Every device can be gracefully removed from the traffic path before any work starts, and the drain is verified by counters, not assumed."
      },
      {
       "label": "DM2",
       "title": "Independent halves",
       "text": "Paired systems can be upgraded one half at a time without depending on each other's software version."
      },
      {
       "label": "DM3",
       "title": "Small, ordered waves",
       "text": "Changes move through failure domains in a defined order: lab, canary, one domain, then the rest."
      },
      {
       "label": "DM4",
       "title": "Automated verification",
       "text": "Pre-checks and post-checks compare routing, forwarding and application health before and after each step."
      },
      {
       "label": "DM5",
       "title": "Fast, rehearsed rollback",
       "text": "Every change has a tested way back, and a clear trigger for using it."
      },
      {
       "label": "DM6",
       "title": "Maintenance is visible",
       "text": "Monitoring knows when a node is drained, so alerts reflect real risk instead of planned work."
      }
     ]
    },
    {
     "type": "table",
     "title": "Drain techniques by protocol",
     "head": [
      "Protocol / layer",
      "Drain technique",
      "Effect",
      "Design note"
     ],
     "rows": [
      [
       "OSPF",
       "Advertise maximum metric for transit links",
       "Router stays reachable but is used only as a last resort",
       "Also useful on start-up so traffic arrives only after the FIB is ready"
      ],
      [
       "IS-IS",
       "Set the overload bit",
       "Router is not used for transit by other routers",
       "A similar on-start-up option exists"
      ],
      [
       "BGP",
       "Graceful shutdown community, lower local preference or prepend",
       "Peers prefer alternative paths before the session is closed",
       "Needs receivers to honour the community — agree it in peering policy"
      ],
      [
       "First-hop redundancy",
       "Lower priority so the peer becomes active",
       "Hosts move to the other gateway without changing configuration",
       "Check preemption behaviour before and after"
      ],
      [
       "Link aggregation / fabric",
       "Shut member links or put a leaf into maintenance mode",
       "Traffic shifts to remaining members or leaves",
       "Confirm the survivors stay under the survivable ceiling"
      ]
     ]
    },
    {
     "type": "cli",
     "title": "Draining a node before maintenance",
     "device": "R2 · IOS-style CLI",
     "lines": [
      "! Link-state: stop being a transit path",
      "router ospf 10",
      " max-metric router-lsa on-startup 300",
      " max-metric router-lsa",
      "!",
      "! BGP: signal graceful shutdown to peers (well-known community 65535:0)",
      "ip bgp-community new-format",
      "route-map DRAIN-OUT permit 10",
      " set community 65535:0 additive",
      "router bgp 65001",
      " neighbor 192.0.2.1 route-map DRAIN-OUT out"
     ],
     "note": "The on-startup option keeps the router out of the transit path for 300 seconds after a reload, so traffic is not attracted before the forwarding table is complete. Peers must map the graceful-shutdown community to a low local preference for the BGP drain to work."
    },
    {
     "type": "compare",
     "title": "In-service software upgrade versus rolling upgrade",
     "columns": [
      {
       "title": "In-service upgrade on a redundant chassis",
       "items": [
        "Upgrades one route processor at a time while forwarding continues",
        "Attractive where a chassis is a single point of attachment",
        "Complex process with its own failure modes; supported upgrade paths are narrow",
        "Still one device and one software failure domain"
       ]
      },
      {
       "title": "Rolling upgrade across independent devices",
       "items": [
        "Drain one device, upgrade, verify, return to service, repeat",
        "Simple, testable, works with any platform",
        "Needs genuine path redundancy and the capacity to run on N",
        "Mixed versions run side by side for a while — check interoperability"
       ]
      }
     ]
    },
    {
     "type": "steps",
     "title": "A change-wave design",
     "items": [
      {
       "title": "Lab and digital twin",
       "text": "Validate the change and the rollback against a model of the production topology."
      },
      {
       "title": "Canary",
       "text": "Apply to one low-impact device or site with full monitoring; hold for a defined soak time."
      },
      {
       "title": "First failure domain",
       "text": "Apply to one cell, region or pod; compare health indicators against untouched domains."
      },
      {
       "title": "Remaining domains in order",
       "text": "Roll forward domain by domain, never touching both halves of a redundant pair in the same wave."
      },
      {
       "title": "Close",
       "text": "Confirm the estate is consistent, update the source of truth and record lessons."
      }
     ]
    },
    {
     "type": "scenario",
     "title": "The upgrade weekend",
     "situation": "A university core has two routers in an active/active pair, each running at 40% of capacity. A security advisory requires a software upgrade on both. The operations lead proposes upgrading both routers in the same two-hour window 'to get it over with'.",
     "options": [
      {
       "text": "Approve; the pair is redundant, so one router will always be up.",
       "feedback": "Upgrading both in one window puts both in the same operational failure domain. A bad image or a stuck upgrade on the second router leaves no path.",
       "best": false
      },
      {
       "text": "Postpone the upgrade until a spare chassis can be bought and pre-staged.",
       "feedback": "Pre-staging can help, but delaying a security fix to buy hardware is unnecessary when a safe rolling procedure exists.",
       "best": false
      },
      {
       "text": "Upgrade both at once but with the supplier's support engineer on the call.",
       "feedback": "Expert help shortens troubleshooting but does not remove the shared failure domain created by touching both halves together.",
       "best": false
      },
      {
       "text": "Drain and upgrade one router, soak it under production traffic for an agreed period, then drain and upgrade the other in a later window.",
       "feedback": "Best. Each step leaves an untouched, known-good path, the survivor stays within capacity, and the soak period exposes defects before the second half is touched.",
       "best": true
      }
     ]
    },
    {
     "type": "callout",
     "kind": "insight",
     "text": "Some services — hospitals, payment switches, emergency networks — have no acceptable maintenance window. That requirement pushes the design towards independent halves, rolling procedures and capacity that can run on N for long periods. Capture it in requirements, because it changes topology and budget.",
     "title": "Maintenance windows are a design input"
    },
    {
     "type": "checklist",
     "title": "Change-safety design checklist",
     "items": [
      "Every device role has a documented, tested drain procedure",
      "Survivors can carry full load while any one device is drained",
      "Paired devices can run different software versions temporarily",
      "Change waves are aligned with failure domains, starting with a canary",
      "Pre-checks and post-checks are automated and compare against a baseline",
      "Rollback is rehearsed and has a measurable trigger",
      "Monitoring suppresses noise for drained nodes but still alerts on new risk"
     ]
    },
    {
     "type": "reflection",
     "prompt": "Think of the last change that caused an incident in your environment. Which of the six design-for-maintenance principles would have prevented or contained it?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Drain",
       "def": "Gracefully moving traffic away from a device or link before work so that removing it causes no loss."
      },
      {
       "term": "Overload bit",
       "def": "An IS-IS flag that tells other routers not to use the sender for transit traffic."
      },
      {
       "term": "Max-metric",
       "def": "An OSPF technique that advertises the highest metric on transit links so other routers avoid the sender."
      },
      {
       "term": "Graceful shutdown community",
       "def": "A well-known BGP community (65535:0) that asks receivers to lower the preference of routes before a session closes."
      },
      {
       "term": "Canary",
       "def": "The first small target of a change, monitored closely before the change spreads."
      },
      {
       "term": "Change wave",
       "def": "An ordered group of devices or domains that receives a change together."
      },
      {
       "term": "Rolling upgrade",
       "def": "Upgrading members of a redundant system one at a time while the others carry traffic."
      },
      {
       "term": "Soak time",
       "def": "A deliberate waiting period after a change, under production load, before proceeding."
      }
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Why is OSPF max-metric configured with an on-startup option?",
       "options": [
        "So a reloaded router attracts transit traffic only once its FIB is ready",
        "So the router never carries any transit traffic again after the reload completes",
        "So BFD sessions are negotiated before any OSPF adjacency is formed",
        "So the router's loopback stays unreachable for the whole upgrade"
       ],
       "answer": 0,
       "explain": "The on-startup option advertises maximum metric for a period after boot, preventing black-holing while BGP and the FIB are still converging. The router still becomes a normal transit path afterwards."
      },
      {
       "q": "A service uses N+1 redundancy and has no acceptable maintenance window. What design change follows?",
       "options": [
        "Remove redundancy and rely on fast replacement of failed spares instead",
        "Switch from active/active to active/standby so maintenance becomes simpler to plan",
        "Move to N+2 or independent halves so maintenance never removes the last spare",
        "Increase BFD timers so that maintenance work never triggers failovers"
       ],
       "answer": 2,
       "explain": "During maintenance N+1 becomes N, so a further failure is an outage. A service that can never be at risk needs additional redundancy or fully independent halves."
      },
      {
       "q": "What makes a BGP graceful-shutdown drain effective?",
       "options": [
        "Peers honour the community by lowering local preference before the session closes",
        "The local router withdraws every prefix at once, just before closing the session itself",
        "The graceful-restart capability is negotiated on every BGP session first",
        "BFD is disabled on the session so that the shutdown is never detected"
       ],
       "answer": 0,
       "explain": "The community only signals intent. Peers must act on it, typically by setting a very low local preference, so they move traffic to alternatives while the path still exists."
      },
      {
       "q": "Which change sequence best limits the blast radius of a fleet-wide software upgrade?",
       "options": [
        "All core devices first, because they are the most redundant part of the network",
        "All devices in one window, so the network spends as little time as possible on mixed versions",
        "Alphabetical device order, so the sequence is easy for operators to audit later",
        "Lab, canary, one failure domain, then the rest — never both halves of a pair together"
       ],
       "answer": 3,
       "explain": "Ordering by failure domain with an early canary exposes defects while impact is small and always leaves a known-good path."
      },
      {
       "q": "An active/active pair runs at 40% each. What does that mean for a rolling upgrade?",
       "options": [
        "Neither member can be drained because the pair is above its survivable ceiling",
        "One member can be drained safely because the survivor stays within capacity",
        "The pair must be converted to active/standby before any upgrade can begin",
        "Both members must be upgraded together to avoid running mixed versions"
       ],
       "answer": 1,
       "explain": "At 40% each, the survivor carries 80% when its partner is drained, which is within capacity. Above 50% each, a drain would overload the survivor."
      }
     ]
    }
   ]
  },
  {
   "id": "m5-l5",
   "title": "Disaster Recovery Design",
   "subtitle": "Design for the day a whole site is gone: RPO, RTO and the network that makes them real",
   "minutes": 28,
   "objectives": [
    "Translate RPO and RTO into network requirements for replication and failover",
    "Compare DR patterns and the network mechanisms that move users to a surviving site",
    "Avoid split-brain and stretched-Layer-2 traps in multi-site designs"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "High availability handles component failures inside a site. **Disaster recovery** assumes the site itself is gone — fire, flood, power, regional outage, ransomware — and asks how quickly service returns elsewhere and how much data is lost. The network is often the hardest part of DR: replication needs bandwidth and latency guarantees, and users must find the surviving site without manual reconfiguration."
    },
    {
     "type": "callout",
     "kind": "definition",
     "text": "**Recovery point objective (RPO)** is the maximum acceptable data loss, measured in time: an RPO of 5 minutes means losing up to the last 5 minutes of transactions is tolerable. **Recovery time objective (RTO)** is the maximum acceptable time to restore service after a declared disaster. RPO drives replication design; RTO drives failover design.",
     "title": "RPO and RTO"
    },
    {
     "type": "table",
     "title": "DR patterns",
     "head": [
      "Pattern",
      "Typical RPO",
      "Typical RTO",
      "Network implications"
     ],
     "rows": [
      [
       "Backup and restore",
       "Hours to a day",
       "Hours to days",
       "Bulk transfer bandwidth; DR network can be built on demand"
      ],
      [
       "Pilot light",
       "Minutes",
       "Hours",
       "Core data replicated continuously; network at DR site pre-built but scaled down"
      ],
      [
       "Warm standby",
       "Seconds to minutes",
       "Minutes to an hour",
       "Full network ready, asynchronous replication, tested failover of addressing and DNS"
      ],
      [
       "Active/active (multi-site)",
       "Near zero",
       "Near zero to minutes",
       "Both sites serve users; global load balancing, state replication and careful latency budgets"
      ]
     ]
    },
    {
     "type": "formula",
     "title": "Replication and distance",
     "items": [
      {
       "name": "Propagation delay in fibre",
       "expr": "One-way delay ≈ 5 µs per km of fibre path",
       "meaning": "100 km of fibre route adds about 1 ms round trip — before any equipment or queuing delay. Fibre routes are usually longer than the straight-line distance."
      },
      {
       "name": "Synchronous write penalty",
       "expr": "Write latency ≈ local write + round-trip time to the remote site",
       "meaning": "Every committed write waits for the remote acknowledgement, so distance directly slows the application."
      },
      {
       "name": "Replication bandwidth",
       "expr": "Required rate ≥ peak change rate × (1 + protocol overhead)",
       "meaning": "Size for the peak change rate, not the average, or the replication lag — and the effective RPO — grows during busy periods."
      }
     ]
    },
    {
     "type": "compare",
     "title": "Synchronous versus asynchronous replication",
     "columns": [
      {
       "title": "Synchronous",
       "items": [
        "RPO near zero: writes commit at both sites",
        "Practical only over short distances, often metro scale",
        "Both sites typically share a regional risk",
        "Link latency and jitter directly affect application performance"
       ]
      },
      {
       "title": "Asynchronous",
       "items": [
        "RPO equals replication lag: seconds to minutes",
        "Works across long distances and different regions",
        "Gives true geographic separation",
        "Lag must be monitored; a burst of changes can widen it"
       ]
      }
     ]
    },
    {
     "type": "table",
     "title": "Moving users to the surviving site",
     "head": [
      "Mechanism",
      "How it works",
      "Strengths",
      "Weaknesses"
     ],
     "rows": [
      [
       "DNS / global server load balancing",
       "Health-checked answers point clients to the live site",
       "Works across any distance; application-aware",
       "Caching and client behaviour delay the switch; TTLs must be designed"
      ],
      [
       "Route advertisement (anycast or prefix move)",
       "The surviving site advertises the service prefix",
       "Fast, transparent to clients, no DNS dependency",
       "Needs portable addressing and careful health-to-route coupling"
      ],
      [
       "Stretched Layer 2 with the same subnet",
       "Workloads keep IP addresses at the other site",
       "No re-addressing",
       "Joins both sites into one failure domain; split-brain and traffic tromboning risks"
      ],
      [
       "Re-addressing with automation",
       "Workloads come up with DR-site addresses; DNS updated",
       "Clean separation of sites",
       "Requires disciplined automation and applications without hard-coded addresses"
      ]
     ]
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "When two sites lose contact with each other but both remain up, each may believe the other has failed and become active. With stateful systems that means two primaries accepting conflicting writes. Use a **witness or quorum at a third location** with independent connectivity, and decide in advance which site wins when the inter-site link fails.",
     "title": "Split-brain"
    },
    {
     "type": "callout",
     "kind": "insight",
     "text": "Extending a VLAN between two data centres makes mobility easy but merges both sites into one Layer 2 failure domain. A loop, a storm or a control-plane bug can take down both — the exact event DR exists to survive. If adjacency is unavoidable, contain it with an overlay, strict flooding controls and per-site gateways, and keep it to the applications that truly need it.",
     "title": "Stretched Layer 2 is not DR"
    },
    {
     "type": "case",
     "title": "National payment switch HA redesign",
     "context": "A national payment switch connects 40 banks and processes card and instant-payment transactions. The regulator requires **99.99% monthly availability**, an **RPO of zero for committed transactions** and an **RTO of 15 minutes** for a full site loss. Today everything runs in one data centre: a single firewall cluster in one rack, dual core switches, and bank connections arriving over one carrier's MPLS service with two circuits per bank. A secondary site 35 km away holds nightly backups. Last year a power-distribution fault in the main hall caused a 70-minute outage, and a carrier exchange fire cut 18 banks off for six hours.",
     "questions": [
      "Identify the main failure domains and shared-fate risks in the current design.",
      "Which DR pattern and replication mode satisfy the RPO and RTO, and is the 35 km site suitable?",
      "How should bank connectivity be redesigned?",
      "How will banks reach the surviving site after a disaster?"
     ],
     "answer": "**Failure domains:** the whole service is one site (power, hall, firewall rack), one carrier (both circuits per bank shared an exchange), and one firewall cluster (software and human common mode). A single 70-minute outage already exceeds the roughly 4.3 minutes a month that 99.99% allows. **DR pattern:** an RPO of zero needs synchronous replication; at 35 km (perhaps 50 km of fibre route) the round trip is about half a millisecond, so synchronous replication is feasible. Move to **two live sites with synchronous data replication** — active/standby for the transaction core, active/active for stateless front ends — with a quorum witness at a third location to prevent split-brain. A 35 km pair shares regional risks, so keep an **asynchronous copy at a distant third site** for regional disasters, with a documented, longer RTO and non-zero RPO agreed with the regulator. **Bank connectivity:** each bank gets two circuits from **two carriers**, one terminating at each site, with physical diversity verified to the building; BGP with BFD towards each bank, and graceful-shutdown policy agreed for maintenance. **Firewalls:** independent clusters per site, changed through a staged pipeline. **Finding the service:** the switch's service prefixes are advertised from the active site and withdrawn automatically by health checks, so banks follow routing without a DNS dependency; failover is rehearsed at least twice a year under load."
    },
    {
     "type": "scenario",
     "title": "RPO zero across 600 km?",
     "situation": "A bank wants an RPO of zero and a DR site 600 km away to survive regional disasters. The application team asks for synchronous replication between the sites.",
     "options": [
      {
       "text": "Approve synchronous replication; modern links make 600 km fast enough.",
       "feedback": "600 km of fibre route adds at least about 6 ms of round trip per write before any equipment delay. Many transactional systems cannot absorb that on every commit.",
       "best": false
      },
      {
       "text": "Use asynchronous replication to the far site and record the RPO as zero.",
       "feedback": "Asynchronous replication cannot guarantee zero data loss. Recording a false RPO hides the risk from the business.",
       "best": false
      },
      {
       "text": "Stretch a VLAN to the far site so the database cluster can fail over transparently.",
       "feedback": "Stretching Layer 2 does not change physics, and it merges both sites into one failure domain.",
       "best": false
      },
      {
       "text": "Use a near site for synchronous replication and a far site for asynchronous replication, and agree a non-zero RPO for the regional-disaster case.",
       "feedback": "Best. It gives zero data loss for the common site-level event and geographic protection for the rare regional event, with an honest, documented trade-off.",
       "best": true
      }
     ]
    },
    {
     "type": "template",
     "title": "DR network requirements sheet",
     "purpose": "Capture, per service, the recovery targets and the network mechanisms that must deliver them, so that replication, addressing and failover are designed together.",
     "columns": [
      "Service",
      "RPO / RTO",
      "Replication mode & bandwidth",
      "Inter-site latency limit",
      "User redirection method",
      "Split-brain control",
      "Last DR test"
     ],
     "example": [
      [
       "Card authorisation",
       "0 / 15 min",
       "Synchronous, 2 × 10G diverse",
       "< 2 ms RTT",
       "Prefix advertised from active site",
       "Witness at third site",
       "March — passed in 11 min"
      ]
     ],
     "rows": 6
    },
    {
     "type": "checklist",
     "title": "DR design checklist",
     "items": [
      "RPO and RTO are agreed per service and signed off by the business",
      "Replication mode is consistent with distance and latency limits",
      "Replication bandwidth is sized for peak change rate, with lag monitored",
      "A third-location witness or quorum prevents split-brain",
      "User and partner redirection does not depend on manual changes",
      "DNS TTLs and client behaviour are tested for the failover path",
      "DR is rehearsed under realistic load at least annually"
     ]
    },
    {
     "type": "reflection",
     "prompt": "If your primary site disappeared at 10:00 tomorrow, what would be the first thing users noticed, and how long would it take them to reach the surviving site?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "RPO",
       "def": "Recovery point objective: the maximum tolerable data loss, expressed as a period of time."
      },
      {
       "term": "RTO",
       "def": "Recovery time objective: the maximum tolerable time to restore service after a disaster."
      },
      {
       "term": "Synchronous replication",
       "def": "Replication in which a write is acknowledged only after it is stored at both sites."
      },
      {
       "term": "Asynchronous replication",
       "def": "Replication in which writes are acknowledged locally and copied to the remote site afterwards."
      },
      {
       "term": "Split-brain",
       "def": "A condition in which isolated sites both act as primary, producing conflicting state."
      },
      {
       "term": "Witness / quorum",
       "def": "A third-party vote that decides which site remains active when the sites lose contact."
      },
      {
       "term": "Global server load balancing",
       "def": "Health-aware DNS that directs clients to the best available site."
      },
      {
       "term": "Warm standby",
       "def": "A DR pattern with a fully built but scaled-down secondary environment ready to take load."
      }
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "A service needs an RPO of zero. What does that require of replication?",
       "options": [
        "Asynchronous replication with lag alerting thresholds",
        "Nightly backups copied to a site with integrity checks",
        "A stretched VLAN so the database cluster can fail over",
        "Synchronous replication, which constrains site distance"
       ],
       "answer": 3,
       "explain": "Only synchronous replication guarantees that committed data exists at both sites. The latency penalty limits practical distance."
      },
      {
       "q": "Approximately how much round-trip delay does 100 km of fibre path add?",
       "options": [
        "About 0.1 ms",
        "About 10 ms",
        "About 1 ms",
        "About 5 ms"
       ],
       "answer": 2,
       "explain": "Light in fibre travels at roughly 5 µs per km one way, so 100 km is about 0.5 ms one way and 1 ms round trip."
      },
      {
       "q": "What is the primary purpose of a witness at a third site?",
       "options": [
        "To decide which site stays active when the two sites lose contact",
        "To hold a third copy of all replicated data for use in regional disasters",
        "To balance user load evenly between both of the active sites",
        "To add replication bandwidth during peak business periods"
       ],
       "answer": 0,
       "explain": "A witness breaks ties so that only one site becomes primary, preventing split-brain."
      },
      {
       "q": "Why is a stretched Layer 2 domain a weak foundation for disaster recovery?",
       "options": [
        "It prevents asynchronous replication from working",
        "It merges both sites into a single failure domain",
        "It forces every application to change IP addresses",
        "It limits sites to under 10 km apart in practice"
       ],
       "answer": 1,
       "explain": "DR depends on the sites failing independently. A shared broadcast domain lets a single loop or bug affect both."
      },
      {
       "q": "Partners must reach the DR site without depending on DNS caches. Which mechanism fits?",
       "options": [
        "Lowering DNS record TTLs to one minute for every service",
        "Advertising the service prefix from the surviving site",
        "Emailing a new DR-site address to every partner in turn",
        "A stretched VLAN so that clients keep the same gateways"
       ],
       "answer": 1,
       "explain": "Moving the route moves traffic regardless of client DNS caching. Low TTLs help but many clients ignore them, and the other options need manual action or create shared fate."
      }
     ]
    }
   ]
  }
 ]
});
TRACK.modules.push({
 "id": "m6",
 "order": 6,
 "code": "Secure",
 "title": "Security & Segmentation Design",
 "subtitle": "Zero trust, segmentation, enforcement placement, identity, encryption, compliance and visibility",
 "outcomes": [
  "Apply zero-trust principles and combine macro- and micro-segmentation into a coherent plan",
  "Place enforcement points and design secure edges and DMZs that fail safely",
  "Design identity-driven access and choose between MACsec, IPsec and TLS",
  "Use segmentation to reduce regulatory scope and prove isolation",
  "Design a visibility architecture that security operations can actually use"
 ],
 "lessons": [
  {
   "id": "m6-l1",
   "title": "Zero-Trust Principles & Segmentation Strategy",
   "subtitle": "Stop trusting location — design access around identity, context and containment",
   "minutes": 28,
   "objectives": [
    "Apply zero-trust design principles and the logical architecture of NIST SP 800-207",
    "Choose between macro- and micro-segmentation and combine them coherently",
    "Plan a segmentation programme that moves from observation to enforcement safely"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "The traditional perimeter model trusted anything inside the firewall. Once an attacker landed on one laptop or one unpatched server, the flat internal network let them move sideways to the crown jewels. Ransomware has turned that design flaw into a board-level risk. **Zero trust** is the design response: no implicit trust based on network location, every access decision made per request from identity, device state and context, and every resource protected as if the network around it were hostile."
    },
    {
     "type": "callout",
     "kind": "definition",
     "text": "NIST SP 800-207 describes zero trust as a set of principles in which access to each resource is granted **per session**, based on **dynamic policy** that considers the identity of the subject, the state of the device and other context, with **no implicit trust** granted because of network location. For a network designer, it means the network still matters — it carries policy, enforces boundaries and provides telemetry — but it is no longer the sole source of trust.",
     "title": "Zero trust in design terms"
    },
    {
     "type": "framework",
     "title": "ZCDE zero-trust design principles",
     "items": [
      {
       "label": "ZT1",
       "title": "Verify explicitly",
       "text": "Every access decision uses identity, device posture and context — not just a source subnet."
      },
      {
       "label": "ZT2",
       "title": "Least privilege per session",
       "text": "Grant the narrowest access that lets the task succeed, for as long as it is needed."
      },
      {
       "label": "ZT3",
       "title": "Assume breach",
       "text": "Design so that a compromised host can reach as little as possible; containment is a primary requirement."
      },
      {
       "label": "ZT4",
       "title": "Protect resources, not segments",
       "text": "Policy follows the workload or data, wherever it runs — campus, data centre or cloud."
      },
      {
       "label": "ZT5",
       "title": "Evaluate continuously",
       "text": "Re-assess trust when posture, behaviour or risk signals change, and be able to revoke access mid-session."
      },
      {
       "label": "ZT6",
       "title": "Telemetry feeds policy",
       "text": "Logs, flows and identity events are designed in from day one so policy can be built, tuned and audited."
      }
     ]
    },
    {
     "type": "layers",
     "title": "Zero-trust logical architecture (after NIST SP 800-207)",
     "items": [
      {
       "label": "Policy decision point",
       "parts": [
        "Policy engine: decides grant, deny or revoke",
        "Policy administrator: establishes or tears down the session path"
       ]
      },
      {
       "label": "Policy enforcement points",
       "parts": [
        "Switch or wireless edge, firewall, gateway, proxy",
        "Host agent, service-mesh sidecar, cloud security group"
       ]
      },
      {
       "label": "Subjects and resources",
       "parts": [
        "Users, devices, workloads and services requesting access",
        "Applications, data and infrastructure being protected"
       ]
      },
      {
       "label": "Signal sources",
       "parts": [
        "Identity provider and directory",
        "Device inventory and posture",
        "Threat intelligence, activity logs, PKI, compliance data"
       ]
      }
     ]
    },
    {
     "type": "compare",
     "title": "Macro- versus micro-segmentation",
     "columns": [
      {
       "title": "Macro-segmentation",
       "items": [
        "Separates large zones: users, servers, OT, guests, partners, management",
        "Usually virtual routing instances or virtual networks with firewalls between them",
        "Coarse, stable, easy to explain to auditors",
        "Does not stop lateral movement inside a zone"
       ]
      },
      {
       "title": "Micro-segmentation",
       "items": [
        "Separates groups or individual workloads inside a zone",
        "Enforced by group tags, distributed firewalls, host agents or cloud security groups",
        "Directly limits lateral movement and ransomware spread",
        "Needs accurate flow knowledge and strong operational tooling"
       ]
      }
     ]
    },
    {
     "type": "table",
     "title": "Segmentation approaches — decision matrix",
     "head": [
      "Approach",
      "Granularity",
      "Enforcement point",
      "Operational load",
      "Best fit"
     ],
     "rows": [
      [
       "Virtual routing instance / virtual network per zone",
       "Zone",
       "Inter-zone firewall",
       "Low to medium",
       "Macro boundaries, compliance zones, multi-tenant separation"
      ],
      [
       "VLAN plus access lists",
       "Subnet",
       "Gateway or switch",
       "High at scale; IP-based rules drift",
       "Small, stable environments"
      ],
      [
       "Identity group tags",
       "Group of users or devices",
       "Access switch, wireless, fabric edge, firewall",
       "Medium; needs identity integration",
       "Campus and branch user and device segmentation"
      ],
      [
       "Distributed or host-based firewall",
       "Workload",
       "Hypervisor or host agent",
       "Medium to high; agent lifecycle",
       "Data-centre east-west, application tiers"
      ],
      [
       "Cloud security groups",
       "Workload or interface",
       "Cloud fabric",
       "Low per rule, high at sprawl",
       "Cloud-native workloads"
      ],
      [
       "Service mesh with mutual TLS",
       "Service identity",
       "Sidecar or node proxy",
       "High; platform skills",
       "Container platforms with many microservices"
      ]
     ]
    },
    {
     "type": "steps",
     "title": "A segmentation programme that does not break the business",
     "items": [
      {
       "title": "Classify",
       "text": "Inventory assets and data, and classify them by sensitivity, criticality and regulatory scope."
      },
      {
       "title": "Observe",
       "text": "Collect flow and identity telemetry for long enough to see monthly and quarterly cycles."
      },
      {
       "title": "Define macro zones",
       "text": "Draw zones by trust level and compliance scope; put firewalls or policy boundaries between them."
      },
      {
       "title": "Define groups",
       "text": "Within each zone, group workloads and users by role or application tier."
      },
      {
       "title": "Write the policy matrix",
       "text": "Start from default deny between groups and add only observed, justified flows with an owner."
      },
      {
       "title": "Monitor, then enforce",
       "text": "Run policy in log-only mode, fix gaps, then enforce group by group with rollback ready."
      },
      {
       "title": "Review",
       "text": "Re-certify rules on a schedule; remove flows that no longer have an owner."
      }
     ]
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "Switching on default-deny micro-segmentation without flow discovery is the fastest way to discredit a zero-trust programme. Month-end batch jobs, backup agents and licence servers will break first. Discover, model, monitor, then enforce — and start with the groups whose flows you understand best.",
     "title": "The big-bang deny"
    },
    {
     "type": "scenario",
     "title": "A flat manufacturing plant",
     "situation": "A manufacturer runs office PCs, engineering workstations and production controllers on one flat network. A ransomware outbreak at a peer company has alarmed the board. Many controllers run old operating systems that cannot take agents and must not be patched without the machine builder's approval. You have six months for a first phase.",
     "options": [
      {
       "text": "Deploy host-based micro-segmentation agents on every device, including controllers, in one programme.",
       "feedback": "Agents cannot run on many controllers, and a single programme across IT and OT is too risky for six months.",
       "best": false
      },
      {
       "text": "Separate OT from IT with a firewalled industrial DMZ, allow only brokered flows between them, then segment OT internally by production cell using network enforcement.",
       "feedback": "Best. It delivers the largest risk reduction first, needs nothing on fragile controllers, and creates a foundation for finer segmentation later.",
       "best": true
      },
      {
       "text": "Buy a next-generation antivirus product for all office PCs and leave the network unchanged.",
       "feedback": "Endpoint protection helps but does nothing for devices that cannot run it, and the flat network still lets an infection spread to production.",
       "best": false
      },
      {
       "text": "Put every controller on its own VLAN with a full IP access list on the core switch.",
       "feedback": "Hundreds of IP-based rules on one core device are hard to operate and do not address the IT-to-OT boundary that matters most.",
       "best": false
      }
     ]
    },
    {
     "type": "callout",
     "kind": "insight",
     "text": "No single purchase delivers zero trust. It emerges from identity, device health, enforcement points, telemetry and process working together. A useful design test: if an attacker owns one host in any zone tomorrow, what can that host reach, and how quickly would you know?",
     "title": "Zero trust is a design property, not a product"
    },
    {
     "type": "checklist",
     "title": "Zero-trust segmentation checklist",
     "items": [
      "Assets and data are classified by sensitivity and regulatory scope",
      "Macro zones are defined and enforced at stateful boundaries",
      "Micro-segmentation targets the highest-risk lateral paths first",
      "Policy is written in terms of identities and groups, not only IP addresses",
      "Flows were observed before enforcement, across business cycles",
      "Every allowed flow has an owner and a review date",
      "Telemetry from enforcement points reaches security operations"
     ]
    },
    {
     "type": "reflection",
     "prompt": "If one user laptop in your network were compromised right now, list the systems it could reach. Which one of those paths would you close first, and with what enforcement point?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Zero trust",
       "def": "A security model that grants access per session based on identity, device state and context, with no implicit trust from network location."
      },
      {
       "term": "Policy decision point",
       "def": "The logical component that evaluates policy and decides whether access is granted, denied or revoked."
      },
      {
       "term": "Policy enforcement point",
       "def": "The component in the traffic path that enables, monitors and terminates connections as instructed by the decision point."
      },
      {
       "term": "Macro-segmentation",
       "def": "Separation of large trust zones, typically with virtual routing instances and inter-zone firewalls."
      },
      {
       "term": "Micro-segmentation",
       "def": "Fine-grained separation of groups or individual workloads inside a zone to limit lateral movement."
      },
      {
       "term": "Lateral movement",
       "def": "An attacker's progression from an initially compromised host to other systems inside the network."
      },
      {
       "term": "Group tag",
       "def": "A label carried with traffic or bound to an endpoint that lets policy be written by group rather than by IP address."
      },
      {
       "term": "Default deny",
       "def": "A policy stance in which anything not explicitly permitted is blocked."
      }
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Which statement best captures the network designer's role in a zero-trust architecture?",
       "options": [
        "The network is no longer relevant because all trust decisions move into the applications",
        "The network grants full trust to any host that sits inside a properly firewalled internal network zone",
        "The network must encrypt every single packet, which makes segmentation unnecessary",
        "The network carries and enforces policy and supplies telemetry, but is not the source of trust"
       ],
       "answer": 3,
       "explain": "Zero trust removes implicit trust from location, but enforcement points and telemetry in the network remain essential parts of the architecture."
      },
      {
       "q": "What is the main limitation of macro-segmentation on its own?",
       "options": [
        "It does not stop lateral movement inside a zone",
        "It cannot be enforced with stateful firewalls",
        "It requires agents on every single workload",
        "It is impossible to explain to auditors simply"
       ],
       "answer": 0,
       "explain": "Macro zones contain movement between zones, but hosts inside the same zone can still reach each other unless micro-segmentation is added."
      },
      {
       "q": "A team plans to enable default-deny between all application groups next weekend. Flow data has not been collected. What should the designer recommend?",
       "options": [
        "Proceed as planned, because default deny is the core principle that defines a zero-trust design",
        "Enable default deny only on weekdays so that weekend batch jobs are not affected",
        "Collect flows across business cycles, run policy in log-only mode, then enforce in stages",
        "Replace the plan with a single perimeter firewall rule set that is easier to audit"
       ],
       "answer": 2,
       "explain": "Enforcing without flow discovery breaks legitimate traffic and undermines the programme. Observation and monitor mode make enforcement safe."
      },
      {
       "q": "In the NIST SP 800-207 model, which component actually allows or terminates the connection in the data path?",
       "options": [
        "The policy engine in the decision point",
        "The identity provider",
        "The policy enforcement point",
        "The threat-intel feed"
       ],
       "answer": 2,
       "explain": "The policy engine decides and the administrator instructs, but the enforcement point in the data path enables or terminates the connection."
      },
      {
       "q": "Which segmentation approach fits production controllers that cannot run software agents?",
       "options": [
        "Network-based enforcement such as zone firewalls or group policy at the switch",
        "Host-based firewall agents installed on every controller in the plant",
        "Service mesh sidecars with mutual TLS between all of the controllers",
        "Antivirus software paired with daily vulnerability scanning of every plant controller"
       ],
       "answer": 0,
       "explain": "When the endpoint cannot be changed, enforcement must sit in the network around it."
      }
     ]
    }
   ]
  },
  {
   "id": "m6-l2",
   "title": "Enforcement Placement, Secure Edge & DMZ Patterns",
   "subtitle": "Put policy where it protects most and costs least, and build edges that fail safely",
   "minutes": 28,
   "objectives": [
    "Decide where to place enforcement for north-south and east-west traffic",
    "Compare DMZ patterns and secure internet-edge layering",
    "Avoid stateful-inspection pitfalls such as asymmetric paths and hairpinning"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Every security control sits somewhere in the traffic path, and its location decides what it can see, what it costs and what breaks when it fails. Centralised enforcement is simple to audit but can become a bottleneck and a single failure domain. Distributed enforcement scales and stays close to the resource, but is harder to operate. The expert answer is almost always a deliberate mix, chosen per traffic pattern."
    },
    {
     "type": "compare",
     "title": "Centralised, distributed and cloud-delivered enforcement",
     "columns": [
      {
       "title": "Centralised firewalls",
       "items": [
        "All inter-zone traffic hairpins through a firewall cluster",
        "One place to audit and log",
        "Throughput, latency and failure-domain concerns at scale",
        "Natural fit for macro boundaries and compliance zones"
       ]
      },
      {
       "title": "Distributed enforcement",
       "items": [
        "Policy applied at the access edge, fabric leaf, hypervisor or host",
        "Scales with the network; no hairpin",
        "Many enforcement points to keep consistent",
        "Natural fit for east-west micro-segmentation"
       ]
      },
      {
       "title": "Cloud-delivered security edge",
       "items": [
        "Users connect to nearby service points that apply web, data and access policy",
        "Consistent policy for remote and branch users without backhaul",
        "Depends on the provider's availability and points of presence",
        "Natural fit for internet access and private-application access for mobile users"
       ]
      }
     ]
    },
    {
     "type": "table",
     "title": "Enforcement placement — decision matrix",
     "head": [
      "Placement",
      "Sees",
      "Strengths",
      "Weaknesses",
      "Use when"
     ],
     "rows": [
      [
       "Internet perimeter",
       "North-south traffic",
       "Clear choke point, mature tooling",
       "Blind to internal movement",
       "Always, as one layer among several"
      ],
      [
       "Data-centre zone firewall",
       "Traffic between zones",
       "Stateful inspection, compliance evidence",
       "Hairpin cost and capacity",
       "Between macro zones and around regulated data"
      ],
      [
       "Access or fabric edge (group policy)",
       "Traffic as it enters the network",
       "Stops threats before they travel",
       "Needs identity integration",
       "Campus, branch and fabric east-west"
      ],
      [
       "Host or hypervisor",
       "Every flow to and from the workload",
       "Follows the workload anywhere",
       "Agent lifecycle; compromised host may disable it",
       "Application tiers, cloud and hybrid workloads"
      ],
      [
       "Application or API gateway",
       "Requests, users and tokens",
       "Understands the application protocol",
       "Only protects what is published through it",
       "Exposed web services and partner APIs"
      ]
     ]
    },
    {
     "type": "layers",
     "title": "Secure internet-edge layering (outside first)",
     "items": [
      {
       "label": "Upstream protection",
       "parts": [
        "Provider-based volumetric DDoS scrubbing",
        "Remotely triggered black-hole as a last resort"
       ]
      },
      {
       "label": "Edge routing",
       "parts": [
        "Diverse upstreams with BGP",
        "Anti-spoofing ingress filters",
        "Prefix limits and route filtering"
       ]
      },
      {
       "label": "Edge firewall",
       "parts": [
        "Stateful policy for inbound and outbound",
        "Separate management plane"
       ]
      },
      {
       "label": "DMZ services",
       "parts": [
        "Reverse proxy and web application firewall",
        "Mail relay, external DNS, remote-access brokers"
       ]
      },
      {
       "label": "Internal boundary",
       "parts": [
        "Second firewall layer or zone policy",
        "Only brokered flows to internal zones"
       ]
      }
     ]
    },
    {
     "type": "compare",
     "title": "DMZ patterns",
     "columns": [
      {
       "title": "Three-legged single firewall",
       "items": [
        "Inside, outside and DMZ on one firewall pair",
        "Cheapest and simplest",
        "One policy error or one software flaw exposes both boundaries"
       ]
      },
      {
       "title": "Dual-firewall (back-to-back)",
       "items": [
        "Outer and inner firewalls, ideally managed as separate domains",
        "Defence in depth: an attacker must defeat two independent layers",
        "More cost and operational effort; rules must be coordinated"
       ]
      },
      {
       "title": "Brokered access",
       "items": [
        "No direct inbound connection reaches internal zones",
        "Reverse proxies and brokers in the DMZ initiate or relay every session",
        "Strong containment; requires applications that work through brokers"
       ]
      }
     ]
    },
    {
     "type": "cli",
     "title": "Anti-spoofing at the internet edge",
     "device": "EDGE1 · IOS-style CLI",
     "lines": [
      "ip access-list extended EDGE-IN",
      " remark Drop packets claiming our own or private source addresses",
      " deny ip 203.0.113.0 0.0.0.255 any",
      " deny ip 10.0.0.0 0.255.255.255 any",
      " deny ip 172.16.0.0 0.15.255.255 any",
      " deny ip 192.168.0.0 0.0.255.255 any",
      " permit ip any any",
      "!",
      "interface GigabitEthernet0/0/0",
      " description Upstream provider A",
      " ip access-group EDGE-IN in"
     ],
     "note": "203.0.113.0/24 stands for the organisation's own public block. The design point is that edge filtering removes obviously forged traffic before it reaches stateful devices, saving their capacity for real sessions."
    },
    {
     "type": "flow",
     "title": "Inbound request through a brokered DMZ",
     "items": [
      {
       "label": "Client",
       "text": "Resolves the public name"
      },
      {
       "label": "Scrubbing",
       "text": "Volumetric attacks absorbed upstream"
      },
      {
       "label": "Edge firewall",
       "text": "Allows only HTTPS to the proxy"
      },
      {
       "label": "Reverse proxy / WAF",
       "text": "Terminates TLS, inspects, authenticates"
      },
      {
       "label": "Inner firewall",
       "text": "Allows proxy-to-application flows only"
      },
      {
       "label": "Application tier",
       "text": "Never directly reachable from outside"
      }
     ]
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "Stateful firewalls must see both directions of a session. In active/active multi-site designs, routing can send the request through Site A's firewall and the reply through Site B's, and the session is dropped. Design symmetric paths (per-site egress, consistent routing preference, source NAT) or use firewall clustering that shares state across sites — knowing that the latter enlarges the failure domain.",
     "title": "Asymmetric paths through stateful devices"
    },
    {
     "type": "callout",
     "kind": "pro",
     "text": "Traditional remote-access VPNs put a user's device on the internal network. Brokered, application-level access (often called zero-trust network access) connects a verified user and device to a named application only, hiding everything else. For third parties and unmanaged devices it shrinks the blast radius dramatically.",
     "title": "Replacing network VPNs with application access"
    },
    {
     "type": "scenario",
     "title": "Third-party access to plant systems",
     "situation": "Twelve machine builders need occasional remote access to specific production controllers for diagnostics. Today they use a shared VPN account that lands them on the plant network with broad reach. The security team wants accountability and minimum exposure; the plant manager wants support to stay fast.",
     "options": [
      {
       "text": "Issue each machine builder its own VPN account on the existing concentrator with the same network access.",
       "feedback": "Individual accounts add accountability but not containment; each vendor can still reach far more than its own machines.",
       "best": false
      },
      {
       "text": "Block all remote access and require machine builders to visit the site for every fault.",
       "feedback": "Secure but operationally unacceptable; production downtime would rise sharply.",
       "best": false
      },
      {
       "text": "Provide brokered, application-level access through a jump service in the industrial DMZ, with per-vendor policy to named assets, approval workflow and session recording.",
       "feedback": "Best. Each vendor reaches only its own equipment, every session is attributed and recorded, and nothing on the plant network is exposed directly.",
       "best": true
      },
      {
       "text": "Open inbound firewall rules from each vendor's office IP address directly to its controllers.",
       "feedback": "Source-IP trust is weak, exposes controllers to the internet path and provides no user-level accountability.",
       "best": false
      }
     ]
    },
    {
     "type": "checklist",
     "title": "Enforcement and edge design checklist",
     "items": [
      "Each traffic pattern (north-south, east-west, user-to-app) has a named enforcement point",
      "Stateful devices see both directions of every session they inspect",
      "Hairpin traffic through central firewalls is sized and has a failure-domain plan",
      "The internet edge has upstream DDoS protection and anti-spoofing filters",
      "DMZ services broker all inbound sessions; nothing internal is directly reachable",
      "Third-party and remote access is per-application, attributed and recorded",
      "Management interfaces of security devices sit in a separate, protected zone"
     ]
    },
    {
     "type": "reflection",
     "prompt": "Trace one inbound user request to your most important application. How many enforcement points does it cross, and which one would you remove if you had to — and why?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "North-south traffic",
       "def": "Traffic entering or leaving a site or data centre, such as between users or the internet and servers."
      },
      {
       "term": "East-west traffic",
       "def": "Traffic between workloads inside a site, data centre or cloud."
      },
      {
       "term": "DMZ",
       "def": "A semi-trusted zone between the internet and internal networks that hosts externally reachable services."
      },
      {
       "term": "Reverse proxy",
       "def": "A server that accepts client connections on behalf of back-end applications and relays requests to them."
      },
      {
       "term": "Web application firewall",
       "def": "A control that inspects HTTP traffic for application-layer attacks."
      },
      {
       "term": "Zero-trust network access",
       "def": "Brokered access that connects verified users and devices to specific applications rather than to a network."
      },
      {
       "term": "Hairpinning",
       "def": "Sending traffic to a central device and back, often across the same links, to apply a control."
      },
      {
       "term": "Asymmetric routing",
       "def": "A condition in which the two directions of a flow take different paths."
      }
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "An active/active two-site design drops sessions intermittently. Requests leave through Site A's firewall and replies return through Site B's. What is the best design fix?",
       "options": [
        "Add more bandwidth between the two sites so replies arrive much faster",
        "Make paths symmetric per site, for example with per-site egress and source NAT",
        "Disable stateful inspection on both firewalls for all of the affected applications",
        "Shorten the firewall session timeouts so stale state is cleaned up sooner"
       ],
       "answer": 1,
       "explain": "Stateful devices must see both directions. Symmetric routing solves the root cause; disabling inspection removes the control and the other options do not address asymmetry."
      },
      {
       "q": "Which DMZ pattern provides the strongest protection against a single policy error exposing internal systems?",
       "options": [
        "A three-legged firewall with careful rule review each quarter",
        "A single firewall pair using the supplier's recommended default rule set",
        "A flat DMZ with host firewalls installed on each public server",
        "Dual firewalls managed as separate domains, with brokered access"
       ],
       "answer": 3,
       "explain": "Two independently managed layers mean one mistake does not expose internal zones, and brokering removes direct inbound paths."
      },
      {
       "q": "Where is micro-segmentation for east-west data-centre traffic usually most scalable?",
       "options": [
        "At the internet perimeter firewall cluster",
        "Distributed at the hypervisor, host or fabric edge",
        "At a central firewall cluster that hairpins all east-west flows",
        "At the provider's upstream scrubbing centre"
       ],
       "answer": 1,
       "explain": "Distributed enforcement grows with the workloads and avoids hairpinning all east-west traffic through a central bottleneck."
      },
      {
       "q": "Why is a remote-access VPN that places users on the internal network a weak fit for third parties?",
       "options": [
        "It cannot encrypt traffic strongly enough to meet modern security standards",
        "It requires each third party to buy hardware tokens for every single user",
        "It grants network-level reach far beyond the applications each party needs",
        "It always routes traffic through the internet perimeter twice, adding delay"
       ],
       "answer": 2,
       "explain": "The problem is scope, not encryption. Application-level, brokered access limits each party to named resources."
      },
      {
       "q": "What is the main design purpose of anti-spoofing filters at the internet edge?",
       "options": [
        "Drop forged traffic early so stateful devices spend capacity on real sessions",
        "Replace the edge firewall so that the DMZ can be simplified and removed",
        "Encrypt inbound traffic before it reaches any of the DMZ service tiers",
        "Load-balance inbound sessions evenly across the diverse upstream service providers"
       ],
       "answer": 0,
       "explain": "Edge filters remove obviously illegitimate packets cheaply; they complement, not replace, stateful inspection."
      }
     ]
    }
   ]
  },
  {
   "id": "m6-l3",
   "title": "Identity-Driven Access & Encryption Choices",
   "subtitle": "Let identity decide who connects, and choose the right layer to encrypt",
   "minutes": 28,
   "objectives": [
    "Design identity-driven network access for users, devices and headless endpoints",
    "Plan a safe rollout of port-based authentication",
    "Choose between MACsec, IPsec and TLS based on requirements and trade-offs"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "In a zero-trust design the first question at the network edge is not 'which port?' but 'who or what is this, and is it healthy?'. Identity-driven access answers that question at connection time and hands the result to enforcement points. Encryption then protects traffic wherever the path cannot be trusted. Both are design choices with real operational cost, and both fail badly when introduced in a hurry."
    },
    {
     "type": "flow",
     "title": "Identity-driven access sequence",
     "items": [
      {
       "label": "Connect",
       "text": "Device attaches to a wired port, wireless network or VPN"
      },
      {
       "label": "Authenticate",
       "text": "802.1X with certificates or credentials; MAC-based fallback for headless devices"
      },
      {
       "label": "Profile and posture",
       "text": "Device type, ownership and health are assessed"
      },
      {
       "label": "Decide",
       "text": "The policy server returns an authorisation result"
      },
      {
       "label": "Enforce",
       "text": "Group tag, downloadable access list or VLAN applied at the edge"
      },
      {
       "label": "Reassess",
       "text": "Change of authorisation if posture or risk changes"
      }
     ]
    },
    {
     "type": "table",
     "title": "Authorisation results — trade-offs",
     "head": [
      "Result",
      "How it works",
      "Strengths",
      "Weaknesses"
     ],
     "rows": [
      [
       "Dynamic VLAN",
       "Endpoint is placed in a VLAN per role",
       "Simple, widely supported",
       "Ties policy to IP subnets; VLAN sprawl; re-addressing on change"
      ],
      [
       "Downloadable access list",
       "Per-session list pushed to the port",
       "Granular, no re-addressing",
       "Rule scale on access switches; IP-based rules"
      ],
      [
       "Group tag",
       "Endpoint is labelled; policy written group to group",
       "Policy independent of IP address; scales across sites",
       "Needs tag support or propagation across the path"
      ],
      [
       "Redirect / restricted",
       "Endpoint sent to remediation or onboarding",
       "Smooth user experience for non-compliant devices",
       "Extra infrastructure; must not become a bypass"
      ]
     ]
    },
    {
     "type": "compare",
     "title": "Port-authentication rollout modes",
     "columns": [
      {
       "title": "Monitor mode",
       "items": [
        "Authentication runs but access is not restricted",
        "Reveals unknown devices and failed authentications",
        "Zero user impact — the right first phase"
       ]
      },
      {
       "title": "Low-impact mode",
       "items": [
        "Limited access before authentication (for example DHCP, DNS, boot services)",
        "Full access granted per authorisation result",
        "Balances security and compatibility for mixed estates"
       ]
      },
      {
       "title": "Closed mode",
       "items": [
        "No traffic until authentication succeeds",
        "Strongest posture",
        "Unforgiving: printers, phones and building systems must all be handled first"
       ]
      }
     ]
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "Headless devices that cannot run 802.1X are often admitted by MAC address. MAC addresses are easy to spoof. Combine MAC-based access with profiling and give those devices a tightly restricted policy, so that a spoofed MAC gains almost nothing.",
     "title": "MAC-based bypass identifies — it does not authenticate"
    },
    {
     "type": "compare",
     "title": "MACsec, IPsec and TLS",
     "columns": [
      {
       "title": "MACsec (IEEE 802.1AE)",
       "items": [
        "Encrypts Ethernet frames hop by hop at line rate in hardware",
        "Protects links: data-centre interconnect over fibre or wavelengths, campus uplinks",
        "Low latency, roughly 24–32 bytes of overhead per frame",
        "Traffic is clear inside each device; needs hardware support and, over a carrier, transparency for the key-agreement frames"
       ]
      },
      {
       "title": "IPsec",
       "items": [
        "Encrypts IP packets between gateways across any routed network",
        "Protects WAN paths over the internet or untrusted carriers",
        "Overhead of roughly 50–80 bytes depending on mode, cipher, NAT traversal and tunnelling; MTU and MSS must be managed",
        "Throughput limited by gateway crypto capacity; adds a tunnel layer to operate"
       ]
      },
      {
       "title": "TLS / mutual TLS",
       "items": [
        "Encrypts application sessions end to end",
        "Protects data across every hop, including inside the data centre",
        "Closest fit to zero trust: service identity in certificates",
        "Reduces network visibility; inspection needs termination at a proxy or endpoint telemetry"
       ]
      }
     ]
    },
    {
     "type": "table",
     "title": "Encryption decision matrix",
     "head": [
      "Requirement",
      "Preferred choice",
      "Why"
     ],
     "rows": [
      [
       "Encrypt a 100G data-centre interconnect over a leased wavelength at line rate",
       "MACsec",
       "Hardware line-rate encryption with minimal latency on a point-to-point link"
      ],
      [
       "Encrypt branch traffic over the internet",
       "IPsec (often within an SD-WAN overlay)",
       "Works across any routed path and through NAT"
      ],
      [
       "Protect service-to-service calls regardless of network path",
       "Mutual TLS",
       "End-to-end with service identity; independent of network topology"
      ],
      [
       "Encrypt over a carrier Ethernet service",
       "MACsec, if the service passes the required frames and tags",
       "Line rate on a Layer 2 path; confirm transparency with the provider"
      ],
      [
       "Meet a policy of 'encrypt everything that leaves the building'",
       "Layered: MACsec or IPsec on links, TLS for applications",
       "No single layer covers every path and threat"
      ]
     ]
    },
    {
     "type": "formula",
     "title": "Encryption and path MTU",
     "items": [
      {
       "name": "Effective payload MTU",
       "expr": "MTU_effective = path MTU − encapsulation overhead",
       "meaning": "Every tunnel or tag reduces the space left for the original packet."
      },
      {
       "name": "TCP MSS clamp (IPv4)",
       "expr": "MSS = MTU_effective − 40",
       "meaning": "Clamp MSS on tunnel interfaces so TCP never sends segments that need fragmentation; IPv6 headers need 60 bytes instead of 40."
      },
      {
       "name": "Worked example",
       "expr": "1500 − 73 (ESP tunnel with NAT traversal, illustrative) ≈ 1427; MSS ≈ 1387",
       "meaning": "Many designs round down to an MTU of 1400 and an MSS of 1360 to leave headroom for additional encapsulation."
      }
     ]
    },
    {
     "type": "cli",
     "title": "MACsec on a data-centre interconnect",
     "device": "DCI-A · IOS-style CLI",
     "lines": [
      "key chain DCI-KC macsec",
      " key 01",
      "  cryptographic-algorithm aes-256-cmac",
      "  key-string <64-hex-character pre-shared CAK>",
      "!",
      "mka policy DCI-MKA",
      " macsec-cipher-suite gcm-aes-xpn-256",
      "!",
      "interface HundredGigE1/0/1",
      " description Wavelength to DC-B",
      " macsec network-link",
      " mka policy DCI-MKA",
      " mka pre-shared-key key-chain DCI-KC"
     ],
     "note": "Extended packet numbering (XPN) cipher suites avoid frequent rekeying on high-speed links. Key rotation and storage of the pre-shared connectivity association key must be part of the operational design."
    },
    {
     "type": "scenario",
     "title": "Encrypting a data-centre interconnect",
     "situation": "Two data centres 40 km apart are joined by two leased 100G wavelengths carrying storage replication and application traffic. A new regulation requires encryption of all data leaving each site. Latency is critical for synchronous replication. The team proposes routing all inter-site traffic through the existing firewalls' IPsec engines, which are rated at 20 Gbps.",
     "options": [
      {
       "text": "Enable MACsec on the wavelength-facing interfaces of the interconnect switches or routers, with managed key rotation.",
       "feedback": "Best. Line-rate hardware encryption on point-to-point links meets the requirement with negligible latency and no new bottleneck.",
       "best": true
      },
      {
       "text": "Proceed with firewall IPsec and add more firewall pairs later if needed.",
       "feedback": "The firewalls cannot carry 200G, add latency and become a new serial bottleneck on the replication path.",
       "best": false
      },
      {
       "text": "Encrypt only the storage replication at the application layer and leave other traffic clear.",
       "feedback": "Partial encryption fails the regulatory requirement for all data leaving each site.",
       "best": false
      },
      {
       "text": "Replace the wavelengths with an internet VPN service that is encrypted by default.",
       "feedback": "This reduces performance and predictability and adds dependency on the internet path for synchronous replication.",
       "best": false
      }
     ]
    },
    {
     "type": "checklist",
     "title": "Identity and encryption design checklist",
     "items": [
      "Every endpoint class (managed, unmanaged, headless, guest) has an access method and policy",
      "Port authentication rolls out monitor first, then low-impact, then closed where justified",
      "MAC-based access is paired with profiling and restricted policy",
      "Policy results use groups or tags where possible, not VLAN sprawl",
      "Encryption layer is chosen per path: link, network or application",
      "MTU and MSS are planned for every encapsulation",
      "Key and certificate lifecycle is automated and monitored"
     ]
    },
    {
     "type": "reflection",
     "prompt": "Which endpoint class in your environment would break first if you turned on closed-mode authentication tomorrow? What would you need in place to make that safe?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "802.1X",
       "def": "An IEEE standard for port-based network access control using an authentication server."
      },
      {
       "term": "MAC authentication bypass",
       "def": "Admitting a device based on its MAC address when it cannot perform 802.1X."
      },
      {
       "term": "Profiling",
       "def": "Identifying device type from observed attributes such as DHCP options, traffic and certificates."
      },
      {
       "term": "Change of authorisation",
       "def": "A message from the policy server that changes an active session's access without reconnecting."
      },
      {
       "term": "MACsec",
       "def": "IEEE 802.1AE link-layer encryption that protects Ethernet frames hop by hop."
      },
      {
       "term": "MKA",
       "def": "MACsec Key Agreement: the protocol that establishes and rotates MACsec keys between peers."
      },
      {
       "term": "IPsec",
       "def": "A suite of protocols that authenticates and encrypts IP packets between peers or gateways."
      },
      {
       "term": "Mutual TLS",
       "def": "TLS in which both client and server present certificates, giving both sides a verified identity."
      },
      {
       "term": "MSS clamping",
       "def": "Rewriting the TCP maximum segment size so segments fit within a tunnel's reduced MTU."
      }
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "A hospital wants to start 802.1X on 6,000 wired ports with many unknown medical and building devices. What is the safest first phase?",
       "options": [
        "Closed mode on all ports at once, with the help desk on standby",
        "MAC-based access for every device so that nothing ever breaks",
        "Dynamic VLAN assignment for every user and every device in a single change",
        "Monitor mode to discover endpoints and failures without blocking"
       ],
       "answer": 3,
       "explain": "Monitor mode reveals what is on the network and what would fail, with no clinical impact, before any enforcement is introduced."
      },
      {
       "q": "Which encryption choice best protects service-to-service traffic in a way that is independent of the network path?",
       "options": [
        "MACsec on each data-centre link",
        "IPsec between the core routers",
        "Mutual TLS between the services",
        "A dedicated VLAN for service calls"
       ],
       "answer": 2,
       "explain": "Mutual TLS travels with the session end to end and carries service identity; link and network encryption protect only the segments they cover."
      },
      {
       "q": "Why should MAC-based admission be combined with profiling and restricted policy?",
       "options": [
        "MAC-based admission cannot assign any authorisation result to the port",
        "MAC addresses are easily spoofed, so the policy must limit what a spoof gains",
        "Profiling is required by the 802.1X standard before any device may be admitted to a port",
        "Restricted policy improves the throughput available to headless devices"
       ],
       "answer": 1,
       "explain": "MAC-based access identifies but does not authenticate. Limiting access contains the damage from spoofing."
      },
      {
       "q": "An IPsec overlay causes some large file transfers to stall while small requests work. What is the most likely design gap?",
       "options": [
        "MTU and TCP MSS were not adjusted for the encapsulation overhead",
        "The IPsec cipher suite is too weak for large file transfers to complete",
        "The tunnel lacks BFD, so failures are being detected far too slowly",
        "Large transfers need MACsec on the WAN instead of IPsec to complete"
       ],
       "answer": 0,
       "explain": "Encapsulation reduces effective MTU. Without MSS clamping or working path-MTU discovery, large packets are dropped while small ones pass."
      },
      {
       "q": "What is the main visibility trade-off of pervasive TLS?",
       "options": [
        "Every TLS session needs a dedicated hardware accelerator somewhere on the path",
        "TLS prevents flow records from being exported by network devices",
        "TLS forces all traffic to hairpin through the perimeter firewall",
        "Network sensors cannot inspect payloads without terminating sessions"
       ],
       "answer": 3,
       "explain": "Encrypted payloads are opaque to passive sensors. Visibility moves to proxies that terminate TLS, endpoint telemetry and metadata analysis."
      }
     ]
    }
   ]
  },
  {
   "id": "m6-l4",
   "title": "Compliance Zones & Security Visibility Design",
   "subtitle": "Use segmentation to shrink regulatory scope, and design the network so security teams can see",
   "minutes": 30,
   "objectives": [
    "Design compliance zones that reduce the scope of payment-card, health and personal-data obligations",
    "Build a segmentation matrix with owners, enforcement points and evidence",
    "Design a layered visibility architecture for security operations"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Regulation turns segmentation from good practice into a contractual obligation. Payment-card rules, health-data laws and privacy regulations all reward designs that **concentrate** sensitive data into small, well-controlled zones. Every system that can talk to a regulated zone tends to fall into scope too — so the network design directly changes audit cost, effort and risk."
    },
    {
     "type": "callout",
     "kind": "definition",
     "text": "Under the payment-card industry data security standard (PCI DSS), the **cardholder data environment** includes systems that store, process or transmit card data, plus systems connected to them or able to affect their security. Proper segmentation can take the rest of the network out of scope; the segmentation itself must be documented and validated by testing. Health and personal-data regimes differ in detail but reward the same pattern: know where the data is, isolate it and prove the isolation.",
     "title": "Scope and scope reduction"
    },
    {
     "type": "table",
     "title": "Compliance-driven zone design",
     "head": [
      "Data or system",
      "Typical obligations",
      "Network design response"
     ],
     "rows": [
      [
       "Payment-card data",
       "Restricted access, strong segmentation, logging, regular testing",
       "Small dedicated zone; tokenisation to shrink it; tested segmentation; tightly controlled admin path"
      ],
      [
       "Health records and clinical systems",
       "Confidentiality, integrity, availability of care",
       "Clinical zones separate from corporate and guest; medical devices isolated by type; availability weighed as heavily as confidentiality"
      ],
      [
       "Personal data under privacy law",
       "Purpose limitation, data residency, breach notification",
       "Region-aware placement of data; controlled cross-border paths; logging to support notification"
      ],
      [
       "Operational technology and safety systems",
       "Safety and continuity of physical processes",
       "Hierarchical zones and conduits; industrial DMZ; strictly brokered IT-to-OT flows"
      ],
      [
       "Government classified or sensitive data",
       "Accredited boundaries, approved cryptography",
       "Physically or cryptographically separated networks; cross-domain controls"
      ]
     ]
    },
    {
     "type": "steps",
     "title": "Scope-reduction method",
     "items": [
      {
       "title": "Find the data",
       "text": "Map where regulated data is stored, processed and transmitted, including logs, backups and support tools."
      },
      {
       "title": "Remove what you can",
       "text": "Tokenise, truncate or outsource processing so less of the estate ever touches the data."
      },
      {
       "title": "Isolate the rest",
       "text": "Place in-scope systems in a dedicated zone with default-deny policy and stateful enforcement."
      },
      {
       "title": "Control connected systems",
       "text": "Limit and document every system that can reach the zone — management, monitoring, backup, identity."
      },
      {
       "title": "Prove it",
       "text": "Test that out-of-scope networks cannot reach the zone, and repeat the test after significant change."
      },
      {
       "title": "Keep it small",
       "text": "Treat any new flow into the zone as a design change with security review."
      }
     ]
    },
    {
     "type": "case",
     "title": "Hospital segmentation project",
     "context": "A 900-bed teaching hospital runs one flat network for electronic health records, 4,000 medical devices (infusion pumps, imaging systems, patient monitors), building management, staff PCs, a research network and guest Wi-Fi. Many imaging systems run unsupported operating systems that the manufacturers will not let the hospital patch. Two hospitals in the region were hit by ransomware last year; one diverted emergency ambulances for three days. The board wants risk reduced within 12 months without any interruption to clinical care. The security team is five people.",
     "questions": [
      "Which macro zones would you define, and why?",
      "How do you protect devices that cannot be patched or run agents?",
      "Where should enforcement sit, and in what order would you roll it out?",
      "What visibility does the security team need, given its size?"
     ],
     "answer": "**Macro zones:** clinical systems (health records and clinical applications), medical devices (sub-grouped by type and manufacturer), imaging, building management and OT, corporate users, research (separate, with its own data-sharing controls), guest (internet only), and a management zone. **Unpatchable devices:** network-based containment — group them by type, allow only the flows each type needs (for example modality-to-archive and modality-to-worklist), block internet access, and put manufacturer remote support through a brokered jump service with session recording. **Enforcement:** inter-zone firewalls in the data centre for macro boundaries; group-based policy at the access and wireless edge for device groups. Roll out in **monitor mode** first, using several weeks of flow data to build the matrix; then enforce the lowest-risk boundaries (guest, research, building management) before clinical device groups, with clinical engineering signing off each step and an immediate rollback path. **Visibility:** with five people, favour high-signal sources — flow telemetry from all zone boundaries, firewall deny logs, DNS logs and passive device-profiling — feeding one analytics platform with tuned alerts, rather than full packet capture everywhere. Measure success as 'a compromised staff PC can reach no medical device and only the clinical services it needs'."
    },
    {
     "type": "template",
     "title": "Segmentation matrix",
     "purpose": "Record every permitted flow between zones or groups with its justification, owner, enforcement point and evidence, so policy can be reviewed and audited.",
     "columns": [
      "Source zone / group",
      "Destination zone / group",
      "Allowed services",
      "Enforcement point",
      "Business owner & justification",
      "Logging",
      "Review date"
     ],
     "example": [
      [
       "Imaging modalities",
       "Image archive",
       "Image transfer and worklist ports only",
       "Fabric edge group policy",
       "Radiology — image storage",
       "Flow + deny logs",
       "Every 6 months"
      ],
      [
       "Corporate users",
       "Card payment zone",
       "None (default deny)",
       "Data-centre zone firewall",
       "Finance — scope reduction",
       "Deny logs to security operations",
       "Quarterly test"
      ]
     ],
     "rows": 10
    },
    {
     "type": "layers",
     "title": "Security visibility architecture",
     "items": [
      {
       "label": "Analytics and response",
       "parts": [
        "Security analytics and event management",
        "Network detection and response",
        "Automated response playbooks"
       ]
      },
      {
       "label": "Collection and brokering",
       "parts": [
        "Packet broker: aggregate, filter, deduplicate, load-balance to tools",
        "Flow collectors",
        "Log and telemetry pipeline"
       ]
      },
      {
       "label": "Sources",
       "parts": [
        "Optical taps on critical links",
        "Port mirroring where taps are impractical",
        "Flow export from switches, routers and cloud",
        "Firewall, proxy, DNS and identity logs"
       ]
      },
      {
       "label": "Network",
       "parts": [
        "Zone boundaries and choke points",
        "Data-centre fabric, campus, WAN, cloud"
       ]
      }
     ]
    },
    {
     "type": "compare",
     "title": "Taps, port mirroring and flow telemetry",
     "columns": [
      {
       "title": "Optical taps",
       "items": [
        "Passive copy of every packet, including errors",
        "No load on the switch; fails open on the production link",
        "Needs physical insertion and capacity planning for tools"
       ]
      },
      {
       "title": "Port mirroring",
       "items": [
        "Copy configured on the switch, no extra hardware",
        "Can drop copies under load; lower priority than forwarding",
        "Convenient for temporary or low-rate needs"
       ]
      },
      {
       "title": "Flow telemetry",
       "items": [
        "Records who talked to whom, when and how much",
        "Cheap to collect everywhere, including cloud flow logs",
        "No payload; sampling can hide short or small flows"
       ]
      }
     ]
    },
    {
     "type": "callout",
     "kind": "insight",
     "text": "Modern TLS with forward secrecy cannot be decrypted passively, even with the server's key. Visibility moves to points that terminate sessions (proxies, load balancers), to endpoints, to DNS and identity logs, and to analysis of encrypted-traffic metadata. Design those sources in deliberately rather than assuming a sensor in the middle will see everything.",
     "title": "Encryption shifts visibility, it does not remove the need"
    },
    {
     "type": "scenario",
     "title": "The SOC wants everything",
     "situation": "A new security operations lead asks for full packet capture on every link in the network, retained for 90 days. The network carries about 400 Gbps at peak across three data centres and 200 sites.",
     "options": [
      {
       "text": "Approve full capture everywhere; visibility is never wasted.",
       "feedback": "Ninety days of 400 Gbps capture is an enormous storage and cost burden, and most of it would never be examined.",
       "best": false
      },
      {
       "text": "Decline capture entirely and rely on firewall logs only.",
       "feedback": "Firewall logs miss east-west activity and provide no evidence for deep investigation.",
       "best": false
      },
      {
       "text": "Mirror all traffic from every switch to a central analysis cluster over the production network.",
       "feedback": "Mirroring at that scale doubles traffic on the production network and drops copies under load.",
       "best": false
      },
      {
       "text": "Design tiered visibility: flow telemetry and logs everywhere, packet capture at key choke points through a packet broker with short rolling retention, and on-demand capture elsewhere.",
       "feedback": "Best. It gives broad coverage cheaply, deep evidence where it matters most, and a mechanism to extend capture during investigations.",
       "best": true
      }
     ]
    },
    {
     "type": "checklist",
     "title": "Compliance and visibility checklist",
     "items": [
      "Regulated data locations are mapped, including logs, backups and support tools",
      "Scope has been reduced by tokenisation or outsourcing where possible",
      "Every flow into a regulated zone appears in the segmentation matrix with an owner",
      "Segmentation is tested and re-tested after significant change",
      "Flow telemetry covers every zone boundary, on premises and in cloud",
      "Packet capture is concentrated at choke points through a broker",
      "Visibility for encrypted traffic is designed at termination points and endpoints"
     ]
    },
    {
     "type": "reflection",
     "prompt": "Which system in your network is in regulatory scope only because it can reach a regulated zone? What would it take to remove that path?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Cardholder data environment",
       "def": "The systems that store, process or transmit payment-card data, plus those connected to or able to affect them."
      },
      {
       "term": "Scope reduction",
       "def": "Design measures that reduce the number of systems subject to a regulatory obligation."
      },
      {
       "term": "Tokenisation",
       "def": "Replacing sensitive data with a surrogate value that has no exploitable meaning outside a secure vault."
      },
      {
       "term": "Segmentation testing",
       "def": "Testing that proves out-of-scope networks cannot reach a protected zone."
      },
      {
       "term": "Packet broker",
       "def": "A device that aggregates, filters and distributes copies of traffic to security and monitoring tools."
      },
      {
       "term": "Optical tap",
       "def": "A passive device that copies light from a fibre link for monitoring without affecting the link."
      },
      {
       "term": "Port mirroring",
       "def": "A switch feature that copies traffic from ports or VLANs to a monitoring port."
      },
      {
       "term": "Network detection and response",
       "def": "Tools that analyse network traffic and metadata to detect and investigate threats."
      },
      {
       "term": "Forward secrecy",
       "def": "A property of key exchange that prevents past sessions from being decrypted even if long-term keys are later exposed."
      }
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "A retailer wants to shrink the number of systems subject to payment-card audits. Which design step has the largest effect?",
       "options": [
        "Encrypt every link in the corporate network using MACsec on all of the uplinks",
        "Increase the logging retention on all servers so it covers at least one full audit cycle",
        "Tokenise card data and isolate the remaining in-scope systems in a tested zone",
        "Move every corporate system behind one larger and faster perimeter firewall"
       ],
       "answer": 2,
       "explain": "Removing card data from most systems and isolating the rest takes the bulk of the estate out of scope. Link encryption and logging do not change what is in scope."
      },
      {
       "q": "Why must segmentation used for scope reduction be tested?",
       "options": [
        "Auditors rely on proof that out-of-scope networks cannot reach the zone",
        "Testing is needed to calculate the bandwidth required between zones",
        "Untested segmentation automatically places the whole estate in scope for every audit",
        "Firewalls require periodic testing to keep their warranty valid"
       ],
       "answer": 0,
       "explain": "Scope reduction depends on isolation actually working. Testing provides that evidence and catches drift after changes."
      },
      {
       "q": "Which visibility source scales most cheaply across hundreds of sites and cloud networks?",
       "options": [
        "Optical taps on every access link",
        "Flow telemetry and cloud flow logs",
        "Full packet capture at each site",
        "Port mirroring from every switch"
       ],
       "answer": 1,
       "explain": "Flow records are compact and widely supported, including in cloud. Packet-level sources are valuable but expensive to deploy everywhere."
      },
      {
       "q": "Modern TLS with forward secrecy is pervasive. Where should visibility be designed?",
       "options": [
        "At a passive sensor that holds a copy of each server's private key for decryption",
        "At the internet edge only, since internal traffic is not a source of threats",
        "Nowhere in particular, since encrypted traffic no longer needs to be monitored",
        "At session termination points, endpoints, DNS and identity logs, and metadata"
       ],
       "answer": 3,
       "explain": "Forward secrecy prevents passive decryption with server keys. Visibility must come from points that see plaintext or from metadata and logs."
      },
      {
       "q": "In the hospital case, why were clinical device groups enforced after guest, research and building-management boundaries?",
       "options": [
        "Lower-risk boundaries build confidence and flow data before patient-critical systems",
        "Clinical devices do not need segmentation because they are already certified",
        "Guest and research networks carry more sensitive data than any of the clinical zones do",
        "Enforcement on clinical devices is not allowed by health-data regulation"
       ],
       "answer": 0,
       "explain": "Sequencing by impact protects care delivery while the team gains experience and refines the policy matrix."
      }
     ]
    }
   ]
  }
 ]
});
TRACK.modules.push({
 "id": "m7",
 "order": 7,
 "code": "Cloud",
 "title": "Hybrid, Multi-Cloud & Automation-Driven Design",
 "subtitle": "Cloud constructs, hybrid connectivity, addressing and DNS, automation, observability and cost",
 "outcomes": [
  "Map cloud networking constructs to design decisions and choose transit topologies",
  "Select hybrid and multi-cloud connectivity patterns against availability, bandwidth and cost",
  "Build addressing and DNS designs that work across on-premises and several clouds",
  "Design networks for automation and observability from day 0",
  "Forecast and control the cost drivers of hybrid network designs"
 ],
 "lessons": [
  {
   "id": "m7-l1",
   "title": "Cloud Constructs & Hybrid Connectivity",
   "subtitle": "Translate familiar network design into cloud building blocks, then join them to the estate",
   "minutes": 30,
   "objectives": [
    "Map cloud networking constructs to their on-premises equivalents and design implications",
    "Choose between peering meshes, transit hubs and shared virtual networks",
    "Select hybrid connectivity patterns that meet availability, bandwidth and cost requirements"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Public clouds expose networking as software constructs: virtual networks, route tables, gateways and security groups that appear in seconds through an API. The physics underneath has not changed, but the rules have. Some familiar behaviours disappear (there is usually no broadcast, no spanning tree, no multicast by default), some limits are hard quotas set by the provider, and every byte that crosses certain boundaries has a price."
    },
    {
     "type": "table",
     "title": "Cloud constructs and what they mean for design",
     "head": [
      "Construct (generic)",
      "On-premises analogue",
      "Design note"
     ],
     "rows": [
      [
       "Virtual network",
       "A routing domain or VRF with its own address space",
       "Address range is hard to change later; plan size and non-overlap from day one"
      ],
      [
       "Subnet tied to an availability zone",
       "A VLAN in one building or hall",
       "Zone placement is a resilience decision — spread tiers across zones"
      ],
      [
       "Route table",
       "Static routing per subnet",
       "Controls whether traffic goes to a gateway, firewall appliance or transit hub"
      ],
      [
       "Security group / network ACL",
       "Stateful host firewall / stateless access list",
       "Primary micro-segmentation tool; manage as code to avoid sprawl"
      ],
      [
       "Peering",
       "A direct routed link between two VRFs",
       "Usually non-transitive: A–B and B–C does not give A–C"
      ],
      [
       "Transit hub (provider-managed router)",
       "A core or WAN hub router",
       "Gives transitive routing between many virtual networks and on-premises; often billed per attachment and per GB"
      ],
      [
       "Private endpoint for a provider service",
       "A service published on an internal address",
       "Keeps traffic to platform services off the internet; needs DNS design"
      ],
      [
       "Private dedicated connectivity",
       "A leased line into the provider's edge",
       "Predictable latency and bandwidth; lead time, port fees and colocation presence"
      ]
     ]
    },
    {
     "type": "formula",
     "title": "Why meshes do not scale",
     "items": [
      {
       "name": "Full-mesh peerings",
       "expr": "Peerings = n × (n − 1) ÷ 2",
       "meaning": "Ten virtual networks need 45 peerings; fifty need 1,225 — each with routes and security rules to maintain."
      },
      {
       "name": "Hub-and-spoke attachments",
       "expr": "Attachments = n",
       "meaning": "Fifty virtual networks need fifty attachments to a transit hub, at the cost of a hub hop and per-GB processing charges."
      }
     ]
    },
    {
     "type": "compare",
     "title": "Inter-network topology options",
     "columns": [
      {
       "title": "Full-mesh peering",
       "items": [
        "Lowest latency and no hub processing charges",
        "Non-transitive: every pair needs its own peering",
        "Becomes unmanageable beyond a handful of networks",
        "Fits small estates or high-volume pairs"
       ]
      },
      {
       "title": "Transit hub (hub-and-spoke)",
       "items": [
        "Transitive routing with central route tables",
        "Natural place for shared inspection and hybrid gateways",
        "Hub is a shared failure domain and a cost centre",
        "Fits most medium and large estates"
       ]
      },
      {
       "title": "Shared virtual network",
       "items": [
        "A central team owns one network shared into many accounts or projects",
        "Application teams consume subnets but do not manage routing",
        "Strong central control; blast radius of the shared network is large",
        "Fits organisations with a strong platform team"
       ]
      }
     ]
    },
    {
     "type": "compare",
     "title": "Private dedicated connectivity versus internet VPN",
     "columns": [
      {
       "title": "Private dedicated connectivity",
       "items": [
        "Predictable latency and throughput, from partner-provided sub-gigabit links up to 100 Gbps dedicated ports",
        "Lower per-GB transfer charges at many providers",
        "Weeks of lead time; needs presence at a colocation or exchange point",
        "Not encrypted by default — add MACsec or IPsec where required"
       ]
      },
      {
       "title": "Internet IPsec VPN",
       "items": [
        "Available in minutes, low fixed cost",
        "Throughput limited per tunnel; scale with multiple tunnels and multipath routing",
        "Latency and loss follow the internet path",
        "Encrypted by design; good as backup or for small sites"
       ]
      }
     ]
    },
    {
     "type": "table",
     "title": "Hybrid connectivity patterns — decision matrix",
     "head": [
      "Pattern",
      "Availability",
      "Bandwidth & latency",
      "Cost",
      "Fits"
     ],
     "rows": [
      [
       "Single VPN",
       "Low",
       "Variable",
       "Lowest",
       "Proof of concept, non-critical workloads"
      ],
      [
       "Dual VPN from two on-premises sites",
       "Medium",
       "Variable",
       "Low",
       "Small production estates, backup path"
      ],
      [
       "One private connection with VPN backup",
       "Medium to high, if the VPN can carry critical load",
       "Predictable until failover",
       "Medium",
       "Moderate traffic where the VPN can absorb critical flows"
      ],
      [
       "Two private connections at one location",
       "Medium — shared facility risk",
       "Predictable",
       "Medium to high",
       "Bandwidth growth, not resilience"
      ],
      [
       "Private connections at two diverse locations",
       "High",
       "Predictable, survives a facility loss",
       "High",
       "Production estates with strict availability targets"
      ],
      [
       "Overlay extended into cloud (virtual appliances in the hub)",
       "Depends on underlay",
       "Uniform policy with branches",
       "Appliance licences and compute",
       "Large branch estates needing consistent segmentation"
      ]
     ]
    },
    {
     "type": "flow",
     "title": "A typical hybrid path",
     "items": [
      {
       "label": "On-premises data centre",
       "text": "Core routing and firewall"
      },
      {
       "label": "Colocation edge",
       "text": "Customer router at an exchange point"
      },
      {
       "label": "Private connection",
       "text": "Dedicated port into the provider edge"
      },
      {
       "label": "Provider gateway",
       "text": "BGP session terminates here"
      },
      {
       "label": "Transit hub",
       "text": "Routes to spoke networks, optional inspection"
      },
      {
       "label": "Spoke network",
       "text": "Workload subnets across zones"
      }
     ]
    },
    {
     "type": "cli",
     "title": "Preferring the private path with VPN as backup",
     "device": "COLO-R1 · IOS-style CLI",
     "lines": [
      "router bgp 64496",
      " neighbor 169.254.10.1 remote-as 64512",
      " neighbor 169.254.10.1 description Private connection",
      " neighbor 169.254.20.1 remote-as 64512",
      " neighbor 169.254.20.1 description IPsec backup tunnel",
      " address-family ipv4",
      "  neighbor 169.254.10.1 activate",
      "  neighbor 169.254.10.1 route-map PRIVATE-IN in",
      "  neighbor 169.254.20.1 activate",
      "  neighbor 169.254.20.1 route-map VPN-OUT out",
      "!",
      "route-map PRIVATE-IN permit 10",
      " set local-preference 200",
      "route-map VPN-OUT permit 10",
      " set as-path prepend 64496 64496 64496"
     ],
     "note": "Local preference steers outbound traffic to the private path; prepending makes the VPN less attractive for return traffic. Check the provider's documented route-selection rules — some always prefer private connectivity over VPN for the same prefix regardless of path length, which may make prepending unnecessary."
    },
    {
     "type": "scenario",
     "title": "Connecting a retailer's cloud platform",
     "situation": "A retailer moves its order platform to a public cloud region. Steady traffic between stores, the warehouse system on premises and the cloud is about 3 Gbps, with peaks of 6 Gbps at seasonal sales. The availability target for the order path is 99.95%, and a single colocation facility hosts the retailer's current exchange presence. The finance team asks for the cheapest design that meets the target.",
     "options": [
      {
       "text": "A pair of internet VPN tunnels from the head office.",
       "feedback": "Throughput per tunnel and internet variability make 6 Gbps peaks with a 99.95% target unrealistic.",
       "best": false
      },
      {
       "text": "Private connections at two diverse exchange locations, with a VPN as a tertiary path for critical flows only.",
       "feedback": "Best. Diverse facilities remove the shared-location risk, private capacity carries the peaks predictably, and the VPN covers a double failure for the most critical traffic at low cost.",
       "best": true
      },
      {
       "text": "Two private connections in the existing colocation facility, on separate devices.",
       "feedback": "Device redundancy helps, but the facility remains a shared failure domain; a single power or fibre event removes both.",
       "best": false
      },
      {
       "text": "One private connection with an internet VPN backup sized for the full 6 Gbps.",
       "feedback": "Cheaper, but a full-rate VPN backup is hard to achieve reliably, and the design depends on internet performance during the peak season.",
       "best": false
      }
     ]
    },
    {
     "type": "template",
     "title": "Cloud connectivity decision sheet",
     "purpose": "Compare hybrid connectivity options against the workload's requirements so the choice and its trade-offs are explicit and reviewable.",
     "columns": [
      "Workload / traffic class",
      "Bandwidth (steady / peak)",
      "Latency & availability target",
      "Option chosen",
      "Diversity (locations, carriers)",
      "Encryption",
      "Monthly cost & risk accepted"
     ],
     "example": [
      [
       "Order platform ↔ warehouse",
       "3 / 6 Gbps",
       "< 15 ms, 99.95%",
       "2 × 10G private at diverse locations + VPN tertiary",
       "Two exchange points, two carriers",
       "MACsec on private links",
       "Port + carrier fees; VPN carries critical flows only"
      ]
     ],
     "rows": 6
    },
    {
     "type": "checklist",
     "title": "Hybrid connectivity checklist",
     "items": [
      "Virtual network address ranges are allocated from the enterprise plan and never overlap",
      "Topology choice (mesh, hub, shared network) is justified by scale and ownership model",
      "Private connectivity is diverse by facility, not just by device",
      "Backup paths are sized for the traffic they must actually carry",
      "Encryption on private links is decided explicitly, not assumed",
      "Route preference between private and VPN paths matches the provider's selection rules",
      "Provider quotas (routes, attachments, tunnels) are checked against growth plans"
     ]
    },
    {
     "type": "reflection",
     "prompt": "Which of your cloud networks would be hardest to re-address if it turned out to overlap with a partner or an acquired company? What would you do differently today?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Virtual network",
       "def": "A provider-hosted, isolated network with its own address space, subnets and route tables."
      },
      {
       "term": "Availability zone",
       "def": "A physically separate location within a cloud region with independent power, cooling and networking."
      },
      {
       "term": "Transit hub",
       "def": "A provider-managed routing service that connects many virtual networks and hybrid links transitively."
      },
      {
       "term": "Non-transitive peering",
       "def": "A peering model in which routes learned over one peering are not passed on to another."
      },
      {
       "term": "Private endpoint",
       "def": "An interface with a private address that exposes a provider or partner service inside a virtual network."
      },
      {
       "term": "Private dedicated connectivity",
       "def": "A dedicated physical or partner-provided connection between an enterprise network and a cloud provider's edge."
      },
      {
       "term": "Exchange point",
       "def": "A colocation facility where enterprises, carriers and cloud providers interconnect."
      },
      {
       "term": "Security group",
       "def": "A stateful, cloud-native firewall applied to workloads or interfaces."
      }
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "An organisation has 40 virtual networks that all need to reach each other and on-premises systems. Why is a transit hub usually preferred to full-mesh peering?",
       "options": [
        "Peering cannot carry traffic between virtual networks in different availability zones",
        "A transit hub removes all per-GB charges for traffic between the virtual networks",
        "Full-mesh peering requires a separate internet VPN for every pair of the networks",
        "A mesh needs 780 non-transitive peerings to maintain; a hub needs 40 attachments"
       ],
       "answer": 3,
       "explain": "40 × 39 ÷ 2 = 780 peerings, each needing routes and rules. A hub provides transitive routing with far fewer objects, at the cost of a hub hop and processing charges."
      },
      {
       "q": "Why does placing two private connections in the same colocation facility not deliver high availability on its own?",
       "options": [
        "Providers do not allow two connections in a single facility to be active at the same time",
        "The facility is a shared failure domain for power, fibre entry and operations",
        "Private connections cannot be combined with BGP multipath load sharing",
        "Two connections in one facility always share the same provider port"
       ],
       "answer": 1,
       "explain": "Device redundancy protects against device faults, but a facility event removes both. Diversity of location is needed for high availability."
      },
      {
       "q": "A design uses a private connection with an internet VPN as backup. What must be validated?",
       "options": [
        "That the VPN uses the same autonomous system number as the provider's private gateway",
        "That the private connection is encrypted with the same VPN cipher",
        "That the VPN can actually carry the critical traffic during a failover",
        "That the VPN terminates in the same availability zone as the workloads"
       ],
       "answer": 2,
       "explain": "A backup path that cannot carry the required load is not a backup for that load. Size it for the critical flows it must protect."
      },
      {
       "q": "Which statement about private dedicated connectivity is correct?",
       "options": [
        "It always includes provider-managed encryption at no extra cost",
        "It is not encrypted by default; add MACsec or IPsec if required",
        "It carries traffic over the public internet with a reserved path",
        "It removes the need for BGP between the enterprise and provider"
       ],
       "answer": 1,
       "explain": "Private connectivity provides isolation and predictability, not confidentiality by itself. Encryption must be added where policy requires it."
      },
      {
       "q": "What is the main trade-off of a centrally owned shared virtual network?",
       "options": [
        "Application teams must manage all of their own routing and gateways independently",
        "Every application must be deployed into the same availability zone",
        "Shared networks cannot connect to on-premises sites through private links",
        "Strong central control, but a large blast radius for mistakes in that network"
       ],
       "answer": 3,
       "explain": "Central ownership simplifies governance but concentrates risk: a fault in the shared network affects every consumer."
      }
     ]
    }
   ]
  },
  {
   "id": "m7-l2",
   "title": "Multi-Cloud, IP Addressing & Hybrid DNS",
   "subtitle": "Choose multi-cloud for the right reasons, and get addresses and names right before they become migrations",
   "minutes": 30,
   "objectives": [
    "Evaluate when multi-cloud is justified and which interconnection pattern fits",
    "Build an IP addressing plan that scales across on-premises and several clouds",
    "Design hybrid DNS so private names and private endpoints resolve correctly everywhere"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Multi-cloud is often presented as a resilience strategy. In practice it doubles the skills, tooling, security policy and connectivity an organisation must master. Expert designers ask what business driver justifies it — regulation, a capability only one provider offers, an acquisition, negotiating leverage — and then design the minimum interconnection that serves that driver. Addressing and DNS are where poor multi-cloud designs fail first."
    },
    {
     "type": "compare",
     "title": "Multi-cloud: reasons and costs",
     "columns": [
      {
       "title": "Valid drivers",
       "items": [
        "A regulatory or sovereignty requirement one provider cannot meet",
        "A unique service or capability on a second platform",
        "An acquisition that arrives with its own cloud estate",
        "A deliberate exit or concentration-risk strategy"
       ]
      },
      {
       "title": "Real costs",
       "items": [
        "Two sets of constructs, quotas, security models and skills",
        "Inter-cloud traffic usually pays egress on the sending side",
        "Consistent policy and observability across platforms is hard",
        "Failover between clouds is rarely tested and rarely works first time"
       ]
      }
     ]
    },
    {
     "type": "callout",
     "kind": "insight",
     "text": "For availability alone, multiple regions or zones within one provider usually deliver more resilience per unit of effort than spreading one application across two providers. Use multi-cloud where the business driver is something other than availability, and be honest about the operational cost.",
     "title": "Multi-region before multi-cloud"
    },
    {
     "type": "table",
     "title": "Inter-cloud connectivity patterns",
     "head": [
      "Pattern",
      "Strengths",
      "Weaknesses",
      "Fits"
     ],
     "rows": [
      [
       "Hairpin through on-premises data centre",
       "Reuses existing private links and security stack",
       "Latency and double egress; on-premises becomes a dependency",
       "Low-volume inter-cloud traffic during transition"
      ],
      [
       "Interconnect at a cloud exchange point",
       "Short, predictable paths; customer router or exchange fabric in the middle",
       "Colocation presence and port fees",
       "Steady, significant inter-cloud traffic"
      ],
      [
       "Direct IPsec VPN between clouds",
       "Fast to build, encrypted",
       "Per-tunnel throughput limits; internet variability",
       "Small volumes and backup paths"
      ],
      [
       "Multi-cloud networking overlay platform",
       "Uniform policy, routing and visibility across clouds",
       "Another platform and licence; dependency on its controller",
       "Large estates with several clouds and strong central teams"
      ]
     ]
    },
    {
     "type": "steps",
     "title": "IP addressing plan for hybrid and multi-cloud",
     "items": [
      {
       "title": "Reserve aggregates",
       "text": "Allocate one large, summarisable block per cloud and per region from the enterprise plan, leaving room for at least several years of growth."
      },
      {
       "title": "Never overlap",
       "text": "Keep cloud ranges unique across on-premises, other clouds and known partners; overlap forces NAT and breaks private connectivity."
      },
      {
       "title": "Size for zones",
       "text": "Divide each virtual network into per-zone subnets for each tier, so workloads can spread across zones without re-addressing."
      },
      {
       "title": "Account for platform consumption",
       "text": "Providers reserve a few addresses in every subnet, and container platforms can consume an address per pod — plan for both."
      },
      {
       "title": "Plan transit and link ranges",
       "text": "Set aside small ranges for hub attachments, tunnel interfaces and gateways."
      },
      {
       "title": "Plan IPv6",
       "text": "Use provider-assigned or enterprise IPv6 prefixes where supported to relieve IPv4 pressure, especially for large container estates."
      },
      {
       "title": "Record in IPAM",
       "text": "The address plan lives in an IPAM system that automation reads from; nobody allocates by hand."
      }
     ]
    },
    {
     "type": "formula",
     "title": "Addressing arithmetic",
     "items": [
      {
       "name": "Usable addresses in a cloud subnet",
       "expr": "Usable = 2^(32 − prefix length) − provider-reserved addresses",
       "meaning": "Many providers reserve four or five addresses per subnet, so a /24 yields about 251–252 usable addresses, not 254."
      },
      {
       "name": "Container address demand (one address per pod)",
       "expr": "Addresses needed ≈ nodes × maximum pods per node × growth factor",
       "meaning": "200 nodes × 110 pods × 1.5 ≈ 33,000 addresses — more than a /17, which is why pod overlays, IPv6 or non-routed ranges behind NAT are common."
      }
     ]
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "Every overlapping range eventually becomes NAT rules, special-case DNS and broken troubleshooting. When overlap is unavoidable — a merger, a partner with the same ranges — contain it at a defined boundary with explicit translation, and plan a re-addressing project rather than letting translation spread.",
     "title": "Overlap is a debt that compounds"
    },
    {
     "type": "compare",
     "title": "Hybrid DNS building blocks",
     "columns": [
      {
       "title": "Private zones",
       "items": [
        "Name space visible only to associated virtual networks",
        "Holds internal names and private-endpoint records",
        "Association scope must be designed as carefully as routing"
       ]
      },
      {
       "title": "Resolver endpoints and forwarding",
       "items": [
        "Inbound endpoints let on-premises resolvers query cloud private zones",
        "Outbound rules forward cloud queries for on-premises domains to on-premises resolvers",
        "Conditional forwarding by domain, not 'forward everything'"
       ]
      },
      {
       "title": "Split-horizon",
       "items": [
        "The same name returns different answers inside and outside",
        "Lets internal clients reach private addresses for public service names",
        "Must be documented, or troubleshooting becomes guesswork"
       ]
      }
     ]
    },
    {
     "type": "flow",
     "title": "On-premises client resolving a cloud private endpoint",
     "items": [
      {
       "label": "Client",
       "text": "Asks the on-premises resolver for a platform service name"
      },
      {
       "label": "On-premises resolver",
       "text": "Matches a conditional-forwarding rule for the private-endpoint zone"
      },
      {
       "label": "Cloud inbound endpoint",
       "text": "Receives the query inside the virtual network"
      },
      {
       "label": "Private zone",
       "text": "Returns the private address of the endpoint"
      },
      {
       "label": "Private path",
       "text": "Client connects over private connectivity, not the internet"
      }
     ]
    },
    {
     "type": "cli",
     "title": "Checking private-endpoint resolution from on premises",
     "device": "Linux host",
     "lines": [
      "# Before the conditional forwarder exists: public answer",
      "$ dig +short orders.store.example-cloud.net",
      "orders.privatelink.store.example-cloud.net.",
      "198.51.100.44",
      "# After forwarding the privatelink zone to the cloud inbound endpoint",
      "$ dig +short orders.store.example-cloud.net",
      "orders.privatelink.store.example-cloud.net.",
      "10.40.12.25"
     ],
     "note": "The service name is the same in both cases; only the resolver path changes. Without the forwarder, on-premises clients either reach the public address or are refused if public access to the service has been disabled."
    },
    {
     "type": "scenario",
     "title": "The private endpoint that only works in the cloud",
     "situation": "An application team moves a storage service behind a private endpoint and disables public access. Cloud workloads work fine. On-premises batch jobs now fail with 'access denied'. The on-premises resolvers forward all external names to the internet.",
     "options": [
      {
       "text": "Re-enable public access on the storage service for on-premises address ranges.",
       "feedback": "This reopens the public path the team deliberately closed and does not fix name resolution for other private endpoints.",
       "best": false
      },
      {
       "text": "Add hosts-file entries with the private address on each batch server.",
       "feedback": "Works for one server and one service, then silently breaks when addresses change; unmanageable at scale.",
       "best": false
      },
      {
       "text": "Add a conditional forwarder on the on-premises resolvers for the private-endpoint zone, pointing to the cloud inbound resolver endpoints.",
       "feedback": "Best. On-premises clients receive the private address and use private connectivity, and every future private endpoint in that zone works the same way.",
       "best": true
      },
      {
       "text": "Move the batch jobs into the cloud so they use cloud resolvers.",
       "feedback": "May be a valid long-term goal, but it avoids rather than solves the hybrid DNS design gap.",
       "best": false
      }
     ]
    },
    {
     "type": "checklist",
     "title": "Multi-cloud, addressing and DNS checklist",
     "items": [
      "Each additional cloud has a written business driver beyond 'resilience'",
      "Inter-cloud traffic volumes and egress costs are estimated before the pattern is chosen",
      "Cloud address aggregates are reserved in IPAM and do not overlap anything known",
      "Container and platform address consumption is included in sizing",
      "Conditional forwarding exists in both directions between on-premises and cloud",
      "Private-endpoint zones resolve correctly from every location that needs them",
      "Split-horizon names are documented with both answers"
     ]
    },
    {
     "type": "reflection",
     "prompt": "Which of your cloud services would still resolve to a public address from on premises today? What would happen if public access to it were switched off tomorrow?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Multi-cloud",
       "def": "Using two or more public cloud providers for production workloads."
      },
      {
       "term": "Concentration risk",
       "def": "The exposure created when a critical capability depends on a single provider."
      },
      {
       "term": "IPAM",
       "def": "IP address management: the system of record for address allocations, ideally consumed by automation."
      },
      {
       "term": "Private zone",
       "def": "A DNS zone whose records are visible only to associated private networks."
      },
      {
       "term": "Conditional forwarding",
       "def": "Forwarding DNS queries for specific domains to designated resolvers."
      },
      {
       "term": "Inbound resolver endpoint",
       "def": "An address inside a cloud network that accepts DNS queries from outside, typically from on-premises resolvers."
      },
      {
       "term": "Split-horizon DNS",
       "def": "Returning different answers for the same name depending on where the query comes from."
      },
      {
       "term": "Egress charge",
       "def": "A fee charged by a cloud provider for data leaving its network or crossing certain boundaries."
      }
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "A company wants a second cloud provider purely to improve the availability of one application. What should the designer point out first?",
       "options": [
        "Multiple regions in one provider usually give more resilience per unit of effort",
        "Multi-cloud always halves egress charges by spreading traffic evenly across providers",
        "A second provider removes the need for any on-premises disaster recovery site",
        "Applications automatically fail over between providers if DNS is shared"
       ],
       "answer": 0,
       "explain": "Multi-cloud doubles operational complexity and inter-cloud failover is hard. Multi-region within one provider is often the stronger availability answer."
      },
      {
       "q": "A new virtual network was created with a range that overlaps an acquired company's data centre. What is the long-term cost?",
       "options": [
        "No cost, because cloud virtual networks are isolated from all external routing",
        "Higher egress charges, because overlapping ranges are billed at a premium rate",
        "NAT, special-case DNS and harder troubleshooting at every point the ranges meet",
        "Loss of availability-zone redundancy for every workload in the overlapping range"
       ],
       "answer": 2,
       "explain": "Overlap forces translation wherever the networks connect, and the operational debt grows with every new service."
      },
      {
       "q": "A cloud subnet is a /24. Roughly how many addresses can workloads use?",
       "options": [
        "Exactly 256, as cloud subnets reserve no addresses",
        "Exactly 254, as on a physical LAN",
        "About 128, as half go to the gateway",
        "About 251–252, after provider reservations"
       ],
       "answer": 3,
       "explain": "Providers commonly reserve four or five addresses per subnet for gateway, DNS and internal use."
      },
      {
       "q": "On-premises clients resolve a cloud private endpoint to its public address. What is the correct design fix?",
       "options": [
        "Conditional forwarding of that zone to the cloud inbound resolver endpoint",
        "Forwarding every on-premises DNS query to the public cloud resolvers",
        "Creating hosts-file entries on every on-premises client that needs it",
        "Assigning a public address to the private endpoint for use by on-premises clients"
       ],
       "answer": 0,
       "explain": "Conditional forwarding sends only the relevant zone to the cloud resolvers, which return the private address. The other options are unscalable or reopen public exposure."
      },
      {
       "q": "When does interconnecting clouds at an exchange point make most sense?",
       "options": [
        "When inter-cloud traffic is occasional and small",
        "When no colocation presence is available at all",
        "When inter-cloud traffic is steady and significant",
        "When the clouds share one virtual network range"
       ],
       "answer": 2,
       "explain": "Exchange-point interconnection has fixed costs that pay off with volume; small or occasional traffic suits VPN or hairpinning."
      }
     ]
    }
   ]
  },
  {
   "id": "m7-l3",
   "title": "Infrastructure as Code & Designing for Automation",
   "subtitle": "Make automation a design requirement from day 0, not a project for year three",
   "minutes": 28,
   "objectives": [
    "Describe a layered automation architecture from intent to assurance",
    "Compare imperative scripting, declarative infrastructure as code and intent-based approaches",
    "Apply day-0 design principles that make a network automatable and safe to change"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "A network designed for manual operation can be automated later only with great effort: every site is slightly different, the real configuration lives on devices, and nobody can say what 'correct' looks like. A network designed for automation from day 0 has standard building blocks, a single source of truth and a pipeline that turns intent into configuration and verifies the result. The design work comes first; tooling follows."
    },
    {
     "type": "layers",
     "title": "Automation architecture (top first)",
     "items": [
      {
       "label": "Intent and service catalogue",
       "parts": [
        "Business requests: new site, new application segment, new cloud spoke",
        "Expressed as parameters, not device commands"
       ]
      },
      {
       "label": "Source of truth",
       "parts": [
        "IPAM and inventory",
        "Design data: site types, templates, policy matrix",
        "Version-controlled and reviewed"
       ]
      },
      {
       "label": "Pipeline",
       "parts": [
        "Version control and peer review",
        "Validation, simulation and plan/diff",
        "Approval gates and staged rollout"
       ]
      },
      {
       "label": "Execution",
       "parts": [
        "Infrastructure-as-code tools and device or cloud APIs",
        "Template rendering, idempotent apply"
       ]
      },
      {
       "label": "Infrastructure",
       "parts": [
        "Physical and virtual network devices",
        "Cloud networking constructs"
       ]
      },
      {
       "label": "Assurance",
       "parts": [
        "Telemetry and state validation",
        "Drift detection and reconciliation",
        "Feedback into intent and design"
       ]
      }
     ]
    },
    {
     "type": "compare",
     "title": "Approaches to automation",
     "columns": [
      {
       "title": "Imperative scripts",
       "items": [
        "Step-by-step commands: do this, then this",
        "Quick to start, familiar to engineers",
        "Fragile: the outcome depends on the starting state; hard to make safe at scale"
       ]
      },
      {
       "title": "Declarative infrastructure as code",
       "items": [
        "Describe the desired end state; the tool computes the changes",
        "Plan/diff before apply; repeatable and reviewable",
        "Needs state management and discipline to avoid manual drift"
       ]
      },
      {
       "title": "Intent-based",
       "items": [
        "Describe business outcomes; the system translates, deploys and continuously verifies",
        "Closed loop: assurance checks the network still meets intent",
        "Requires mature data models and trust in the translation layer"
       ]
      }
     ]
    },
    {
     "type": "framework",
     "title": "Day-0 design-for-automation principles",
     "items": [
      {
       "label": "A1",
       "title": "Standard building blocks",
       "text": "A small number of site, pod and cloud-spoke types, each fully parameterised. Every exception is a cost."
      },
      {
       "label": "A2",
       "title": "Data model first",
       "text": "Define the data that describes the network — sites, links, addresses, policies — before writing templates."
      },
      {
       "label": "A3",
       "title": "Single source of truth",
       "text": "One authoritative store per data type; devices are rendered from it, never the reverse."
      },
      {
       "label": "A4",
       "title": "Idempotent changes",
       "text": "Applying the same intent twice produces the same result and no side effects."
      },
      {
       "label": "A5",
       "title": "Programmable platforms",
       "text": "Select equipment and services with complete, stable APIs and structured telemetry as a design requirement."
      },
      {
       "label": "A6",
       "title": "Guardrails as code",
       "text": "Policy checks (no overlapping ranges, no any-any rules, naming standards) run automatically in the pipeline."
      },
      {
       "label": "A7",
       "title": "Drift is detected",
       "text": "Running state is compared with intended state continuously; differences are alerted or reconciled."
      },
      {
       "label": "A8",
       "title": "Break-glass exists",
       "text": "A controlled, audited manual path exists for emergencies, and its use is reconciled afterwards."
      }
     ]
    },
    {
     "type": "flow",
     "title": "A network change pipeline",
     "items": [
      {
       "label": "Commit",
       "text": "Change to source-of-truth data or templates"
      },
      {
       "label": "Review",
       "text": "Peer review and automated linting"
      },
      {
       "label": "Verify",
       "text": "Model-based checks, simulation or a digital twin"
      },
      {
       "label": "Plan",
       "text": "Diff of exactly what will change on which device"
      },
      {
       "label": "Deploy in waves",
       "text": "Canary, then failure domains in order"
      },
      {
       "label": "Assure",
       "text": "Post-checks against intent; automatic rollback on failure"
      }
     ]
    },
    {
     "type": "table",
     "title": "What to automate first — decision matrix",
     "head": [
      "Task",
      "Frequency",
      "Risk if wrong",
      "Priority"
     ],
     "rows": [
      [
       "Configuration backup and compliance audit",
       "Daily",
       "Low (read-only)",
       "First — builds the inventory and baseline"
      ],
      [
       "New cloud spoke or branch from a standard type",
       "Weekly",
       "Medium",
       "Early — high value, repeatable"
      ],
      [
       "Access-port and segmentation changes",
       "Daily",
       "Medium",
       "Early, with guardrails"
      ],
      [
       "Software upgrades",
       "Quarterly",
       "High",
       "After pre/post-checks and drain automation exist"
      ],
      [
       "Core routing policy changes",
       "Rare",
       "Very high",
       "Last — automate verification before automating the change"
      ]
     ]
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "A pipeline that can update 2,000 devices in five minutes can also break 2,000 devices in five minutes. Tie automation to the change-wave and blast-radius design from the resilience module: canaries, failure-domain ordering, automatic halt on failed post-checks, and rate limits on how much can change at once.",
     "title": "Automation multiplies whatever it is given"
    },
    {
     "type": "callout",
     "kind": "insight",
     "text": "In cloud, a single change made by hand in a console silently diverges from the code. The next pipeline run either reverts it — surprising whoever made it — or fails. Design permissions so production network constructs can be changed only through the pipeline, with break-glass access audited and reconciled.",
     "title": "Console changes create drift"
    },
    {
     "type": "scenario",
     "title": "Where should the ministry's automation start?",
     "situation": "A ministry's network team of eight engineers runs 300 district offices, two data centres and a growing cloud estate. Every district office is configured slightly differently. Leadership has approved budget for 'network automation' and a manager proposes buying an orchestration platform and pointing it at the existing devices.",
     "options": [
      {
       "text": "Define two or three standard office types and a data model, build a source of truth and read-only compliance checks, then automate deployment of the standard types.",
       "feedback": "Best. It creates the standard and the data that any tool needs, delivers early value through visibility, and makes later automation safe.",
       "best": true
      },
      {
       "text": "Buy the platform and import current device configurations as the starting templates.",
       "feedback": "Importing 300 unique configurations automates the inconsistency; the platform will have no clean model to enforce.",
       "best": false
      },
      {
       "text": "Write scripts to push urgent changes to all offices immediately, then think about structure later.",
       "feedback": "Fast early wins, but scripts against inconsistent devices are fragile and increase risk at scale.",
       "best": false
      },
      {
       "text": "Postpone automation until every office has been physically refreshed to new hardware.",
       "feedback": "Hardware refresh is not a prerequisite for standards and a source of truth; waiting delays benefits for years.",
       "best": false
      }
     ]
    },
    {
     "type": "checklist",
     "title": "Automation-readiness checklist",
     "items": [
      "Site, pod and cloud-spoke types are standardised and parameterised",
      "A data model and source of truth exist for addresses, inventory and policy",
      "Platforms were selected with complete APIs and structured telemetry",
      "Changes flow through review, validation, plan and staged deployment",
      "Guardrails run automatically in the pipeline",
      "Drift detection compares running state with intended state",
      "Break-glass access is controlled, audited and reconciled"
     ]
    },
    {
     "type": "reflection",
     "prompt": "If you had to rebuild one of your sites from data alone tomorrow, what information would be missing? That gap is where your source of truth should start."
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Infrastructure as code",
       "def": "Defining infrastructure in version-controlled files that tools apply to create or change resources."
      },
      {
       "term": "Declarative",
       "def": "Describing the desired end state and letting a tool determine the steps to reach it."
      },
      {
       "term": "Idempotent",
       "def": "Producing the same result no matter how many times an operation is applied."
      },
      {
       "term": "Source of truth",
       "def": "The authoritative data store from which network configuration is generated."
      },
      {
       "term": "Drift",
       "def": "A difference between a system's running configuration and its intended, codified state."
      },
      {
       "term": "Intent-based networking",
       "def": "An approach in which business intent is translated into configuration and continuously verified."
      },
      {
       "term": "Digital twin",
       "def": "A model of the production network used to test changes before deployment."
      },
      {
       "term": "Guardrail",
       "def": "An automated policy check that blocks changes violating agreed standards."
      },
      {
       "term": "Break-glass access",
       "def": "An emergency manual access path that bypasses normal automation under strict audit."
      }
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "What distinguishes declarative infrastructure as code from imperative scripting?",
       "options": [
        "It runs commands in a strict order so the outcome depends on the starting state",
        "It describes the desired end state and computes the changes needed to reach it",
        "It removes the need for version control because the tool stores all history",
        "It can only manage cloud resources and never physical network devices"
       ],
       "answer": 1,
       "explain": "Declarative tools reconcile current state with desired state and show a plan before applying. Imperative scripts execute steps whose outcome depends on where you start."
      },
      {
       "q": "A team wants to automate deployments across 300 inconsistent branch configurations. What should come first?",
       "options": [
        "Standard site types and a data model in a source of truth",
        "A script that pushes the same change to every branch at once",
        "An import of all current configurations as the master templates",
        "A hardware refresh so that every branch runs the same platform"
       ],
       "answer": 0,
       "explain": "Automation needs a clean model of what correct looks like. Without standards, tools simply reproduce inconsistency at speed."
      },
      {
       "q": "Why should production cloud network constructs be changeable only through the pipeline?",
       "options": [
        "Cloud consoles cannot modify route tables or security groups directly in production",
        "Manual console changes cause drift that the next pipeline run reverts or fails on",
        "Pipeline changes are billed at lower rates than changes made in the console",
        "Providers require pipeline-only access for private connectivity to function"
       ],
       "answer": 1,
       "explain": "Drift breaks the link between code and reality. Restricting change paths keeps the source of truth authoritative."
      },
      {
       "q": "Which task is usually the safest first candidate for network automation?",
       "options": [
        "Core routing policy changes across all of the regions",
        "Fleet-wide software upgrades during business hours",
        "Emergency changes made during a major live incident",
        "Read-only configuration backup and compliance auditing"
       ],
       "answer": 3,
       "explain": "Read-only tasks build inventory and baselines with no risk of outage, and they reveal how far the estate is from standard."
      },
      {
       "q": "What does the assurance layer add in an intent-based design?",
       "options": [
        "A faster way to render templates into device configuration files",
        "A replacement for the peer review of changes before they are deployed",
        "Continuous checks that the network still meets the declared intent",
        "An approval step that removes the need for a source of truth"
       ],
       "answer": 2,
       "explain": "Assurance closes the loop by checking running state and behaviour against intent, detecting drift and failures after deployment."
      }
     ]
    }
   ]
  },
  {
   "id": "m7-l4",
   "title": "Observability & Cost-Aware Network Design",
   "subtitle": "Design what you will measure and what you will pay before you build",
   "minutes": 28,
   "objectives": [
    "Design an observability architecture with service-level objectives for the network",
    "Estimate the main cost drivers of hybrid and cloud network designs",
    "Apply cost-aware patterns without weakening resilience or security"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Two questions decide whether a cloud or hybrid network design survives its first year: **can the team see what is happening**, and **does the bill match the business case?** Both are design questions. Visibility that is not designed in is hard to retrofit, and network costs in cloud are dominated by traffic patterns that the architecture itself creates."
    },
    {
     "type": "layers",
     "title": "Observability stack",
     "items": [
      {
       "label": "Objectives and alerting",
       "parts": [
        "Service-level objectives per network service",
        "Alerts on objective burn, not on every metric"
       ]
      },
      {
       "label": "Analysis",
       "parts": [
        "Dashboards, correlation, anomaly detection",
        "Topology-aware root-cause views"
       ]
      },
      {
       "label": "Collection",
       "parts": [
        "Streaming telemetry and metrics",
        "Flow records and cloud flow logs",
        "Logs and events",
        "Synthetic tests and path tracing"
       ]
      },
      {
       "label": "Sources",
       "parts": [
        "Devices, appliances and cloud constructs",
        "Hosts, load balancers and applications"
       ]
      }
     ]
    },
    {
     "type": "compare",
     "title": "Measurement methods",
     "columns": [
      {
       "title": "Polling (for example SNMP)",
       "items": [
        "Simple and universal",
        "Coarse intervals hide micro-bursts",
        "Load grows with scale"
       ]
      },
      {
       "title": "Streaming telemetry",
       "items": [
        "Devices push structured data at short intervals or on change",
        "Better resolution and scale",
        "Needs a collection pipeline and data model"
       ]
      },
      {
       "title": "Synthetic tests",
       "items": [
        "Active probes measure latency, loss and reachability along real paths",
        "Show user experience, including paths you do not own",
        "Measure only what you probe"
       ]
      }
     ]
    },
    {
     "type": "table",
     "title": "Network signals worth objectives",
     "head": [
      "Signal",
      "Example objective",
      "Why it matters"
     ],
     "rows": [
      [
       "Reachability",
       "99.95% of synthetic probes between branches and the order platform succeed per month",
       "The most direct measure of service availability"
      ],
      [
       "Latency",
       "95th percentile branch-to-cloud latency under 40 ms",
       "Drives application response time"
      ],
      [
       "Loss",
       "Under 0.1% on the voice class",
       "Real-time traffic degrades quickly with loss"
      ],
      [
       "Saturation",
       "No redundant pair above its survivable ceiling for more than 15 minutes",
       "Links failover risk to capacity"
      ],
      [
       "Change health",
       "Under 2% of automated changes rolled back",
       "Measures the safety of the delivery process"
      ]
     ]
    },
    {
     "type": "formula",
     "title": "Cost-aware design formulas",
     "items": [
      {
       "name": "Monthly egress cost",
       "expr": "Cost = GB leaving the provider × egress rate per GB",
       "meaning": "Internet egress and private-connectivity egress are often priced differently."
      },
      {
       "name": "Private connectivity break-even",
       "expr": "Break-even GB per month = fixed monthly port and circuit fees ÷ (internet rate − private rate)",
       "meaning": "Above this volume, private connectivity is cheaper as well as more predictable."
      },
      {
       "name": "Processing charges",
       "expr": "Cost = GB through a managed gateway × per-GB processing fee",
       "meaning": "Managed NAT gateways, transit hubs and inspection services often charge per GB on top of hourly fees."
      }
     ]
    },
    {
     "type": "steps",
     "title": "Worked example — is a private connection worth it? (illustrative prices)",
     "items": [
      {
       "title": "Inputs",
       "text": "50 TB a month leaves the cloud to on premises. Illustrative internet egress is 0.08 per GB, private egress 0.02 per GB, and port plus circuit fees are 1,600 a month."
      },
      {
       "title": "Internet path cost",
       "text": "50,000 GB × 0.08 = **4,000** a month."
      },
      {
       "title": "Private path cost",
       "text": "50,000 GB × 0.02 + 1,600 = **2,600** a month — a saving of 1,400."
      },
      {
       "title": "Break-even",
       "text": "1,600 ÷ (0.08 − 0.02) ≈ **26,700 GB**. Below about 27 TB a month, the VPN is cheaper on transfer cost alone; above it, the private connection wins — before counting its performance benefits."
      }
     ]
    },
    {
     "type": "table",
     "title": "Cost-aware patterns",
     "head": [
      "Pattern",
      "Saves",
      "Watch for"
     ],
     "rows": [
      [
       "Private endpoints or gateway endpoints for provider services",
       "NAT gateway processing and internet egress",
       "DNS design for private endpoints"
      ],
      [
       "Keep chatty tiers within a zone, replicate across zones deliberately",
       "Cross-zone transfer charges",
       "Do not trade away zone resilience for small savings"
      ],
      [
       "Inspect only what policy requires in the hub",
       "Hub and appliance processing per GB",
       "Document which flows skip inspection and why"
      ],
      [
       "Cache and compress at the edge, use content delivery for public content",
       "Internet egress",
       "Cache invalidation and data residency"
      ],
      [
       "Tag network resources and show cost per team",
       "Unowned spend",
       "Shared hubs need a fair allocation model"
      ]
     ]
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "Sending every spoke-to-spoke and spoke-to-internet flow through a central inspection hub is attractive for security, but each traversal can pay transit attachment processing and appliance throughput charges. Decide flow by flow which inspection is required, and price the design before approving it.",
     "title": "The centralised inspection bill"
    },
    {
     "type": "case",
     "title": "Ministry hybrid-cloud move",
     "context": "A government ministry with 120 district offices plans to move its citizen-services portal to a public cloud region inside the country, as required by data-residency law. The citizen records database must stay in the ministry's own data centre for the next three years. The portal makes many small queries to the records database for each citizen request. District offices reach the data centre over a national WAN. Peak portal traffic is about 1.5 Gbps; the availability target is 99.9%, with 99.95% required within two years. The finance ministry demands a monthly cost forecast and will scrutinise overruns. The network team is small and has no cloud experience.",
     "questions": [
      "How should the cloud region connect to the ministry data centre, and why?",
      "What does the chatty portal-to-database pattern imply for the design?",
      "How should addressing, DNS and automation be set up from day 0?",
      "How will you forecast and control monthly network cost?"
     ],
     "answer": "**Connectivity:** start with private connectivity from the ministry data centre to the in-country region, plus an IPsec VPN as backup sized for critical portal traffic, which fits 99.9%. Plan a second private connection at a diverse location to reach 99.95% within two years. **Chatty pattern:** many small queries per request make latency, not bandwidth, the main risk — measure the round trip, and if it is too high, add a read cache or API layer in the cloud near the portal rather than routing every query across the hybrid link; keep a synthetic test on that path with a latency objective. **Addressing and DNS:** allocate a dedicated, non-overlapping aggregate for the cloud region from the ministry's IPAM; design conditional forwarding in both directions so the portal resolves the database by its internal name and on-premises staff resolve cloud private endpoints correctly. **Automation:** build the cloud network as code from day 0 with a standard spoke type and pipeline guardrails; restrict console changes; use the small team's time on standards rather than hand-built resources. **Cost:** model egress (mostly responses to citizens over the internet and database replies, which are on-premises egress), private-connectivity port fees, transit and NAT processing; use private endpoints for provider services; tag all resources; publish a monthly forecast with alerts when actual spend exceeds forecast by an agreed margin."
    },
    {
     "type": "scenario",
     "title": "The surprise NAT bill",
     "situation": "A team notices that its managed NAT gateway processing charges have tripled. Investigation shows nightly backups and container image pulls going from private subnets to the provider's own storage and registry services through the NAT gateway.",
     "options": [
      {
       "text": "Move the workloads to public subnets with public addresses so they bypass the NAT gateway.",
       "feedback": "This removes the charge by exposing workloads directly to the internet — a security regression.",
       "best": false
      },
      {
       "text": "Schedule backups less often to reduce the volume.",
       "feedback": "Reduces cost by weakening the recovery point objective, which is a business decision, not a network fix.",
       "best": false
      },
      {
       "text": "Replace the managed NAT gateway with a larger instance size.",
       "feedback": "Processing is billed per GB; a bigger gateway does not reduce per-GB charges.",
       "best": false
      },
      {
       "text": "Add private or gateway endpoints for the storage and registry services so that traffic stays on the provider's private network.",
       "feedback": "Best. Traffic to provider services no longer traverses the NAT gateway, reducing cost and keeping workloads private; update DNS so names resolve to the endpoints.",
       "best": true
      }
     ]
    },
    {
     "type": "template",
     "title": "Network cost and observability forecast",
     "purpose": "Forecast the monthly cost drivers of a hybrid design alongside the objectives that prove it works, so finance and operations review the same sheet.",
     "columns": [
      "Cost or signal",
      "Driver / volume",
      "Unit rate or objective",
      "Monthly forecast",
      "Owner",
      "Alert threshold",
      "Notes"
     ],
     "example": [
      [
       "Private connectivity",
       "2 ports + circuits",
       "Fixed fee",
       "1,600",
       "Network team",
       "+10% vs forecast",
       "Second location planned in year 2"
      ],
      [
       "Portal-to-database latency",
       "Synthetic probe every 30 s",
       "p95 < 10 ms",
       "n/a",
       "Platform team",
       "Objective burn > 5% in 1 h",
       "Triggers cache review if breached"
      ]
     ],
     "rows": 8
    },
    {
     "type": "checklist",
     "title": "Observability and cost checklist",
     "items": [
      "Each network service has objectives for reachability, latency, loss and saturation",
      "Streaming telemetry, flow logs and synthetic tests cover hybrid and cloud paths",
      "Alerts fire on objective burn rather than on every metric",
      "Egress, processing and port costs are modelled before the design is approved",
      "Provider services are reached through private or gateway endpoints",
      "Inspection is applied per flow according to policy, not by default to everything",
      "Resources are tagged and cost is reported per owner"
     ]
    },
    {
     "type": "reflection",
     "prompt": "Which flow in your current or planned cloud design is the most expensive per gigabyte, and is that cost buying you something the business actually requires?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Observability",
       "def": "The ability to understand a system's internal state from the telemetry it produces."
      },
      {
       "term": "Service-level objective",
       "def": "A measurable target for a service, such as latency or availability, over a defined period."
      },
      {
       "term": "Streaming telemetry",
       "def": "Push-based, structured export of device data at high frequency or on change."
      },
      {
       "term": "Synthetic test",
       "def": "An active probe that measures reachability and performance along a path."
      },
      {
       "term": "Flow log",
       "def": "A record of network flows produced by a cloud platform or device, without payload."
      },
      {
       "term": "Processing charge",
       "def": "A per-GB fee for traffic passing through a managed cloud network service."
      },
      {
       "term": "Gateway endpoint",
       "def": "A route-table-based path to a provider service that keeps traffic off the internet and NAT."
      },
      {
       "term": "Showback",
       "def": "Reporting cost to the teams that cause it, without necessarily charging them."
      }
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Monthly fixed fees for a private connection are 1,600 and the egress price difference versus internet is 0.06 per GB. What is the approximate break-even volume?",
       "options": [
        "About 27 TB per month",
        "About 2.7 TB per month",
        "About 96 TB per month",
        "About 270 TB per month"
       ],
       "answer": 0,
       "explain": "1,600 ÷ 0.06 ≈ 26,700 GB, or about 27 TB a month. Above that volume, private connectivity is cheaper on transfer cost."
      },
      {
       "q": "NAT gateway charges have tripled because workloads reach the provider's storage service through it. What is the best fix?",
       "options": [
        "Give the workloads public addresses and move them into public subnets",
        "Move to a larger NAT gateway with more throughput",
        "Reduce backup frequency so less traffic is sent",
        "Use private or gateway endpoints for the provider service"
       ],
       "answer": 3,
       "explain": "Endpoints keep provider-service traffic off the NAT path and private. The other options weaken security, do not change per-GB charges, or trade away recovery objectives."
      },
      {
       "q": "Why are synthetic tests valuable in hybrid designs?",
       "options": [
        "They replace flow logs as the main source of security evidence in cloud estates",
        "They remove the need for any telemetry from network devices",
        "They measure real path performance, including segments you do not own",
        "They reduce egress costs by caching data near the users"
       ],
       "answer": 2,
       "explain": "Active probes show reachability and latency end to end across provider and carrier networks that you cannot instrument directly."
      },
      {
       "q": "An alerting design pages engineers on every interface over 70% utilisation. What is the better approach?",
       "options": [
        "Lower the alert threshold to 50% so that problems are caught even earlier",
        "Alert on objective burn and on pairs above their survivable ceiling",
        "Remove utilisation monitoring because cloud capacity is unlimited",
        "Page only when an interface has been completely down for an hour"
       ],
       "answer": 1,
       "explain": "Objective-based alerting focuses attention on user impact and real risk instead of noisy thresholds."
      },
      {
       "q": "A chatty portal in the cloud makes many small queries to an on-premises database. What is the main design risk?",
       "options": [
        "Bandwidth exhaustion on the private connection to the provider",
        "Round-trip latency multiplied across many queries per request",
        "IP address exhaustion in the portal's virtual network subnets",
        "Excessive DNS queries overwhelming the cloud resolver service"
       ],
       "answer": 1,
       "explain": "Each query pays the hybrid round trip; dozens per request quickly add up. Caching or an API layer near the portal reduces the number of crossings."
      }
     ]
    }
   ]
  }
 ]
});
TRACK.modules.push({
 "id": "m8",
 "order": 8,
 "code": "Scenario",
 "title": "Design Scenarios, Migration & Capstone",
 "subtitle": "Staged scenarios, constraint reading, migration and rollback, executive communication and the capstone",
 "outcomes": [
  "Read staged design scenarios for hard constraints and adapt decisions as information changes",
  "Choose migration strategies and design rollback, go/no-go and point-of-no-return controls",
  "Communicate designs to executives in terms of decisions, cost and residual risk",
  "Apply all eight sheets of the ZCDE Design Blueprint to a multi-stage scenario",
  "Prepare for scenario-based assessment and plan the ZCDE capstone"
 ],
 "lessons": [
  {
   "id": "m8-l1",
   "title": "How Expert Design Scenarios Unfold",
   "subtitle": "Requirements arrive in pieces and change underfoot — learn to read, decide and adapt",
   "minutes": 26,
   "objectives": [
    "Describe how real design engagements and scenario assessments reveal information in stages",
    "Read a brief for hard constraints, soft preferences and hidden signals",
    "Absorb new information without discarding sound earlier decisions"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "No design engagement hands you a complete, stable specification. The first meeting reveals the obvious goals; the second reveals the budget; the third reveals that the regulator, the union or the acquired company has its own ideas. Expert designers are distinguished less by what they know than by how they behave as information arrives: they extract constraints quickly, commit to decisions with stated assumptions, and adjust only what the new information actually touches."
    },
    {
     "type": "flow",
     "title": "How a design scenario unfolds",
     "items": [
      {
       "label": "Brief",
       "text": "Background, business goals, current estate"
      },
      {
       "label": "Extract",
       "text": "Requirements, constraints, assumptions, risks"
      },
      {
       "label": "Decide",
       "text": "Initial design choices with rationale"
      },
      {
       "label": "New information",
       "text": "A constraint changes or a stakeholder speaks up"
      },
      {
       "label": "Re-evaluate",
       "text": "Revisit only the decisions the change touches"
      },
      {
       "label": "Plan the move",
       "text": "Migration, rollback, sequencing"
      },
      {
       "label": "Communicate",
       "text": "Explain decisions and trade-offs to each audience"
      }
     ]
    },
    {
     "type": "framework",
     "title": "Reading a brief for what matters",
     "items": [
      {
       "label": "R1",
       "title": "Business driver",
       "text": "Why the project exists — revenue, regulation, risk, cost. Every design choice must serve it."
      },
      {
       "label": "R2",
       "title": "Hard constraints",
       "text": "Budget ceilings, legal and regulatory rules, fixed dates, existing contracts, skills that cannot be hired in time."
      },
      {
       "label": "R3",
       "title": "Soft preferences",
       "text": "Familiar technologies, preferred suppliers, a manager's favourite architecture. Respect them, but they yield to hard constraints."
      },
      {
       "label": "R4",
       "title": "Brownfield reality",
       "text": "What already exists and cannot be replaced at once: addressing, protocols, contracts, staff habits."
      },
      {
       "label": "R5",
       "title": "Signal words",
       "text": "Words like must, only, currently, planned, next year and without interruption often carry the key constraint."
      },
      {
       "label": "R6",
       "title": "Stakeholder tension",
       "text": "Conflicting goals between security and operations, finance and availability, headquarters and regions."
      }
     ]
    },
    {
     "type": "table",
     "title": "Signal words and what they usually mean",
     "head": [
      "Phrase in the brief",
      "Likely meaning",
      "Design implication"
     ],
     "rows": [
      [
       "'within the existing budget'",
       "No new capital",
       "Favour reuse, phased investment, operating-cost options"
      ],
      [
       "'the team is familiar with…'",
       "Operational skills constraint",
       "Prefer designs the team can run; budget training if not"
      ],
      [
       "'the regulator requires…'",
       "Hard, non-negotiable constraint",
       "Design to the rule first; optimise everything else around it"
      ],
      [
       "'must not be interrupted'",
       "Zero-downtime migration",
       "Parallel run or phased cut-overs with tested rollback"
      ],
      [
       "'we plan to acquire…' or 'expand into…'",
       "Future scale and integration",
       "Address space, routing policy and segmentation that absorb growth"
      ],
      [
       "'currently uses…'",
       "Brownfield dependency",
       "Coexistence and migration path are part of the design"
      ]
     ]
    },
    {
     "type": "compare",
     "title": "Hard versus soft constraints",
     "columns": [
      {
       "title": "Hard constraints",
       "items": [
        "Cannot be traded away without the sponsor's explicit decision",
        "Examples: law, regulation, contract terms, budget ceiling, safety",
        "A design that violates one is wrong, however elegant"
       ]
      },
      {
       "title": "Soft constraints and preferences",
       "items": [
        "Can be traded when they conflict with something more important",
        "Examples: preferred supplier, familiar protocol, aesthetic consistency",
        "Trade them openly and record why"
       ]
      }
     ]
    },
    {
     "type": "steps",
     "title": "Absorbing new information",
     "items": [
      {
       "title": "Read the delta",
       "text": "Identify exactly what is new or changed — do not reread the whole brief through a new lens."
      },
      {
       "title": "Classify it",
       "text": "Is it a new requirement, a changed constraint, a clarification or a risk that has materialised?"
      },
      {
       "title": "Trace the impact",
       "text": "Which earlier decisions depend on the changed item? Use the decision log to find them."
      },
      {
       "title": "Keep what still holds",
       "text": "Decisions untouched by the change stay. Redesigning everything signals panic, not rigour."
      },
      {
       "title": "Update and record",
       "text": "Change the affected decisions, note the reason and the new assumptions."
      },
      {
       "title": "Communicate",
       "text": "Tell stakeholders what changed, what it costs and what risk is now accepted."
      }
     ]
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "**Anchoring**: defending the first design after a constraint has changed, because changing feels like admitting error. **Thrashing**: redesigning everything every time something changes, so no decision ever stabilises. The expert path lies between: decisions are firm but traceable, and each one names the assumptions that would reopen it.",
     "title": "Two classic failure modes"
    },
    {
     "type": "scenario",
     "title": "The budget cut",
     "situation": "Earlier in an engagement you recommended private connections at two diverse exchange locations to reach a 99.95% target for a cloud-hosted service. The sponsor now reports a 40% cut in the network budget for this year. The availability target is unchanged for next year, but this year's target is relaxed to 99.9%.",
     "options": [
      {
       "text": "Keep the original design and ask the sponsor to find the money elsewhere.",
       "feedback": "Ignores a changed hard constraint; the sponsor has already told you the money is not there.",
       "best": false
      },
      {
       "text": "Phase the connectivity: one private connection plus a VPN backup sized for critical traffic this year, with the second diverse connection planned for next year and the interim risk recorded.",
       "feedback": "Best. It meets this year's target within budget, keeps the path to next year's target, and makes the accepted risk explicit.",
       "best": true
      },
      {
       "text": "Restart the design from scratch with a cheaper technology family.",
       "feedback": "Thrashing: most earlier decisions — addressing, routing, segmentation — are unaffected by the budget change.",
       "best": false
      },
      {
       "text": "Drop private connectivity and run everything over internet VPN permanently.",
       "feedback": "Meets the budget but abandons next year's 99.95% target and the predictability the service needs.",
       "best": false
      }
     ]
    },
    {
     "type": "callout",
     "kind": "pro",
     "text": "For each decision record: the decision, the options considered, the reason, the assumptions it depends on and the requirement it serves. When new information arrives, search the log for affected assumptions. This turns a confusing change into a short, defensible list of updates.",
     "title": "Keep a decision log"
    },
    {
     "type": "checklist",
     "title": "Scenario-reading checklist",
     "items": [
      "The business driver is written in one sentence",
      "Every hard constraint is listed with its source",
      "Soft preferences are recorded separately from hard constraints",
      "Brownfield dependencies and coexistence needs are identified",
      "Stakeholder tensions are named, with who decides",
      "Each design decision lists the assumptions that would reopen it",
      "New information is classified before any decision is changed"
     ]
    },
    {
     "type": "reflection",
     "prompt": "Recall a project where requirements changed midway. Did the team anchor, thrash or adapt cleanly? What would a decision log have changed?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Hard constraint",
       "def": "A limit that cannot be traded away without an explicit decision by the sponsor, such as law or a budget ceiling."
      },
      {
       "term": "Soft constraint",
       "def": "A preference that can be traded when it conflicts with more important requirements."
      },
      {
       "term": "Brownfield",
       "def": "An environment with existing systems that a new design must coexist with or migrate from."
      },
      {
       "term": "Decision log",
       "def": "A record of design decisions with options considered, rationale and dependent assumptions."
      },
      {
       "term": "Anchoring",
       "def": "Holding on to an initial design or estimate despite new information that should change it."
      },
      {
       "term": "Thrashing",
       "def": "Repeatedly redesigning in response to each change so that no decision stabilises."
      },
      {
       "term": "Assumption",
       "def": "A condition treated as true for design purposes, which must be validated or monitored."
      },
      {
       "term": "Signal word",
       "def": "A word or phrase in a brief that indicates a constraint or priority, such as must or without interruption."
      }
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "A brief says the regulator requires transaction data to remain in-country, and the IT director prefers a particular cloud provider that has no in-country region. How should the designer treat these?",
       "options": [
        "The preference wins because the IT director is also the project's sponsor",
        "Both are soft constraints to be balanced against the overall cost",
        "Both are hard constraints, so the project cannot go ahead at all",
        "The regulatory rule is a hard constraint; the preference yields to it"
       ],
       "answer": 3,
       "explain": "Regulation is non-negotiable without a formal decision; supplier preference is a soft constraint that gives way when they conflict."
      },
      {
       "q": "Midway through a design, the sponsor announces an acquisition of a company with overlapping address space. What should the designer do first?",
       "options": [
        "Restart the whole design so that the acquisition is properly reflected throughout",
        "Ignore it until the acquisition completes and the networks are joined",
        "Classify the change and trace which earlier decisions it actually affects",
        "Add NAT everywhere so that every overlap is handled automatically"
       ],
       "answer": 2,
       "explain": "Tracing impact keeps unaffected decisions stable and focuses effort on addressing, routing and segmentation decisions that change."
      },
      {
       "q": "What does 'must not be interrupted' in a brief most often imply?",
       "options": [
        "Parallel running or phased cut-overs with tested rollback",
        "A requirement for 99.999% availability on every network component",
        "A ban on any configuration changes until the project has finished",
        "A need to use the newest hardware to avoid any risk of failure"
       ],
       "answer": 0,
       "explain": "The phrase usually signals a zero-downtime migration constraint, which shapes the migration strategy more than component choice."
      },
      {
       "q": "Which behaviour best describes anchoring in a design engagement?",
       "options": [
        "Recording assumptions alongside each design decision",
        "Redesigning everything whenever a stakeholder speaks",
        "Defending the original design after a constraint has changed",
        "Phasing investments to match a reduced annual budget"
       ],
       "answer": 2,
       "explain": "Anchoring is clinging to the first answer. Redesigning everything is thrashing, while recording assumptions and phasing are healthy practices."
      },
      {
       "q": "What is the main value of listing the assumptions behind each design decision?",
       "options": [
        "When information changes, you can quickly find which decisions to revisit",
        "Assumptions transfer the design risk from the designer to the sponsor",
        "Listing them removes the need to validate them with the stakeholders later on",
        "It allows the design to be approved without any review by operations"
       ],
       "answer": 0,
       "explain": "Assumptions are the hooks that connect new information to affected decisions, enabling targeted change rather than wholesale redesign."
      }
     ]
    }
   ]
  },
  {
   "id": "m8-l2",
   "title": "Migration Strategies, Risk & Rollback Design",
   "subtitle": "Getting from here to there is part of the design — and often the riskiest part",
   "minutes": 30,
   "objectives": [
    "Compare phased, parallel-run and big-bang migration strategies",
    "Design rollback points, go/no-go decisions and a point of no return",
    "Plan coexistence for merged or brownfield networks"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "A target design that cannot be reached safely is not a design; it is a picture. Migration is where outages, overruns and lost confidence happen, and where an expert designer earns trust. The question is not only 'what is the end state?' but 'what are the intermediate states, how long do we live in each, and how do we get back if one fails?'"
    },
    {
     "type": "compare",
     "title": "Migration strategies",
     "columns": [
      {
       "title": "Phased",
       "items": [
        "Move in waves — by site, service or failure domain",
        "Each wave is small; lessons feed the next",
        "Long coexistence period between old and new",
        "Default choice for large estates"
       ]
      },
      {
       "title": "Parallel run",
       "items": [
        "Old and new run side by side; traffic or users move gradually",
        "Easy rollback: move traffic back",
        "Double cost and effort while both run",
        "Fits critical services with zero-interruption requirements"
       ]
      },
      {
       "title": "Big bang",
       "items": [
        "Everything moves in one cut-over",
        "Shortest coexistence; simplest end state",
        "Highest risk; rollback is all or nothing",
        "Fits small estates, or cases where coexistence is impossible"
       ]
      }
     ]
    },
    {
     "type": "table",
     "title": "Choosing a strategy — decision matrix",
     "head": [
      "Factor",
      "Favours phased",
      "Favours parallel run",
      "Favours big bang"
     ],
     "rows": [
      [
       "Estate size",
       "Large",
       "Any, for critical services",
       "Small"
      ],
      [
       "Interruption tolerance",
       "Short per-wave windows acceptable",
       "Near zero",
       "One longer window acceptable"
      ],
      [
       "Coexistence feasibility",
       "Old and new can interoperate",
       "Both can serve the same users",
       "Old and new cannot interoperate"
      ],
      [
       "Budget for double running",
       "Moderate",
       "High",
       "Low"
      ],
      [
       "Team experience with the new design",
       "Building",
       "Building",
       "High, with rehearsal"
      ]
     ]
    },
    {
     "type": "framework",
     "title": "Migration risk controls",
     "items": [
      {
       "label": "MR1",
       "title": "Pilot",
       "text": "Migrate a representative but low-impact target first and measure everything."
      },
      {
       "label": "MR2",
       "title": "Coexistence design",
       "text": "Design the interop boundary — routing, addressing, policy — as carefully as the end state."
      },
      {
       "label": "MR3",
       "title": "Rollback points",
       "text": "Define, per step, how to go back, how long it takes and what triggers it."
      },
      {
       "label": "MR4",
       "title": "Point of no return",
       "text": "Identify the step after which rollback is no longer possible, and gate it with a formal decision."
      },
      {
       "label": "MR5",
       "title": "Change freeze",
       "text": "Stop unrelated changes during migration windows so failures are attributable."
      },
      {
       "label": "MR6",
       "title": "Hypercare",
       "text": "Staff a heightened support period after each wave with clear escalation."
      }
     ]
    },
    {
     "type": "flow",
     "title": "One migration wave",
     "items": [
      {
       "label": "Prepare",
       "text": "Pre-stage configuration, confirm prerequisites"
      },
      {
       "label": "Pre-check",
       "text": "Capture baseline routing, reachability, application health"
      },
      {
       "label": "Cut-over",
       "text": "Execute scripted steps with timestamps"
      },
      {
       "label": "Validate",
       "text": "Compare against baseline; run application tests"
      },
      {
       "label": "Go / no-go",
       "text": "Commit or roll back by the decision time"
      },
      {
       "label": "Hypercare",
       "text": "Monitor closely; resolve issues fast"
      },
      {
       "label": "Decommission",
       "text": "Remove the old path once stable"
      }
     ]
    },
    {
     "type": "formula",
     "title": "Rollback timing",
     "items": [
      {
       "name": "Latest go/no-go time",
       "expr": "T_decision = window end − rollback duration − safety margin",
       "meaning": "If validation is not complete by this time, roll back. Do not negotiate with the clock."
      },
      {
       "name": "Worked example",
       "expr": "05:00 − 50 min − 20 min = 03:50",
       "meaning": "With a window ending at 05:00, a rehearsed 50-minute rollback and a 20-minute margin, the decision must be made by 03:50."
      },
      {
       "name": "Risk exposure",
       "expr": "Exposure = probability × impact",
       "meaning": "Compare per wave to choose sequencing: low-exposure waves first build evidence for high-exposure ones."
      }
     ]
    },
    {
     "type": "scenario",
     "title": "03:40 and still failing",
     "situation": "A data-centre core migration starts at 00:00 with a window that ends at 05:00. The rehearsed rollback takes 50 minutes, and the team agreed a 20-minute margin. At 03:40, two of twelve application validation tests are still failing; the engineers believe they can fix them in 'about half an hour'.",
     "options": [
      {
       "text": "Start the rollback now, as agreed, and analyse the failures before rescheduling.",
       "feedback": "Best. The decision time is 03:50; at 03:40 the agreed criteria are not met. Rolling back preserves the service and the team's credibility.",
       "best": true
      },
      {
       "text": "Continue troubleshooting until 04:30, then decide.",
       "feedback": "At 04:30 a 50-minute rollback would finish at 05:20, outside the window. The team has silently passed its decision point.",
       "best": false
      },
      {
       "text": "Commit the migration and fix the two applications during business hours.",
       "feedback": "Accepting known failures without the owners' agreement turns a migration risk into a business incident.",
       "best": false
      },
      {
       "text": "Extend the maintenance window by phoning the duty manager.",
       "feedback": "Changing the window mid-flight, under pressure, is how controlled migrations become outages; it may also breach commitments to users.",
       "best": false
      }
     ]
    },
    {
     "type": "cli",
     "title": "Keeping an old AS number visible during a merger",
     "device": "PE1 · IOS-style CLI",
     "lines": [
      "! PE1 now runs the merged AS 64500; customer still peers with legacy AS 64510",
      "router bgp 64500",
      " neighbor 198.51.100.9 remote-as 64499",
      " neighbor 198.51.100.9 description Customer C - unchanged config",
      " neighbor 198.51.100.9 local-as 64510 no-prepend replace-as"
     ],
     "note": "The customer keeps its configuration pointing at AS 64510. no-prepend stops the local AS being added to routes received from the customer, and replace-as hides the real AS 64500 in routes sent to it, so AS-path lengths stay as they were. The feature buys time; plan when each customer will move to the new AS."
    },
    {
     "type": "case",
     "title": "Telecom merger migration",
     "context": "Two regional operators merge. Operator A (AS 64500) runs IS-IS and an MPLS core across 60 points of presence; Operator B (AS 64510) runs OSPF and an MPLS core across 35. Both use 10.0.0.0/8 for infrastructure and management, with many overlaps. Together they serve 900 business customers with BGP sessions, mobile backhaul, and an emergency-services network contract that allows no outage longer than one second on the emergency path. The board wants a single network and NOC within 18 months. Operator B's staff know only OSPF.",
     "questions": [
      "Which migration strategy fits, and why?",
      "How would you consolidate the autonomous systems without coordinating 900 customer changes at once?",
      "How would you unify the interior routing protocols?",
      "How do you handle the overlapping infrastructure addressing?",
      "How will you protect the emergency-services path during migration?"
     ],
     "answer": "**Strategy:** phased by point of presence and service, after an initial interconnection phase — big bang is impossible at this scale and the one-second constraint rules out uncontrolled cut-overs. **Interconnect first:** join the cores at two or more locations using inter-AS techniques so services can span both networks during coexistence. **AS consolidation:** choose AS 64500 as the target; migrate Operator B's PE routers to it while using **local-as with no-prepend and replace-as** so customers keep peering with 64510 unchanged; then move customers to the new AS gradually in agreed windows. **Interior routing:** run IS-IS alongside OSPF on B's routers ('ships in the night') with IS-IS less preferred, verify that both produce the same forwarding, then change preference router by router and remove OSPF; train B's staff before the change, not after. **Addressing:** allocate a new, unique infrastructure range for the merged network; re-address loopbacks and management area by area, using temporary translation only at the management boundary, never in the forwarding core. **Emergency path:** migrate it last, with fast-reroute protection verified in the new core, BFD on all affected links, a rehearsed sub-second failover test, and a cut-over that moves traffic by make-before-break tunnels so the old path remains until the new one is proven. **Governance:** a single change calendar and freeze across both NOCs from the first day of interconnection."
    },
    {
     "type": "template",
     "title": "Migration plan sheet",
     "purpose": "Plan each wave with prerequisites, steps, validation, rollback and the point of no return, so that every cut-over is rehearsable and every decision is timed.",
     "columns": [
      "Wave / scope",
      "Prerequisites",
      "Cut-over steps & owner",
      "Validation tests",
      "Rollback trigger & duration",
      "Go/no-go time",
      "Point of no return"
     ],
     "example": [
      [
       "Wave 3 — PoPs North-2 and North-3 to IS-IS",
       "IS-IS adjacencies up and verified for 7 days; staff trained",
       "Raise OSPF distance router by router (network team)",
       "FIB comparison, LSP tests, customer VPN probes",
       "Any VPN probe fails > 2 min; 15 min",
       "02:45",
       "OSPF process removed (next wave)"
      ]
     ],
     "rows": 8
    },
    {
     "type": "checklist",
     "title": "Migration design checklist",
     "items": [
      "Strategy (phased, parallel, big bang) is justified against the decision matrix",
      "The coexistence state is designed and documented like an end state",
      "Every step has a rollback method, duration and trigger",
      "Go/no-go times are calculated and agreed before the window",
      "The point of no return is identified and gated by a formal decision",
      "A pilot wave precedes high-impact waves",
      "Unrelated changes are frozen during migration windows",
      "Hypercare staffing and escalation are arranged for each wave"
     ]
    },
    {
     "type": "reflection",
     "prompt": "Think of a migration you have seen fail or overrun. Which risk control — pilot, coexistence design, rollback point, go/no-go timing or hypercare — was missing?"
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Phased migration",
       "def": "Moving to a new design in a sequence of smaller waves."
      },
      {
       "term": "Parallel run",
       "def": "Operating old and new systems side by side while traffic or users move between them."
      },
      {
       "term": "Big bang migration",
       "def": "Moving everything to the new design in a single cut-over."
      },
      {
       "term": "Coexistence",
       "def": "The intermediate state in which old and new designs interoperate during migration."
      },
      {
       "term": "Rollback",
       "def": "Returning to the previous known-good state after a failed change."
      },
      {
       "term": "Point of no return",
       "def": "The step after which rollback is no longer possible or practical."
      },
      {
       "term": "Go/no-go decision",
       "def": "A timed decision to commit or roll back a change based on agreed criteria."
      },
      {
       "term": "Hypercare",
       "def": "A period of heightened support immediately after a migration wave."
      },
      {
       "term": "Ships in the night",
       "def": "Running two routing protocols in parallel, with one preferred, to migrate between them."
      }
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "A window ends at 06:00, the rehearsed rollback takes 40 minutes and the agreed margin is 20 minutes. When is the latest go/no-go decision?",
       "options": [
        "05:20",
        "05:40",
        "06:00",
        "05:00"
       ],
       "answer": 3,
       "explain": "06:00 − 40 minutes − 20 minutes = 05:00. After that, a rollback could not complete inside the window with margin."
      },
      {
       "q": "Which migration strategy best suits a critical service that cannot tolerate interruption and whose old and new platforms can both serve users?",
       "options": [
        "Big bang over a long holiday weekend",
        "Parallel run with gradual traffic movement",
        "Phased by alphabetical site name order",
        "Freeze changes until a new budget year"
       ],
       "answer": 1,
       "explain": "Parallel running lets traffic move gradually and back again, which suits zero-interruption requirements when both platforms can serve users."
      },
      {
       "q": "During an AS consolidation, what does local-as with no-prepend and replace-as achieve?",
       "options": [
        "Customers are moved to the new AS automatically without being told",
        "Customers keep peering with the legacy AS while path lengths are unchanged",
        "The legacy AS is advertised to the internet in place of the new AS",
        "Routes from customers are filtered so that the address overlap is hidden from peers"
       ],
       "answer": 1,
       "explain": "The feature presents the old AS to the customer and hides the extra AS from paths, so customer configuration can move later."
      },
      {
       "q": "Why is a 'ships in the night' approach used for interior routing migrations?",
       "options": [
        "Both protocols run together so forwarding can be verified before switching preference",
        "It lets the two protocols share a single link-state database across the merged core",
        "It removes the need to train the operations staff on the new protocol before the cut-over",
        "It converts OSPF configuration into IS-IS configuration automatically"
       ],
       "answer": 0,
       "explain": "Running both with one preferred allows validation of the new protocol's results and a controlled, reversible switch."
      },
      {
       "q": "What is the purpose of identifying a point of no return in a migration plan?",
       "options": [
        "To show that rollback planning is no longer needed anywhere in the plan",
        "To mark the moment hypercare support can be ended",
        "To start decommissioning the old platform at once",
        "To gate the irreversible step with a formal decision"
       ],
       "answer": 3,
       "explain": "Once rollback is impossible, failure must be fixed forward. A formal gate ensures the organisation consciously accepts that risk."
      }
     ]
    }
   ]
  },
  {
   "id": "m8-l3",
   "title": "Communicating Designs to Executives",
   "subtitle": "Turn architecture into decisions, money and risk that leaders can act on",
   "minutes": 24,
   "objectives": [
    "Structure a one-page design brief for an executive audience",
    "Translate technical properties into business consequences",
    "Quantify the value of resilience and security investments"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Executives do not approve designs; they approve **decisions** — spend this, accept that risk, change this process. A brilliant design that cannot be explained in their terms will lose to a weaker one that can. Communication is therefore a design skill, and the expert designer prepares for the executive conversation as carefully as for the technical review."
    },
    {
     "type": "compare",
     "title": "Two audiences, two conversations",
     "columns": [
      {
       "title": "Engineering review",
       "items": [
        "How it works, protocols, failure behaviour",
        "Detailed diagrams and configuration standards",
        "Evidence: tests, calculations, references",
        "Goal: technical correctness"
       ]
      },
      {
       "title": "Executive decision",
       "items": [
        "What it costs, what it protects, what it risks",
        "One page, one picture, two or three options",
        "Evidence: business impact, comparisons, outcomes",
        "Goal: a clear decision and an owner"
       ]
      }
     ]
    },
    {
     "type": "framework",
     "title": "The one-page design brief",
     "items": [
      {
       "label": "B1",
       "title": "Context",
       "text": "Two sentences: what is happening in the business and why a decision is needed now."
      },
      {
       "label": "B2",
       "title": "Decision required",
       "text": "The specific question the executive must answer, and by when."
      },
      {
       "label": "B3",
       "title": "Options",
       "text": "Two or three real options, including 'do nothing', with cost, benefit and risk."
      },
      {
       "label": "B4",
       "title": "Recommendation",
       "text": "Your recommended option and the single most important reason."
      },
      {
       "label": "B5",
       "title": "Risk and cost",
       "text": "What remains at risk, what it costs over its lifetime, what it saves."
      },
      {
       "label": "B6",
       "title": "Ask",
       "text": "Exactly what you need: approval, budget, a policy decision, a named owner."
      }
     ]
    },
    {
     "type": "table",
     "title": "Translating technical statements",
     "head": [
      "Technical statement",
      "Business translation"
     ],
     "rows": [
      [
       "99.99% availability target",
       "About 53 minutes of outage a year, compared with nearly 9 hours today"
      ],
      [
       "Single carrier for all branches",
       "One road-works incident can close every branch at once"
      ],
      [
       "Sub-second convergence with BFD and fast reroute",
       "Calls and card payments continue when a link fails"
      ],
      [
       "Flat network, no segmentation",
       "One infected laptop can reach every payment and patient system"
      ],
      [
       "RPO zero, RTO 15 minutes",
       "No lost transactions and service back within 15 minutes if a site is destroyed"
      ],
      [
       "Private connectivity break-even at 27 TB a month",
       "Above our current volume, the dedicated link is cheaper as well as faster"
      ]
     ]
    },
    {
     "type": "formula",
     "title": "Quantifying risk reduction",
     "items": [
      {
       "name": "Single loss expectancy",
       "expr": "SLE = cost per hour of outage × expected outage duration",
       "meaning": "The cost of one occurrence of the event."
      },
      {
       "name": "Annualised loss expectancy",
       "expr": "ALE = SLE × ARO",
       "meaning": "ARO is the expected number of occurrences per year."
      },
      {
       "name": "Return on a resilience investment",
       "expr": "ROI = (ALE before − ALE after − annual cost) ÷ annual cost",
       "meaning": "Positive means the investment pays for itself in avoided losses."
      },
      {
       "name": "Worked example",
       "expr": "Before: 120,000 × 8 h × 0.25 = 240,000. After: 120,000 × 0.25 h × 0.25 = 7,500. Annual cost 180,000 → ROI ≈ 29%",
       "meaning": "A second site reduces a site-loss outage from 8 hours to 15 minutes and pays for itself, before counting reputation and regulatory exposure."
      }
     ]
    },
    {
     "type": "callout",
     "kind": "warning",
     "text": "Opening with topology diagrams; using acronyms without translation; presenting one option as if there were no alternative; hiding the cost in an appendix; or claiming 'zero risk'. Executives trust designers who show trade-offs and name residual risk.",
     "title": "Common ways to lose the room"
    },
    {
     "type": "steps",
     "title": "Presenting a trade-off",
     "items": [
      {
       "title": "State the decision",
       "text": "'We need to decide whether to fund a second data centre this year.'"
      },
      {
       "title": "Show the options",
       "text": "Do nothing, warm standby, or active/active — each with cost, outage exposure and time to deliver."
      },
      {
       "title": "Recommend",
       "text": "'We recommend warm standby: it removes 97% of expected outage cost for 60% of the active/active price.'"
      },
      {
       "title": "Name residual risk",
       "text": "'A regional disaster affecting both sites remains; we cover it with off-site backups and a 24-hour recovery target.'"
      },
      {
       "title": "Say what would change your mind",
       "text": "'If transaction volume doubles, active/active becomes the better option — we will review in 12 months.'"
      },
      {
       "title": "Ask",
       "text": "'We need approval for 180,000 a year and a business owner for DR testing.'"
      }
     ]
    },
    {
     "type": "scenario",
     "title": "The CFO's question",
     "situation": "You are presenting a proposal for a second data centre for a payment service. The CFO interrupts: 'We have had one serious outage in five years. Why should we spend 180,000 a year on this?'",
     "options": [
      {
       "text": "Explain the failure-domain analysis and show the redundancy diagram in detail.",
       "feedback": "Accurate but answers a question the CFO did not ask; the cost-versus-loss question remains unanswered.",
       "best": false
      },
      {
       "text": "Point out that every other payment provider has two data centres.",
       "feedback": "Peer comparison may help, but on its own it does not justify the cost to a finance leader.",
       "best": false
      },
      {
       "text": "Quantify the expected annual loss from a site outage with and without the second site, compare it with the cost, and mention the regulatory exposure.",
       "feedback": "Best. It answers in the CFO's terms — expected loss versus cost — and adds the non-financial factor that affects the decision.",
       "best": true
      },
      {
       "text": "Reassure the CFO that the current site is very reliable and the investment is just a precaution.",
       "feedback": "This undermines your own recommendation; if the risk is negligible, the CFO should decline.",
       "best": false
      }
     ]
    },
    {
     "type": "template",
     "title": "Executive decision brief",
     "purpose": "Summarise a design decision on one page for an executive audience, with options, recommendation, cost and residual risk.",
     "columns": [
      "Decision required",
      "Options (incl. do nothing)",
      "Recommendation & main reason",
      "Business impact",
      "Lifetime cost",
      "Residual risk",
      "Owner & date"
     ],
     "example": [
      [
       "Fund a second site for the payment service?",
       "Do nothing / warm standby / active-active",
       "Warm standby — removes most outage cost at 60% of active-active price",
       "Site-loss outage cut from ~8 h to 15 min",
       "180,000 a year",
       "Regional disaster; covered by off-site backup with 24 h RTO",
       "COO, decision by 30 June"
      ]
     ],
     "rows": 5
    },
    {
     "type": "checklist",
     "title": "Executive communication checklist",
     "items": [
      "The brief fits on one page and states the decision required",
      "At least two real options are shown, including doing nothing",
      "Technical properties are translated into business consequences",
      "Costs are shown over the asset's lifetime, not just the first year",
      "Residual risk is named, with how it is managed",
      "The ask is explicit: money, policy, owner or date",
      "Supporting technical detail is available but kept out of the main page"
     ]
    },
    {
     "type": "reflection",
     "prompt": "Take a design decision you are working on. Write the 'decision required' sentence and the single most important reason for your recommendation in under 40 words."
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Design brief",
       "def": "A short document that frames a design decision for decision-makers."
      },
      {
       "term": "Single loss expectancy",
       "def": "The expected cost of one occurrence of a risk event."
      },
      {
       "term": "Annualised rate of occurrence",
       "def": "The expected number of times a risk event occurs per year."
      },
      {
       "term": "Annualised loss expectancy",
       "def": "The expected yearly cost of a risk: single loss expectancy multiplied by annual rate of occurrence."
      },
      {
       "term": "Residual risk",
       "def": "The risk that remains after a design or control is in place."
      },
      {
       "term": "Total cost of ownership",
       "def": "The full cost of a solution over its life, including operation, support and refresh."
      },
      {
       "term": "Do-nothing option",
       "def": "The baseline option of making no change, against which other options are compared."
      },
      {
       "term": "Decision owner",
       "def": "The person accountable for making and standing behind a decision."
      }
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "Outage cost is 50,000 per hour, a site-loss event causes a 10-hour outage, and such events are expected once every five years. What is the ALE?",
       "options": [
        "50,000",
        "250,000",
        "100,000",
        "500,000"
       ],
       "answer": 2,
       "explain": "SLE = 50,000 × 10 = 500,000. ARO = 0.2. ALE = 500,000 × 0.2 = 100,000."
      },
      {
       "q": "What should come first on a one-page executive design brief?",
       "options": [
        "A detailed topology diagram of the proposed design",
        "The list of protocols and technologies to be used",
        "A history of all past incidents in the network",
        "The context and the specific decision required"
       ],
       "answer": 3,
       "explain": "Executives need to know quickly why they are reading and what they must decide; detail supports the decision, it does not lead."
      },
      {
       "q": "Why should a 'do nothing' option be included?",
       "options": [
        "It gives a baseline to compare the cost and risk of every other option",
        "Executives always choose it, so it must be visible on the page",
        "It is required for any design proposal to pass a formal technical review board",
        "It shows that the designer has no preference among the options"
       ],
       "answer": 0,
       "explain": "Doing nothing has its own cost and risk. Showing it makes the value of change explicit."
      },
      {
       "q": "Which translation of 'single carrier for all branches' works best for executives?",
       "options": [
        "The design lacks provider diversity at both Layer 1 and Layer 2",
        "Both branch circuits share an SRLG in the access network",
        "One incident at the carrier can close every branch at once",
        "The WAN availability is calculated as a serial dependency"
       ],
       "answer": 2,
       "explain": "The executive translation states the business consequence plainly. The others are accurate but technical."
      },
      {
       "q": "What is the best way to respond when an executive asks for a guarantee of zero risk?",
       "options": [
        "Agree, since a strong design eliminates all meaningful risk anyway",
        "Explain the residual risk and how it is managed and monitored",
        "Refuse to proceed until the executive accepts more budget",
        "Redirect the conversation to the technical design details"
       ],
       "answer": 1,
       "explain": "No design is risk-free. Naming residual risk and its management builds credibility and supports an informed decision."
      }
     ]
    }
   ]
  },
  {
   "id": "m8-l4",
   "title": "Mock Scenario: Kestrel Freight",
   "subtitle": "A full multi-stage design across all eight blueprint sheets",
   "minutes": 40,
   "objectives": [
    "Apply every sheet of the ZCDE Design Blueprint to one evolving scenario",
    "Make and revise decisions as requirements arrive in stages",
    "Produce a coherent, defensible design and migration path"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "This lesson walks through a complete mock scenario in stages, as an expert design engagement or a scenario-based assessment would. Read each stage, decide before revealing the feedback, and keep your own decision log. Kestrel Freight is fictional; the constraints are typical of real logistics, retail and public-sector projects."
    },
    {
     "type": "steps",
     "title": "Stage 1 — The brief",
     "items": [
      {
       "title": "Business",
       "text": "Kestrel Freight runs 140 depots, two automated sorting hubs, a 1,500-person head-office campus and one owned data centre. Business customers want real-time parcel tracking through an API within 12 months."
      },
      {
       "title": "Targets",
       "text": "The tracking API must reach 99.95% availability. Depot operations must continue for at least four hours if the WAN fails. The network team has 12 engineers."
      },
      {
       "title": "Current estate",
       "text": "Depots use a single broadband line with a 4G backup. The data centre has one internet edge. The campus and hubs share one flat network with the sorting-hub control systems."
      },
      {
       "title": "Constraints",
       "text": "Capital budget is fixed for this year. A logistics regulator requires shipment records to stay in-country. The board has asked for a plan in six weeks."
      }
     ]
    },
    {
     "type": "table",
     "title": "Stage 1 — extracting what matters",
     "head": [
      "Item",
      "Type",
      "Design consequence"
     ],
     "rows": [
      [
       "Tracking API at 99.95% in 12 months",
       "Business driver, measurable target",
       "At least two independent failure domains for the API path"
      ],
      [
       "Depots survive four hours without WAN",
       "Hard operational requirement",
       "Local survivability: local breakout, cached services, local scanning"
      ],
      [
       "Shipment records in-country",
       "Hard regulatory constraint",
       "Cloud region and DR site selection limited to in-country options"
      ],
      [
       "Flat network with sorting-hub controls",
       "Brownfield risk",
       "Segmentation of OT is a priority, not an option"
      ],
      [
       "Fixed capital budget, 12 engineers",
       "Hard financial and skills constraints",
       "Phased design; prefer operating-cost services and automation"
      ]
     ]
    },
    {
     "type": "scenario",
     "title": "Stage 2 — Where should the tracking API live?",
     "situation": "The single owned data centre has no second site. The in-country cloud region offers three availability zones. The tracking API is new, stateless at the front end, and reads from the shipment database, which stays on premises for now. The budget is fixed this year.",
     "options": [
      {
       "text": "Host the API in the owned data centre and build a second data centre next year.",
       "feedback": "Requires capital the company does not have this year and cannot reach 99.95% from one site in the meantime.",
       "best": false
      },
      {
       "text": "Host the API in a cloud region abroad with better pricing and replicate data back home nightly.",
       "feedback": "Violates the in-country records constraint.",
       "best": false
      },
      {
       "text": "Host the API front end in the in-country cloud region across two or more zones, replicate a read-only copy of tracking data to the cloud, and connect privately to the data centre.",
       "feedback": "Best. Multiple zones give independent failure domains for the API at operating cost, the read copy removes the hybrid link from the request path, and data stays in-country.",
       "best": true
      },
      {
       "text": "Host the API across two public cloud providers for maximum resilience.",
       "feedback": "Doubles skills and tooling for a 12-person team, with no business driver beyond availability that one provider's zones cannot meet.",
       "best": false
      }
     ]
    },
    {
     "type": "scenario",
     "title": "Stage 3 — Depots and the WAN",
     "situation": "Depots must keep scanning parcels for four hours without the WAN. Scanners post events to the tracking platform. Today the depot broadband and 4G backup both terminate on one small router, and depot staff reach all applications through the data centre.",
     "options": [
      {
       "text": "Add a local event buffer at each depot so scanners keep working offline, use an overlay across broadband and 4G with application-aware path selection, and break out to the cloud API directly.",
       "feedback": "Best. Local buffering meets the survivability requirement by design, two transport paths improve availability, and direct cloud breakout avoids hairpinning through the data centre.",
       "best": true
      },
      {
       "text": "Replace each depot's broadband with a private MPLS circuit.",
       "feedback": "Higher cost and still one path; does not deliver the four-hour local survivability requirement.",
       "best": false
      },
      {
       "text": "Keep the design and ask depots to record parcels on paper during outages.",
       "feedback": "Fails the four-hour requirement for automated operation and loses tracking accuracy.",
       "best": false
      },
      {
       "text": "Add a second broadband line from the same provider at each depot.",
       "feedback": "Shares the provider's failure domain and does not solve offline operation.",
       "best": false
      }
     ]
    },
    {
     "type": "scenario",
     "title": "Stage 4 — New information: an acquisition",
     "situation": "Six months in, Kestrel announces the purchase of Swiftline, a courier with 60 depots. Swiftline uses the same 10.0.0.0/8 ranges, its own BGP AS and an OSPF network. The board wants Swiftline depots visible in tracking within four months of closing.",
     "options": [
      {
       "text": "Re-address all Swiftline depots before connecting anything.",
       "feedback": "Correct long term, but cannot be completed in four months without risking Swiftline's operations.",
       "best": false
      },
      {
       "text": "Merge Swiftline's OSPF into Kestrel's routing domain immediately to get full reachability.",
       "feedback": "Merging overlapping address space into one routing domain causes conflicts and joins two unknown failure domains.",
       "best": false
      },
      {
       "text": "Restart the whole Kestrel design to include Swiftline from scratch.",
       "feedback": "Thrashing: the cloud, depot and segmentation decisions are still valid; only addressing and interconnection are affected.",
       "best": false
      },
      {
       "text": "Connect Swiftline at a defined boundary with BGP and controlled translation for overlapping ranges, integrate tracking through the API rather than the network, then re-address Swiftline in phases.",
       "feedback": "Best. It meets the four-month goal through application integration, contains overlap at one boundary, and keeps a planned path to a clean addressing model. Most earlier decisions stand unchanged.",
       "best": true
      }
     ]
    },
    {
     "type": "scenario",
     "title": "Stage 5 — Security pressure",
     "situation": "A competitor suffers a ransomware attack that stops its sorting hubs for a week. Kestrel's insurer demands, as a condition of renewal in five months, segmentation of operational technology, multi-factor remote access and evidence of monitoring. Depots also accept card payments for cash-on-delivery parcels.",
     "options": [
      {
       "text": "Buy a next-generation firewall for every depot and enable all features.",
       "feedback": "Expensive, operationally heavy for 12 engineers, and does not address hub OT segmentation or card-data scope.",
       "best": false
      },
      {
       "text": "Separate hub OT from IT with an industrial DMZ, put card terminals in a small isolated payment zone with tokenisation, replace remote VPN access with brokered application access, and add flow telemetry at every zone boundary.",
       "feedback": "Best. It addresses each insurer demand, reduces payment-card scope, and fits the team through a small number of well-placed controls.",
       "best": true
      },
      {
       "text": "Encrypt all traffic between depots and the data centre.",
       "feedback": "Encryption protects confidentiality in transit but does not stop lateral movement or isolate OT.",
       "best": false
      },
      {
       "text": "Wait for the renewal and negotiate a higher premium instead.",
       "feedback": "Accepts the competitor's risk unchanged and probably fails renewal conditions.",
       "best": false
      }
     ]
    },
    {
     "type": "table",
     "title": "The design across the blueprint",
     "head": [
      "Blueprint sheet",
      "Key question",
      "Kestrel decision"
     ],
     "rows": [
      [
       "Requirements",
       "What must be true, and what cannot change?",
       "99.95% API, four-hour depot survivability, in-country data, fixed capital, small team"
      ],
      [
       "Campus",
       "How do campus and hubs contain faults and threats?",
       "Routed access, separate hub OT zones, industrial DMZ"
      ],
      [
       "WAN",
       "How do depots stay up and reach the cloud?",
       "Dual-transport overlay, local buffering, direct cloud breakout"
      ],
      [
       "Routing",
       "How are domains joined and policies enforced?",
       "BGP boundary to Swiftline, controlled translation, phased re-addressing"
      ],
      [
       "Resilience",
       "Where are the failure domains and recovery targets?",
       "API across cloud zones, read replica, DR plan for the data centre"
      ],
      [
       "Secure",
       "What can a compromised host reach?",
       "Zoned OT, isolated payment zone, brokered access, boundary telemetry"
      ],
      [
       "Cloud",
       "How are cloud resources connected, named and automated?",
       "Private connectivity, in-country region, IaC from day 0, hybrid DNS"
      ],
      [
       "Scenario",
       "How do we get there safely and explain it?",
       "Phased waves, rollback per wave, one-page brief to the board"
      ]
     ]
    },
    {
     "type": "case",
     "title": "Stage 6 — The final brief",
     "context": "Nine months in, the board cuts the remaining network budget by 25% because of a fuel-price shock, and asks whether the tracking API can still launch on time. The API front end is built in the cloud across zones; private connectivity to the data centre is one connection with a VPN backup; depot overlays are deployed at 90 of 140 Kestrel depots; Swiftline is connected at a translated boundary; hub OT segmentation is designed but not yet enforced.",
     "questions": [
      "Which remaining work items protect the launch, and which can be deferred?",
      "What residual risks would you present to the board?",
      "How would you structure the one-page brief?"
     ],
     "answer": "**Protect the launch:** the API path (cloud zones, read replica, private connection with VPN backup) is already in place, so the launch date holds. Complete hub OT segmentation enforcement because it is an insurer condition and the largest business-continuity risk. **Defer:** the remaining 50 depot overlays move to next year's budget — those depots keep broadband with 4G backup, and local event buffering is prioritised for them because it is cheap and protects tracking accuracy; Swiftline re-addressing stays behind its translated boundary for now. **Residual risks:** the 50 depots without the overlay have lower WAN resilience; the single private connection keeps the API's dependency on the data centre path for writes; translation at the Swiftline boundary adds operational complexity. **One-page brief:** context (budget cut, launch at risk?); decision required (approve re-sequenced plan); options (keep scope and slip launch; re-sequence and launch on time; cut security work); recommendation (re-sequence: launch on time, keep insurer conditions, defer depot overlays); cost and residual risk; ask (approval and a named business owner for depot operations risk)."
    },
    {
     "type": "template",
     "title": "Blueprint decision log",
     "purpose": "Track each design decision across the blueprint with its rationale and the assumptions that would reopen it, so staged changes can be absorbed cleanly.",
     "columns": [
      "Sheet",
      "Decision",
      "Options considered",
      "Rationale",
      "Assumptions that would reopen it",
      "Stage decided / revised"
     ],
     "example": [
      [
       "Cloud",
       "API front end in in-country region across zones",
       "Own DC; second DC; foreign region; two providers",
       "Meets 99.95% at operating cost, in-country",
       "Region loses in-country status; budget for second DC appears",
       "Stage 2"
      ]
     ],
     "rows": 10
    },
    {
     "type": "checklist",
     "title": "Design review checklist",
     "items": [
      "Every requirement and constraint traces to at least one design decision",
      "Every design decision traces back to a requirement or constraint",
      "Failure domains and blast radius meet stated targets",
      "Availability has been calculated, including common-cause effects",
      "A compromised host's reach has been assessed for each zone",
      "Cloud connectivity, addressing and DNS have been designed together",
      "The migration path has rollback points and timed go/no-go decisions",
      "Residual risks are written down with owners",
      "The executive brief fits on one page"
     ]
    },
    {
     "type": "reflection",
     "prompt": "At which stage of the Kestrel scenario would you most likely have made a different decision? Write down the assumption behind your alternative and what evidence would settle the difference."
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Local survivability",
       "def": "The ability of a site to keep operating its critical functions when its WAN connection fails."
      },
      {
       "term": "Read replica",
       "def": "A copy of data kept close to consumers to serve reads without crossing slower or less reliable paths."
      },
      {
       "term": "Translated boundary",
       "def": "A defined interconnection point where overlapping addresses are translated, keeping overlap contained."
      },
      {
       "term": "Direct cloud breakout",
       "def": "Sending traffic from a site straight to a cloud service rather than through a central data centre."
      },
      {
       "term": "Re-sequencing",
       "def": "Changing the order of work items to protect priorities when constraints change."
      },
      {
       "term": "Traceability",
       "def": "The ability to link each requirement to design decisions and each decision back to requirements."
      },
      {
       "term": "Industrial DMZ",
       "def": "A buffer zone between IT and OT networks through which all cross-boundary traffic is brokered."
      },
      {
       "term": "Decision log",
       "def": "A running record of design decisions, options, rationale and assumptions."
      }
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "In the Kestrel scenario, why was the tracking data replicated read-only into the cloud?",
       "options": [
        "To move the master shipment database to the cloud immediately",
        "To keep the hybrid link out of the request path while data stays in-country",
        "To allow the owned data centre to be fully shut down before the API launch date",
        "To meet the four-hour depot survivability requirement directly"
       ],
       "answer": 1,
       "explain": "A read copy near the API removes per-request dependence on the hybrid connection, raising availability, while the region keeps data in-country."
      },
      {
       "q": "Why was local event buffering the key element of the depot design?",
       "options": [
        "It reduces the bandwidth needed on the depot's broadband line",
        "It allows depots to remove their 4G backup circuits entirely",
        "It satisfies the four-hour offline requirement regardless of the WAN",
        "It is required by the logistics regulator for all shipment records kept at depots"
       ],
       "answer": 2,
       "explain": "Only local operation meets a requirement to keep working without any WAN. More transport paths reduce the chance of outage but cannot guarantee it."
      },
      {
       "q": "When the acquisition was announced, which earlier decisions needed to change?",
       "options": [
        "Mainly addressing and interconnection at the new boundary",
        "Every decision, because the estate size had changed",
        "The cloud region choice for the tracking API front end",
        "The depot local-buffering and overlay design choices"
       ],
       "answer": 0,
       "explain": "Tracing the change shows that cloud and depot decisions still hold; only addressing, routing interconnection and integration were affected."
      },
      {
       "q": "Facing a 25% budget cut, why did the recommended plan keep OT segmentation and defer depot overlays?",
       "options": [
        "Depot overlays had already been shown to add no real value to the overall design",
        "OT segmentation was the cheapest item left in the remaining plan",
        "Depot overlays could not be deployed until after the API launch",
        "OT segmentation was an insurer condition and the largest continuity risk"
       ],
       "answer": 3,
       "explain": "Re-sequencing protects hard constraints and the largest risks first; the deferred depots still have a working, if less resilient, design."
      },
      {
       "q": "Which design-review test best confirms that a design is not gold-plated?",
       "options": [
        "Every component in the design is duplicated at least once",
        "Every site uses the newest available platform from one single supplier",
        "Every link is sized for double its forecast peak traffic",
        "Every design decision traces back to a requirement or constraint"
       ],
       "answer": 3,
       "explain": "A decision with no requirement behind it is cost without purpose. Traceability in both directions catches gaps and gold-plating."
      }
     ]
    }
   ]
  },
  {
   "id": "m8-l5",
   "title": "Exam Strategy & Capstone Introduction",
   "subtitle": "Think like an assessor, answer like an architect, and prepare your capstone design",
   "minutes": 26,
   "objectives": [
    "Apply a repeatable method to scenario-based design questions",
    "Recognise common distractor patterns in design options",
    "Plan the ZCDE capstone deliverables and how they will be reviewed"
   ],
   "blocks": [
    {
     "type": "text",
     "text": "Scenario-based design questions do not test recall; they test judgement under constraints. Most options are technically valid in some network. Only one is the best answer for **this** organisation, at **this** stage, with **these** constraints. The method below works for exam items, for the capstone and for real design reviews."
    },
    {
     "type": "steps",
     "title": "Answering a design question",
     "items": [
      {
       "title": "Identify the role and stage",
       "text": "Who is asking, and where are we — requirements, design, migration or operation?"
      },
      {
       "title": "Find the binding constraint",
       "text": "Underline the hard constraint or the new information in the stem. It usually decides the answer."
      },
      {
       "title": "Eliminate violators",
       "text": "Strike any option that breaks a hard constraint, however attractive it is technically."
      },
      {
       "title": "Check what is asked",
       "text": "'Best', 'first', 'most cost-effective' and 'lowest risk' are different questions."
      },
      {
       "title": "Prefer the simplest sufficient option",
       "text": "Among options that meet requirements, choose the one with less complexity, cost and operational risk."
      },
      {
       "title": "Confirm against the business driver",
       "text": "Read your choice back against why the project exists."
      }
     ]
    },
    {
     "type": "table",
     "title": "Common distractor patterns",
     "head": [
      "Pattern",
      "What it looks like",
      "Why it is wrong"
     ],
     "rows": [
      [
       "Technically superior, constraint-breaking",
       "The most advanced design, but over budget or against regulation",
       "Hard constraints come first"
      ],
      [
       "Solves a different problem",
       "A good fix for latency when the issue is availability",
       "Does not address what was asked"
      ],
      [
       "Right idea, wrong order",
       "Enforce segmentation before discovering flows",
       "Sequence matters in design and migration"
      ],
      [
       "Over-engineered",
       "Five nines for a service that needs three",
       "Adds cost and complexity without business value"
      ],
      [
       "Product-led",
       "'Buy platform X' without design work",
       "Tools do not replace standards, data and decisions"
      ],
      [
       "Operationally unrealistic",
       "A design the team cannot run",
       "Skills and operations are constraints too"
      ]
     ]
    },
    {
     "type": "framework",
     "title": "Exam-day habits",
     "items": [
      {
       "label": "E1",
       "title": "Read the last sentence first",
       "text": "Know what is being asked before reading the scenario detail."
      },
      {
       "label": "E2",
       "title": "Keep a mini log",
       "text": "In staged scenarios, jot down constraints and decisions as they appear."
      },
      {
       "label": "E3",
       "title": "Do not re-fight earlier stages",
       "text": "Accept the scenario's earlier decisions unless the new information changes them."
      },
      {
       "label": "E4",
       "title": "Watch the qualifiers",
       "text": "First, best, least, most and without interruption change the answer."
      },
      {
       "label": "E5",
       "title": "Budget your time",
       "text": "Do not let one hard item consume time needed for several easier ones."
      },
      {
       "label": "E6",
       "title": "Trust business logic",
       "text": "When unsure between two technical answers, pick the one that better serves the stated business driver."
      }
     ]
    },
    {
     "type": "scenario",
     "title": "Practice item",
     "situation": "A hospital's design brief states that clinical systems must never be interrupted, the network team is four people, and the budget allows one of four projects this year. Ransomware has hit two nearby hospitals. Which project should the designer recommend FIRST?",
     "options": [
      {
       "text": "Segment medical devices and clinical systems from corporate and guest networks, starting in monitor mode.",
       "feedback": "Best. It addresses the dominant risk, fits a small team when phased, and can be introduced without interrupting clinical systems.",
       "best": true
      },
      {
       "text": "Replace the campus core with a new high-capacity fabric.",
       "feedback": "Valuable later, but it does not address the most pressing risk and is a large, disruptive project for a small team.",
       "best": false
      },
      {
       "text": "Move all clinical systems to a public cloud region.",
       "feedback": "A huge migration with major continuity risk, and it does not by itself contain ransomware on the hospital network.",
       "best": false
      },
      {
       "text": "Deploy full packet capture on every link for forensic readiness.",
       "feedback": "Helps investigation after an attack but does not prevent spread, and it would overwhelm a four-person team.",
       "best": false
      }
     ]
    },
    {
     "type": "callout",
     "kind": "insight",
     "text": "The ZCDE capstone asks you to take one realistic scenario from brief to executive decision and defend your choices. Reviewers look for traceability, quantified trade-offs, honest residual risk and a safe migration path — not for the most elaborate topology.",
     "title": "The capstone is a design defence"
    },
    {
     "type": "compare",
     "title": "Capstone deliverables",
     "columns": [
      {
       "title": "Design pack",
       "items": [
        "Requirements register: business, technical, constraints, assumptions",
        "Weighted decision matrices for three major choices",
        "Campus and data-centre design with scaling limits",
        "WAN/SD-WAN and internet-edge design",
        "Routing design (IGP and BGP) with convergence goals"
       ]
      },
      {
       "title": "Delivery and defence",
       "items": [
        "Resilience design with availability calculations and RPO/RTO",
        "Security and segmentation design",
        "Hybrid/multi-cloud connectivity and automation-driven operations",
        "Phased migration plan with rollback and risk register",
        "Ten-slide executive design presentation, then defend your three hardest trade-offs"
       ]
      }
     ]
    },
    {
     "type": "steps",
     "title": "Capstone process",
     "items": [
      {
       "title": "Choose a scenario",
       "text": "Use a provided ZCDE scenario or an anonymised real one with enough complexity to touch all eight sheets."
      },
      {
       "title": "Frame requirements",
       "text": "Build the requirements, constraints and assumptions register; agree it before designing."
      },
      {
       "title": "Design sheet by sheet",
       "text": "Work through Campus, WAN, Routing, Resilience, Secure and Cloud, logging each decision."
      },
      {
       "title": "Stress-test",
       "text": "Inject at least one change — budget, acquisition, regulation — and show how the design adapts."
      },
      {
       "title": "Plan the migration",
       "text": "Sequence waves with rollback and timing."
      },
      {
       "title": "Brief and defend",
       "text": "Present the ten-slide executive presentation and answer reviewers' challenges."
      }
     ]
    },
    {
     "type": "template",
     "title": "Capstone review scorecard",
     "purpose": "Self-assess and peer-review a capstone design against the criteria reviewers use, with evidence for each score.",
     "columns": [
      "Criterion",
      "Weight",
      "Evidence in the design pack",
      "Score (1–5)",
      "Reviewer comment"
     ],
     "example": [
      [
       "Traceability of requirements to decisions",
       "20%",
       "Requirements register cross-referenced in every decision table",
       "4",
       "Two cloud decisions lack a requirement reference"
      ],
      [
       "Quantified resilience",
       "15%",
       "Availability sheet with common-cause factors; DR targets",
       "3",
       "β values are assumed — state the evidence"
      ]
     ],
     "rows": 8
    },
    {
     "type": "checklist",
     "title": "Capstone readiness checklist",
     "items": [
      "The scenario touches all eight blueprint sheets",
      "Requirements, constraints and assumptions are agreed before design starts",
      "Every decision table lists options considered and rationale",
      "Availability and cost figures are calculated, not asserted",
      "At least one injected change is absorbed with a traced impact",
      "The migration plan has timed go/no-go points and rollback",
      "The executive brief fits on one page and names residual risk",
      "You can defend your three hardest trade-offs in two minutes each"
     ]
    },
    {
     "type": "reflection",
     "prompt": "Which of the six distractor patterns are you personally most likely to fall for? Write one question you will ask yourself on exam day to catch it."
    },
    {
     "type": "terms",
     "items": [
      {
       "term": "Binding constraint",
       "def": "The constraint in a scenario that most directly determines the correct design choice."
      },
      {
       "term": "Distractor",
       "def": "An answer option that is plausible but not the best answer for the scenario."
      },
      {
       "term": "Gold-plating",
       "def": "Adding capability beyond what requirements justify."
      },
      {
       "term": "Qualifier",
       "def": "A word such as first, best or least that changes what a question is asking."
      },
      {
       "term": "Capstone",
       "def": "A culminating design project that applies the whole programme to one scenario."
      },
      {
       "term": "Design defence",
       "def": "Explaining and justifying design decisions under questioning by reviewers."
      },
      {
       "term": "Requirements register",
       "def": "A structured list of requirements, constraints and assumptions with sources and owners."
      },
      {
       "term": "Scorecard",
       "def": "A weighted set of criteria used to assess a design consistently."
      }
     ]
    },
    {
     "type": "quiz",
     "items": [
      {
       "q": "A question asks for the FIRST thing a designer should do after a new regulation is announced mid-project. Three options are good long-term designs. What does the qualifier suggest?",
       "options": [
        "Choose the step that establishes impact before committing to changes",
        "Choose the most complete long-term design among all of the options given",
        "Choose the option with the most security features listed in it",
        "Choose the option that the operations team is most familiar with"
       ],
       "answer": 0,
       "explain": "'First' asks about sequence. Understanding the regulation's impact on existing decisions comes before redesign."
      },
      {
       "q": "An option proposes the most advanced architecture in the question but exceeds the stated budget. How should it be treated?",
       "options": [
        "Selected, because it gives the strongest technical result",
        "Eliminated, because it violates a hard constraint",
        "Kept as a tie-breaker if two other options seem equal",
        "Selected only if the scenario mentions future growth"
       ],
       "answer": 1,
       "explain": "A design that breaks a hard constraint is wrong for that scenario, regardless of technical merit."
      },
      {
       "q": "Two options both meet every requirement. One uses three technologies the team does not know; the other uses one they run today. Which is usually best?",
       "options": [
        "The option with three new technologies",
        "Whichever option is newer in the market",
        "The simpler option the team can operate",
        "Neither, since both need further study"
       ],
       "answer": 2,
       "explain": "Among sufficient options, lower complexity and operational risk usually win; skills are a real constraint."
      },
      {
       "q": "What do capstone reviewers primarily look for?",
       "options": [
        "The largest number of redundant devices and links shown in the final topology",
        "Use of the newest technologies available from leading suppliers in 2026",
        "Traceability, quantified trade-offs, honest residual risk, safe migration",
        "A design that requires no changes to be made to the existing network"
       ],
       "answer": 2,
       "explain": "The capstone is a design defence. Elaborate topologies without traceability or risk honesty score poorly."
      },
      {
       "q": "In a staged scenario, new information arrives that affects only addressing. What is the best exam behaviour?",
       "options": [
        "Revise only the affected decisions and keep the rest",
        "Re-answer every earlier stage in light of the change",
        "Ignore the new information to keep answers consistent",
        "Choose the option that changes the most components"
       ],
       "answer": 0,
       "explain": "Targeted revision mirrors expert practice: absorb the change where it applies and keep sound decisions stable."
      }
     ]
    }
   ]
  }
 ]
});
TRACK.exam.push([
 {
  "module": "m5",
  "q": "A stock exchange's market-data service must reach 99.99%. The current path is a single firewall cluster (99.95%) in series with redundant routers and diverse carriers. The team proposes a third carrier. What should the designer recommend instead?",
  "options": [
   "Accept the third carrier, as adding more parallel paths always raises end-to-end availability",
   "Upgrade the routers to higher-MTBF models to lift the overall chain",
   "Lower the target to 99.95% so that the current design is compliant",
   "Address the firewall cluster, the serial element capping the chain near 99.95%"
  ],
  "answer": 3,
  "explain": "In a serial chain the weakest element dominates. With carriers and routers already redundant, a third carrier adds almost nothing while the single firewall cluster caps the result. Lowering the target avoids the design problem rather than solving it."
 },
 {
  "module": "m5",
  "q": "Two leaf switches in a data-centre pod each carry 55% of their capacity in an active/active pair. The application owner asks whether the pod can survive a leaf failure without degradation. What is the best answer?",
  "options": [
   "Yes — active/active pairs always fail over without degradation",
   "Yes — the second leaf will throttle background traffic at once",
   "No — at 55% each, the surviving leaf would be overloaded",
   "No — active/active pairs cannot fail over without a manual step"
  ],
  "answer": 2,
  "explain": "With two members and one tolerated failure, each must stay under (2 − 1) ÷ 2 = 50%. At 55% each, the survivor would need 110% capacity. Throttling is not a design guarantee, and active/active failover is normally automatic."
 },
 {
  "module": "m5",
  "q": "A real-time control application tolerates 200 ms of loss. Core links are point-to-point dark fibre with no intermediate devices. Convergence today is 1.5 s, dominated by SPF and FIB programming. What should be prioritised?",
  "options": [
   "Precomputed loop-free alternates, so traffic switches before SPF and FIB finish",
   "BFD on every core link to speed up detection of failures on the dark fibre",
   "Graceful restart on all core routers so that forwarding continues on the old state",
   "Longer SPF throttle timers so the control plane remains stable during failure"
  ],
  "answer": 0,
  "explain": "Detection on dark fibre is already fast through loss of signal, so BFD adds little. The bottleneck is computation and FIB update, which precomputed backups bypass. Graceful restart does not help link failures, and longer timers make things slower."
 },
 {
  "module": "m5",
  "q": "A service provider edge router is the only attachment point for 300 single-homed business customers. It has dual route processors. Which control-plane resilience feature fits this role best?",
  "options": [
   "Aggressive BFD timers so customers detect the failure within 150 ms",
   "Non-stop routing, so a processor switchover is invisible to customers",
   "Removing the standby route processor to simplify the software design",
   "Fast reroute on the customer links, using backup paths via other PEs"
  ],
  "answer": 1,
  "explain": "Single-homed customers have no alternative path, so preserving sessions and forwarding through a processor switchover is the goal. Fast detection only makes customers notice faster, and there are no alternative PEs for single-homed links."
 },
 {
  "module": "m5",
  "q": "A payment processor's two data centres are 400 km apart. The business asks for an RPO of zero and an RTO of 30 minutes for a site loss. Write latency budgets cannot absorb more than 2 ms. What design best meets the requirements?",
  "options": [
   "Run synchronous replication between the two existing sites 400 km apart",
   "Use asynchronous replication to the far site and document an RPO of zero",
   "A nearby metro site for synchronous replication, with the far site asynchronous",
   "Stretch a VLAN between the two existing sites so the database can fail over instantly"
  ],
  "answer": 2,
  "explain": "400 km of fibre adds at least about 4 ms of round trip, breaking the 2 ms budget. A metro site gives zero data loss for site events, while the far site protects against regional disasters with an honest non-zero RPO. A stretched VLAN does not change physics and joins the failure domains."
 },
 {
  "module": "m5",
  "q": "A university core pair will be upgraded. Each router runs at 35% utilisation. Policy requires that no planned work removes all redundancy for the core. Which plan best meets this?",
  "options": [
   "Upgrade both routers in one window with the supplier's engineer on the bridge",
   "Use in-service upgrade on both routers at once, since forwarding continues throughout",
   "Defer the upgrade indefinitely to avoid any reduction in redundancy at all",
   "Drain, upgrade and soak one router, then repeat for the other in a later window"
  ],
  "answer": 3,
  "explain": "A rolling, drained upgrade leaves one known-good router carrying 70% of a single router's capacity, within limits. Touching both at once creates a shared operational failure domain, and indefinite deferral leaves known vulnerabilities in place."
 },
 {
  "module": "m5",
  "q": "A retailer's 1,200 stores depend on one central policy controller cluster for their WAN overlay. A bad policy push last month disconnected every store for an hour. What design change most reduces the blast radius of a repeat?",
  "options": [
   "Add a third node to the existing controller cluster to improve its redundancy",
   "Regional cells with separate controller instances and staged change waves",
   "Increase the controller's hardware capacity so pushes complete much faster",
   "Require two engineers to approve every policy change before it is pushed"
  ],
  "answer": 1,
  "explain": "The failure was common-mode: one change reached everything. Cells with staged rollout cap any single push to a fraction of stores. More nodes or capacity do not stop a bad policy replicating, and dual approval helps but does not contain impact."
 },
 {
  "module": "m5",
  "q": "An MTBF of 100,000 hours and an MTTR of 48 hours apply to the only access switch at 400 small branches. Budget allows either a second switch per branch or an on-site spare and remote-hands contract cutting MTTR to 4 hours. Branches tolerate a few hours' outage a year. What is the better choice?",
  "options": [
   "The spares contract, which cuts expected downtime about twelvefold at lower cost",
   "The second switch, because any redundancy always beats a faster repair time",
   "Neither, since a 48-hour MTTR already meets a requirement of a few hours",
   "The second switch, because the spares contract does not change availability"
  ],
  "answer": 0,
  "explain": "Availability rises from 100,000 ÷ 100,048 (about 4.2 hours of downtime a year) to 100,000 ÷ 100,004 (about 21 minutes). That meets the tolerance at lower cost than duplicating 400 switches. MTTR is a design lever, not just an operational detail."
 },
 {
  "module": "m6",
  "q": "A bank wants to stop ransomware moving from user laptops to core banking servers. Users and servers are in separate VRFs with a firewall between them, but servers in the same application tier can talk freely. What should the next design step target?",
  "options": [
   "A second perimeter firewall at the internet edge from a different supplier",
   "Moving all of the users into a single larger VRF with stricter rules",
   "Encrypting all traffic between the servers with IPsec in tunnel mode",
   "Micro-segmentation inside the server zones, built from observed flows"
  ],
  "answer": 3,
  "explain": "Macro separation already exists between users and servers; the remaining lateral path is inside server zones. Micro-segmentation built from observed flows closes it. Perimeter changes and encryption do not stop east-west movement."
 },
 {
  "module": "m6",
  "q": "A university must give 40,000 students and staff access to internal applications from unmanaged personal devices. Today a remote-access VPN places them on the campus network. What design best reduces exposure?",
  "options": [
   "A larger VPN concentrator cluster with more licences and stronger ciphers",
   "A separate VPN pool per faculty, each with its own campus network address range",
   "Brokered, application-level access connecting verified users to named apps",
   "Blocking all remote access and requiring users to come to campus instead"
  ],
  "answer": 2,
  "explain": "Network-level VPN access grants broad reach from unmanaged devices. Application-level brokering limits each user to specific applications and hides the rest. More capacity or faculty pools do not change the exposure model."
 },
 {
  "module": "m6",
  "q": "Two data centres 20 km apart are linked by dark fibre carrying 400 Gbps. A new policy requires encryption of all inter-site traffic with minimal latency. What is the most suitable design?",
  "options": [
   "IPsec tunnels terminated on the existing pair of data-centre firewalls",
   "MACsec on the inter-site links of the interconnect switches or routers",
   "TLS added to every application, leaving the links themselves unchanged",
   "A carrier internet VPN service replacing the dark fibre entirely"
  ],
  "answer": 1,
  "explain": "MACsec provides line-rate, low-latency hardware encryption on point-to-point links. Firewall IPsec would bottleneck 400 Gbps, application TLS cannot be guaranteed for all traffic, and replacing fibre with an internet service reduces performance."
 },
 {
  "module": "m6",
  "q": "A merchant processes card payments at 300 stores. Auditors currently treat the whole corporate network as in scope. What design change most reduces audit scope?",
  "options": [
   "Tokenise card data at the terminal and isolate what remains in a tested zone",
   "Encrypt all store WAN links with IPsec so card data is protected in transit",
   "Install host-based antivirus on every corporate system to meet the standard's controls",
   "Add a second firewall at the data-centre perimeter facing the internet"
  ],
  "answer": 0,
  "explain": "Scope follows the data and anything that can reach it. Tokenisation removes card data from most systems, and a tested isolated zone keeps the rest out of scope. Encryption, antivirus and perimeter firewalls do not change which systems are connected to card data."
 },
 {
  "module": "m6",
  "q": "A hospital is introducing 802.1X across 8,000 ports. Clinical engineering warns that some infusion pumps cannot authenticate and any interruption is unsafe. What rollout design is most appropriate?",
  "options": [
   "Monitor mode, then low-impact mode with profiled MAC access and tight policy for pumps",
   "Closed mode on every port at once, with a help-desk team and clinical engineers ready to respond",
   "Exempting all clinical floors from network access control permanently",
   "Dynamic VLANs for all devices, enforced on the first day of the rollout"
  ],
  "answer": 0,
  "explain": "Monitor mode reveals what would fail without impact. Low-impact mode with profiled MAC-based access and tight policy brings pumps under control safely. Closed mode risks patient safety, and permanent exemptions leave the riskiest zone uncontrolled."
 },
 {
  "module": "m6",
  "q": "An active/active pair of data centres each has its own stateful firewall cluster. Users report intermittent session resets. Captures show requests entering through Site A and replies leaving through Site B. What is the best design correction?",
  "options": [
   "Disable stateful inspection for the affected applications at both sites",
   "Increase bandwidth between the two sites so replies arrive much sooner",
   "Merge both firewall clusters into one stretched cluster across sites",
   "Make traffic symmetric per site, using per-site egress and source NAT"
  ],
  "answer": 3,
  "explain": "Stateful devices must see both directions. Symmetric routing fixes the root cause. Disabling inspection removes the control, bandwidth is irrelevant, and a stretched cluster enlarges the failure domain to both sites."
 },
 {
  "module": "m6",
  "q": "A security operations team of six must monitor 250 sites, three data centres and two cloud estates. What visibility design gives the best coverage for the team's capacity?",
  "options": [
   "Full packet capture on every link with 90 days of retention for every site",
   "Flows and key logs everywhere, plus brokered packet capture at choke points",
   "Firewall logs from the data-centre perimeter only, as the internal network is trusted",
   "Port mirroring from every access switch into one central analysis cluster"
  ],
  "answer": 1,
  "explain": "Flows and logs scale cheaply across sites and cloud; packet capture concentrated at choke points provides depth where it matters. Capturing everything is unaffordable and unusable for six people, and perimeter-only logging ignores lateral movement."
 },
 {
  "module": "m7",
  "q": "An enterprise has 60 virtual networks in one cloud region, plus two on-premises data centres. Most traffic flows between a few shared-services networks and the rest. What topology best balances manageability and cost?",
  "options": [
   "Full-mesh peering between all 60 virtual networks plus both data centres",
   "A separate VPN from each virtual network to each on-premises data centre",
   "A transit hub, with direct peering only for the few highest-volume pairs",
   "A single large virtual network holding every application team's workloads"
  ],
  "answer": 2,
  "explain": "A hub provides transitive routing with few attachments; selective peering for heavy pairs avoids hub processing charges where volume is high. A 60-network mesh means 1,770 peerings, per-network VPNs multiply tunnels, and one giant network enlarges the blast radius."
 },
 {
  "module": "m7",
  "q": "A manufacturer needs 4 Gbps steady between its plant and a cloud region, a 99.95% target and predictable latency. Its only colocation presence is one facility. What is the best connectivity design?",
  "options": [
   "Two private connections in the existing single facility, terminating on separate routers",
   "Four internet VPN tunnels from the plant with multipath load balancing",
   "One private connection in the existing facility with no backup path",
   "Private connections at two diverse facilities, plus a VPN for critical flows"
  ],
  "answer": 3,
  "explain": "A single facility is a shared failure domain. Diverse facilities provide the availability, private capacity provides predictable latency for 4 Gbps, and a VPN covers a double failure for critical traffic. Internet VPNs cannot guarantee predictability at this rate."
 },
 {
  "module": "m7",
  "q": "After moving a database service behind a private endpoint, cloud applications work but on-premises reporting tools connect to the public address and are refused. What is the correct design fix?",
  "options": [
   "Conditional forwarding of the endpoint zone to the cloud inbound resolver",
   "Allow the on-premises public egress addresses on the database firewall",
   "Publish the private endpoint address in the organisation's public DNS zone",
   "Forward all on-premises DNS queries to the cloud provider's resolvers"
  ],
  "answer": 0,
  "explain": "The resolver path is wrong, not the routing. Conditional forwarding sends only the relevant zone to the cloud resolvers, which return the private address. Reopening public access defeats the purpose, publishing private addresses leaks internal data, and forwarding everything creates a broad dependency."
 },
 {
  "module": "m7",
  "q": "A container platform will run 300 nodes with up to 110 pods each, and every pod needs an address. The enterprise has little routable IPv4 space left. What addressing approach is most appropriate?",
  "options": [
   "Allocate a routable /15 to the pods so every one is reachable directly",
   "Pod overlay or IPv6, keeping routable IPv4 for nodes and services that need it",
   "Reuse a range already used on premises, since cloud is separate anyway",
   "Limit the platform to ten pods per node to fit the remaining space"
  ],
  "answer": 1,
  "explain": "About 33,000 or more addresses would exhaust scarce routable space. Overlay or IPv6 pod addressing conserves routable IPv4. Reusing an on-premises range creates overlap, and limiting pods cripples the platform."
 },
 {
  "module": "m7",
  "q": "A team runs a centralised inspection hub that every spoke-to-spoke and internet flow traverses. Monthly hub processing charges now exceed the cost of the workloads in some spokes. What should the designer do?",
  "options": [
   "Remove the inspection hub entirely and rely only on security groups",
   "Move every workload into a single spoke to avoid the hub altogether",
   "Apply inspection per flow as policy requires; route other flows directly",
   "Double the size of the inspection appliances to reduce the processing charges"
  ],
  "answer": 2,
  "explain": "Inspection should be applied where policy requires it, not by default to everything. Removing the hub drops necessary controls, a single spoke loses isolation, and bigger appliances do not reduce per-GB processing fees."
 },
 {
  "module": "m7",
  "q": "A ministry with a small network team wants to start automating its 250 offices, which are all configured slightly differently. What should be the first deliverable?",
  "options": [
   "An orchestration platform that imports today's configurations as templates",
   "Scripts that push urgent changes to all 250 offices at the same time",
   "A full hardware refresh so that every office uses the same platform",
   "Standard office types, a data model and read-only compliance checks"
  ],
  "answer": 3,
  "explain": "Automation needs a defined 'correct' state and data to render from. Read-only compliance checks deliver early value with no risk. Importing inconsistency or scripting against it amplifies problems, and refresh is not a prerequisite."
 },
 {
  "module": "m7",
  "q": "A company is considering a second public cloud provider. The stated reason is 'resilience' for an application that already runs in one region. What is the best initial recommendation?",
  "options": [
   "Adopt the second provider at once, since two providers cannot fail together",
   "Run the application in both providers with a shared stretched virtual network",
   "Evaluate multi-region in the current provider and test cross-region failover",
   "Keep one region but buy the provider's highest support tier for the application"
  ],
  "answer": 2,
  "explain": "Multi-region within one provider usually delivers more resilience for less complexity. Multi-cloud doubles skills and tooling and is rarely tested well. Stretched networks across providers are impractical, and support tiers do not change architecture."
 },
 {
  "module": "m7",
  "q": "A cloud portal makes 40 sequential queries per user request to an on-premises database across a hybrid link with a 12 ms round trip. Users complain of slow pages. What design change helps most?",
  "options": [
   "Upgrade the private connection from 1 Gbps to 10 Gbps of dedicated capacity",
   "A cache or API layer near the portal so far fewer queries cross the link",
   "Add a second private connection to share the query load evenly",
   "Enable compression on all traffic between the portal and database"
  ],
  "answer": 1,
  "explain": "Forty sequential queries at 12 ms each add nearly half a second of waiting. The problem is round trips, not bandwidth. Reducing crossings fixes it; more capacity, a second link or compression do not shorten the round trip."
 },
 {
  "module": "m8",
  "q": "Halfway through a design, the sponsor reports that a regulator now requires all customer data to stay in-country. Earlier decisions chose a cloud region abroad for analytics only. What should the designer do FIRST?",
  "options": [
   "Trace which decisions depend on data location and assess the impact on each",
   "Restart the whole design, as the regulatory change invalidates the approach",
   "Continue as planned, since analytics is a separate workload from the core",
   "Move every workload, including non-customer systems, back on premises"
  ],
  "answer": 0,
  "explain": "Tracing impact focuses change where it is needed — here, analytics placement and any flows carrying customer data. Restarting is thrashing, ignoring it violates a hard constraint, and moving everything overreacts."
 },
 {
  "module": "m8",
  "q": "A core migration window runs from 01:00 to 05:00. The rehearsed rollback takes 45 minutes and the agreed safety margin is 15 minutes. At 03:55 validation is incomplete but the engineers are confident. What should the change lead do?",
  "options": [
   "Continue until 04:45, since the engineers are confident about finding the fix",
   "Roll back now, as the 04:00 go/no-go time is reached without success",
   "Commit the change and fix any remaining issues during business hours",
   "Ask the service owner to extend the window until about 07:00 instead"
  ],
  "answer": 1,
  "explain": "05:00 − 45 − 15 = 04:00. With criteria unmet at the decision time, the agreed plan is to roll back. Continuing, committing with failures or extending under pressure all trade a controlled change for an uncontrolled outage risk."
 },
 {
  "module": "m8",
  "q": "Two operators merge. 700 enterprise customers have BGP sessions configured to the acquired operator's AS. The target is a single AS within a year. What approach avoids coordinating every customer change at once?",
  "options": [
   "Move routers to the new AS while presenting the legacy AS via local-AS features",
   "Ask all 700 customers to change their BGP configuration on one agreed night together",
   "Keep both AS numbers permanently and run two separate core networks",
   "Renumber the customers' own AS numbers to match the new operator's AS"
  ],
  "answer": 0,
  "explain": "Local-AS techniques let the provider move first while customers keep their configuration, then migrate customers gradually. A single night for 700 changes is unmanageable, permanent dual ASes defeat the merger goal, and customers' own AS numbers are not the provider's to change."
 },
 {
  "module": "m8",
  "q": "A CFO asks why a second data centre costing 200,000 a year is needed. An outage costs 150,000 per hour; a site loss would take 12 hours to recover today and 30 minutes with the second site; such an event is expected once every four years. What is the most persuasive answer?",
  "options": [
   "Every major competitor already operates two data centres for this service",
   "The current data centre is old and will need replacing within ten years",
   "Expected annual loss falls from 450,000 to about 19,000, exceeding the 200,000 cost",
   "Industry guidance states that critical services should have two sites"
  ],
  "answer": 2,
  "explain": "ALE before = 150,000 × 12 × 0.25 = 450,000; after = 150,000 × 0.5 × 0.25 = 18,750. The avoided loss of about 431,000 exceeds the 200,000 cost. This answers the CFO in financial terms; the other answers are weaker arguments."
 },
 {
  "module": "m8",
  "q": "A national retailer must migrate 900 stores to a new WAN design. The old and new designs can interoperate through the data-centre hubs. Stores tolerate short overnight outages. Which strategy fits best?",
  "options": [
   "Big bang across all 900 stores during a single weekend window",
   "Parallel run with two complete networks at every store indefinitely",
   "Wait until every store is refurbished and migrate during the refits",
   "Phased waves of stores after a pilot, using the hubs as the coexistence point"
  ],
  "answer": 3,
  "explain": "A large estate, feasible coexistence and tolerance for short windows point to phased waves after a pilot. Big bang concentrates risk, indefinite parallel running is expensive, and tying migration to refits delays benefits unpredictably."
 },
 {
  "module": "m8",
  "q": "In a staged scenario, stage 3 adds that the operations team will shrink from ten to six engineers next year. The design so far includes three different overlay technologies. What is the best response?",
  "options": [
   "Reduce technology diversity to suit the smaller team; keep other decisions",
   "Keep the design unchanged, as staffing levels are an operations concern only",
   "Add a new monitoring platform so that six engineers can watch all three overlays",
   "Outsource the entire network so team size no longer affects the design"
  ],
  "answer": 0,
  "explain": "Operational capacity is a design constraint. Reducing technology diversity directly lowers operational load while other decisions stand. Ignoring it, adding tools or wholesale outsourcing do not address the core mismatch."
 },
 {
  "module": "m8",
  "q": "A design review finds that the proposed network includes 99.999% availability for an internal reporting service whose requirement is 99.9%. What is the most appropriate review finding?",
  "options": [
   "Commendable: higher availability is always better value for the business overall",
   "Gold-plating: the extra cost and complexity serve no stated requirement",
   "Neutral: availability has no effect on cost or complexity once designed",
   "Critical: 99.999% is not technically achievable for a reporting service"
  ],
  "answer": 1,
  "explain": "Decisions must trace to requirements. Designing two nines beyond the need adds cost and complexity without business value. Higher availability is not free, and five nines is achievable but not warranted here."
 }
]);
