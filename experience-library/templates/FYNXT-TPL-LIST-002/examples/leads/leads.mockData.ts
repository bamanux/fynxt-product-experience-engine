import type { ListRecord } from "../../src/index";

/**
 * MOCK DATA — not real FYNXT records. Field values (names, emails, statuses) are
 * invented for this example only, shaped to match the columns documented for the
 * Leads list in docs/template-discovery.md (`CAND-001`) — they are not sourced
 * from any real Leads dataset (none was available to any audit in this repository).
 */
export const leadsMockRecords: ListRecord[] = [
  {
    id: "lead-001",
    name: "Ankur Dei",
    contactNumber: "+91 98765 00001",
    email: "ankur.dei@example.com",
    type: "Individual",
    status: "New Lead",
    executedOn: "2026-05-02",
    tag: { label: "Hot", tone: "hot" },
    owner: { name: "Priya Sharma" },
  },
  {
    id: "lead-002",
    name: "Goulden Bhatt",
    contactNumber: "+91 98765 00002",
    email: "goulden.bhatt@example.com",
    type: "Corporate",
    status: "Contact Attempted",
    executedOn: "2026-05-02",
    tag: { label: "Hot", tone: "hot" },
    owner: { name: "Priya Sharma" },
  },
  {
    id: "lead-003",
    name: "Aman Swaminathan",
    contactNumber: "+91 98765 00003",
    email: "aman.swaminathan@example.com",
    type: "Joint",
    status: "Contacted",
    executedOn: "2026-05-02",
    tag: { label: "Cold", tone: "cold" },
    owner: { name: "Naviot Grover" },
  },
  {
    id: "lead-004",
    name: "Pragati Talkari",
    contactNumber: "+91 98765 00004",
    email: "pragati.talkari@example.com",
    type: "Corporate",
    status: "Contacted",
    executedOn: "2026-05-02",
    tag: { label: "Warm", tone: "warm" },
    owner: { name: "Zoyaab Acharya" },
  },
  {
    id: "lead-005",
    name: "Millie Parmar",
    contactNumber: "+91 98765 00005",
    email: "millie.parmar@example.com",
    type: "Corporate",
    status: "Qualified",
    executedOn: "2026-05-02",
    tag: { label: "Warm", tone: "warm" },
    owner: { name: "Yash Bakaraju" },
  },
  {
    id: "lead-006",
    name: "Sagar Pareek",
    contactNumber: "+91 98765 00006",
    email: "sagar.pareek@example.com",
    type: "Joint",
    status: "Unqualified",
    executedOn: "2026-05-02",
    tag: { label: "Cold", tone: "cold" },
    owner: { name: "Yash Bakaraju" },
  },
  {
    id: "lead-007",
    name: "Jugnathi Marka",
    contactNumber: "+91 98765 00007",
    email: "jugnathi.marka@example.com",
    type: "Corporate",
    status: "Contact Attempted",
    executedOn: "2026-05-02",
    tag: { label: "Warm", tone: "warm" },
    owner: { name: "Bageush Dhavala" },
  },
];
